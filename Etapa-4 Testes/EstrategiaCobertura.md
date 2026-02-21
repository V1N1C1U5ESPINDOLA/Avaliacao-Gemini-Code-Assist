# Estratégia de Cobertura de Testes

## Cobertura Unitária
- Todos os métodos críticos do módulo de Gestão de Quartos possuem testes unitários (cadastro, edição, listagem e manipulação de camas).
- Casos de sucesso e falha são contemplados (ex: edição de quarto inexistente).

## Cobertura de Integração
- O fluxo principal do sistema (cadastro de hóspede, criação de reserva e atualização de disponibilidade do quarto) é validado por testes de integração.
- Garante que os módulos interagem corretamente e que regras de negócio são respeitadas.

## Justificativa
- A estratégia cobre os principais caminhos de negócio e casos de borda, garantindo confiabilidade e facilitando manutenção.
- Novos testes devem ser adicionados conforme o sistema evoluir, visando sempre alta cobertura e qualidade.
