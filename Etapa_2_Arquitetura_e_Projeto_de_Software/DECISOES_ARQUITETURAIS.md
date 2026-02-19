# Decisões Arquiteturais Críticas - ADR (Architecture Decision Records)

**Versão**: 1.1  
**Data**: 16 de fevereiro de 2026  
**Status**: Em Efeito  

---

## 📌 Introdução

Este documento registra as principais decisões arquiteturais tomadas durante o design do **Sistema de Reserva de Hotel**. Cada decisão é documentada no formato padrão de **ADR (Architecture Decision Record)** para facilitar compreensão, história e futuras revisões.

### Por que ADRs?

- ✅ **Contexto Preservado**: Futuras decisões entendem o "por quê" original
- ✅ **Rastreabilidade**: Cada decisão tem data, autor e status
- ✅ **Revisão**: Fácil identificar quando/como uma decisão mudou
- ✅ **Onboarding**: Novos membros entendem arquitetura e racional

---

## ADR-001: Monolito Modular vs Microserviços
**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: Arquiteto Senior  
**Decisão**: Implementar Monolito Modular com 4 camadas bem definidas.

### 📋 Contexto
Expectativa de 500-1000 usuários, time pequeno (3-5 devs) e necessidade de Time to Market rápido.

### 🎯 Justificativa
Transações ACID nativas (crítico para reservas), sem latência de rede entre serviços e deploy simplificado.

---

## ADR-002: PostgreSQL como Banco de Dados Principal
**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: DBA Senior  
**Decisão**: Usar PostgreSQL 14+ como banco principal.

### 📋 Contexto
Necessidade de robustez em transações e suporte a dados semi-estruturados (JSONB) para amenidades.

---

## ADR-003: Node.js + Express + TypeScript no Backend
**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Decisão**: Implementar backend com Node.js 18+ e TypeScript.

---

## ADR-004: React/Vue como Framework Frontend
**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Decisão**: Usar React 18+ (Recomendado pela comunidade e ecossistema).

---

## ADR-005: Arquitetura em 4 Camadas
**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Decisão**: Divisão em Presentation, Business Logic, Data Access e Infrastructure.

---

## ADR-006: Autenticação com JWT
**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Decisão**: Stateless auth com JWT + Refresh Tokens em HTTP-only cookies.

---

## ADR-007: Transações ACID para Operações de Reserva
**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Decisão**: Uso de transações explícitas no banco para evitar double-booking.

---

## ADR-008: Escalabilidade Horizontal com Load Balancer
**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Decisão**: Preparar aplicação stateless para uso de Load Balancer (ALB/Nginx).

---

## ADR-009: Preparação para Evolução a Microserviços
**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Decisão**: Desenhar módulos (Quartos, Hóspedes, Reservas) como Bounded Contexts isolados.

---

## ADR-010: Cache com Redis em v1.1
**Status**: ⏳ PROPOSED  
**Data**: 16 de fevereiro de 2026  
**Decisão**: Adicionar Redis para cache de disponibilidade e session store.

---

## ADR-011: Seleção de Design Patterns para Lógica de Negócio
**Status**: ✅ ACCEPTED  
**Data**: 16 de fevereiro de 2026  
**Revisor**: Tech Lead  
**Afeta**: Camada de Business Logic e Data Access

### 📋 Contexto
A complexidade das regras de reserva (preços variados, status de quartos e criação de objetos compostos) exige padrões que evitem o acoplamento e facilitem testes unitários.

### ✅ Decisão
Adotar os seguintes padrões:
1. **Repository**: Isolar acesso ao banco.
2. **Strategy**: Para cálculos de preços e descontos.
3. **State**: Para gerenciar transições de status de Quartos e Reservas.
4. **Factory**: Para criação de Quartos e suas respectivas Camas.
5. **Observer**: Para disparar ações pós-reserva (e-mails, logs).

### 🎯 Justificativa
Garante que a lógica de negócio seja agnóstica ao banco de dados e permite expansão de regras de preços sem modificar o core do sistema.

### 📊 Impacto
- Complexidade: Médio (exige maior número de classes).
- Manutenibilidade: Alto (código mais limpo e modular).

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
| **011** | Design Patterns | ✅ ACCEPTED | Médio | v1.0 |

---

**Versão**: 1.1  
**Data**: 16 de fevereiro de 2026  
**Status**: ✅ Decisões Documentadas e Atualizadas