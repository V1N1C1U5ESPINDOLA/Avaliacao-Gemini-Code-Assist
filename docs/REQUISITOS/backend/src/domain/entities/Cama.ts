import { TipoCama } from '../enums/Status';

export class Cama {
  constructor(
    public readonly id: string, 
    public tipo: TipoCama
  ) {}
}