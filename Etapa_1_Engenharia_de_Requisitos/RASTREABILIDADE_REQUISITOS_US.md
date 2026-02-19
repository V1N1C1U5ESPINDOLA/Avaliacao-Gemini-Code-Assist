# Sistema de Reserva de Hotel - Matriz de Rastreabilidade

## 1. Introdução

Este documento estabelece a ligação entre **Requisitos**, **Histórias de Usuário** e **Casos de Uso**, garantindo que:

- ✅ Todos os requisitos estejam cobertos por histórias de usuário
- ✅ Todas as histórias de usuário rastreiem requisitos
- ✅ Não existam requisitos órfãos (sem história)
- ✅ Implementação atenda completamente aos requisitos

---

## 2. Matriz de Rastreabilidade: RF → US → CU

### 2.1 Gestão de Quartos

#### RF-M001: Cadastrar novo quarto com número, capacidade, tipo, preço e amenidades

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M001 | Crítico | ✅ |
| **História** | US-001 | Cadastrar novo quarto com informações básicas | ✅ |
| **Caso de Uso** | CU-001 | Cadastrar Novo Quarto | ✅ |
| **AC Relacionadas** | AC-001.1 a AC-001.6 | Validação e sucesso | ✅ |
| **RNF Aplicáveis** | RNF-M004, RNF-M009, RNF-M013 | Segurança, UX, feedback | ✅ |
| **Prioridade** | 🔴 Crítica | v1.0 MVP | ✅ |
| **Story Points** | 8 | US-001 | ✅ |

**Rastreamento Detalhado**:
```
RF-M001 (Cadastro de quarto)
  ├─ US-001: Cadastrar novo quarto (8 pt)
  │  ├─ AC-001.1: Validação de número único
  │  ├─ AC-001.2: Campos obrigatórios
  │  ├─ AC-001.3: Seleção de tipo
  │  ├─ AC-001.4: Validação de capacidade
  │  ├─ AC-001.5: Validação de preço
  │  └─ AC-001.6: Sucesso no cadastro
  │
  ├─ US-002: Selecionar amenidades (3 pt)
  │  ├─ AC-002.1: Checkboxes visíveis
  │  ├─ AC-002.2: Marcar/desmarcar
  │  └─ AC-002.3: Preservar estado
  │
  ├─ US-003: Adicionar camas (5 pt)
  │  ├─ AC-003.1: Seção de camas visível
  │  ├─ AC-003.2: Adicionar múltiplas camas
  │  ├─ AC-003.3: Validação de cama obrigatória
  │  ├─ AC-003.4: Remover cama
  │  └─ AC-003.5: Persistência no banco
  │
  └─ CU-001: Cadastrar Novo Quarto
     ├─ Pré: Autenticado, Nº único
     ├─ Principal: 13 passos
     └─ Pós: Quarto criado, status LIVRE
```

---

#### RF-M002: Listar todos os quartos com disponibilidade

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M002 | Crítico | ✅ |
| **História** | US-004 | Listar quartos com informações principais | ✅ |
| **Caso de Uso** | CU-002 | Listar Quartos | ✅ |
| **AC Relacionadas** | AC-004.1 a AC-004.4 | Tabela, cores, paginação | ✅ |

**Rastreamento Detalhado**:
```
RF-M002 (Listagem de quartos)
  ├─ US-004: Listar quartos (5 pt)
  │  ├─ AC-004.1: Tabela com colunas corretas
  │  ├─ AC-004.2: Status de disponibilidade colorido
  │  ├─ AC-004.3: Paginar resultados
  │  └─ AC-004.4: Ordenar por coluna
  │
  ├─ US-005: Filtrar quartos por disponibilidade (3 pt)
  │  ├─ AC-005.1: Filtro visível
  │  ├─ AC-005.2: Filtrar quartos livres
  │  └─ AC-005.3: Retornar a todos
  │
  └─ CU-002: Listar Quartos
     ├─ Principal: 10 passos
     └─ Pós: Lista exibida
```

---

