import { TipoQuarto, StatusDisponibilidade, TipoCama } from '../enums/Status';
import { Cama } from './Cama'; // Importação da entidade vizinha

export class Quarto {
  private _status: StatusDisponibilidade;
  public camas: Cama[] = [];

  constructor(
    public readonly id: string,
    public readonly numero: number,
    public capacidade: number,
    public tipo: TipoQuarto,
    public precoDiaria: number,
    public amenidades: {
      frigobar: boolean;
      cafeManha: boolean;
      arCondicionado: boolean;
      tv: boolean;
    },
    statusInicial: StatusDisponibilidade = StatusDisponibilidade.LIVRE
  ) {
    this._status = statusInicial;
  }

  // State Pattern: Controle de transição de status
  get status(): StatusDisponibilidade {
    return this._status;
  }

  public alterarStatus(novoStatus: StatusDisponibilidade): void {
    // RN008: Regra de transição de estado
    if (this._status === StatusDisponibilidade.OCUPADO && novoStatus === StatusDisponibilidade.LIVRE) {
      throw new Error("Quarto ocupado deve passar por limpeza antes de ficar livre.");
    }
    this._status = novoStatus;
  }

  public adicionarCama(cama: Cama): void {
    this.camas.push(cama);
  }

  // Factory Method: Criação padronizada de um quarto básico
  public static createBasic(id: string, numero: number): Quarto {
    const quarto = new Quarto(id, numero, 2, TipoQuarto.BASICO, 150, {
      frigobar: false,
      cafeManha: false,
      arCondicionado: true,
      tv: true
    });
    // Adicionando camas usando a classe Cama
    quarto.adicionarCama(new Cama(Math.random().toString(), TipoCama.SOLTEIRO));
    quarto.adicionarCama(new Cama(Math.random().toString(), TipoCama.SOLTEIRO));
    return quarto;
  }
}