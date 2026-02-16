import { Quarto } from '../../domain/entities/Quarto';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';

export class InMemoryQuartoRepository implements IQuartoRepository {
  private quartos: Quarto[] = [];

  async save(quarto: Quarto): Promise<Quarto> {
    this.quartos.push(quarto);
    return quarto;
  }

  async findById(id: string): Promise<Quarto | null> {
    return this.quartos.find(q => q.id === id) || null;
  }

  async findByNumero(numero: number): Promise<Quarto | null> {
    return this.quartos.find(q => q.numero === numero) || null;
  }

  async findAll(): Promise<Quarto[]> {
    return this.quartos;
  }

  async update(id: string, quarto: Quarto): Promise<Quarto> {
    const index = this.quartos.findIndex(q => q.id === id);
    this.quartos[index] = quarto;
    return quarto;
  }
}