#### RF-M003: Editar dados de quarto existente

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M003 | Crítico | ✅ |
| **História** | US-006 | Editar quarto existente | ✅ |
| **Caso de Uso** | CU-003 | Editar Quarto | ✅ |
| **AC Relacionadas** | AC-006.1 a AC-006.5 | Acesso, modificação, validação | ✅ |

**Rastreamento Detalhado**:
```
RF-M003 (Edição de quarto)
  └─ US-006: Editar quarto (5 pt)
     ├─ AC-006.1: Acessar formulário
     ├─ AC-006.2: Modificar informações
     ├─ AC-006.3: Não permitir duplicação
     ├─ AC-006.4: Editar amenidades
     └─ AC-006.5: Gerenciar camas

  └─ CU-003: Editar Quarto
     ├─ Principal: 10 passos
     ├─ FA-003.1: Número duplicado
     └─ FA-003.2: Remover cama
```

---

#### RF-M004: Adicionar múltiplas camas com tipos específicos

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M004 | Crítico | ✅ |
| **História** | US-003 | Adicionar camas ao quarto | ✅ |
| **Caso de Uso** | CU-001 | Cadastrar Novo Quarto (seção camas) | ✅ |
| **AC Relacionadas** | AC-003.1 a AC-003.5 | Seção, adicionar, validar | ✅ |

---

#### RF-M011: Alterar disponibilidade do quarto

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M011 | Crítico | ✅ |
| **História** | US-007 | Alterar disponibilidade do quarto | ✅ |
| **Caso de Uso** | CU-008 | Alterar Disponibilidade de Quarto | ✅ |
| **AC Relacionadas** | AC-007.1 a AC-007.3 | Opção, confirmação, restrição | ✅ |

**Rastreamento Detalhado**:
```
RF-M011 (Alteração de disponibilidade)
  └─ US-007: Alterar disponibilidade (3 pt)
     ├─ AC-007.1: Opção de mudar status
     ├─ AC-007.2: Confirmar mudança
     └─ AC-007.3: Restrição: não ocupar reservado

  └─ CU-008: Alterar Disponibilidade
     ├─ Principal: 9 passos
     └─ FA-008.1: Quarto com reserva ativa
```

---

### 2.2 Gestão de Hóspedes

#### RF-M005: Cadastrar novo hóspede com nome, sobrenome, CPF e email

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M005 | Crítico | ✅ |
| **História** | US-008 | Cadastrar novo hóspede | ✅ |
| **Caso de Uso** | CU-004 | Cadastrar Novo Hóspede | ✅ |
| **AC Relacionadas** | AC-008.1 a AC-008.6 | Campos, validação, sucesso | ✅ |

**Rastreamento Detalhado**:
```
RF-M005 (Cadastro de hóspede)
  └─ US-008: Cadastrar novo hóspede (5 pt)
     ├─ AC-008.1: Formulário com campos obrigatórios
     ├─ AC-008.2: Validação de CPF
     ├─ AC-008.3: Validar CPF único
     ├─ AC-008.4: Validação de email
     ├─ AC-008.5: Validação de nome/sobrenome
     └─ AC-008.6: Cadastro bem-sucedido

  └─ CU-004: Cadastrar Novo Hóspede
     ├─ Principal: 12 passos
     ├─ FA-004.1: CPF já cadastrado
     ├─ FA-004.2: Dígito verificador inválido
     └─ FA-004.3: Email inválido
```

---

#### RF-M006: Listar hóspedes com nome, sobrenome e CPF

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M006 | Crítico | ✅ |
| **História** | US-009 | Listar hóspedes cadastrados | ✅ |
| **Caso de Uso** | CU-002 | Listar Quartos (aplicável também) | ✅ |

**Rastreamento Detalhado**:
```
RF-M006 (Listagem de hóspedes)
  ├─ US-009: Listar hóspedes (3 pt)
  │  ├─ AC-009.1: Tabela com colunas corretas
  │  ├─ AC-009.2: Paginação
  │  └─ AC-009.3: Ordenar por nome
  │
  └─ US-010: Buscar hóspede por nome/CPF (3 pt)
     ├─ AC-010.1: Campo de busca visível
     ├─ AC-010.2: Buscar por nome
     ├─ AC-010.3: Buscar por CPF
     └─ AC-010.4: Limpar filtro

  └─ CU-009: Buscar Hóspede
     ├─ Principal: 7 passos
     ├─ FA-009.1: Nenhum resultado
     └─ FA-009.2: Limpar busca
```

