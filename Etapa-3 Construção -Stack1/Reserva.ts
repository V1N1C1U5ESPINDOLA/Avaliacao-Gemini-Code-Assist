import { Quarto } from './Quarto';
import { Hospede } from './Hospede';

export class Reserva {
  id: number;
  dataEntrada: Date;
  dataSaida: Date;
  quarto: Quarto;
  hospede: Hospede;

  constructor(
    id: number,
    dataEntrada: Date,
    dataSaida: Date,
    quarto: Quarto,
    hospede: Hospede
  ) {
    this.id = id;
    this.dataEntrada = dataEntrada;
    this.dataSaida = dataSaida;
    this.quarto = quarto;
    this.hospede = hospede;
  }
}
