export interface PricingStrategy {
  calculate(precoDiaria: number, noites: number): number;
}

// Exemplo de implementação: Preço Padrão
export class DefaultPricingStrategy implements PricingStrategy {
  calculate(precoDiaria: number, noites: number): number {
    return precoDiaria * noites;
  }
}

// Exemplo de implementação: Desconto para estadias longas (> 7 dias)
export class LongStayDiscountStrategy implements PricingStrategy {
  calculate(precoDiaria: number, noites: number): number {
    const total = precoDiaria * noites;
    return noites > 7 ? total * 0.9 : total; // 10% de desconto
  }
}