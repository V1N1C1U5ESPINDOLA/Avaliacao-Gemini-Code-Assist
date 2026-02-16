import { HospedeService } from '../../src/application/services/HospedeService';
import { ReservaService } from '../../src/application/services/ReservaService';
import { QuartoService } from '../../src/application/services/QuartoService';
import { InMemoryHospedeRepository } from '../../src/infrastructure/repositories/InMemoryHospedeRepository';
import { InMemoryQuartoRepository } from '../../src/infrastructure/repositories/InMemoryQuartoRepository';
import { InMemoryReservaRepository } from '../../src/infrastructure/repositories/InMemoryReservaRepository';
import { TipoQuarto, StatusDisponibilidade, TipoCama } from '../../src/domain/enums/Status';

describe('Integração: Fluxo de Reserva Completo', () => {
  let hospedeService: HospedeService;
  let reservaService: ReservaService;
  let quartoService: QuartoService;
  
  let quartoRepo: InMemoryQuartoRepository;
  let hospedeRepo: InMemoryHospedeRepository;
  let reservaRepo: InMemoryReservaRepository;

  beforeAll(() => {
    // Inicialização de todos os repositórios em memória para simular o banco
    quartoRepo = new InMemoryQuartoRepository();
    hospedeRepo = new InMemoryHospedeRepository();
    reservaRepo = new InMemoryReservaRepository();

    // Inicialização dos serviços
    hospedeService = new HospedeService(hospedeRepo);
    quartoService = new QuartoService(quartoRepo);
    reservaService = new ReservaService(reservaRepo, quartoRepo);
  });

  it('deve realizar o fluxo completo: cadastrar hóspede -> criar reserva -> ocupar quarto', async () => {
    // 1. Preparação: Cadastrar um quarto Livre
    await quartoService.cadastrar({
      numero: 501,
      capacidade: 2,
      tipo: TipoQuarto.MODERNO,
      precoPorHora: 100,
      amenidades: { frigobar: true, cafeManha: true, arCondicionado: true, tv: true },
      camas: [TipoCama.SOLTEIRO]
    });
    const quarto = await quartoRepo.findByNumero(501);

    // 2. Passo 1: Cadastro de Hóspede
    const hospede = await hospedeService.cadastrar({
      nome: "Carlos",
      sobrenome: "Ferreira",
      cpf: "111.222.333-44",
      email: "carlos@email.com"
    });
    expect(hospede.id).toBeDefined();

    // 3. Passo 2: Criação de Reserva
    const entrada = new Date();
    entrada.setDate(entrada.getDate() + 1); // Amanhã
    const saida = new Date();
    saida.setDate(saida.getDate() + 3); // 2 dias depois

    const reserva = await reservaService.criarReserva({
      quartoId: quarto!.id,
      hospedeId: hospede.id,
      entrada,
      saida
    });

    // Verificação da Reserva
    expect(reserva.valorTotal).toBeGreaterThan(0);
    const reservaNoBanco = await reservaRepo.findById(reserva.id);
    expect(reservaNoBanco).toBeDefined();

    // 4. Passo 3: Verificação da Atualização de Disponibilidade do Quarto
    // O status deve ter mudado de LIVRE para OCUPADO automaticamente
    const quartoAtualizado = await quartoRepo.findById(quarto!.id);
    expect(quartoAtualizado?.status).toBe(StatusDisponibilidade.OCUPADO);
  });

  it('deve impedir reserva em quarto que já está OCUPADO', async () => {
    const quarto = await quartoRepo.findByNumero(501); // Quarto ocupado no teste anterior
    
    const outroHospede = await hospedeService.cadastrar({
      nome: "Ana",
      sobrenome: "Souza",
      cpf: "555.666.777-88",
      email: "ana@email.com"
    });

    // Tentativa de reservar o mesmo quarto ocupado
    await expect(reservaService.criarReserva({
      quartoId: quarto!.id,
      hospedeId: outroHospede.id,
      entrada: new Date(),
      saida: new Date()
    })).rejects.toThrow("Quarto não está disponível para reserva.");
  });
});