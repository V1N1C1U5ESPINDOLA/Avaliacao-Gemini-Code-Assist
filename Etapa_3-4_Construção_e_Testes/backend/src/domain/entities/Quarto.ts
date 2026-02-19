import { TipoQuarto, StatusDisponibilidade } from '../enums/Status';
import { Cama } from './Cama';
import { ValidationException, ForbiddenException } from '../exceptions/ApplicationException';

/**
 * Entidade Quarto: Raiz do Agregado.
 * Clean Code: Centraliza validações de estado para garantir que o objeto seja sempre válido.
 */
export class Quarto {
  private _status: StatusDisponibilidade;
  private _camas: Cama[] = [];

  constructor(
    public readonly id: string,
    private _numero: number,
    private _capacidade: number,
    private _tipo: TipoQuarto,
    private _precoPorHora: number,
    public readonly amenidades: {
      frigobar: boolean;
      cafeManha: boolean;
      arCondicionado: boolean;
      tv: boolean;
    },
    statusInicial: StatusDisponibilidade = StatusDisponibilidade.LIVRE
  ) {
    this.validarDados();
    this._status = statusInicial;
  }

  // Getters para proteger o acesso às propriedades privadas
  get numero() { return this._numero; }
  get capacidade() { return this._capacidade; }
  get tipo() { return this._tipo; }
  get precoPorHora() { return this._precoPorHora; }
  get precoDiaria() { return this._precoPorHora * 24; }
  get status() { return this._status; }
  get camas() { return [...this._camas]; } // Retorna cópia para evitar mutação externa (Clean Code)

  private validarDados(): void {
    if (!this._numero || this._numero <= 0) throw new ValidationException('Número do quarto deve ser maior que zero.');
    if (!this._capacidade || this._capacidade <= 0) throw new ValidationException('Capacidade deve ser maior que zero.');
    if (!this._precoPorHora || this._precoPorHora <= 0) throw new ValidationException('Preço por hora deve ser maior que zero.');
  }

  /**
   * Encapsula a lógica de transição de status (State Pattern logic).
   * Garante que regras de negócio de disponibilidade sejam respeitadas.
   */
  public alterarStatus(novoStatus: StatusDisponibilidade): void {
    if (this._status === StatusDisponibilidade.OCUPADO && novoStatus === StatusDisponibilidade.LIVRE) {
      throw new ForbiddenException('Um quarto ocupado deve passar por Limpeza antes de ser liberado.');
    }
    this._status = novoStatus;
  }

  public atualizarPreco(novoPreco: number): void {
    if (novoPreco <= 0) throw new ValidationException('Preço deve ser maior que zero.');
    this._precoPorHora = novoPreco;
  }

  public adicionarCama(cama: Cama): void {
    // Regra: Não permitir mais camas que a capacidade suporta
    if (this._camas.length >= this._capacidade) {
      throw new ValidationException('Capacidade máxima de camas atingida para este quarto.');
    }
    this._camas.push(cama);
  }

  // Método para atualizar dados básicos em lote (Edição)
  public atualizarDados(dados: { numero?: number; capacidade?: number; tipo?: TipoQuarto }): void {
    if (dados.numero) this._numero = dados.numero;
    if (dados.capacidade) this._capacidade = dados.capacidade;
    if (dados.tipo) this._tipo = dados.tipo;
  }
}