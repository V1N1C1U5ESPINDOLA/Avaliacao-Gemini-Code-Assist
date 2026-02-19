import { Quarto } from '../../domain/entities/Quarto';
import { Cama } from '../../domain/entities/Cama';
import { IQuartoRepository } from '../../domain/repositories/IQuartoRepository';
import { CreateQuartoRequest, UpdateQuartoRequest, QuartoResponseDTO } from '../../domain/dtos/QuartoDTO';
import { NotFoundException, ConflictException, ValidationException } from '../../domain/exceptions/ApplicationException';
import { generateId } from '../../infrastructure/IdGenerator';

/**
 * QuartoService: Orquestrador da aplicação.
 * SOLID (DIP): Depende da interface IQuartoRepository.
 */
export class QuartoService {
  constructor(private readonly repository: IQuartoRepository) {}

  public async cadastrar(dados: CreateQuartoRequest): Promise<void> {
    // Validação de dados de entrada
    if (!dados || typeof dados.numero !== 'number') throw new ValidationException('Dados de quarto inválidos.');

    // Validação de unicidade (Regra de Domínio)
    const existente = await this.repository.findByNumero(dados.numero);
    if (existente) throw new ConflictException("Quarto com este número já cadastrado.");

    const novoQuarto = new Quarto(
      generateId(),
      dados.numero,
      dados.capacidade,
      dados.tipo,
      dados.precoPorHora,
      dados.amenidades
    );

    // Mapeamento de camas recebidas no DTO para a Entidade
    dados.camas.forEach(tipo => {
      novoQuarto.adicionarCama(new Cama(generateId(), tipo));
    });

    await this.repository.save(novoQuarto);
  }

  public async editar(id: string, dados: UpdateQuartoRequest): Promise<void> {
    const quarto = await this.repository.findById(id);
    if (!quarto) throw new NotFoundException('Quarto', id);

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