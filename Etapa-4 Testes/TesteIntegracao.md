# Proposta de Testes de Integração

## Fluxo: Cadastro de Hóspede → Criação de Reserva → Atualização de Disponibilidade do Quarto

### Cenário
1. Cadastrar um novo hóspede.
2. Cadastrar um novo quarto (disponível).
3. Criar uma reserva associando o hóspede ao quarto.
4. Verificar se a disponibilidade do quarto foi atualizada para "Ocupado".

### Passos de Teste
- Dado um hóspede cadastrado
- E um quarto cadastrado como "Livre"
- Quando uma reserva é criada para esse hóspede e quarto
- Então a reserva deve ser registrada
- E a disponibilidade do quarto deve ser "Ocupado"

### Observações
- O teste deve garantir a integração entre os módulos de Hóspede, Quarto e Reserva.
- Pode ser implementado utilizando mocks ou banco de dados em memória para simular o fluxo completo.
