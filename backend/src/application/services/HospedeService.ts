import { Hospede } from '../../domain/entities/Hospede';
import { IHospedeRepository } from '../../domain/repositories/IHospedeRepository';

export class HospedeService {
  constructor(private hospedeRepository: IHospedeRepository) {}

  async cadastrar(dados: { nome: string; sobrenome: string; cpf: string; email: string }): Promise<Hospede> {
    const existente = await this.hospedeRepository.findByCpf(dados.cpf);
    if (existente) throw new Error("CPF já cadastrado.");

    const novoHospede = new Hospede(crypto.randomUUID(), dados.nome, dados.sobrenome, dados.cpf, dados.email);
    await this.hospedeRepository.save(novoHospede);
    return novoHospede;
  }
}