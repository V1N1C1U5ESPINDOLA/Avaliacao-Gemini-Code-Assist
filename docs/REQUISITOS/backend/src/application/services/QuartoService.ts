import { Quarto } from '../../domain/entities/Quarto';
import { Cama } from '../../domain/entities/Cama';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
import { CreateQuartoDTO, UpdateQuartoDTO } from '../../domain/dtos/QuartoDTO';

export class QuartoService {
  constructor(private quartoRepository: IQuartoRepository) {}

  async cadastrar(dados: CreateQuartoDTO): Promise<Quarto> {
    // RN001: Validar número único
    const existe = await this.quartoRepository.findByNumero(dados.numero);
    if (existe) throw new Error("Já existe um quarto com este número.");

    // RN003: Validar preço positivo
    if (dados.precoPorHora <= 0) throw new Error("O preço deve ser maior que zero.");

    const novoQuarto = new Quarto(
      Math.random().toString(), // ID temporário
      dados.numero,
      dados.capacidade,
      dados.tipo,
      dados.precoPorHora,
      dados.amenidades
    );

    // Suporte a múltiplas camas
    dados.camas.forEach(c => {
      novoQuarto.adicionarCama(new Cama(Math.random().toString(), c.tipo));
    });

    return await this.quartoRepository.save(novoQuarto);
  }

  async editar(id: string, dados: UpdateQuartoDTO): Promise<Quarto> {
    const quarto = await this.quartoRepository.findById(id);
    if (!quarto) throw new Error("Quarto não encontrado.");

    if (dados.numero) {
        const existe = await this.quartoRepository.findByNumero(dados.numero);
        if (existe && existe.id !== id) throw new Error("Número de quarto já em uso.");
        // @ts-ignore - simplificação para o exemplo
        quarto.numero = dados.numero;
    }

    if (dados.precoPorHora) quarto.precoDiaria = dados.precoPorHora;
    if (dados.status) quarto.alterarStatus(dados.status);
    
    // Lógica para atualizar camas poderia ser adicionada aqui...

    return await this.quartoRepository.update(id, quarto);
  }

  async listarTodos(): Promise<Quarto[]> {
    return await this.quartoRepository.findAll();
  }
}