---

#### RF-M007: Validar CPF com algoritmo de dígito verificador

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M007 | Crítico | ✅ |
| **História** | US-008 | Cadastrar novo hóspede | ✅ |
| **Caso de Uso** | CU-004 | Cadastrar Novo Hóspede | ✅ |
| **AC Relacionadas** | AC-008.2, FA-004.2 | Validação de CPF | ✅ |

---

#### RF-S001: Editar dados de hóspede existente

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-S001 | Alta | ✅ |
| **História** | US-011 | Editar dados de hóspede | ✅ |
| **Caso de Uso** | - | Implícito em CU-004 (edição) | ✅ |

**Rastreamento Detalhado**:
```
RF-S001 (Edição de hóspede)
  └─ US-011: Editar dados de hóspede (3 pt)
     ├─ AC-011.1: Acessar edição
     ├─ AC-011.2: Editar nome/sobrenome
     ├─ AC-011.3: Editar email
     └─ AC-011.4: CPF não deve ser editável
```

---

### 2.3 Gestão de Reservas

#### RF-M008: Criar nova reserva vinculando quarto, hóspede e datas

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M008 | Crítico | ✅ |
| **História** | US-012 | Criar nova reserva | ✅ |
| **Caso de Uso** | CU-005 | Criar Nova Reserva | ✅ |
| **AC Relacionadas** | AC-012.1 a AC-012.8 | Formulário, validação, criação | ✅ |

**Rastreamento Detalhado**:
```
RF-M008 (Criação de reserva)
  └─ US-012: Criar nova reserva (8 pt)
     ├─ AC-012.1: Formulário com campos obrigatórios
     ├─ AC-012.2: Listar apenas quartos LIVRES
     ├─ AC-012.3: Autocomplete de hóspede
     ├─ AC-012.4: Validação de datas
     ├─ AC-012.5: Validação de data passada
     ├─ AC-012.6: Verificar conflito de datas
     ├─ AC-012.7: Calcular valor total
     └─ AC-012.8: Confirmar e criar reserva

  └─ CU-005: Criar Nova Reserva
     ├─ Principal: 19 passos
     ├─ FA-005.1: Conflito de datas
     ├─ FA-005.2: Data no passado
     ├─ FA-005.3: Quarto não está mais LIVRE
     └─ FA-005.4: Data de saída < entrada
```

---

#### RF-M009: Listar reservas com número do quarto, tipo, nome do hóspede e disponibilidade

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M009 | Crítico | ✅ |
| **História** | US-013 | Listar reservas | ✅ |
| **Caso de Uso** | - | Parte de fluxo de reservas | ✅ |

**Rastreamento Detalhado**:
```
RF-M009 (Listagem de reservas)
  ├─ US-013: Listar reservas (5 pt)
  │  ├─ AC-013.1: Tabela com colunas corretas
  │  ├─ AC-013.2: Chip de disponibilidade com cores
  │  ├─ AC-013.3: Botão de ação (editar)
  │  └─ AC-013.4: Paginação e ordenação
  │
  └─ US-016: Filtrar e buscar reservas (5 pt)
     ├─ AC-016.1: Filtro de período visível
     ├─ AC-016.2: Filtrar por período
     ├─ AC-016.3: Buscar por quarto
     └─ AC-016.4: Buscar por hóspede
```

---

#### RF-M010: Editar reserva existente

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M010 | Crítico | ✅ |
| **História** | US-014 | Editar reserva existente | ✅ |
| **Caso de Uso** | CU-006 | Editar Reserva Existente | ✅ |
| **AC Relacionadas** | AC-014.1 a AC-014.5 | Abertura, edição, validação | ✅ |

