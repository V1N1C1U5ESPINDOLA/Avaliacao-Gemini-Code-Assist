# Sistema de Reserva de Hotel - Arquitetura Proposta

## 1. Introdução

Este documento propõe a arquitetura do sistema de reserva de hotel, analisando diferentes abordagens e justificando a escolha com base em **desempenho**, **escalabilidade** e **manutenção**.

---

## 2. Análise de Alternativas Arquiteturais

### 2.1 Opção 1: Monolito Tradicional (Tightly-Coupled)

```
┌─────────────────────────────────┐
│   Frontend (Single App)         │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│   Backend Monolítico            │
│ ┌──────────────────────────────┐│
│ │ Quartos                       ││
│ │ Hóspedes                      ││
│ │ Reservas                      ││
│ │ Relatórios                    ││
│ │ Autenticação                  ││
│ │ Validações                    ││
│ └──────────────────────────────┘│
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│   Banco de Dados (Único)        │
└─────────────────────────────────┘
```

**Vantagens**:
- ✅ Simples de implementar no início
- ✅ Debugging direto
- ✅ Deployment único
- ✅ Menor overhead de rede
- ✅ Transações ACID nativas

**Desvantagens**:
- ❌ Difícil escalar partes específicas
- ❌ Acoplamento alto
- ❌ Difícil de manter conforme cresce
- ❌ Deploy afeta toda aplicação
- ❌ Ponto único de falha

**Escalabilidade**: Limitada (horizontal exige replicação completa)  
**Manutenção**: Baixa inicialmente, aumenta exponencialmente  
**Desempenho**: Bom até ~100 usuários simultâneos  

---

### 2.2 Opção 2: Microserviços Completos

```
┌──────────────────────────────────────────────────────┐
│              API Gateway                              │
└─────────────────┬──────────────────────────────────┘
     ┌────────────┼────────────┬────────────┐
     ▼            ▼            ▼            ▼
┌──────────┐┌──────────┐┌──────────┐┌──────────┐
│Quartos   ││Hóspedes  ││Reservas  ││Relatórios│
│Service   ││Service   ││Service   ││Service   │
└─┬────────┘└─┬────────┘└─┬────────┘└─┬────────┘
  │           │           │           │
  └───┬───────┴───┬───────┴───┬───────┘
      ▼           ▼           ▼
   DB-Q       DB-H        DB-R
```

**Vantagens**:
- ✅ Alta escalabilidade
- ✅ Baixo acoplamento
- ✅ Deploy independente
- ✅ Equipes podem trabalhar independentemente

**Desvantagens**:
- ❌ Complexidade operacional (orquestração, monitoring)
- ❌ Latência de rede
- ❌ Transações distribuídas difíceis
- ❌ Debugging complexo
- ❌ Múltiplos bancos = inconsistência
- ❌ Muito overhead para sistema pequeno

**Escalabilidade**: Excelente  
**Manutenção**: Muito complexa (requer DevOps experiente)  
**Desempenho**: Bom com infra adequada, mas latência de rede  
**Para este projeto**: ❌ **Prematura** (over-engineering)

---

### 2.3 Opção 3: Monolito Modular (RECOMENDADO) ⭐

