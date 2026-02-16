import { Quarto } from '../../domain/entities/Quarto';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';

/**
 * Implementação em Memória: Útil para testes e prototipagem rápida.
 * SOLID (LSP): Esta classe pode substituir qualquer outra implementação de IQuartoRepository sem quebrar o Service.
 */
export class InMemoryQuartoRepository implements IQuartoRepository {
  private items: Quarto[] = [];

  async save(quarto: Quarto): Promise<void> {
    const index = this.items.findIndex(i => i.id === quarto.id);
    if (index >= 0) {
      this.items[index] = quarto;
    } else {
      this.items.push(quarto);
    }
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
}