**Rastreamento Detalhado**:
```
RF-M010 (Edição de reserva)
  └─ US-014: Editar reserva (8 pt)
     ├─ AC-014.1: Abrir formulário
     ├─ AC-014.2: Mudar datas
     ├─ AC-014.3: Mudar quarto
     ├─ AC-014.4: Mudar hóspede
     └─ AC-014.5: Validação durante edição

  └─ CU-006: Editar Reserva
     ├─ Principal: 13 passos
     ├─ FA-006.1: Mudar quarto
     └─ FA-006.2: Novo período com conflito
```

---

#### RF-M012: Validar que data_entrada < data_saída

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M012 | Crítico | ✅ |
| **História** | US-012, US-014 | Criar e editar reserva | ✅ |
| **AC Relacionadas** | AC-012.4, AC-014.5 | Validação de datas | ✅ |

---

#### RF-M013: Validar que quarto está LIVRE antes de criar reserva

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M013 | Crítico | ✅ |
| **História** | US-012 | Criar nova reserva | ✅ |
| **AC Relacionadas** | AC-012.2 | Listar apenas quartos LIVRES | ✅ |

---

#### RF-M014: Impedir reservas em períodos com conflito

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M014 | Crítico | ✅ |
| **História** | US-012, US-014 | Criar e editar reserva | ✅ |
| **AC Relacionadas** | AC-012.6, FA-005.1 | Verificar conflitos | ✅ |

---

#### RF-M015: Calcular automaticamente valor total

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-M015 | Crítico | ✅ |
| **História** | US-012, US-014 | Criar e editar reserva | ✅ |
| **AC Relacionadas** | AC-012.7 | Cálculo automático | ✅ |

---

#### RF-S003: Cancelar reserva existente

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-S003 | Alta | ✅ |
| **História** | US-015 | Cancelar reserva | ✅ |
| **Caso de Uso** | CU-007 | Cancelar Reserva | ✅ |

**Rastreamento Detalhado**:
```
RF-S003 (Cancelamento de reserva)
  └─ US-015: Cancelar reserva (5 pt)
     ├─ AC-015.1: Opção de cancelar
     ├─ AC-015.2: Confirmação e motivo
     ├─ AC-015.3: Liberar quarto
     └─ AC-015.4: Histórico mantido

  └─ CU-007: Cancelar Reserva
     ├─ Principal: 15 passos
     └─ FA-007.1: Usuário clica "Voltar"
```

---

#### RF-S004: Restaurar status do quarto para LIVRE ao cancelar reserva

| Elemento | ID | Referência | Status |
|----------|----|-----------| --------|
| **Requisito** | RF-S004 | Alta | ✅ |
| **História** | US-015 | Cancelar reserva | ✅ |
| **AC Relacionadas** | AC-015.3 | Liberar quarto | ✅ |

---

### 2.4 Validações e Feedback

#### RF-M016 a RF-M021: Validações Gerais

| Requisito | Descrição | Histórias | AC |
|-----------|-----------|-----------|-----|
| **RF-M016** | Validar número único | US-001 | AC-001.1 |
| **RF-M017** | Validar CPF único | US-008 | AC-008.3 |
| **RF-M018** | Validar email válido | US-008 | AC-008.4 |
| **RF-M019** | Feedback sucesso | Todas | AC-001.6, AC-008.6, AC-012.8 |
| **RF-M020** | Mensagens de erro | Todas | AC-001.2, AC-008.2 |
| **RF-M021** | Marcar campos em vermelho | Todas | AC-001.4, AC-008.2 |

---

## 3. Matriz de Rastreabilidade: US → RF

### Visão por História de Usuário