```
┌─────────────────────────────────────────────────────┐
│         Aplicação Frontend Web                       │
│  (React/Vue + Material UI, cores verde/azul)        │
└─────────────────┬───────────────────────────────────┘
                  │ HTTP(S)
┌─────────────────▼───────────────────────────────────┐
│              API REST (Monolítica)                   │
├─────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────┐│
│ │        Camada de Apresentação (REST)             ││
│ │  /api/quartos, /api/hospedes, /api/reservas     ││
│ └──────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────┐│
│ │     Middleware (Auth, Validação, Logging)       ││
│ └──────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────┐│
│ │      Camada de Lógica de Negócio (Services)     ││
│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ ││
│ │ │QuartoService ││ │HospedeService││ReservaServ││
│ │ └──────────────┘ └──────────────┘ └──────────┘ ││
│ └──────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────┐│
│ │    Camada de Acesso a Dados (Repositories)      ││
│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ ││
│ │ │QuartoRepo    ││ │HospedeRepo   ││ReservaRepo││
│ │ └──────────────┘ └──────────────┘ └──────────┘ ││
│ └──────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────┐│
│ │        Camada de Infraestrutura                  ││
│ │ ┌──────────────────────────────────────────────┐││
│ │ │  Banco de Dados (PostgreSQL/MySQL)           │││
│ │ │  Cache (Redis opcional)                       │││
│ │ │  Logging e Monitoramento                      │││
│ │ └──────────────────────────────────────────────┘││
│ └──────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

**Vantagens**:
- ✅ Simplicidade (entender um monolito é mais fácil)
- ✅ Transações ACID nativas
- ✅ Debugging direto
- ✅ Deployment único e rápido
- ✅ Desempenho previsível
- ✅ Requer menos infraestrutura
- ✅ Escalável para v1.0 (até 1000 usuários)
- ✅ **Modular**: Fácil evoluir para microserviços

**Desvantagens**:
- ⚠️ Escalabilidade horizontal limitada (mas suficiente para v1)
- ⚠️ Deploy afeta todo sistema (mas rápido)
- ⚠️ Requer disciplina em separação de modules

**Escalabilidade**: Boa (até ~10k usuários com load balancer)  
**Manutenção**: Excelente (clara separação de responsabilidades)  
**Desempenho**: Excelente (sem latência de rede)  
**Para este projeto**: ✅ **IDEAL**

---

## 3. Recomendação: Monolito Modular em Camadas

### 3.1 Decisão

**✅ Opção Recomendada: Monolito Modular com 4 Camadas**

```
v1.0: Monolito Modular (Este projeto)
  ↓ (Quando houver necessidade)
v2.0: Monolito com Cache e Fila
  ↓ (Se tráfego aumentar > 10k usuários/dia)
