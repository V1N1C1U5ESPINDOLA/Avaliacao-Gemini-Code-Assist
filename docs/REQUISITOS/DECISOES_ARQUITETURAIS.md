# Decisões Arquiteturais Críticas - ADR (Architecture Decision Records)

**Versão**: 1.0  
**Data**: 16 de fevereiro de 2026  
**Status**: Em Efeito  

---

## 📌 Introdução

Este documento registra as principales decisões arquiteturais tomadas durante o design do **Sistema de Reserva de Hotel**. Cada decisão é documentada no formato padrão de **ADR (Architecture Decision Record)** para facilitar compreensão, história e futuras revisões.

### Por que ADRs?

- ✅ **Contexto Preservado**: Futuras decisões entendem o "por quê" original
- ✅ **Rastreabilidade**: Cada decisão tem data, autor e status
- ✅ **Revisão**: Fácil identificar quando/como uma decisão mudou
- ✅ **Onboarding**: Novos membros entendem arquitetura e racional
- ✅ **Discussão**: Baseado em fatos, não julgamentos

### Template ADR

```
## [TÍTULO]
**Status**: [PROPOSED | ACCEPTED | DEPRECATED | SUPERSEDED BY ADR-XXX]
**Decisão**: [Descrição curta da decisão]
**Data**: [Data de decisão]
**Revisor**: [Quem aprovou]
**Afeta**: [Componentes/módulos afetados]

### 📋 Contexto
[Explique o problema, contexto, alternativas consideradas]

### ✅ Decisão
[Qual foi a decisão tomada?]

### 🎯 Justificativa
[Por quê essa decisão? Traços comparativos]

### ⚠️ Consequências
- ✅ Vantagens
- ❌ Desvantagens
- ⚠️ Pontos de atenção

### 🔄 Alternativas Rejeitadas
[Por que não fazer de outro jeito?]

### 📊 Impacto
- Desempenho: [Alto/Médio/Baixo]
- Escalabilidade: [Alto/Médio/Baixo]
- Complexidade: [Alto/Médio/Baixo]
- Custo: [Alto/Médio/Baixo]

### 🚀 Próximos Passos
[O que fazer agora?]
```

---

## ADR-001: Monolito Modular vs Microserviços

**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: Arquiteto Senior  
**Afeta**: Toda arquitetura, deploy, infraestrutura  

### 📋 Contexto

O sistema será implantado para um único hotel com expectativa inicial de:
- 500-1000 usuários simultâneos em v1.0
- Time de 3-5 desenvolvedores
- Orçamento limitado de infraestrutura
- Necessidade de TTM (Time to Market) rápido

**Alternativas Consideradas**:
1. **Monolito Tradicional** (tightly-coupled): Simples mas inflexível
2. **Microserviços Completos**: Escalável mas complexo demais
3. **Monolito Modular** (recomendado): Melhor compromisso

### ✅ Decisão

**Implementar Monolito Modular com 4 camadas bem definidas e preparação para evolução a microserviços.**

### 🎯 Justificativa

| Aspecto | Monolito | Microserviços |
|---------|----------|---------------|
| **TTM** | 🟢 4 semanas | 🔴 12 semanas |
| **Complexidade Operacional** | 🟢 Baixa | 🔴 Alta |
| **Desempenho (v1)** | 🟢 Excelente | 🟡 Bom |
| **Escalabilidade (v1)** | 🟢 Suficiente | 🟢 Excelente |
| **Debug** | 🟢 Simples | 🔴 Complexo |
| **Custo Infra** | 🟢 Baixo | 🔴 Alto |
| **Para time pequeno** | 🟢 Ideal | 🔴 Overkill |

**Vencedor**: Monolito Modular

### ⚠️ Consequências

**✅ Vantagens**:
- Transações ACID nativas (crítico para reservas)
- Sem latência de rede entre camadas
- Debugging direto e stack traces completos
- Deployment único e rápido (< 5 minutos)
- Requer apenas 1 instância + DB (vs 10+ serviços)
- Time pequeno consegue trabalhar sozinha

**❌ Desvantagens**:
- Escalabilidade horizontal limitada (até ~10k usuários)
- Deploy afeta todo sistema (mas rápido)
- Requer disciplina em separação de módulos
- Possível problema de versionalização se crescer

**⚠️ Pontos de Atenção**:
- Manter modularidade desde o início (não deixar virar "bola de lama")
- Usar dependency injection para desacoplamento
- Documentar fronteiras entre módulos
- Planejar evolução a microsserviços (se/quando necessário)