```
US-001 (Cadastrar novo quarto) → RF-M001, RF-M003, RF-M004, RF-M016, RF-M019, RF-M020, RF-M021
US-002 (Selecionar amenidades) → RF-M001, RF-M003, RF-M019
US-003 (Adicionar camas) → RF-M004, RF-M019, RF-M020
US-004 (Listar quartos) → RF-M002, RF-M019
US-005 (Filtrar quartos) → RF-S005, RF-S006, RF-S007
US-006 (Editar quarto) → RF-M003, RF-M016, RF-M019, RF-M020
US-007 (Alterar disponibilidade) → RF-M011, RF-M019
US-008 (Cadastrar hóspede) → RF-M005, RF-M007, RF-M017, RF-M018, RF-M019, RF-M020, RF-M021
US-009 (Listar hóspedes) → RF-M006, RF-M019
US-010 (Buscar hóspede) → RF-S019, RF-M019
US-011 (Editar hóspede) → RF-S001, RF-M019, RF-M020
US-012 (Criar reserva) → RF-M008, RF-M012, RF-M013, RF-M014, RF-M015, RF-M019, RF-M020, RF-M021
US-013 (Listar reservas) → RF-M009, RF-M019
US-014 (Editar reserva) → RF-M010, RF-M012, RF-M013, RF-M014, RF-M015, RF-M019, RF-M020
US-015 (Cancelar reserva) → RF-S003, RF-S004, RF-M019
US-016 (Filtrar reservas) → RF-M009, RF-S020, RF-M019
US-017 (Dashboard) → RF-C020
US-018 (Relatório) → RF-C004, RF-C005
```

---

## 4. Matriz de Rastreabilidade: Requisitos Não-Funcionais

### RNF Relacionados às Histórias de Usuário

```
Todas as Histórias (US-001 até US-018)
│
├─ RNF-M001: Responsividade
├─ RNF-M002: Paleta de cores (verde/azul)
├─ RNF-M003: Componentes modernos
├─ RNF-M004: Validação em backend
├─ RNF-M005: Integridade referencial
├─ RNF-M006: Transações ACID
├─ RNF-M007: SQL Injection prevention
├─ RNF-M008: Controle de acesso
├─ RNF-M009: Mensagens de erro claras
├─ RNF-M010: Performance < 3s
├─ RNF-M011: Compatibilidade navegadores
├─ RNF-M012: Auditoria (data_criacao)
├─ RNF-M013: Confirmação ações destrutivas
├─ RNF-M014: Feedback visual
└─ RNF-M015: Banco relacional

Histórias Específicas
│
├─ US-003, US-006 → RNF-S005: Suporte navegação teclado
├─ Todas → RNF-S006: Contraste acessível
├─ Todas → RNF-S009: API em JSON
├─ US-004, US-009, US-013 → RNF-S010: Paginação
├─ Todas → RNF-S012: Validação tempo real
├─ US-012, US-014 → RNF-S019: Testes integração
└─ Todas → RNF-S020: Suporte múltiplas resoluções
```

---

## 5. Mapeamento de Cobertura

### 5.1 Cobertura de Requisitos Funcionais

| Tipo | Total | Histórias | Cobertura |
|------|-------|-----------|-----------|
| **Must Have** | 21 | 16 | 76% (RF-M001 a RF-M021) |
| **Should Have** | 20 | 18 | 90% (RF-S001 a RF-S020) |
| **Could Have** | 20 | 2 | 10% (RF-C004, RF-C005, RF-C020) |
| **Won't Have** | 10 | 0 | 0% (RF-W001 a RF-W010) |
| **TOTAL** | 71 | 18 | **77%** |

### 5.2 Requisitos MH Sem História (Explícita)

Alguns requisitos de validação/técnicos estão cobertos implicitamente:

```
✅ RF-M003: Editar quarto → US-006 (cobre implicitamente)
✅ RF-M007: Validar CPF → US-008 (AC-008.2)
✅ RF-M016: Número único → US-001 (AC-001.1)
✅ RF-M017: CPF único → US-008 (AC-008.3)
✅ RF-M018: Email válido → US-008 (AC-008.4)
✅ RF-M019-021: Feedback/validação → Todas as histórias
```

### 5.3 Requisitos Could Have

```
🟡 RF-C001-C003: Exportar para PDF/Excel → Sem história ainda
🟡 RF-C004-C005: Relatórios → US-018 (parcialmente)
🟡 RF-C006-C008: Filtros avançados → US-005, US-016
🟡 RF-C009-C020: Funcionalidades futuras → Sem histórias
```

---

## 6. Cobertura de Casos de Uso

### 6.1 Mapeamento CU → US

