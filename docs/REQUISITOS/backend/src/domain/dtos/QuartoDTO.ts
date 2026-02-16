import { TipoQuarto, TipoCama, StatusDisponibilidade } from '../enums/Status';

export interface CreateQuartoDTO {
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
  camas: { tipo: TipoCama }[]; // Suporte a múltiplas camas
}

export interface UpdateQuartoDTO extends Partial<CreateQuartoDTO> {
  status?: StatusDisponibilidade;
}