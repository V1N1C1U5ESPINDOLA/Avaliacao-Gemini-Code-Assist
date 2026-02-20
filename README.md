# Sistema de Reserva de Hotel - Documentação Completa

## 📋 Índice de Documentação

Bem-vindo à documentação do **Sistema de Reserva de Hotel**. Este arquivo serve como guia de navegação para todos os documentos técnicos e funcionais do projeto.

---

## 📁 Estrutura de Documentos

### 1. **[Requisitos Funcionais](REQUISITOS_SISTEMA_HOTELEIRO.md)**
   Documento que detalha os requisitos básicos do sistema.
   - **Módulos**: Quartos, Hóspedes e Reservas.
   - **Interface**: Diretrizes de UI e paleta de cores.

### 2. **[Arquitetura e Design](ARQUITETURA_E_DESIGN.md)**
   Descrição da estrutura técnica e visual.
   - **Camadas**: UI, BL, DAL e Banco de Dados.
   - **Design**: Paleta de cores, tipografia e responsividade.

### 3. **[Modelos de Dados](MODELOS_DADOS.md)**
   Estrutura do banco de dados relacional.
   - **Tabelas**: Scripts SQL, Índices e Diagrama ER.

### 4. **[Casos de Uso e Regras de Negócio](CASOS_USO_REGRAS_NEGOCIO.md)**
   Lógica operacional e fluxos de processos.
   - **Regras**: RN001 até RN024.

### 5. **[Requisitos MoSCoW](REQUISITOS_RF_RNF_MOSCOW.md)**
   Classificação de prioridades para o desenvolvimento.
   - **Priorização**: Must, Should, Could e Won't Have.

### 6. **[Histórias de Usuário](HISTORIAS_USUARIO.md)**
   Visão do usuário com critérios de aceitação.
   - **Formato**: Gherkin (Given-When-Then).

### 7. **[Casos de Uso Principais Formais](CASOS_USO_PRINCIPAIS.md)**
   Especificação formal e exaustiva dos fluxos do sistema.
   - **Fluxos**: Caminho feliz e fluxos alternativos (exceções).

### 8. **[Rastreabilidade de Requisitos](RASTREABILIDADE_REQUISITOS_US.md)**
   Matriz que garante que cada requisito tenha uma implementação correspondente.
   - **Mapeamento**: RF ↔ US ↔ CU.

### 9. **[Padrões de Projeto](PADROES_PROJETO.md)** ✨ **NOVO**
   Documento com a inteligência de design de código.
   - **Padrões**: Repository, Strategy, State, Factory e Observer.
   - **Justificativa**: Por que cada padrão foi escolhido para o domínio hoteleiro.

### 10. **[Plano de Projeto](PLANO_PROJETO.md)** ✨ **NOVO**
   Calendário de 6 sprints com 237 story points distribuídos.
   - **Timeline**: 13 semanas (19 fev - 13 mai 2026).
   - **Distribuição**: 52 tarefas com esforço em SP/horas + responsáveis.
   - **Milestones**: 4 Entregas principais com métricas de sucesso.

### 11. **[Cronograma e Backlog](CRONOGRAMA_BACKLOG.md)** ✨ **NOVO**
   Detalhe épico-story para cada sprint com critérios de aceitação.
   - **Formato**: Histórias de Usuário completas (HU, AC, tarefas).
   - **Épicos**: 5 domínios cobertos (Quartos, Hóspedes, Reservas, Auth, DevOps).
   - **Gantt/Visualização**: Gráficos ASCII para gestão visual.

### 12. **[RACI, Templates e Dashboard](RACI_TEMPLATES_DASHBOARD.md)** ✨ **NOVO**
   Governança, templates de reunião e métricas de progresso.
   - **RACI**: Atribuição de responsabilidades por tema (13×5 matriz).
   - **Reuniões**: Daily, Planning, Review, Retrospective, Refinement.
   - **Dashboards**: Burn-down, Velocity, Health Check, Pre-release.

---

## 🎨 Paleta de Cores Rápida

| Uso | Cor | Hex |
|-----|-----|-----|
| Primária (Verde) | Verde Primário | `#00A86B` |
| Secundária (Azul) | Azul Primário | `#0066CC` |
| Erro | Vermelho | `#DD0000` |
| Sucesso | Verde Escuro | `#00AA00` |

---

## 🏗️ Resumo da Arquitetura

O sistema utiliza um **Monolito Modular** em 4 camadas, priorizando transações **ACID** para evitar problemas de concorrência em reservas. O backend é construído em **Node.js + TypeScript** e o frontend em **React**.

---

## 📋 Checklist de Documentação

- [x] Requisitos Funcionais e Não-Funcionais
- [x] Arquitetura de Camadas e Proposta Técnica
- [x] Modelos de Dados (SQL e ER)
- [x] Casos de Uso (Simples e Formais)
- [x] Histórias de Usuário (US)
- [x] Matriz de Rastreabilidade
- [x] Padrões de Projeto (Design Patterns)
- [x] **Planejamento de Projeto (6 Sprints, 237 SP)**
- [x] **Cronograma e Backlog (HUs com AC)**
- [x] **RACI, Templates e Dashboards**
- [ ] Documentação de API (Swagger)
- [ ] Guia de Instalação e Deploy