### 🔄 Alternativas Rejeitadas

**Por que não Microserviços desde o início?**
- ❌ Complexidade desnecessária para 500 usuários
- ❌ Exigiria 2-3 DevOps (time tem 5 devs totais)
- ❌ Adiciona 2-3 meses ao TTM
- ❌ Overhead de rede, latência, consistência distribuída
- ❌ Muitas ferramentas (service mesh, monitoring, orquestração)

### 📊 Impacto

- **Desempenho**: Alto ✅ (sem latência inter-serviços)
- **Escalabilidade**: Médio ⚠️ (suficiente para v1-v2, limitado em v3)
- **Complexidade**: Baixo ✅ (fácil de entender)
- **Custo**: Baixo ✅ (menos servidores, menos ferramentas)

### 🚀 Próximos Passos

1. ✅ Definir 4 camadas claras
2. ✅ Documentar interfaces entre camadas
3. ✅ Usar padrão Repository para acesso a dados
4. ✅ Preparar estrutura modular para futura separação
5. 🔲 Em v2.0: considerar extrair relatórios em worker assíncrono
6. 🔲 Em v3.0+: migrar a microserviços se escala o justificar

---

## ADR-002: PostgreSQL como Banco de Dados Principal

**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: DBA Senior  
**Afeta**: Camada de dados, infraestrutura, backup  

### 📋 Contexto

Sistema necessita:
- Transações ACID robustas (crítico para reservas)
- Backup e point-in-time recovery
- Escalabilidade (até 10k usuários)
- Suporte a JSON (para amenidades, configurações)
- Licença open-source (custo baixo)

**Alternativas**:
1. PostgreSQL 14+ ⭐ (recomendado)
2. MySQL 8+ (bom, menos features)
3. SQLite (apenas desenvolvimento)
4. MongoDB (sem transações ACID)

### ✅ Decisão

**Usar PostgreSQL 14+ como banco principal. MySQL 8+ como fallback aceitável.**

### 🎯 Justificativa

| Característica | PostgreSQL | MySQL 8 |
|------------------|-----------|---------|
| **ACID Transactions** | 🟢 Nativa | 🟢 Nativa |
| **JSON Support** | 🟢 JSONB | 🟡 JSON |
| **Window Functions** | 🟢 Sim | 🟡 Sim (8.0+) |
| **CTE (WITH)** | 🟢 Sim | 🟡 Não |
| **Extensões** | 🟢 Muitas | 🔴 Poucas |
| **Full-text Search** | 🟢 Nativo | 🔴 Limitado |
| **Replicação** | 🟢 Streaming | 🟡 Binary log |
| **Performance** | 🟢 Excelente | 🟢 Excelente |
| **Open Source** | 🟢 Verdadeiro | 🟢 Verdadeiro |

**Vencedor**: PostgreSQL (por JSONB + funcionalidades)

### ⚠️ Consequências

**✅ Vantagens**:
- JSONB permite flexibilidade (amenidades, configurações como JSON)
- Window functions para relatórios avançados
- CTEs (Common Table Expressions) para queries complexas
- Excelente suporte a índices (B-tree, GiST, GIN)
- Replicação streaming para HA
- Community grande e ativa
- Gratuito e open-source

**❌ Desvantagens**:
- Ligeiramente mais "peso" que MySQL
- Menos desenvolvedores MySQL conhecem (mas tempo de aprendizado baixo)
- Configuração inicial pode ser mais complexa

**⚠️ Pontos de Atenção**:
- Manter statistícas atualizadas (ANALYZE)
- Monitorar slow queries (log_min_duration_statement)
- Backups diários com point-in-time recovery
- Configurar replicação em produção (master-slave)

### 🔄 Alternativas Rejeitadas

**Por que não MySQL?**
- ⚠️ MySQL é bom, mas PostgreSQL é melhor para relatórios
- ⚠️ JSONB do PostgreSQL é mais robusto

**Por que não MongoDB?**
- ❌ Sem transações ACID nativas (crítico para reservas)
- ❌ Inconsistência possível em falhas

### 📊 Impacto

- **Desempenho**: Alto ✅ (índices otimizados)
- **Escalabilidade**: Alto ✅ (até 100k TPS com hardware adequado)
- **Complexidade**: Médio ⚠️ (mais features que MySQL)
- **Custo**: Baixo ✅ (open-source)

