export class Hospede {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;

  constructor(nome: string, sobrenome: string, cpf: string, email: string) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.cpf = cpf;
    this.email = email;
  }
}
