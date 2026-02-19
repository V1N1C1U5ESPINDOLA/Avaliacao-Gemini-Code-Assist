import { ValidationException } from '../exceptions/ApplicationException';

export class Hospede {
  constructor(
    public readonly id: string,
    public nome: string,
    public sobrenome: string,
    public readonly cpf: string,
    public email: string
  ) {
    this.validarCPF(cpf);
    this.validarEmail(email);
    this.validarNomes(nome, sobrenome);
  }

  private validarCPF(cpf: string): void {
    // Regra de Negócio RN009: Validação simplificada para exemplo
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      throw new ValidationException("CPF Inválido: Deve conter 11 dígitos.");
    }
  }

  private validarEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationException("Email Inválido.");
    }
  }

  private validarNomes(nome: string, sobrenome: string): void {
    if (!nome || nome.trim().length === 0) {
      throw new ValidationException('Nome não pode ser vazio.');
    }
    if (!sobrenome || sobrenome.trim().length === 0) {
      throw new ValidationException('Sobrenome não pode ser vazio.');
    }
  }

  get nomeCompleto(): string {
    return `${this.nome} ${this.sobrenome}`;
  }
}