### 🚀 Próximos Passos

1. ✅ Instalar PostgreSQL 14+ em DevEnv
2. ✅ Criar migrations com Flyway/Migrate/Knex
3. ✅ Definir índices estratégicos (quarto_id, data_entrada, status)
4. ✅ Configurar backups diários
5. 🔲 Em produção: Setup de replicação master-slave
6. 🔲 Em v2.0: Considerar particionamento temporal (reservas por ano)

---

## ADR-003: Node.js + Express + TypeScript no Backend

**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: Tech Lead  
**Afeta**: Backend, desenvolvedor learning curve, deployment  

### 📋 Contexto

Backend precisa de:
- Async I/O nativo (múltiplas requisições simultâneas)
- Type safety (reduzir bugs em produção)
- Rápido desenvolvimento (prototipagem)
- Comunidade grande
- Escalável verticalmente

**Alternativas**:
1. **Node.js + TypeScript** ⭐ (recomendado)
2. Python + FastAPI/Django (robust, ML-friendly)
3. .NET / C# (enterprise, robusto)
4. Go (performático, mas diferente curva aprendizado)
5. Java Spring (pesado para time pequeno)

### ✅ Decisão

**Implementar backend com Node.js 18+ + Express 4.x + TypeScript.**

### 🎯 Justificativa

| Aspecto | Node.js | Python | .NET | Go |
|---------|---------|--------|------|-----|
| **Async Default** | 🟢 Nativo | 🟡 asyncio | 🟡 Async | 🟢 Goroutines |
| **TTM** | 🟢 Rápido | 🟢 Rápido | 🔴 Lento | 🟡 Médio |
| **Type Safety** | 🟡 TS | 🔴 Duck typing | 🟢 Forte | 🟡 Médio |
| **Learning Curve** | 🟡 Médio | 🟢 Baixa | 🔴 Alta | 🔴 Alta |
| **Community** | 🟢 Enorme | 🟢 Enorme | 🟢 Grande | 🟡 Crescente |
| **Performance** | 🟡 Bom | 🔴 Lento | 🟢 Excelente | 🟢 Excelente |
| **Deployment** | 🟢 Fácil | 🟡 Médio | 🔴 Complexo | 🟢 Simples |

**Vencedor**: Node.js (melhor balanço para este projeto)

### ⚠️ Consequências

**✅ Vantagens**:
- Async I/O nativo (perfeito para I/O como BD, APIs externas)
- TypeScript elimina 40% dos bugs comuns (null/undefined, tipos)
- NPM ecosystem enorme (express, prisma, joi, etc)
- Desenvolvimento rápido (hot reload, prototyping)
- Fácil deployment (um binário Node.js)
- Performance adequada para 10k usuários
- Frontend + Backend mesma linguagem (JavaScript/TypeScript)

**❌ Desvantagens**:
- Menos robusto que C# / Python para computação pesada
- Curva aprendizado de Async/Promises/Callbacks
- Menos maturo que Django/FastAPI para ORM complex
- Single-threaded (mas com worker threads para CPU-intensive)

**⚠️ Pontos de Atenção**:
- Memory leaks possível (com callbacks não gerenciados)
- Requer entendimento de Promises/async-await
- Dependency management pode ficar complexo (npm dependency hell)
- Monitoramento de event loop latency

### 🔄 Alternativas Rejeitadas

**Por que não Python?**
- Python é excelente, mas:
  - ❌ Sem type safety nativo (MyPy é extra)
  - ❌ GIL limita CPU parallelism
  - ⚠️ Deployment mais complexo (containers recomendados)

**Por que não .NET?**
- .NET é robusto, mas:
  - ❌ Curva aprendizado mais alta
  - ❌ Setup inicial mais complexo
  - ❌ TTM mais longo

**Por que não Go?**
- Go é performático, mas:
  - ❌ Curva aprendizado alta para web
  - ❌ Menos bibliotecas prontas para CRUD
  - ⚠️ Compilação necessária

### 📊 Impacto

- **Desempenho**: Médio ⚠️ (suficiente para 10k usuários)
- **Escalabilidade**: Médio ⚠️ (horizontal com load balancer)
- **Complexidade**: Médio ⚠️ (TypeScript + async)
- **Custo**: Baixo ✅ (open-source)

### 🚀 Próximos Passos

