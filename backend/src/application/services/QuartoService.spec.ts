import { QuartoService } from './QuartoService';
import { InMemoryQuartoRepository } from '../../infrastructure/repositories/InMemoryQuartoRepository';
import { TipoQuarto, StatusDisponibilidade, TipoCama } from '../../domain/enums/Status';
import { CreateQuartoRequest } from '../../domain/dtos/QuartoDTO';

describe('QuartoService (Testes Unitários)', () => {
  let service: QuartoService;
  let repository: InMemoryQuartoRepository;

  // Setup inicial antes de cada teste
  beforeEach(() => {
    repository = new InMemoryQuartoRepository();
    service = new QuartoService(repository);
  });

  describe('Cadastro de Quarto', () => {
    it('deve cadastrar um quarto com sucesso', async () => {
      const request: CreateQuartoRequest = {
        numero: 101,
        capacidade: 2,
        tipo: TipoQuarto.BASICO,
        precoPorHora: 50,
        amenidades: { frigobar: false, cafeManha: false, arCondicionado: true, tv: true },
        camas: [TipoCama.SOLTEIRO, TipoCama.SOLTEIRO]
      };

      await service.cadastrar(request);

      const quartoCriado = await repository.findByNumero(101);
      expect(quartoCriado).toBeDefined();
      expect(quartoCriado?.numero).toBe(101);
      expect(quartoCriado?.camas.length).toBe(2);
      expect(quartoCriado?.status).toBe(StatusDisponibilidade.LIVRE);
    });

    it('não deve permitir cadastrar quarto com número duplicado (RN001)', async () => {
      const request: CreateQuartoRequest = {
        numero: 202,
        capacidade: 2,
        tipo: TipoQuarto.MODERNO,
        precoPorHora: 80,
        amenidades: { frigobar: true, cafeManha: true, arCondicionado: true, tv: true },
        camas: [TipoCama.QUEEN]
      };

      await service.cadastrar(request);

      // Tentativa de duplicar o número 202
      await expect(service.cadastrar(request)).rejects.toThrow("Número de quarto já cadastrado.");
    });
  });

  describe('Edição de Quarto', () => {
    let quartoId: string;

    // Criar um quarto base para os testes de edição
    beforeEach(async () => {
      const request: CreateQuartoRequest = {
        numero: 303,
        capacidade: 2,
        tipo: TipoQuarto.LUXO,
        precoPorHora: 200,
        amenidades: { frigobar: true, cafeManha: true, arCondicionado: true, tv: true },
        camas: [TipoCama.KING]
      };
      await service.cadastrar(request);
      const quarto = await repository.findByNumero(303);
      quartoId = quarto!.id;
    });

    it('deve editar o preço e o número de um quarto com sucesso', async () => {
      const updateData = {
        numero: 304,
        precoPorHora: 250
      };

      await service.editar(quartoId, updateData);

      const quartoEditado = await repository.findById(quartoId);
      expect(quartoEditado?.numero).toBe(304);
      expect(quartoEditado?.precoPorHora).toBe(250);
    });

    it('deve alterar o status do quarto respeitando as regras de transição (State Pattern)', async () => {
      // 1. Mudar para Ocupado
      await service.editar(quartoId, { status: StatusDisponibilidade.OCUPADO });
      let quarto = await repository.findById(quartoId);
      expect(quarto?.status).toBe(StatusDisponibilidade.OCUPADO);

      // 2. Tentar mudar de Ocupado direto para Livre (Deve falhar conforme regra de negócio)
      await expect(
        service.editar(quartoId, { status: StatusDisponibilidade.LIVRE })
      ).rejects.toThrow("Transição inválida: Quarto ocupado requer limpeza.");

      // 3. Mudar para Limpeza e depois para Livre (Caminho correto)
      await service.editar(quartoId, { status: StatusDisponibilidade.LIMPEZA });
      await service.editar(quartoId, { status: StatusDisponibilidade.LIVRE });
      
      quarto = await repository.findById(quartoId);
      expect(quarto?.status).toBe(StatusDisponibilidade.LIVRE);
    });

    it('deve lançar erro ao tentar editar um quarto inexistente', async () => {
      await expect(
        service.editar('id-inexistente', { numero: 999 })
      ).rejects.toThrow("Quarto não encontrado.");
    });
  });
});