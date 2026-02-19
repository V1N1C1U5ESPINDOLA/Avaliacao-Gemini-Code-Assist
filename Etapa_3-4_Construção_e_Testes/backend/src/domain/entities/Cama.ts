import { TipoCama } from '../enums/Status';

/**
 * Entidade Cama: Representa um objeto de valor dentro do Quarto.
 * Aplicando SRP: Responsável apenas por representar os dados de uma cama.
 */
export class Cama {
  constructor(
    public readonly id: string,
    public readonly tipo: TipoCama
  ) {}
}