1. ✅ Setup Node.js 18+ + npm/yarn
2. ✅ Inicializar projeto Express + TypeScript
3. ✅ Configurar tsconfig.json (strict mode ON)
4. ✅ Setup ESLint + Prettier
5. ✅ Configurar Jest para testes
6. ✅ ORM: Escolher entre Prisma/TypeORM/Sequelize
7. 🔲 Setup de monitoring (node --prof para profiling)

---

## ADR-004: React/Vue como Framework Frontend

**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: Tech Lead  
**Afeta**: Frontend, UI/UX, desenvolvedor  

### 📋 Contexto

Frontend precisa de:
- Interface responsiva (mobile, tablet, desktop)
- Components reutilizáveis
- State management
- Performance < 2s First Contentful Paint
- Developer experience ótima

**Alternativas**:
1. **React 18+** ⭐ (maior comunidade)
2. **Vue 3+** ⭐ (mais fácil de aprender)
3. Angular 15+ (mais robusto, mais pesado)
4. Svelte (inovador, menor comunidade)

### ✅ Decisão

**Usar React 18+ OU Vue 3+ (decisão do time). React recomendado por comunidade maior.**

### 🎯 Justificativa

| Aspecto | React | Vue | Angular |
|---------|-------|-----|---------|
| **Learning Curve** | 🟡 Médio | 🟢 Baixa | 🔴 Alta |
| **Community** | 🟢 Maior | 🟡 Médio | 🟡 Médio |
| **Job Market** | 🟢 Maior | 🟡 Crescente | 🟡 Estável |
| **Performance** | 🟢 Excelente | 🟢 Excelente | 🟡 Bom |
| **Bundle Size** | 🟡 40KB | 🟢 30KB | 🔴 120KB |
| **Developer Experience** | 🟡 JSX | 🟢 Template | 🟡 RxJS |
| **Mobile (React Native)** | 🟢 Sim | 🟡 Não oficial | 🔴 Não |

**Recomendação**: React (mas Vue é aceitável)

### ⚠️ Consequências

**✅ React**:
- ✅ Comunidade maior (stackoverflow, libraries)
- ✅ React Native para mobile futura
- ✅ Melhor tooling (Next.js, Vite)
- ✅ Job market maior
- ⚠️ JSX requer entendimento

**✅ Vue**:
- ✅ Mais fácil de aprender (single-file components)
- ✅ Menor bundle size
- ✅ Template syntax mais intuitiva
- ⚠️ Comunidade menor
- ⚠️ Sem equivalente a React Native

### 🔄 Alternativas Rejeitadas

**Por que não Angular?**
- Angular é robusto, mas:
  - ❌ Bundle size maior (120KB+ vs 40KB React)
  - ❌ Curva aprendizado muito alta (RxJS, decorators)
  - ❌ Overkill para admin dashboard

### 📊 Impacto

- **Desempenho**: Alto ✅
- **Escalabilidade**: Alto ✅ (components reutilizáveis)
- **Complexidade**: Médio ⚠️ (depende React vs Vue)
- **Custo**: Baixo ✅

### 🚀 Próximos Passos

1. ✅ Decidir: React ou Vue (recomendado React)
2. ✅ Setup com Create React App ou Vite
3. ✅ Material-UI ou Bootstrap 5
4. ✅ Redux ou Context API para state
5. ✅ Axios para HTTP calls
6. ✅ Jest + React Testing Library
7. 🔲 V2.0: Considerar React Native para mobile app

---

## ADR-005: Arquitetura em 4 Camadas

**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: Arquiteto  
**Afeta**: Código, testes, documentação  

### 📋 Contexto

Código monolítico precisa de:
- Separação clara de responsabilidades
- Testabilidade (unit, integration)
- Manutenibilidade (fácil entender fluxo)
- Evolução futura a microserviços (se necessário)

**Arquiteturas Consideradas**:
1. **4 Camadas** (Presentation → Business Logic → Data Access → Infrastructure) ⭐
2. Hexagonal (ports & adapters)
3. CQRS (command-query separation)
4. Layered tradicional (tightly-coupled)

### ✅ Decisão

**Implementar arquitetura em 4 camadas bem definidas com dependency injection.**

### 🎯 Justificativa

```
┌──────────────────────┐
│  Controllers/Routes  │  Camada 1: Apresentação
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  Services            │  Camada 2: Lógica de Negócio
│  (Business Logic)    │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  Repositories        │  Camada 3: Acesso a dados
│  (DAL)               │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  Database / Cache    │  Camada 4: Infraestrutura
│  (PostgreSQL, Redis) │
└──────────────────────┘
```

