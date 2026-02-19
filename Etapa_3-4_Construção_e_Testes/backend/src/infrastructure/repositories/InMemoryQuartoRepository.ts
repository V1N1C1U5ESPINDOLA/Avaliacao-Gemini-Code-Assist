import { Quarto } from '../../domain/entities/Quarto';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
import { NotFoundException } from '../../domain/exceptions/ApplicationException';

/**
 * Implementação em Memória: Útil para testes e prototipagem rápida.
 * SOLID (LSP): Esta classe pode substituir qualquer outra implementação de IQuartoRepository sem quebrar o Service.
 */
export class InMemoryQuartoRepository implements IQuartoRepository {
  private items: Quarto[] = [];

  async save(quarto: Quarto): Promise<Quarto> {
    const index = this.items.findIndex(i => i.id === quarto.id);
    if (index >= 0) {
      this.items[index] = quarto;
    } else {
      this.items.push(quarto);
    }
    return quarto;
  }

  async findById(id: string): Promise<Quarto | null> {
    return this.items.find(i => i.id === id) || null;
  }

  async findByNumero(numero: number): Promise<Quarto | null> {
    return this.items.find(i => i.numero === numero) || null;
  }

  async findAll(): Promise<Quarto[]> {
    return [...this.items];
  }

  async update(id: string, quarto: Quarto): Promise<Quarto> {
    const index = this.items.findIndex(i => i.id === id);
    if (index < 0) {
      throw new NotFoundException('Quarto', id);
    }
    this.items[index] = quarto;
    return quarto;
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex(i => i.id === id);
    if (index < 0) {
      throw new NotFoundException('Quarto', id);
    }
    this.items.splice(index, 1);
  }
}