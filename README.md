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
- [x] **Padrões de Projeto (Design Patterns)**
- [ ] Documentação de API (Swagger)
- [ ] Guia de Instalação e Deploy

---

## 🚀 Próximos Passos

1. **Definição de API**: Criar o contrato de endpoints (Swagger/OpenAPI).
2. **Boilerplate**: Iniciar a estrutura de pastas conforme `ARQUITETURA_E_DESIGN.md`.
3. **Sprint 1**: Iniciar o desenvolvimento do módulo de Gestão de Quartos.

---

## 📝 Histórico de Versões

| Versão | Data | Alterações |
|--------|------|------------|
| 1.0 | 16/02/2026 | Documentação inicial. |
| 1.4 | 16/02/2026 | Adição de Rastreabilidade e Casos de Uso Formais. |
| 1.5 | 16/02/2026 | Inclusão de Padrões de Projeto (Design Patterns). |

---

**Status**: ✅ Documentação Técnica Consolidada  
**Pronto para**: Início do Desenvolvimento (Coding Phase)