**Vantagens**:
- ✅ Separação clara (cada camada tem responsabilidade)
- ✅ Testável (mockar cada camada)
- ✅ Agnóstica de framework
- ✅ Fácil evoluir a CQRS ou microserviços
- ✅ Novos devs entendem rapidamente

### ⚠️ Consequências

**✅ Vantagens**:
- Controllers não conhecem BD (abstração)
- Services não conhecem HTTP (agnóstico)
- Repositories isolam queries SQL
- Fácil trocar BD sem afetar services
- Injeção de dependência reduz acoplamento

**❌ Desvantagens**:
- Mais arquivos/pastas (vs monolito clássico)
- Pode parecer "overkill" para CRUD simples
- Requer disciplina (não é forçada pela linguagem)

### 🔄 Alternativas Rejeitadas

**Por que não CQRS desde início?**
- ❌ Adiciona complexidade desnecessária
- ❌ Importante quando leitura ≠ escrita (v2.0+)
- ✅ Fácil migrar de 4 Camadas para CQRS

### 📊 Impacto

- **Desempenho**: Alto ✅ (sem overhead extra)
- **Escalabilidade**: Médio ⚠️ (preparado para evoluir)
- **Complexidade**: Médio ⚠️ (mais estrutura)
- **Custo**: Baixo ✅ (sem ferramentas extras)

### 🚀 Próximos Passos

1. ✅ Definir estrutura de pastas (api/, services/, repositories/, models/)
2. ✅ Implementar base classes (BaseRepository, BaseService)
3. ✅ Setup de dependency injection (InversifyJS ou manual)
4. ✅ Documentar fluxo entre camadas
5. ✅ Testes: mocking em cada camada
6. 🔲 V3.0: Migrar a microserviços se necessário

---

## ADR-006: Autenticação com JWT

**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: Security Officer  
**Afeta**: Auth, security, API  

### 📋 Contexto

Sistema precisa:
- Autenticar usuários (Gerente, Recepcionista, Admin)
- Autorizar ações (role-based)
- Stateless (escalável horizontalmente)
- Segura contra XSS, CSRF, token theft

**Alternativas**:
1. **JWT + Refresh Tokens** ⭐ (recomendado)
2. Session-based (server-side state)
3. OAuth 2.0 (se integrações externas)

### ✅ Decisão

**Usar JWT para acesso (curta vida, ~15min) + Refresh tokens (longa vida, ~7 dias) com HTTP-only cookies.**

### 🎯 Justificativa

| Aspecto | JWT | Session |
|---------|-----|---------|
| **Scalability** | 🟢 Stateless | 🔴 Requer sticky sessions |
| **Security** | 🟢 Com HTTPS | 🟡 CSRF risk |
| **Mobile** | 🟢 Nativo | 🔴 Cookies não ideais |
| **Complexity** | 🟡 Médio | 🟢 Simples |

**Vencedor**: JWT (por stateless + mobile)

### ⚠️ Consequências

**✅ Vantagens**:
- Stateless (sem table de sessões)
- Funciona em múltiplas instâncias (load balancer)
- Funciona em mobile (sem cookies)
- Escalável horizontalmente

**❌ Desvantagens**:
- Token revogação é complexa (blacklist necessária)
- Não pode "logout" instantâneamente
- Requer HTTPS (sem HTTPS = inseguro)
- Size maior que cookie de sessão

**⚠️ Pontos de Atenção**:
- Usar HTTP-only cookies (não localStorage, evitar XSS)
- Refresh token em storage seguro (cookis HTTP-only)
- Implementar token blacklist para logout
- HTTPS obrigatório (não HTTP)

### 🔄 Alternativas Rejeitadas

**Por que não Session-based?**
- ❌ Requer estado no servidor (hard to scale)
- ❌ CSRF vulnerability se não bem configurado
- ⚠️ Mobile requer cookies (limitação)

### 📊 Impacto

- **Desempenho**: Alto ✅
- **Escalabilidade**: Alto ✅ (stateless)
- **Complexidade**: Médio ⚠️
- **Custo**: Baixo ✅

### 🚀 Próximos Passos

1. ✅ Instalar jsonwebtoken (Node.js)
2. ✅ Criar middleware de autenticação
3. ✅ Implementar endpoints /login, /refresh, /logout
4. ✅ Refresh token em HTTP-only cookie (secure, samesite)
5. ✅ Access token em memory (se SPA) ou HTTP-only cookie (recomendado)
6. ✅ Token blacklist para logout (Redis cache)
7. 🔲 V2.0: Considerar OAuth 2.0 para integrações

