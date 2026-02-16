import { Quarto } from '../../domain/entities/Quarto';
import { Cama } from '../../domain/entities/Cama';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
import { CreateQuartoRequest, UpdateQuartoRequest, QuartoResponseDTO } from '../../domain/dtos/QuartoDTO';

/**
 * QuartoService: Orquestrador da aplicação.
 * SOLID (DIP): Depende da interface IQuartoRepository.
 */
export class QuartoService {
  constructor(private readonly repository: IQuartoRepository) {}

  public async cadastrar(dados: CreateQuartoRequest): Promise<void> {
    // Validação de unicidade (Regra de Domínio)
    const existente = await this.repository.findByNumero(dados.numero);
    if (existente) throw new Error("Quarto com este número já cadastrado.");

    const novoQuarto = new Quarto(
      crypto.randomUUID(), // Utilizando Web Crypto API para IDs únicos
      dados.numero,
      dados.capacidade,
      dados.tipo,
      dados.precoPorHora,
      dados.amenidades
    );

    // Mapeamento de camas recebidas no DTO para a Entidade
    dados.camas.forEach(tipo => {
      novoQuarto.adicionarCama(new Cama(crypto.randomUUID(), tipo));
    });

    await this.repository.save(novoQuarto);
  }

  public async editar(id: string, dados: UpdateQuartoRequest): Promise<void> {
    const quarto = await this.repository.findById(id);
    if (!quarto) throw new Error("Quarto não encontrado.");

    // Aplicando alterações via métodos da entidade (Preservando Invariantes)
    if (dados.precoPorHora) quarto.atualizarPreco(dados.precoPorHora);
    if (dados.status) quarto.alterarStatus(dados.status);
    
    quarto.atualizarDados({
      numero: dados.numero,
      capacidade: dados.capacidade,
      tipo: dados.tipo
    });

    await this.repository.save(quarto); // O repositório lida com o "Upsert"
  }

  /**
   * Retorna DTOs de resposta em vez da Entidade pura.
   * Isso desacopla o contrato da API da estrutura interna do banco.
   */
  public async listarQuartos(): Promise<QuartoResponseDTO[]> {
    const quartos = await this.repository.findAll();
    return quartos.map(q => ({
      id: q.id,
      numero: q.numero,
      tipo: q.tipo,
      precoPorHora: q.precoPorHora,
      status: q.status,
      camasCount: q.camas.length
    }));
  }
}