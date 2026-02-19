import { TipoQuarto, TipoCama, StatusDisponibilidade } from '../enums/Status';

/**
 * DTOs: Garantem que a camada externa não conheça a estrutura interna da Entidade.
 */
export interface CreateQuartoRequest {
  numero: number;
  capacidade: number;
  tipo: TipoQuarto;
  precoPorHora: number;
  amenidades: {
    frigobar: boolean;
    cafeManha: boolean;
    arCondicionado: boolean;
    tv: boolean;
  };
  camas: TipoCama[];
}

export interface UpdateQuartoRequest extends Partial<CreateQuartoRequest> {
  status?: StatusDisponibilidade;
}

// Resposta formatada para a listagem (Clean Code: Mostra apenas o necessário)
export interface QuartoResponseDTO {
  id: string;
  numero: number;
  tipo: TipoQuarto;
  precoPorHora: number;
  status: StatusDisponibilidade;
  camasCount: number;
}