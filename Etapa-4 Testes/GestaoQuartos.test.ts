import { GestaoQuartos } from '../../Etapa-3 Construção/GestaoQuartos';
import { Quarto, Cama } from '../../Etapa-3 Construção/Quarto';

describe('GestaoQuartos', () => {
  let gestao: GestaoQuartos;

  beforeEach(() => {
    gestao = new GestaoQuartos();
  });

  it('deve cadastrar um novo quarto', () => {
    const quarto = new Quarto(101, 2, 'Básico', 150, true, false, true, true, [new Cama('Solteiro')], 'Livre');
    gestao.cadastrarQuarto(quarto);
    const quartos = gestao.listarQuartos();
    expect(quartos.length).toBe(1);
    expect(quartos[0].numero).toBe(101);
  });

  it('deve editar um quarto existente', () => {
    const quarto = new Quarto(102, 2, 'Luxo', 300, true, true, true, true, [new Cama('King')], 'Livre');
    gestao.cadastrarQuarto(quarto);
    const editado = gestao.editarQuarto(102, { precoDiaria: 350, disponibilidade: 'Ocupado' });
    expect(editado).toBe(true);
    const quartos = gestao.listarQuartos();
    expect(quartos[0].precoDiaria).toBe(350);
    expect(quartos[0].disponibilidade).toBe('Ocupado');
  });

  it('não deve editar um quarto inexistente', () => {
    const editado = gestao.editarQuarto(999, { precoDiaria: 200 });
    expect(editado).toBe(false);
  });
});
