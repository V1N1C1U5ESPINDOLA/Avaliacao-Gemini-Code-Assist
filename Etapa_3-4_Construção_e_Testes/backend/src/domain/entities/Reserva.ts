import { StatusReserva } from '../enums/Status';
import { Quarto } from './Quarto';
import { Hospede } from './Hospede';
import { PricingStrategy, DefaultPricingStrategy } from '../strategies/PricingStrategy';
import { ValidationException } from '../exceptions/ApplicationException';

export class Reserva {
  public valorTotal: number = 0;
  public status: StatusReserva = StatusReserva.ATIVA;

  constructor(
    public readonly id: string,
    public readonly quarto: Quarto,
    public readonly hospede: Hospede,
    public readonly dataEntrada: Date,
    public readonly dataSaida: Date,
    private pricingStrategy: PricingStrategy = new DefaultPricingStrategy()
  ) {
    this.validarDatas();
    this.calcularValor();
  }

  private validarDatas(): void {
    // RN014: Data entrada < saída
    if (this.dataEntrada >= this.dataSaida) {
      throw new ValidationException("A data de saída deve ser posterior à data de entrada.");
    }
    if (this.dataEntrada < new Date()) {
       // Permite apenas se for hoje ou futuro
       const hoje = new Date();
       hoje.setHours(0,0,0,0);
       if (this.dataEntrada < hoje) throw new ValidationException("Não é possível reservar no passado.");
    }
  }

  public calcularValor(): void {
    const diffTime = Math.abs(this.dataSaida.getTime() - this.dataEntrada.getTime());
    const noites = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.valorTotal = this.pricingStrategy.calculate(this.quarto.precoDiaria, noites);
  }

  public cancelar(): void {
    this.status = StatusReserva.CANCELADA;
  }
}