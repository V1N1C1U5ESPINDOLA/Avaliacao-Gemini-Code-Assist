# Governança e Qualidade

## 1. Critérios de Qualidade (Definition of Done - DoD)
Para uma tarefa ser considerada "Concluída", ela deve passar pelos seguintes critérios:
* **Cobertura de Testes:** Mínimo de 80% de cobertura unitária (JUnit/Jacoco).
* **Clean Code:** Ausência de "code smells" detectados por análise estática (SonarQube).
* **Responsividade:** Interface testada em resoluções Desktop e Mobile.
* **Acessibilidade:** Cores verde e azul devem manter contraste mínimo para legibilidade (WCAG 2.1).

## 2. KPIs do Projeto (Indicadores de Desempenho)
| KPI | Meta | Frequência |
| :--- | :--- | :--- |
| **Velocity** | > 10 SP/Sprint | Por Sprint |
| **Bugs em Produção** | 0 Críticos | Contínuo |
| **Tempo Médio de Resposta (API)** | < 200ms | Diário |
| **Uptime do Sistema** | 99.9% | Mensal |



## 3. Padrões de Documentação
* **JavaDocs:** Obrigatório em todas as classes de `service` e `domain`.
* **Swagger/OpenAPI:** Documentação automática de todos os endpoints do Controller.