v3.0+: Microserviços Parciais (Relatórios, Pagamentos)
```

### 3.2 Justificativa

| Critério | Monolito | Razão |
|----------|----------|-------|
| **Desempenho** | ✅✅✅ | Sem latência de rede, transações nativas |
| **Escalabilidade** | ✅✅ | Load balancer suficiente para v1/v2 |
| **Manutenção** | ✅✅✅ | Código organizado em módulos claros |
| **Time** | ✅✅✅ | Não precisa de experiência em DevOps |
| **Custo** | ✅✅✅ | Uma aplicação, uma infra, um banco |
| **Tempo implantação** | ✅✅✅ | Deploy em minutos, não horas |

---

## 4. Arquitetura em Camadas Detalhada

### 4.1 Estrutura em 4 Camadas

```
┌──────────────────────────────────────────────────────────────┐
│                   CAMADA DE APRESENTAÇÃO                      │
│  Frontend: React/Vue/Angular + Bootstrap/Material UI          │
│  Cores: Verde (#00A86B) e Azul (#0066CC)                     │
│  Responsivo: Mobile, Tablet, Desktop                         │
└────────────────────┬─────────────────────────────────────────┘
                     │ HTTP(S) / JSON
┌────────────────────▼─────────────────────────────────────────┐
│              CAMADA DE APRESENTAÇÃO DE API                    │
│  Controllers REST: QuartoController, HospedeController, etc  │
│  Request validation, Response serialization                  │
│  Autenticação, Autorização                                   │
│  Rate limiting, CORS                                         │
└────────────────────┬─────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────┐
│            CAMADA DE LÓGICA DE NEGÓCIO                        │
│  Services/Use Cases:                                         │
│  - QuartoService (cadastro, edição, listagem)               │
│  - HospedeService (crud hóspedes)                           │
│  - ReservaService (criar, editar, cancelar reservas)        │
│  - RelatorioService (gerar relatórios)                      │
│  - ValidacaoService (regras de negócio)                     │
│  Orquestração, cálculos, regras                             │
└────────────────────┬─────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────┐
│          CAMADA DE ACESSO A DADOS                             │
│  Repositories/DAOs:                                          │
│  - QuartoRepository                                          │
│  - HospedeRepository                                         │
│  - ReservaRepository                                         │
│  - CamaRepository                                            │
│  Query builders, migrations, indexação                       │
└────────────────────┬─────────────────────────────────────────┘
                     │ SQL / ORM
┌────────────────────▼─────────────────────────────────────────┐
│              CAMADA DE INFRAESTRUTURA                         │
│  Banco de Dados: PostgreSQL / MySQL                          │
│  Cache: Redis (opcional em v1)                              │
│  Message Queue: RabbitMQ (opcional em v1)                   │
│  Storage: S3 ou local (para fotos)                          │
│  Logging: ELK Stack ou Sentry                               │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Organização de Pastas (Backend)

```
src/
├── api/
│   ├── controllers/
│   │   ├── QuartoController.ts
│   │   ├── HospedeController.ts
│   │   ├── ReservaController.ts
│   │   └── RelatorioController.ts
│   ├── routes/
│   │   ├── quartos.ts
│   │   ├── hospedes.ts
│   │   └── reservas.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   ├── errorHandler.ts
│   │   └── corsHandler.ts
│   └── validators/
│       ├── QuartoValidator.ts
│       ├── HospedeValidator.ts
│       └── ReservaValidator.ts
│
├── services/
│   ├── QuartoService.ts
│   ├── HospedeService.ts
│   ├── ReservaService.ts
│   ├── RelatorioService.ts
│   └── ValidationService.ts
│
├── repositories/
│   ├── QuartoRepository.ts
│   ├── HospedeRepository.ts
│   ├── ReservaRepository.ts
│   └── CamaRepository.ts
│
├── models/
│   ├── Quarto.ts
│   ├── Hospede.ts
│   ├── Reserva.ts
│   └── Cama.ts
│
├── database/
│   ├── connections.ts
│   ├── migrations/
│   │   ├── 001_create_hospede.ts
│   │   ├── 002_create_quarto.ts
│   │   ├── 003_create_cama.ts
│   │   └── 004_create_reserva.ts
│   ├── seeds/
│   │   └── seed.ts
│   └── indexes.ts
│
├── config/
│   ├── database.ts
│   ├── server.ts
│   └── environment.ts
│
├── utils/
│   ├── logger.ts
│   ├── error.ts
│   ├── formatter.ts
│   └── validators.ts
│
├── types/
│   ├── interfaces.ts
│   └── enums.ts
│
└── app.ts (main entry point)

tests/
├── unit/
│   ├── services/
│   └── repositories/
├── integration/
│   ├── api/
│   └── services/
└── fixtures/

package.json
tsconfig.json
```

---

## 5. Componentes Principais

### 5.1 Frontend

```
Framework: React 18+ ou Vue 3+
UI Library: Material-UI ou Bootstrap 5
State Management: Redux / Vuex
HTTP Client: Axios / Fetch
Styling: CSS-in-JS ou SCSS
Build: Vite ou Webpack
Testing: Jest + React Testing Library
```

**Estrutura**:
```
frontend/
├── src/
│   ├── components/
│   │   ├── quartos/
│   │   ├── hospedes/
│   │   ├── reservas/
│   │   └── common/
│   ├── pages/
│   ├── services/
│   │   └── api.ts
│   ├── store/
│   ├── hooks/
│   ├── styles/
│   └── App.tsx
├── public/
└── tests/
```

### 5.2 Backend (Node.js/Express)

```
Runtime: Node.js 18+
Framework: Express.js 4.x
Language: TypeScript
Database: PostgreSQL 14+ / MySQL 8+
ORM: Sequelize / TypeORM / Prisma
Validation: Joi / Yup
Logging: Winston / Pino
Testing: Jest
```

### 5.3 Banco de Dados

```
Tipo: Relacional (PostgreSQL recomendado)
Versão: 14+
Tabelas: 4 (HOSPEDE, QUARTO, CAMA, RESERVA)
Índices: 10+ para performance
Connection Pool: HikariCP (Java) ou pg (Node.js)
Backups: Diários + ponto-a-tempo
Replicação: Primária-réplica (opcional em prod)
```

---

## 6. Fluxo de Requisição Completo

### 6.1 Exemplo: Criar Reserva

```
1. FRONTEND
   User clica "Confirmar Reserva"
   ↓
2. API CALL
   POST /api/reservas
   Body: { quarto_id, hospede_id, data_entrada, data_saida }
   Headers: { Authorization: Bearer <token> }
   ↓
3. CONTROLLER (QuartoController)
   ReservaController.criar()
   ├─ Valida token (middleware auth)
   ├─ Valida payload (middleware validation)
   └─ Passa para service
   ↓
4. SERVICE (Camada de Negócio)
   ReservaService.criarReserva()
   ├─ Valida datas (data_entrada < data_saída)
   ├─ Verifica se quarto está LIVRE
   ├─ Verifica conflito de datas
   ├─ Calcula valor_total
   ├─ Valida regras de negócio (RN014-024)
   └─ Inicia transação
   ↓
5. REPOSITORY (Acesso a Dados)
   ReservaRepository.criar()
   ├─ INSERT em RESERVA (status ATIVA)
   ├─ UPDATE em QUARTO (status OCUPADO)
   └─ COMMIT da transação
   ↓
6. DATABASE
   PostgreSQL recebe queries
   ├─ Executa INSERT
   ├─ Executa UPDATE
   ├─ Se erro → ROLLBACK
   └─ Se sucesso → COMMIT
   ↓
7. RESPONSE
   ReservaRepository retorna objeto criado
   ↓
8. SERVICE
   ReservaService formata resposta
   ↓
9. CONTROLLER
   ReservaController serializa JSON
   ↓
10. API RESPONSE
    HTTP 201 Created
    Body: { id: 123, quarto_id, hospede_id, ..., status: "ATIVA" }
    ↓
11. FRONTEND
    Exibe mensagem: "Reserva criada com sucesso!"
    Atualiza lista de reservas (refetch)
```

---

## 7. Padrões Arquiteturais Aplicados

### 7.1 Padrões Utilizados

| Padrão | Uso | Benefício |
|--------|-----|----------|
| **MVC** | Separação controllers/services/models | Legibilidade, testabilidade |
| **Repository** | Abstração de acesso a dados | Troca fácil de BD, testabilidade |
| **Service Locator** | Injeção de dependências | Acoplamento reduzido |
| **Middleware** | Processamento centralizado | Reutilização de lógica cross-cutting |
| **DTO** | Transferência de dados | Validação, segurança |
| **Error Handling** | Try-catch com tipos customizados | Tratamento consistente |
| **Transactions** | ACID em operações críticas | Data integrity |

### 7.2 Exemplo: Implementação em Node.js/TypeScript

```typescript
// Controller
@Post('/reservas')
@UseGuards(AuthGuard)
async criarReserva(@Body() criarReservaDto: CriarReservaDto) {
  return this.reservaService.criarReserva(criarReservaDto);
}

// Service (Lógica de Negócio)
async criarReserva(dto: CriarReservaDto) {
  // Validações
  await this.validar(dto);
  
  // Transação
  const transaction = await this.db.transaction();
  try {
    // Inserir reserva
    const reserva = await this.reservaRepo.criar(dto, transaction);
    
    // Atualizar status quarto
    await this.quartoRepo.atualizar(
      { id: dto.quarto_id },
      { disponibilidade: 'OCUPADO' },
      transaction
    );
    
    await transaction.commit();
    return reserva;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

// Repository (Acesso a Dados)
async criar(dto: CriarReservaDto, transaction?) {
  return this.db.reservas.create({
    quarto_id: dto.quarto_id,
    hospede_id: dto.hospede_id,
    data_entrada: dto.data_entrada,
    data_saida: dto.data_saida,
    status: 'ATIVA',
    valor_total: this.calcularValor(dto),
  }, { transaction });
}
```

---

## 8. Infraestrutura e Deployment

### 8.1 Stack de Infraestrutura para v1.0

```
┌──────────────────────────────────────────────────────┐
│  Cloud Provider: AWS / Azure / GCP / Digital Ocean   │
└────┬─────────────────────────────────────────────────┘
     │
     ├─ Servidor Web (1-2 instâncias EC2 / App Service)
     │  ├─ Node.js App (Express)
     │  ├─ Load Balancer (ALB)
     │  └─ Auto Scaling (2-4 instâncias)
     │
     ├─ Banco de Dados
     │  ├─ PostgreSQL 14+ RDS/Azure Database
     │  ├─ Backup automático (diário)
     │  ├─ Multi-AZ replication (produção)
     │  └─ Monitoring e alertas
     │
     ├─ Cache (opcional v1.1)
     │  └─ Redis ElastiCache
     │
     ├─ Storage (para fotos)
     │  └─ S3 / Azure Blob Storage
     │
     └─ Observabilidade
        ├─ Logging: ELK Stack ou CloudWatch
        ├─ Monitoring: Prometheus/Grafana
        ├─ Alertas: PagerDuty
        └─ Error Tracking: Sentry
```

### 8.2 Deployment Pipeline

```
Developer
  ↓ git push
GitHub / GitLab
  ↓ Push webhook
CI/CD Pipeline (GitHub Actions / GitLab CI)
  ├─ Lint
  ├─ Unit Tests
  ├─ Build Docker Image
  ├─ Integration Tests
  └─ Push to Registry
  ↓
Staging Environment
  ├─ Deploy
  ├─ Smoke Tests
  ├─ Performance Tests
  └─ Manual QA
  ↓
Production Environment
  ├─ Blue-Green Deployment
  ├─ Health Checks
  ├─ Monitoring
  └─ Rollback automático se falhar
```

### 8.3 Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist
COPY src ./src

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node healthcheck.js

CMD ["node", "dist/app.js"]
```

---

## 9. Escalabilidade e Evolução

### 9.1 Escalabilidade Horizontal

```
v1.0 (Atual)
──────────
Max Users: ~500 simultâneos
Instâncias: 1-2
Setup: Simple

v1.1 (COM Cache)
──────────────────
Max Users: ~5k simultâneos
Instâncias: 2-4
Cache: Redis
Setup: Médio

v2.0 (COM Fila)
────────────────
Max Users: ~10k simultâneos
Instâncias: 4-8
Cache: Redis + Memcached
Fila: RabbitMQ / Redis
Setup: Médio-Alto

v3.0+ (Microserviços)
──────────────────────
Max Users: 100k+ simultâneos
Instâncias: 20+
Services: 5-10 independentes
Orquestração: Kubernetes
Setup: Complexo
```

### 9.2 Plano de Escalabilidade (Futuro)

```
Quando atingir 5k usuários/dia:
├─ Adicionar cache Redis
├─ Implementar paginação melhorada
├─ Adicionar índices no BD
└─ Replicação de BD

Quando atingir 50k usuários/dia:
├─ Separar relatórios em worker assíncrono
├─ CDN para assets estáticos
├─ Sharding de BD (se necessário)
└─ Message queue para operações longas

Quando atingir 500k usuários/dia:
├─ Microserviços para cada domínio
├─ CQRS para leitura/escrita
├─ Event Sourcing
├─ Kubernetes para orquestração
└─ Arquitetura serverless para picos
```

### 9.3 Evolução Arquitetural

```
v1.0: Monolito Simples
└─ 1 aplicação Node.js
└─ 1 banco de dados

v1.5: Monolito com Cache
├─ Aplicação Node.js
├─ PostgreSQL
└─ Redis para cache

v2.0: Monolito com Workers
├─ Aplicação Node.js (API)
├─ PostgreSQL
├─ Redis
└─ Worker (para relatórios/email) [OPCIONAL]

v3.0: Serviços Separados (APENAS SE NECESSÁRIO)
├─ API Gateway
├─ Service 1: Quartos
├─ Service 2: Hóspedes
├─ Service 3: Reservas
├─ Service 4: Relatórios
├─ 1 BD Compartilhado (inicialmente) OU 2-3 BDs
└─ Kubernetes para orquestração
```

---

## 10. Performance e Otimizações

### 10.1 Estratégias de Performance (v1.0)

```
Banco de Dados
├─ Índices: criados em colunas de busca
│  └─ PRIMARY KEY, FOREIGN KEY, queries frequentes
├─ Prepared Statements: prevenir SQL injection
├─ Connection Pooling: máx 20 conexões
├─ Query Optimization: EXPLAIN ANALYZE
└─ Particionamento: Reservas por ano (futuro)

Backend
├─ Compressão: gzip para respostas > 1KB
├─ ETag: cache de respostas idênticas
├─ Paginação: 50 itens por página
├─ Lazy Loading: carregar dados conforme necessário
└─ Rate Limiting: 100 req/min por IP

Frontend
├─ Code Splitting: lazy load de componentes
├─ Bundle Size: minificação e tree-shaking
├─ Image Optimization: WebP com fallback
├─ Service Worker: cache offline (futuro)
└─ CDN: assets estáticos
```

### 10.2 Objetivos de Performance (v1.0)

```
Métrica                 | Target   | Aceitável
─────────────────────────────────────────────────────
Time to First Byte      | < 100ms  | < 200ms
First Contentful Paint  | < 1s     | < 2s
Largest Contentful Paint| < 2.5s   | < 4s
API Response Time       | < 200ms  | < 500ms
Database Query          | < 50ms   | < 100ms
P95 Latency             | < 300ms  | < 500ms
Uptime                  | > 99.5%  | > 99%
```

---

## 11. Segurança

### 11.1 Práticas de Segurança

```
Autenticação
├─ JWT com refresh tokens
├─ HTTP-only cookies para sessão
└─ Logout com token blacklist

Autorização
├─ Role-based access control (RBAC)
├─ Gerente e Recepcionista vs público
└─ Validação em todos endpoints

Criptografia
├─ HTTPS obrigatório (TLS 1.3+)
├─ Senhas: bcrypt com salt
└─ Dados sensíveis: AES-256

Validação
├─ Input validation em todos endpoints
├─ SQL injection prevention (Prepared Statements)
├─ XSS prevention (sanitização)
└─ CSRF protection (tokens)

Monitoramento
├─ Logging de todas ações
├─ Detecção de atividades suspeitas
├─ Alertas para múltiplas tentativas de login
└─ Audit trail de mudanças
```

---

## 12. Resiliência e Alta Disponibilidade

### 12.1 Estratégias de HA

```
Application
├─ Load Balancing: distribuir tráfego
├─ Health Checks: verificar saúde das instâncias
├─ Auto Scaling: aumentar/diminuir conforme demanda
├─ Circuit Breaker: parar requisições se serviço cai
└─ Graceful Shutdown: aguardar requisições finalizarem

Database
├─ Replicação: master-slave
├─ Backups: automáticos com retenção
├─ Point-in-time recovery: possível restaurar qualquer momento
├─ Connection Pooling: evitar sobrecarga
└─ Monitoring: alertas de espaço em disco

Network
├─ CDN: distribuição geográfica de conteúdo
├─ DNS: múltiplos servidores
├─ Failover automático: trocar servidor se cair
└─ Rate Limiting: proteção contra DDoS
```

### 12.2 Disaster Recovery

```
RTO (Recovery Time Objective): < 1 hora
RPO (Recovery Point Objective): < 15 minutos

┌─────────────────────────────────────────┐
│  Backup Automático (diário)             │
│  Armazenado em: Cloud Storage            │
│  Retenção: 30 dias                      │
│  Teste: mensal                          │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│  Réplica em Segundo Datacenter (Prod)  │
│  Sincronização: contínua                │
│  Failover: automático se principal cai │
└─────────────────────────────────────────┘
```

---

## 13. Monitoramento e Observabilidade

### 13.1 Pilares da Observabilidade

```
Logs
├─ Estruturados (JSON)
├─ Agregados em ELK Stack / Datadog
├─ Searchable com filtros
└─ Retenção: 30 dias

Métricas
├─ Prometheu s para coleta
├─ Grafana para visualização
├─ Alertas baseado em thresholds
└─ Custom metrics para negócio

Traces
├─ Distributed tracing com Jaeger
├─ Rastreabilidade fim-a-fim
├─ Análise de gargalos
└─ Latência por serviço
```

### 13.2 Dashboard Críticos

```
1. Application Health
   ├─ Requisições por segundo
   ├─ Taxa de erro
   ├─ P95 latency
   └─ Disponibilidade

2. Database Health
   ├─ Queries lentas
   ├─ Conexões ativas
   ├─ Espaço em disco
   └─ Replicação lag

3. Business Metrics
   ├─ Reservas por hora
   ├─ Taxa de sucesso de reservas
   ├─ Quartos disponíveis
   └─ Receita
```

---

## 14. Decisões Arquiteturais Documentadas

### 14.1 ADR (Architecture Decision Records)

```
ADR-001: Monolito Modular vs Microserviços
Status: ACCEPTED
Decision: Monolito modular para v1.0
Rationale: Simplicidade, transações ACID, time pequeno
Consequences: Escalabilidade horizontal limitada (OK para v1)
Reviewed: 2026-02-16

ADR-002: PostgreSQL vs MySQL
Status: ACCEPTED
Decision: PostgreSQL
Rationale: JSONB, extensibilidade, performance
Consequences: Menos desenvolvedor MySQL conhecem

ADR-003: Node.js + Express vs Python/Django
Status: ACCEPTED
Decision: Node.js (TypeScript) + Express
Rationale: Async I/O, ecosystem, type safety com TS
Consequences: Requer conhecimento de async/promises

ADR-004: React Frontend vs Vue
Status: ACCEPTED
Decision: React (ou Vue a escolha do time)
Rationale: Maior comunidade, ferramentas maduras
```

---

## 15. Comparação Final: Por que Monolito Modular?

### 15.1 Tabela Comparativa

| Aspecto | Monolito | Microserviços |
|---------|----------|---------------|
| **Complexidade** | Baixa ✅ | Alta ❌ |
| **Desempenho** | Excelente ✅ | Bom (com latência) ⚠️ |
| **Escalabilidade** | Boa ✅ | Excelente ✅ |
| **Manutenção Inicial** | Fácil ✅ | Difícil ❌ |
| **Debug** | Simples ✅ | Complexo ❌ |
| **Deploy** | Rápido (minutos) ✅ | Lento (horas) ⚠️ |
| **Custo Infra** | Baixo ✅ | Alto ❌ |
| **Para time de 3-5** | Ideal ✅ | Overkill ❌ |
| **Para 500 usuários** | Suficiente ✅ | Excessivo ❌ |
| **Evolução para MS** | Fácil (modular) ✅ | - |

**Conclusão**: Monolito modular é a melhor escolha para v1.0, com possibilidade de evolução futura.

---

## 16. Roadmap Arquitetural

### 16.1 Timeline

```
Fevereiro 2026
└─ v1.0: Monolito Modular (MVP)
   ├─ Deploy no AWS t3.small
   └─ PostgreSQL RDS

Maio 2026
└─ v1.1: Otimizações
   ├─ Redis cache
   ├─ CDN para assets
   └─ Monitoring avançado

Agosto 2026
└─ v1.5: Mais funcionalidades
   ├─ Relatórios em background
   ├─ Email notifications
   └─ Mobile app (nativo ou React Native)

Novembro 2026
└─ v2.0: Escala
   ├─ Múltiplas instâncias
   ├─ Load balancing automático
   │ └─ Se tráfego crescer > 5k usuarios/dia
   └─ Message queue para operações async

2027+
└─ v3.0: Microserviços (APENAS SE JUSTIFICADO)
   ├─ Se atingir escala > 100k usuários/dia
   ├─ Separar: Quartos, Hóspedes, Reservas, Relatórios
   └─ Kubernetes + Service Mesh
```

---

## 17. Checklist de Implementação

### Antes de Começar

```
[ ] Configurar repositório Git com CI/CD
[ ] Configurar ambiente de desenvolvimento
[ ] Configurar banco de dados local
[ ] Setup de logging e monitoramento
[ ] Definir padrões de código (ESLint, Prettier)
[ ] Setup de testes (Jest, Supertest)
[ ] Documentar API com Swagger/OpenAPI
[ ] Configurar HTTPS/TLS
[ ] Backup strategy
[ ] Alertas e monitoramento
```

---

## 18. Conclusão

### ✅ Recomendação Final

**Implementar Monolito Modular em 4 Camadas com Node.js/TypeScript + PostgreSQL**

**Benefícios**:
- ✅ Simples de entender e manter
- ✅ Desempenho excelente para escala atual
- ✅ Transações ACID nativas
- ✅ Deployment rápido
- ✅ Fácil evolução para microserviços (se necessário)
- ✅ Adequado para time pequeno (3-5 devs)

**Próximo Passo**: Iniciar com estrutura modular, documentar decisões, configurar CI/CD.

---

**Versão**: 1.0  
**Data**: 16 de fevereiro de 2026  
**Autor**: Arquitetura de Software  
**Status**: Recomendação Aprovada ✅