---

## ADR-007: Transações ACID para Operações de Reserva

**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: DBA  
**Afeta**: Reservas, integridade dados  

### 📋 Contexto

Criar uma reserva envolve:
1. Verificar disponibilidade do quarto
2. Inserir registro de reserva
3. Atualizar status do quarto

Se falhar em meio (e.g., falha na etapa 3):
- ❌ Quarto fica vago, mas reserva foi criada (inconsistência!)

**Requisito crítico (RF-M006)**: Garantir atomicidade.

### ✅ Decisão

**Usar transações ACID explícitas para operações críticas (CRIAR_RESERVA, CANCELAR_RESERVA).**

### 🎯 Justificativa

```typescript
// SEM transação (ERRADO)
const reserva = await reservaRepo.criar(data);  // ✅
await quartoRepo.atualizar(data.quarto_id, {status: 'OCUPADO'});  // ❌ FALHA!
// Resultado: Reserva criada mas quarto não foi atualizado!

// COM transação (CORRETO)
const transaction = await db.transaction();
try {
  const reserva = await reservaRepo.criar(data, transaction);
  await quartoRepo.atualizar(data.quarto_id, {status: 'OCUPADO'}, transaction);
  await transaction.commit();
} catch (error) {
  await transaction.rollback();  // Desfaz ambas operações
  throw error;
}
```

### ⚠️ Consequências

**✅ Vantagens**:
- Consistência garantida (Atomicity)
- Double-booking impossível
- Rollback automático em erro
- Seguro contra race conditions

**❌ Desvantagens**:
- Locks no banco (pode impactar performance se não bem gerenciado)
- Deadlock possível (requer tratamento)
- Transações longas são ruins

**⚠️ Pontos de Atenção**:
- Manter transações curtas (< 1 segundo)
- Não fazer I/O externo dentro da transação (API calls)
- Tratar deadlocks com retry exponencial
- Monitorar transaction locks

### 🔄 Alternativas Rejeitadas

**Por que não sem transação?**
- ❌ Risco de inconsistência de dados
- ❌ Double-booking possível
- ❌ Regulatory risk (auditoria, conformidade)

### 📊 Impacto

- **Desempenho**: Médio ⚠️ (locks podem impactar)
- **Escalabilidade**: Médio ⚠️ (contention em escala)
- **Complexidade**: Médio ⚠️ (requer tratamento de erro)
- **Custo**: Baixo ✅

### 🚀 Próximos Passos

1. ✅ Identificar operações críticas (RESERVA, CANCELAMENTO)
2. ✅ Implementar transaction wrapper em Repository base
3. ✅ Testes: simular falhas no meio da transação
4. ✅ Monitorar transaction latency em produção
5. 🔲 V2.0: Considerar optimistic locking se muita contention

---

## ADR-008: Escalabilidade Horizontal com Load Balancer

**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: DevOps  
**Afeta**: Infraestrutura, deployment, release  

### 📋 Contexto

Previsão de crescimento:
- v1.0: 500 usuários (1 instância)
- v1.1: 5k usuários (2-4 instâncias)
- v2.0: 10k usuários (4-8 instâncias)
- v3.0+: 100k+ usuários (necessária evolução arquitetural)

Monolito modular limita a escalabilidade horizontal.

### ✅ Decisão

**Implementar aplicação stateless e preparar para load balancing horizontal.**

```
Internet
   ↓
Load Balancer (ALB / Nginx)
   ↓
┌──────────┬──────────┬──────────┐
│Instance 1│Instance 2│Instance 3│
└──────────┴──────────┴──────────┘
   ↓         ↓          ↓
   └─────────┴──────────┘
           ↓
    PostgreSQL (Compartilhado)
```

### 🎯 Justificativa

- **Stateless**: Não guardar sessão em memória de instância
- **Health Checks**: Cada instância reporta saúde
- **Auto Scaling**: Adicionar/remover instâncias conforme demanda
- **Rolling Deployment**: Zero-downtime updates

### ⚠️ Consequências

**✅ Vantagens**:
- Escalabilidade linear (adicionar mais instâncias)
- Sem single point of failure
- Upgrade sem downtime
- Distribuição de carga