## 🏗️ Fases de Desenvolvimento

| Fase | Status | Descrição |
|------|--------|-----------|
| **1. Análise & Requisitos** | ✅ Concluído | Documentação completa, requisitos IEEE, casos de uso formais. |
| **2. Design & Arquitetura** | ✅ Concluído | Backend DDD/Clean Arch, padrões de projeto, diagramas. |
| **3. Auditoria & Refatoração** | ✅ Concluído | 10 problemas identificados e corrigidos; exceções customizadas; ID generator. |
| **4. Planejamento de Execução** | ✅ Concluído | 6 sprints, 237 SP estimados, RACI, templates de reunião. |
| **5. Desenvolvimento (Sprint 1-6)** | ⏳ Próxima | ~988 horas, code reviews, testes (70%+ cobertura). |
| **6. QA & Deployment** | ⏳ Planejado | Testes integrados, staging, produção. |

---

## 🚀 Próximos Passos

### Sprint 1 (19 fev - 4 mar 2026)
1. **Backend Repository**: Implementar `PostgresQuartoRepository` com migrações.
2. **Backend Services**: Completar validações e testes unitários.
3. **Frontend Setup**: Configurar Vite + React + ESLint com tipos strict.
4. **DevOps**: Pipeline CI/CD básico (Build + Lint + Tests).

### Fases Posteriores
- **Sprint 2-3**: Frontend CRUD, testes integrados, Auth/JWT.
- **Sprint 4-5**: API Gateway, cache Redis, otimizações de performance.
- **Sprint 6**: Testes E2E, staging, go-live, documentação operacional.

### Recursos
- **Gestor**: Consultar [PLANO_PROJETO.md](PLANO_PROJETO.md) para cronograma completo (4 milestones).
- **Dev Team**: Ver [CRONOGRAMA_BACKLOG.md](CRONOGRAMA_BACKLOG.md) para HUs e AC (story points por task).
- **Scrum Master**: Usar [RACI_TEMPLATES_DASHBOARD.md](RACI_TEMPLATES_DASHBOARD.md) (reuniões, RACI, métricas).

---

## 📊 Resumo de Esforço

| Métrica | Valor |
|---------|-------|
| **Story Points Totais** | 237 SP (6 sprints × 2 semanas) |
| **Horas Estimadas** | ~988 horas (~150 h/uma semana) |
| **Duração Total** | 13 semanas (19 fev - 13 mai 2026) |
| **Cobertura de Testes** | Meta: ≥70% (tasks, handlers, repos) |
| **Latência de API** | Alvo: <200ms (p99) |
| **Disponibilidade** | Alvo: ≥99.5% (SLA) |

## ⚠️ Gestão de Riscos

### Riscos Técnicos

1. **Falha de Integração entre Módulos**
   - *Mitigação:* Testes integrados automáticos a cada merge; revisão de contratos de interface.

2. **Baixa Cobertura de Testes**
   - *Mitigação:* Meta mínima de 70% de cobertura; PRs só aprovados com testes.

3. **Performance Insuficiente da API**
   - *Mitigação:* Monitoramento de latência; uso de cache (Redis) e profiling em endpoints críticos.

4. **Dependência de Bibliotecas Externas**
   - *Mitigação:* Documentar versões; plano de fallback para libs críticas; atualização regular.

5. **Problemas de Conexão com Banco de Dados**
   - *Mitigação:* Pool de conexões, retry automático, alertas de indisponibilidade.

6. **Erros de Deploy/CI**
   - *Mitigação:* Pipeline CI/CD com rollback automático; ambiente de staging obrigatório.

---

### Riscos Gerenciais

1. **Atraso no Cronograma**
   - *Mitigação:* Sprints curtas (2 semanas), daily standup, replanejamento rápido.

2. **Turnover de Equipe**
   - *Mitigação:* Documentação clara, onboarding ágil, code reviews colaborativos.

3. **Mudança de Escopo**
   - *Mitigação:* Controle de mudanças via backlog; aprovações do PO antes de alterar requisitos.

4. **Falta de Engajamento do Cliente**
   - *Mitigação:* Demos a cada sprint, reuniões semanais, feedback contínuo.

5. **Falta de Visibilidade do Progresso**
   - *Mitigação:* Dashboards de burn-down, reuniões de review, métricas públicas.

---

## 📝 Histórico de Versões

| Versão | Data | Alterações |
|--------|------|------------|
| 1.0 | 16/02/2026 | Documentação inicial. |
| 1.4 | 16/02/2026 | Adição de Rastreabilidade e Casos de Uso Formais. |
| 1.5 | 16/02/2026 | Inclusão de Padrões de Projeto (Design Patterns). |
| **2.0** | **16/02/2026** | **Planejamento de Execução: 6 sprints, 237 SP, RACI, templates, dashboards.** |

---

**Status**: ✅ Análise, Design e Planejamento Completos  
**Pronto para**: Sprint 1 - Desenvolvimento Backend (Coding Phase)