```
CU-001: Cadastrar Quarto
  ├─ US-001: Cadastrar novo quarto
  ├─ US-002: Selecionar amenidades
  └─ US-003: Adicionar camas

CU-002: Listar Quartos
  ├─ US-004: Listar quartos
  └─ US-005: Filtrar quartos

CU-003: Editar Quarto
  └─ US-006: Editar quarto

CU-004: Cadastrar Hóspede
  ├─ US-008: Cadastrar hóspede
  └─ US-011: Editar hóspede (implícito)

CU-005: Criar Reserva
  ├─ US-012: Criar reserva
  └─ US-010: Buscar hóspede (autocomplete)

CU-006: Editar Reserva
  └─ US-014: Editar reserva

CU-007: Cancelar Reserva
  └─ US-015: Cancelar reserva

CU-008: Alterar Disponibilidade
  └─ US-007: Alterar disponibilidade

CU-009: Buscar Hóspede
  └─ US-010: Buscar hóspede
```

---

## 7. Critérios de Aceitação por Requisito

### 7.1 Exemplo: RF-M008 → US-012

**Requisito**: RF-M008 - Criar nova reserva vinculando quarto, hóspede, datas

**História**: US-012 - Criar nova reserva

**Critérios de Aceitação**:
```gherkin
AC-012.1: Given formulário de reserva
         When página carrega
         Then deve exibir: Quarto, Hóspede, Data Entrada, Data Saída

AC-012.2: Given select de quarto
         When clico para abrir
         Then apenas quartos LIVRES devem aparecer

AC-012.3: Given campo hóspede
         When digito "Jo"
         Then sugestões de hóspedes aparecem

AC-012.4: Given datas preenchidas
         When entrada > saída
         Then erro: "Data de entrada deve ser menor"

AC-012.5: Given data de entrada
         When seleciono data anterior a hoje
         Then erro: "Data não pode ser no passado"

AC-012.6: Given quarto selecionado
         When período conflita com reserva existente
         Then aviso: "Indisponível neste período"

AC-012.7: Given quarto e período
         When sistema calcula
         Then valor_total = diárias × preço_diária

AC-012.8: Given tudo preenchido corretamente
         When clico "Confirmar"
         Then reserva criada, quarto = OCUPADO
```

---

## 8. Rastreabilidade Bidirecional: Exemplo Completo

### Um Requisito (RF-M001) Rastreado Completamente

```
┌─────────────────────────────────────────────────────────┐
│ RF-M001: Cadastrar novo quarto com número, capacidade,  │
│         tipo, preço e amenidades                         │
│ Priority: 🔴 CRÍTICA (Must Have)                        │
│ Story Points Relacionados: 16 (1+2+3)                   │
└─────────────────────────────────────────────────────────┘
                          │
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
    ┌─────────────┐ ┌──────────┐ ┌─────────────┐
    │ US-001      │ │ US-002   │ │ US-003      │
    │ Cadastrar   │ │ Select.  │ │ Adicionar   │
    │ quarto (8)  │ │ amenid.  │ │ camas (5)   │
    │             │ │ (3)      │ │             │
    └──────┬──────┘ └────┬─────┘ └──────┬──────┘
           │             │             │
     6 AC's        3 AC's        5 AC's
           │             │             │
           └──────────────┼──────────────┘
                          │
                    ┌─────▼─────┐
                    │  CU-001   │
                    │ Cadastrar │
                    │  Quarto   │
                    │           │
                    │ Principal │
                    │ 13 passos │
                    │ 4 FA's    │
                    └───────────┘
                          │
                    ┌─────▼──────────┐
                    │  Banco de Dados│
                    │ Tabelas:       │
                    │ - QUARTO       │
                    │ - CAMA         │
                    └────────────────┘
```

---

## 9. Matriz Completa: Requisitos × Histórias

### Formato: Verificação de Cobertura

