import { Quarto } from '../entities/Quarto';

export interface IQuartoRepository {
  save(quarto: Quarto): Promise<Quarto>;
  findById(id: string): Promise<Quarto | null>;
  findByNumero(numero: number): Promise<Quarto | null>;
  findAll(): Promise<Quarto[]>;
  update(id: string, quarto: Quarto): Promise<Quarto>;
}