import { Hospede } from '../../domain/entities/Hospede';
import { IHospedeRepository } from '../../domain/repositories/IHospedeRepository';
import { generateId } from '../../infrastructure/IdGenerator';
import { ConflictException, ValidationException } from '../../domain/exceptions/ApplicationException';

export class HospedeService {
  constructor(private hospedeRepository: IHospedeRepository) {}

  async cadastrar(dados: { nome: string; sobrenome: string; cpf: string; email: string }): Promise<Hospede> {
    if (!dados || !dados.cpf) throw new ValidationException('Dados de hóspede inválidos.');

    const existente = await this.hospedeRepository.findByCpf(dados.cpf);
    if (existente) throw new ConflictException('CPF já cadastrado.');

    const novoHospede = new Hospede(generateId(), dados.nome, dados.sobrenome, dados.cpf, dados.email);
    await this.hospedeRepository.save(novoHospede);
    return novoHospede;
  }
}