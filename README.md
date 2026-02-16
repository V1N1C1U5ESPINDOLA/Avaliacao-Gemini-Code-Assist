# Sistema de Reserva de Hotel 🏨

**Status**: ✅ Documentação Completa com Diagramas UML - Pronta para Sprint Planning

**Data**: 16 de fevereiro de 2026  
**Versão**: 1.7  

---

## 📋 Visão Geral

Sistema web para gerenciamento de reservas de um único hotel, desenvolvido com arquitetura modular em camadas, permitindo escalabilidade futura e fácil manutenção.

**Domínio**: Um sistema de reserva para um único hotel com módulos de gestão de quartos, hóspedes, reservas e dashboard.

---

## 📁 Documentação Disponível

Esta documentação está organizada em 11 documentos na pasta `/docs/REQUISITOS/`:

### 1. ✅ [REQUISITOS_SISTEMA_HOTELEIRO.md](docs/REQUISITOS/REQUISITOS_SISTEMA_HOTELEIRO.md)
Especificação inicial do sistema com requisitos funcionais básicos, módulos principais e regras de negócio introdutórias.

**Conteúdo**:
- Visão geral do sistema
- Módulos principais (3)
- 21 requisitos iniciais
- Matriz de rastreabilidade

---

### 2. ✅ [ARQUITETURA_E_DESIGN.md](docs/REQUISITOS/ARQUITETURA_E_DESIGN.md)
Diretrizes arquiteturais, design visual, componentes e estrutura técnica inicial.

**Conteúdo**:
- Arquitetura em 4 camadas (apresentação, lógica, dados, infraestrutura)
- Paleta de cores: Verde primário `#00A86B`, Azul primário `#0066CC`
- Componentes modernos e intuitivos
- Responsividade para mobile, tablet e desktop
- Estrutura de pastas recomendada

---

### 3. ✅ [MODELOS_DADOS.md](docs/REQUISITOS/MODELOS_DADOS.md)
Definição de modelos de dados, schema SQL, índices e constraints.

**Conteúdo**:
- Diagrama ER das 4 tabelas principais
- Scripts SQL completos (CREATE TABLE)
- Índices para otimização
- Relacionamentos (Foreign Keys)
- Constraints de validação
- Seed de dados de exemplo

**Tabelas**:
- `HOSPEDE`: id, nome, sobrenome, cpf (UNIQUE), email, data_criacao
- `QUARTO`: id, numero (UNIQUE), capacidade, tipo, preco_diaria, amenidades, disponibilidade
- `CAMA`: id, quarto_id (FK), tipo
- `RESERVA`: id, quarto_id (FK), hospede_id (FK), data_entrada, data_saida, status, valor_total

---

### 4. ✅ [CASOS_USO_REGRAS_NEGOCIO.md](docs/REQUISITOS/CASOS_USO_REGRAS_NEGOCIO.md)
Casos de uso iniciais e 24 regras de negócio (RN) que governam o sistema.

**Conteúdo**:
- 6 casos de uso iniciais (UC 1.1 a 1.6)
- 24 regras de negócio (RN001-RN024) cobrindo:
  - Disponibilidade de quartos
  - Validações de datas
  - Cálculo de preços
  - Estados de reserva
  - Políticas de cancelamento
  - Regras de limpeza

---

