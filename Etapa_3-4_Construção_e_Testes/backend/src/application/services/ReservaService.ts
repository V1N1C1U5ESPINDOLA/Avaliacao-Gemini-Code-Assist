import { Reserva } from '../../domain/entities/Reserva';
import { IReservaRepository } from '../../domain/repositories/IReservaRepository';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
import { StatusDisponibilidade } from '../../domain/enums/Status';
import { generateId } from '../../infrastructure/IdGenerator';
import { NotFoundException, ConflictException, ValidationException } from '../../domain/exceptions/ApplicationException';

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
    if (!quarto) throw new NotFoundException('Quarto', dados.quartoId);
    
    // RN013: Validar se o quarto está livre
    if (quarto.status !== StatusDisponibilidade.LIVRE) {
      throw new ConflictException('Quarto não está disponível para reserva.');
    }

    if (!dados.entrada || !dados.saida) throw new ValidationException('Datas inválidas.');

    // Criação da entidade Reserva (contém lógica de cálculo de valor e validação de datas)
    const reserva = new Reserva(
      generateId(),
      quarto,
      (dados.hospedeId as unknown) as any, // manter compatibilidade com modelo simplificado
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