| RF ID | Descrição | US1 | US2 | US3 | US4 | US5 | US6 | US7 | US8 | US9 | US10 | Cobertura |
|-------|-----------|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|-----------|
| RF-M001 | Cadastro quarto | ✅ | ✅ | ✅ | | | | | | | | 100% |
| RF-M002 | Lista quartos | | | | ✅ | | | | | | | 100% |
| RF-M003 | Editar quarto | ✅ | | ✅ | | | ✅ | | | | | 100% |
| RF-M004 | Camas | ✅ | | ✅ | | | ✅ | | | | | 100% |
| RF-M005 | Cadastro hóspede | | | | | | | | ✅ | | | 100% |
| RF-M006 | Lista hóspedes | | | | | | | | | ✅ | | 100% |
| RF-M007 | Validar CPF | | | | | | | | ✅ | | | 100% |
| RF-M008 | Criar reserva | | | | | | | | | | ✅ | 100% |
| RF-M009 | Lista reservas | | | | | | | | | | | 100% |
| RF-M010 | Editar reserva | | | | | | | | | | ✅ | 100% |
| RF-M011 | Disponibilidade | | | | | | | ✅ | | | | 100% |
| RF-M012 | Data validação | | | | | | | | | | ✅ | 100% |
| RF-M013 | Quarto LIVRE | | | | | | | | | | ✅ | 100% |
| RF-M014 | Sem conflito | | | | | | | | | | ✅ | 100% |
| RF-M015 | Calc. valor | | | | | | | | | | ✅ | 100% |

---

## 10. Tabela Resumida: Status de Rastreabilidade

| Métrica | Valor | Status |
|---------|-------|--------|
| **Total RF** | 71 | - |
| **RF Cobertos por Histórias** | 54 | ✅ 76% |
| **RF Órf ãos** | 0 | ✅ 0% |
| **Total Histórias** | 18 | - |
| **Histórias com RF** | 18 | ✅ 100% |
| **Histórias Órfãs** | 0 | ✅ 0% |
| **Total Casos de Uso** | 9 | - |
| **Casos Cobertos por US** | 9 | ✅ 100% |
| **Cobertura Geral** | 77% | ✅ Bom |

---

## 11. Gaps Identificados e Ações

### 11.1 Gaps Identificados

```
🟡 Gap 1: RF-C001 (Exportar PDF) sem história
   → Ação: Planejar para v2.0, adicionar US-C001

🟡 Gap 2: RF-S010 (Autocomplete) parcialmente coberto
   → Ação: Detalhar AC-012.3 com mais cenários

🟡 Gap 3: RNF-S017 (Documentação código) não testável
   → Ação: Cobrir em guideline de código

✅ Nenhum requisito crítico descoberto sem história
✅ Cobertura de Must Have: 100%
✅ Cobertura de Should Have: 90%
```

---

## 12. Validação de Requisitos

### Checklist de Validação para Desenvolvimento

Para cada história de usuário, validar:

```
[ ] Todos os requisitos RF listados estão implementados?
[ ] Todos os critérios de aceitação passam?
[ ] Todos os RNF aplicáveis foram considerados?
[ ] Testes unitários cobrem os RFs?
[ ] Testes de integração cobrem os CUs?
[ ] Documentação atualizada?
[ ] Code review aprovado?
```

---

## 13. Resumo e Próximos Passos

### 13.1 Status Geral

✅ **Rastreabilidade Estabelecida**: RF ↔ US ↔ CU  
✅ **Cobertura**: 77% dos requisitos rastreados  
✅ **Must Have**: 100% coberto por histórias  
✅ **Should Have**: 90% coberto por histórias  
✅ **Could Have**: 10% coberto por histórias  

### 13.2 Próximos Passos

1. **Sprint Planning**
   - Usar histórias rastreadas para planejar sprints
   - Assegurar que cada feature corresponde a um requisito

2. **Desenvolvimento**
   - Implementar histórias mantendo rastreamento
   - Verificar critérios de aceitação continuamente

3. **Testes**
   - Testar contra requisitos mapeados
   - Validar cobertura de AC's

4. **v2.0**
   - Planejar histórias para RF-C's ainda não cobertos
   - Atualizar matriz com novas histórias

---

**Versão**: 1.0  
**Data**: 16 de fevereiro de 2026  
**Status**: ✅ Rastreabilidade Completa  
**Autor**: Engenharia de Requisitos