### 5. ✅ [REQUISITOS_RF_RNF_MOSCOW.md](docs/REQUISITOS/REQUISITOS_RF_RNF_MOSCOW.md)
Classificação completa de todos os requisitos usando MoSCoW (Must/Should/Could/Won't).

**Conteúdo**:
- **71 Requisitos Funcionais (RF)** classificados em 4 prioridades
  - 21 Must Have
  - 20 Should Have
  - 20 Could Have
  - 10 Won't Have

- **62 Requisitos Não-Funcionais (RNF)** classificados em 4 prioridades
  - 15 Must Have (Performance, Segurança, Disponibilidade)
  - 15 Should Have (UX aprimorada, integrações)
  - 16 Could Have (futuro)
  - 16 Won't Have

---

### 6. ✅ [HISTORIAS_USUARIO.md](docs/REQUISITOS/HISTORIAS_USUARIO.md)
18 histórias de usuário em formato padrão com critérios de aceitação em Gherkin.

**Conteúdo**:
- 18 User Stories (US-001 a US-018)
- 89 story points distribuídos
- 85+ critérios de aceitação em formato Given-When-Then
- Prioridades: 10 críticas (48 pt), 6 altas (28 pt), 2 baixas (13 pt)

**Módulos**:
- 6 US de Gestão de Quartos
- 4 US de Gestão de Hóspedes
- 6 US de Gestão de Reservas
- 2 US de Dashboard/Relatórios

---

### 7. ✅ [CASOS_USO_PRINCIPAIS.md](docs/REQUISITOS/CASOS_USO_PRINCIPAIS.md) **NOVO**
9 casos de uso formais com pré-condições, pós-condições, fluxo principal e fluxos alternativos.

**Conteúdo**:
- CU-001: Cadastrar Novo Quarto
- CU-002: Editar Informações Quarto
- CU-003: Visualizar Disponibilidade
- CU-004: Cadastrar Novo Hóspede
- CU-005: Criar Reserva
- CU-006: Modificar Reserva
- CU-007: Cancelar Reserva
- CU-008: Executar Check-in
- CU-009: Gerar Relatórios

Cada use case inclui:
- Atores envolvidos
- Pré-condições
- Pós-condições
- Fluxo principal (13-15 passos)
- 2-5 fluxos alternativos por CU

---

### 8. ✅ [RASTREABILIDADE_REQUISITOS_US.md](docs/REQUISITOS/RASTREABILIDADE_REQUISITOS_US.md) **NOVO**
Matriz de rastreabilidade bidirecional conectando Requisitos ↔ Histórias ↔ Casos de Uso.

**Conteúdo**:
- RF→US mapeamento para 4 módulos
- US→RF verificação de cobertura
- Métricas de cobertura:
  - RF Covered: 54/71 (76%)
  - RNF Covered: 62/62 (100%)
  - US com RF: 18/18 (100%)
  - CU Mapped: 9/9 (100%)
- Análise de lacunas
- Checklist de validação

---

### 9. ✅ [ARQUITETURA_PROPOSTA.md](docs/REQUISITOS/ARQUITETURA_PROPOSTA.md) **NOVO**
Análise de alternativas arquiteturais e recomendação de arquitetura com justificativas.

**Conteúdo**:
- **3 Alternativas avaliadas**:
  1. Monolito Tradicional (simples mas rígido)
  2. Microserviços Completos (escalável mas complexo)
  3. ⭐ **Monolito Modular** (recomendado)

- **Arquitetura em 4 Camadas**:
  1. Camada de Apresentação (Frontend Web)
  2. Camada de API REST
  3. Camada de Lógica de Negócio (Services)
  4. Camada de Acesso a Dados (Repositories)
  5. Camada de Infraestrutura (BD, Cache, Logging)

- **Justificativas**:
  - ✅ Desempenho excelente (sem latência de rede)
  - ✅ Escalabilidade boa para v1 (até 10k usuários)
  - ✅ Manutenção simples com separação clara
  - ✅ Deployment rápido (minutos)
  - ✅ Adequado para time pequeno (3-5 devs)

- **Stack Recomendado**:
  - Frontend: React/Vue + Material UI
  - Backend: Node.js + Express + TypeScript
  - Database: PostgreSQL 14+
  - Cache: Redis (v1.1)
  - Deployment: AWS/Azure/GCP com Docker

- **Roadmap Evolutivo**:
  - v1.0: Monolito Modular (MVP)
  - v1.1: + Cache Redis
  - v2.0: + Workers assíncronos
  - v3.0: Microserviços (se escala > 100k usuários/dia)

- **Padrões Arquiteturais**: MVC, Repository, Service Locator, Middleware, DTO, Error Handling

- **DRs (Architecture Decision Records)**: Documentadas decisões arquiteturais

- **Performance**: Objetivos e otimizações (índices BD, paginação, compressão, lazy loading)

- **Segurança**: JWT, RBAC, HTTPS, validação dupla (frontend+backend), SQL injection prevention

- **Resiliência**: Load balancing, health checks, auto scaling, circuit breaker, disaster recovery

- **Observabilidade**: Logs estruturados, métricas, tracing distribuído, dashboards críticos

---

### 10. ✅ [DECISOES_ARQUITETURAIS.md](docs/REQUISITOS/DECISOES_ARQUITETURAIS.md) **NOVO**
Documentação formal de decisões arquiteturais críticas usando o padrão ADR (Architecture Decision Records).

**Conteúdo**:
- **Formato ADR padrão** com contexto, decisão, justificativa, consequências
- **10 Decisões Documentadas**:
  1. ADR-001: Monolito Modular vs Microserviços
  2. ADR-002: PostgreSQL como BD principal
  3. ADR-003: Node.js + Express + TypeScript
  4. ADR-004: React/Vue como framework frontend
  5. ADR-005: Arquitetura em 4 camadas
  6. ADR-006: Autenticação com JWT
  7. ADR-007: Transações ACID para reservas
  8. ADR-008: Escalabilidade horizontal (Load Balancer)
  9. ADR-009: Preparação para evolução a Microserviços
  10. ADR-010: Cache Redis (v1.1)

- **Cada ADR inclui**:
  - Status (ACCEPTED, PROPOSED, DEPRECATED, SUPERSEDED)
  - Contexto e problema
  - Alternativas consideradas
  - Justificativa com tabelas comparativas
  - Consequências (vantagens, desvantagens, pontos de atenção)
  - Impacto (desempenho, escalabilidade, complexidade, custo)
  - Próximos passos

- **Tabela Resumida**: Visão rápida de todas as decisões
- **Processo de Revogação**: Como mudar um ADR se necessário
- **Referências**: Links para C4 Model, 12 Factor App, etc.

**Propósito**: Preservar a história da arquitetura e facilitar decisões futuras.

---

### 11. ✅ [DIAGRAMAS_COMPONENTES_CLASSES.md](docs/REQUISITOS/DIAGRAMAS_COMPONENTES_CLASSES.md) **NOVO**
Diagramas técnicos de componentes, classes e relacionamentos com notação UML e Mermaid.

**Conteúdo**:
- **Diagrama de Componentes** (5 camadas):
  1. Frontend Web (React/Vue)
  2. Camada API (Express.js)
  3. Camada Lógica de Negócio (Services)
  4. Camada Acesso a Dados (Repositories)
  5. Infraestrutura (PostgreSQL, Redis, Logging)

- **Diagrama de Classes Completo** (UML Mermaid):
  - **Hospede**: id, nome, sobrenome, cpf (UNIQUE), email, métodos CRUD
  - **Quarto**: id, numero, capacidade, tipo, preco_diaria, disponibilidade, amenidades, métodos negócio
  - **Cama**: id, quarto_id (FK), tipo (SOLTEIRO, QUEEN, KING)
  - **Reserva**: id, quarto_id (FK), hospede_id (FK), datas, status, valor_total, métodos ACID
  - **Enums**: QuartoTipo, StatusReserva, TipoCama, StatusDisponibilidade, RoleUsuario

- **Tabelas e Campos Detalhados**:
  - DDL completo para cada entidade
  - Índices e constraints
  - Foreign keys com ON DELETE rules
  - Validações (UNIQUE, CHECK, DEFAULT)

- **Métodos das Classes Principais**:
  - `Hospede.validarCPF()`, `Hospede.criar()`, `Hospede.obterPorCPF()`
  - `Quarto.validarNumeroUnico()`, `Quarto.obterDisponibilidade()`, `Quarto.calcularPreco()`
  - `Reserva.criar()` (com ACID), `Reserva.detectarConflito()`, `Reserva.cancelar()`, `Reserva.marcarCheckIn/Out()`
  - `Cama.criar()`, `Cama.obterTipo()`

- **Diagramas de Sequência** (Mermaid):
  - Fluxo: Criar Reserva (CU-005)
    - Validação → Detecção conflito → Cálculo preço → INSERT com COMMIT
  - Fluxo: Cancelar Reserva (CU-007)
    - UPDATE reserva status + UPDATE quarto status LIVRE + COMMIT

- **Diagrama ER (Entity Relationship)**:
  - Hospede 1:M Reserva
  - Quarto 1:M Cama
  - Quarto 1:M Reserva
  - Multiplicidades e cardinalidades

- **Diagrama de Camadas Detalhado**:
  - Cada camada listada com componentes específicos
  - Fluxo de dados entre camadas
  - Exemplos de endpoints GET/POST/PUT/DELETE
  - Middleware na camada API

- **Arquitetura de Load Balancer** (v1.1+):
  - Distribuição de tráfego
  - Múltiplas instâncias Node.js
  - Compartilhamento de PostgreSQL
  - Replicação master-slave

- **Pipeline CI/CD**:
  - GitHub Actions workflow
  - Lint → Unit Tests → Build → Integration Tests → Docker
  - Staging environment com smoke tests
  - Production com blue-green deployment e auto-rollback

**Propósito**: Proporcionar visão clara da arquitetura para desenvolvedores começarem implementação.

---

## 📊 Indicadores de Qualidade

### Cobertura de Requisitos
- ✅ Requisitos Funcionais Cobertos: 54/71 (76%)
- ✅ Requisitos Não-Funcionais Cobertos: 62/62 (100%)
- ✅ Histórias com RF: 18/18 (100%)
- ✅ Casos de Uso Mapeados: 9/9 (100%)

### Distribuição de Story Points
- Críticas (10): 48 pontos
- Altas (6): 28 pontos
- Baixas (2): 13 pontos
- **Total**: 89 pontos (≈ 4-5 sprints de 2 semanas)

### Requisitos Must-Have (v1.0 MVP)
- ✅ 21 Requisitos Funcionais Must Have
- ✅ 15 Requisitos Não-Funcionais Must Have
- ✅ **36 Requisitos Críticos**: 100% mapeados e testáveis

---

## 🎯 Roadmap do Projeto

### **v1.0** (MVP) - Mês 1
- ✅ Gestão de quartos (CRUD)
- ✅ Gestão de hóspedes (CRUD)
- ✅ Criação de reservas (com validações)
- ✅ Dashboard simples
- **Usuários**: até 500 simultâneos
- **Deploy**: Single instance (AWS t3.small)

### **v1.1** (Otimizações) - Mês 2
- 🔲 Cache Redis
- 🔲 Relatórios avançados
- 🔲 Email notifications
- 🔲 CDN para assets
- **Usuários**: até 5k simultâneos

### **v2.0** (Escala)
- 🔲 Workers assíncronos
- 🔲 Message Queue
- 🔲 Mobile app
- 🔲 Integrações (payment, SMS)
- **Usuários**: até 10k simultâneos

### **v3.0** (Microserviços) - IF Needed
- 🔲 Separar por domínio (Quartos, Hóspedes, Reservas, Relatórios)
- 🔲 Kubernetes
- 🔲 Service Mesh
- **Usuários**: 100k+ simultâneos
- **Condição**: Escala justificar complexidade

---

## 👥 Stakeholders

### **Gerente de Hotel**
- Gerencia quartos (adicionar, editar, remover)
- Visualiza todos os dados
- Gera relatórios
- Acessa dashboard com indicadores

### **Recepcionista**
- Cria reservas (criar, editar, cancelar)
- Faz check-in/check-out
- Visualiza quartos disponíveis
- Atende hóspedes

### **Gerente de Limpeza**
- Visualiza status de quartos
- Marca quarto como limpo (futuro)

---

## 🏗️ Estrutura de Pastas Recomendada

```
projeto-hotel/
├── backend/
│   ├── src/
│   │   ├── api/controllers, routes, validators
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── database/migrations, seeds
│   │   ├── config/
│   │   ├── utils/
│   │   └── app.ts
│   ├── tests/unit, integration
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/api.ts
│   │   ├── store/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── tests/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── REQUISITOS/ (esta pasta)
│   ├── API.md (OpenAPI/Swagger)
│   └── DEPLOYMENT.md
│
└── .github/workflows/ (CI/CD)
```

---

## 🛠️ Tech Stack

### Frontend
- React 18+ ou Vue 3+
- TypeScript
- Material-UI ou Bootstrap 5
- Vite ou Webpack
- Jest + React Testing Library

### Backend
- Node.js 18+
- Express 4.x
- TypeScript
- PostgreSQL 14+
- Sequelize / TypeORM / Prisma
- Jest para testes

### DevOps
- Docker
- Docker Compose
- GitHub Actions / GitLab CI
- AWS (RDS, EC2, S3, CloudWatch)

---

## ✅ Checklist de Desenvolvimento

### Pré-Projeto
- [ ] Configurar repositório Git
- [ ] Setup de ambiente (Node, BD local)
- [ ] Configurar CI/CD
- [ ] Padrões de código (ESLint, Prettier)

### Sprint 1
- [ ] Setup do projeto backend + frontend
- [ ] Autenticação (JWT)
- [ ] CU-004: Cadastrar Hóspede
- [ ] CU-001: Cadastrar Quarto
- [ ] Testes unitários (≥80% cobertura)

### Sprint 2
- [ ] CU-005: Criar Reserva (lógica principal)
- [ ] CU-003: Visualizar Disponibilidade
- [ ] Validações de regras de negócio
- [ ] Testes de integração

### Sprint 3
- [ ] CU-006/CU-007: Editar/Cancelar Reserva
- [ ] CU-008: Check-in/Check-out
- [ ] Dashboard básico
- [ ] Relatórios simples

### Sprint 4+
- [ ] CU-009: Relatórios avançados
- [ ] Performance tuning
- [ ] Deploy em staging
- [ ] UAT e correções

---

## 📈 Métricas de Sucesso

| Métrica | Target | Aceitável |
|---------|--------|-----------|
| Cobertura de Testes | ≥ 80% | ≥ 70% |
| API Response Time | < 200ms | < 500ms |
| Disponibilidade | ≥ 99.5% | ≥ 99% |
| Time to Deploy | < 5 min | < 15 min |
| Bugs em Produção | < 1/semana | < 3/semana |

---

## 📞 Contato & Suporte

**Dúvidas sobre a arquitetura?**  
Consulte [ARQUITETURA_PROPOSTA.md](docs/REQUISITOS/ARQUITETURA_PROPOSTA.md)

**Dúvidas sobre requisitos?**  
Consulte [REQUISITOS_RF_RNF_MOSCOW.md](docs/REQUISITOS/REQUISITOS_RF_RNF_MOSCOW.md)

**Dúvidas sobre implementação?**  
Consulte [CASOS_USO_PRINCIPAIS.md](docs/REQUISITOS/CASOS_USO_PRINCIPAIS.md)

---

## 📝 Histórico de Versões

| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0 | 2026-02-16 | Especificação inicial, requisitos básicos |
| 1.1 | 2026-02-16 | RF/RNF com MoSCoW, 71 RF + 62 RNF |
| 1.2 | 2026-02-16 | Histórias de usuário (18 US, 89 pt) |
| 1.3 | 2026-02-16 | Casos de uso formais (9 CU com fluxos) |
| 1.4 | 2026-02-16 | Matriz de rastreabilidade requisitos↔US↔CU |
| 1.5 | 2026-02-16 | Arquitetura proposta com roadmap evolutivo |
| 1.6 | 2026-02-16 | Decisões arquiteturais críticas (ADR - 10 decisões) |
| 1.7 | 2026-02-16 | Diagramas de componentes e classes (UML + Mermaid) |

---

## 📄 Licença

Propriedade do projeto. Não distribuir sem permissão.

---

**Última atualização**: 16 de fevereiro de 2026  
**Status**: ✅ Documentação Completa com Diagramas UML - Pronta para Sprint Planning  
**Próximo passo**: Iniciar desenvolvimento com base em Sprint 1