**❌ Desvantagens**:
- Complexidade operacional aumenta
- Network latency entre LB e backends
- Sincronização de dados entre instâncias
- Mais monitoramento necessário

**⚠️ Pontos de Atenção**:
- Não usar memória local (cache, sessions)
- Usar Redis ou BD para estado compartilhado
- Health checks configurados
- Logs centralizados (ELK, DataDog)

### 🔄 Alternativas Rejeitadas

**Por que não vertical scaling apenas?**
- ❌ Limite de CPU/RAM por máquina
- ❌ Máquinas maiores são exponencialmente caras
- ❌ Sem alta disponibilidade (máquina cai = downtime)

### 📊 Impacto

- **Desempenho**: Médio ⚠️ (network latency)
- **Escalabilidade**: Alto ✅
- **Complexidade**: Alto 🔴 (DevOps necessário)
- **Custo**: Alto 🔴 (múltiplas instâncias)

### 🚀 Próximos Passos

1. ✅ Remover sessão de memória (migrar para DB/Redis)
2. ✅ Implementar health check endpoint
3. ✅ Setup Docker image
4. ✅ Setup Kubernetes ou ECS/auto-scaling group
5. ✅ Load balancer (ALB, Nginx, HAProxy)
6. ✅ Centralizar logs (CloudWatch, ELK)
7. 🔲 V2.0: Auto scaling based on CPU/Memory

---

## ADR-009: Preparação para Evolução a Microserviços

**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: Arquiteto  
**Afeta**: Código, testes, documentação  

### 📋 Contexto

Monolito modular é ótimo para v1-v2, mas tem limites:
- 10k usuários simultâneos (limite prático)
- Deploy afeta tudo
- Escalabilidade por domínio impossível

Futuro previsível (2027+):
- Escala > 100k usuários/dia
- Domínios independentes (Quartos, Reservas, Relatórios)
- Teams independentes

Como preparar hoje sem over-engineering?

### ✅ Decisão

**Desenhar e implementar módulos como se fossem serviços futuros (bounded contexts).**

### 🎯 Justificativa

Módulos/Serviços Futuros:
1. **Quartos Service**: Gerenciar quartos, camas, disponibilidade
2. **Hospedes Service**: Gerenciar hóspedes, dados
3. **Reservas Service**: Core business (criar, editar, cancelar)
4. **Relatorios Service**: Agregações (assíncrono, escalável)
5. **Auth Service**: Centralizado (SSO objetivo futuro)

Cada serviço:
- Tem seu próprio repository
- Comunica via interfaces claras
- Poderia ser extraído em semanas (não meses)

### ⚠️ Consequências

**✅ Vantagens**:
- Fácil extrair serviços futuros
- Reduz acoplamento hoje
- Equipes podem trabalhar independentemente
- Prototipagem de microserviços possível

**❌ Desvantagens**:
- Mais arquivos/pastas
- Comunicação inter-módulos é indireção
- Pode parecer "overkill" para v1

**⚠️ Pontos de Atenção**:
- Documentar interfaces de módulos
- Evitar importações cruzadas
- Cada módulo tem seu modelo de dados
- Event Bus para comunicação assíncrona (futura)

### 🔄 Alternativas Rejeitadas

**Por que não esperar até v3.0?**
- ❌ Refatorar código "já acoplado" é 10x mais caro
- ❌ Equipes já trabalhando com hábitos ruins
- ✅ Preparar agora custa 10% extra, economiza 90% depois

### 📊 Impacto

- **Desempenho**: Alto ✅ (sem overhead)
- **Escalabilidade**: Médio ⚠️ (preparado para evoluir)
- **Complexidade**: Médio ⚠️ (mais estrutura)
- **Custo**: Baixo ✅

### 🚀 Próximos Passos

1. ✅ Definir bounded contexts (módulos)
2. ✅ Cada módulo: seu controller, service, repository
3. ✅ Documentar interfaces entre módulos
4. ✅ Event Bus (mesmo que simples pub/sub em v1)
5. ✅ Database por módulo (mesmo schema inicialmente)
6. 🔲 V2.0: Considerar CQRS para Relatórios
7. 🔲 V3.0: Extrair serviços se escala exigir

---

## ADR-010: Cache com Redis em v1.1

**Status**: ⏳ PROPOSED (implementação em v1.1)  
**Data**: 16 de fevereiro de 2026  
**Revisor**: Tech Lead  
**Afeta**: Performance, infraestrutura  

### 📋 Contexto

