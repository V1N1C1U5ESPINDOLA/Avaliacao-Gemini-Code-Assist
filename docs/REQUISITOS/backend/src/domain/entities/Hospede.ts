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
  }

  private validarCPF(cpf: string): void {
    // Regra de Negócio RN009: Validação simplificada para exemplo
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      throw new Error("CPF Inválido: Deve conter 11 dígitos.");
    }
  }

  private validarEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Email Inválido.");
    }
  }

  get nomeCompleto(): string {
    return `${this.nome} ${this.sobrenome}`;
  }
}