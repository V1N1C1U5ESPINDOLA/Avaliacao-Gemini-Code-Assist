import { Reserva } from '../../domain/entities/Reserva';
import { IReservaRepository } from '../../domain/repositories/IReservaRepository';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
import { StatusDisponibilidade } from '../../domain/enums/Status';

export class ReservaService {
  constructor(
    private reservaRepository: IReservaRepository,
    private quartoRepository: IQuartoRepository
  ) {}

  /**
   * Fluxo de Integração: Cria a reserva e atualiza o estado do quarto.
   * SOLID: O Service orquestra a transação entre dois repositórios.
   */
  async criarReserva(dados: { quartoId: string; hospedeId: string; entrada: Date; saida: Date }): Promise<Reserva> {
    const quarto = await this.quartoRepository.findById(dados.quartoId);
    if (!quarto) throw new Error("Quarto não encontrado.");
    
    // RN013: Validar se o quarto está livre
    if (quarto.status !== StatusDisponibilidade.LIVRE) {
      throw new Error("Quarto não está disponível para reserva.");
    }

    // Criação da entidade Reserva (contém lógica de cálculo de valor e validação de datas)
    const reserva = new Reserva(
      crypto.randomUUID(),
      quarto,
      dados.hospedeId as any, // Simplificado para o teste
      dados.entrada,
      dados.saida
    );

    // Persistência da Reserva
    await this.reservaRepository.save(reserva);

    // Integração: Atualização do status do quarto para OCUPADO
    quarto.alterarStatus(StatusDisponibilidade.OCUPADO);
    await this.quartoRepository.save(quarto);

    return reserva;
  }
}