v1.0 provavelmente não precisa de cache:
- 500-1000 usuários simultâneos
- PostgreSQL consegue > 1000 TPS
- Queries são simples (CRUD)

Mas v1.1 (5k usuários) vai precisar:
- Cache de quartos disponíveis (muda pouco)
- Cache de configurações (nunca muda em runtime)
- Session store distribuído (múltiplas instâncias)

### ✅ Decisão (Futuro)

**Adicionar Redis em v1.1 para cache e session store.**

```
Application (Instância 1)
├─ Cache: Redis
│  ├─ quartos_disponíveis (5min)
│  ├─ configurações (24h)
│  └─ sessions (coordenado)
└─ DB: PostgreSQL

Application (Instância 2)
├─ Cache: Redis (compartilhado)
└─ DB: PostgreSQL (compartilhado)
```

### 🎯 Justificativa

- ✅ Reduz carga no PG (< 10% latency loss)
- ✅ Distribuído (compartilhado entre instâncias)
- ✅ Fast (< 1ms latency vs 10-50ms BD)
- ✅ Fácil invalidação de cache
- ✅ Suporta pub/sub (futuro event stream)

### ⚠️ Consequências (Futuro)

**✅ Vantagens**:
- Reduz latência significamente
- Suporta sessions distribuídas
- Pub/Sub para eventos

**❌ Desvantagens**:
- Components adicional (mais lugar falhar)
- Memory management (Redis pode ficar cheio)
- Inconsistência possível (stale cache)

**⚠️ Pontos de Atenção**:
- TTL apropriado para cada tipo de dado
- Invalidação de cache (listeners)
- Monitoramento de Redis memory

### 📊 Impacto (Futuro)

- **Desempenho**: Alto ✅ (reduz latência 10x)
- **Escalabilidade**: Alto ✅
- **Complexidade**: Médio ⚠️
- **Custo**: Médio ⚠️ (Redis instância)

### 🚀 Próximos Passos (v1.1)

1. 🔲 Setup Redis (local dev, ElastiCache em prod)
2. 🔲 Cache wrapper (abstração sobre Redis)
3. 🔲 Identificar dados cacheable (quartos, configurações)
4. 🔲 Implementar cache invalidation
5. 🔲 Testes: verificar comportamento stale-while-revalidate

---

## 📊 Tabela Resumida de ADRs

| ADR | Decisão | Status | Impacto Desempenho | Implementação |
|-----|---------|--------|-------------------|-----------------|
| **001** | Monolito Modular | ✅ ACCEPTED | Alto | v1.0 |
| **002** | PostgreSQL | ✅ ACCEPTED | Alto | v1.0 |
| **003** | Node.js + TS | ✅ ACCEPTED | Médio | v1.0 |
| **004** | React/Vue | ✅ ACCEPTED | Alto | v1.0 |
| **005** | 4 Camadas | ✅ ACCEPTED | Médio | v1.0 |
| **006** | JWT Stateless | ✅ ACCEPTED | Alto | v1.0 |
| **007** | ACID Transactions | ✅ ACCEPTED | Médio | v1.0 |
| **008** | Load Balancing | ✅ ACCEPTED | Médio | v1.1 |
| **009** | Prep Microserviços | ✅ ACCEPTED | Baixo | v1.0 |
| **010** | Redis Cache | ⏳ PROPOSED | Alto | v1.1 |

---

## 🔄 Processo de Revogação/Mudança de ADR

Se uma ADR precisar ser revogada ou modificada:

1. **Submeter proposta** de mudança com justificativa
2. **Revisar com tech lead** e arquiteto
3. **Documentar** como: `SUPERSEDED BY ADR-XXX`
4. **Atualizar** arquitetura e código
5. **Comunicar** ao time em primeira oportunidade

Exemplo:
```
ADR-002 (PostgreSQL): ✅ ACCEPTED
Potencialmente SUPERSEDED BY: ADR-002b (Sharding temporal)
Data: 2027-Q1 (se escala > 1TB dados)
```

---

## 📚 Referências

- **C4 Model**: www.c4model.com
- **Architecture Decision Records**: adr.github.io
- **12 Factor App**: www.12factor.net
- **System Design**: www.designgurus.io

---

**Versão**: 1.0  
**Data**: 16 de fevereiro de 2026  
**Status**: ✅ Decisões Documentadas - Prontas para Implementação  
**Próximo**: Começar v1.0 com base nestas decisões
