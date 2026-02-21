export class Quarto {
  numero: number;
  capacidade: number;
  tipo: 'Básico' | 'Moderno' | 'Luxo';
  precoDiaria: number;
  frigobar: boolean;
  cafeDaManha: boolean;
  arCondicionado: boolean;
  tv: boolean;
  camas: Cama[];
  disponibilidade: 'Ocupado' | 'Livre' | 'Manutenção' | 'Limpeza';

  constructor(
    numero: number,
    capacidade: number,
    tipo: 'Básico' | 'Moderno' | 'Luxo',
    precoDiaria: number,
    frigobar: boolean,
    cafeDaManha: boolean,
    arCondicionado: boolean,
    tv: boolean,
    camas: Cama[],
    disponibilidade: 'Ocupado' | 'Livre' | 'Manutenção' | 'Limpeza'
  ) {
    this.numero = numero;
    this.capacidade = capacidade;
    this.tipo = tipo;
    this.precoDiaria = precoDiaria;
    this.frigobar = frigobar;
    this.cafeDaManha = cafeDaManha;
    this.arCondicionado = arCondicionado;
    this.tv = tv;
    this.camas = camas;
    this.disponibilidade = disponibilidade;
  }
}

export class Cama {
  tipo: 'Solteiro' | 'Casal King' | 'Casal Queen';

  constructor(tipo: 'Solteiro' | 'Casal King' | 'Casal Queen') {
    this.tipo = tipo;
  }
}
