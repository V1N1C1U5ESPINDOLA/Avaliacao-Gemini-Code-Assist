import { Quarto, Cama } from './Quarto';

/**
 * DTO para retorno de quartos na listagem.
 */
export interface QuartoDTO {
  numero: number;
  tipo: string;
  precoDiaria: number;
  disponibilidade: string;
  camas: Cama[];
}

/**
 * Classe responsável pela gestão de quartos.
 * Princípios aplicados:
 * - Single Responsibility: Cada método tem uma responsabilidade clara.
 * - Open/Closed: Permite extensão sem modificar código existente.
 * - Liskov Substitution: Métodos retornam tipos esperados.
 * - Interface Segregation: Métodos específicos para cada operação.
 * - Dependency Inversion: Depende de abstrações (Quarto, Cama).
 * Clean Code: Nomes claros, métodos curtos, sem duplicidade.
 */

export class GestaoQuartos {
  /**
   * Lista de quartos cadastrados.
   * Mantém encapsulamento, evitando acesso direto.
   */
  private quartos: Quarto[] = [];

  /**
   * Cadastra um novo quarto.
   * @param quarto Instância de Quarto a ser adicionada.
   */
  /**
   * Cadastra um novo quarto, evitando duplicidade.
   * @returns true se cadastrado, false se já existe.
   */
  cadastrarQuarto(quarto: Quarto): boolean {
    if (this.quartos.some(q => q.numero === quarto.numero)) {
      console.warn(`Quarto ${quarto.numero} já existe.`);
      return false;
    }
    this.quartos.push(quarto);
    return true;
  }

  /**
   * Edita um quarto existente pelo número.
   * @param numero Número do quarto a editar.
   * @param dadosAtualizados Dados parciais para atualização.
   * @returns true se editado, false se não encontrado.
   */
  /**
   * Edita apenas campos permitidos de um quarto.
   * @returns true se editado, false se não encontrado.
   */
  editarQuarto(numero: number, dadosAtualizados: Partial<Quarto>): boolean {
    const quarto = this.quartos.find(q => q.numero === numero);
    if (!quarto) return false;
    // Atualiza apenas campos permitidos
    if (dadosAtualizados.precoDiaria !== undefined)
      quarto.precoDiaria = dadosAtualizados.precoDiaria;
    if (dadosAtualizados.disponibilidade !== undefined)
      quarto.disponibilidade = dadosAtualizados.disponibilidade;
    if (dadosAtualizados.tipo !== undefined)
      quarto.tipo = dadosAtualizados.tipo;
    return true;
  }

  /**
   * Lista todos os quartos com informações principais.
   * @returns Array de quartos resumidos.
   */
  /**
   * Lista quartos usando DTO.
   */
  listarQuartos(): QuartoDTO[] {
    return this.quartos.map(q => ({
      numero: q.numero,
      tipo: q.tipo,
      precoDiaria: q.precoDiaria,
      disponibilidade: q.disponibilidade,
      camas: q.camas
    }));
  }

  /**
   * Adiciona uma cama a um quarto específico.
   * @param numero Número do quarto.
   * @param cama Instância de Cama a ser adicionada.
   * @returns true se adicionado, false se quarto não encontrado.
   */
  /**
   * Adiciona uma cama válida ao quarto.
   * @returns true se adicionado, false se quarto não encontrado ou tipo inválido.
   */
  adicionarCamaAoQuarto(numero: number, cama: Cama): boolean {
    const quarto = this.quartos.find(q => q.numero === numero);
    if (!quarto) return false;
    const tiposValidos = ['Solteiro', 'Casal King', 'Casal Queen'];
    if (!tiposValidos.includes(cama.tipo)) {
      console.warn(`Tipo de cama inválido: ${cama.tipo}`);
      return false;
    }
    quarto.camas.push(cama);
    return true;
  }
}
