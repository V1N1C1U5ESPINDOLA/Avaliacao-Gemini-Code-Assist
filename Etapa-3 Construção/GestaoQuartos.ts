import { Quarto, Cama } from './Quarto';

export class GestaoQuartos {
  private quartos: Quarto[] = [];

  cadastrarQuarto(quarto: Quarto): void {
    this.quartos.push(quarto);
  }

  editarQuarto(numero: number, dadosAtualizados: Partial<Quarto>): boolean {
    const quarto = this.quartos.find(q => q.numero === numero);
    if (!quarto) return false;
    Object.assign(quarto, dadosAtualizados);
    return true;
  }

  listarQuartos(): Array<{
    numero: number;
    tipo: string;
    precoDiaria: number;
    disponibilidade: string;
    camas: Cama[];
  }> {
    return this.quartos.map(q => ({
      numero: q.numero,
      tipo: q.tipo,
      precoDiaria: q.precoDiaria,
      disponibilidade: q.disponibilidade,
      camas: q.camas
    }));
  }

  adicionarCamaAoQuarto(numero: number, cama: Cama): boolean {
    const quarto = this.quartos.find(q => q.numero === numero);
    if (!quarto) return false;
    quarto.camas.push(cama);
    return true;
  }
}
