# Sistema de Reserva de Hotel - Casos de Uso Principais

## 1. Introdução

Este documento descreve formalmente os casos de uso principais do sistema de reserva de hotel, com especificação detalhada de atores, pré-condições, pós-condições e fluxos.

---

## 2. Atores do Sistema

### Atores Primários (Interagem diretamente com o sistema)

| Ator | Descrição | Responsabilidades |
|------|-----------|-------------------|
| **Gerente de Hotel** | Responsável pela administração geral | Gerenciar quartos, visualizar relatórios, aprovar mudanças de status |
| **Recepcionista** | Responsável pelo atendimento e reservas | Criar/editar reservas, cadastrar hóspedes, gerenciar check-in/check-out |
| **Gerente de Limpeza** | Responsável pela limpeza dos quartos | Marcar quartos como limpo/pronto |

### Atores Secundários (Não interagem diretamente)

| Ator | Descrição |
|------|-----------|
| **Sistema de Banco de Dados** | Armazena e recupera dados |
| **Sistema de Email** | Envia confirmações de reserva (futuro) |

---

## 3. Casos de Uso Principais - Diagrama

```
                    ┌─────────────────┐
                    │  Gerente Hotel  │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
        ┌─────────────────┐  ┌─────────────────┐
        │  Gerenciar      │  │  Gerenciar Info │
        │  Quartos        │  │  Hóspedes e     │
        │                 │  │  Reservas       │
        └─────────────────┘  └─────────────────┘
             │      ▲               │      ▲
             │      │               │      │
     ┌───────┴──┐   │       ┌───────┴──┐   │
     ▼          ▼   │       ▼          │   │
┌────────┐ ┌─────── │──────┐         │   │
│Cadastro│ │ Editar │ Lista│         │   │
│ Quarto │ │ Quarto │      │         │   │
└────────┘ └────────┘──────┘         │   │
                                      │   │
                    ┌─────────────────┴───┘
                    │
                    ▼
         ┌──────────────────────┐
         │   Recepcionista      │
         └──────────────────────┘
               │        │        │
        ┌──────┴──┐  ┌──┴───┐  ┌┴──────────┐
        ▼         ▼  ▼      ▼  ▼           ▼
   ┌────────┐ ┌─────┐ ┌──────┐┌──────────┐
   │Cadastro│ │Criar │ │Editar││ Buscar  │
   │Hóspede │ │Reserva│Reserva││ Hóspede │
   └────────┘ └─────┘ └──────┘└──────────┘
```

---

## 4. Caso de Uso: CU-001 - Cadastrar Novo Quarto

### Informações Gerais

| Atributo | Descrição |
|----------|-----------|
| **ID** | CU-001 |
| **Nome** | Cadastrar Novo Quarto |
| **Ator Principal** | Gerente de Hotel |
| **Prioridade** | Crítica (Must Have) |
| **Complexidade** | Média |

### Descrição

O gerente registra um novo quarto no sistema com todas as suas características, amenidades e tipos de cama.

### Pré-condições

- ✅ Gerente está autenticado no sistema
- ✅ Gerente tem permissão para adicionar quartos
- ✅ O número do quarto não existe previamente no banco de dados
- ✅ O formulário de cadastro é acessível

### Pós-condições

- ✅ Novo quarto é criado no banco de dados com status "LIVRE"
- ✅ Quarto está disponível para reservas
- ✅ Registro de auditoria (data_criacao) é gravado
- ✅ Mensagem de sucesso é exibida ao usuário
- ✅ Quarto aparece na lista de quartos

### Fluxo Principal (Caminho Feliz)

```
1. Gerente acessa "Gestão de Quartos"
2. Clica no botão "Novo Quarto"
3. Sistema exibe formulário vazio
4. Gerente preenche:
   - Número do quarto: 101
   - Capacidade: 2
   - Tipo: "Moderno"
   - Preço por diária: 250.00
   - Marca "Frigobar" e "Café da manhã"
5. Gerente clica em "Adicionar Cama"
6. Seleciona "Casal King" e confirma
7. Gerente clica em "Salvar"
8. Sistema valida todos os campos
9. Sistema insere registro na tabela QUARTO
10. Sistema insere registros na tabela CAMA
11. Sistema exibe mensagem "Quarto 101 cadastrado com sucesso"
12. Sistema redireciona para lista de quartos
13. Quarto 101 aparece na tabela com status "LIVRE"
```

### Fluxos Alternativos

#### FA-001.1: Número de Quarto Já Existe
```
Passo 8 - No passo de validação:
1. Sistema verifica que número 101 já existe
2. Sistema exibe erro: "Número do quarto 101 já cadastrado"
3. Campo "Número" é marcado em vermelho
4. Cursor volta para o campo de erro
5. Gerente corrige o número para 102
6. Continua do passo 8 (validando novamente)
```

#### FA-001.2: Campo Obrigatório Vazio
```
Passo 8 - No passo de validação:
1. Sistema detecta que campo "Preço" está vazio
2. Sistema marca campo em vermelho
3. Sistema desabilita botão "Salvar"
4. Sistema exibe mensagem: "Preço por diária é obrigatório"
5. Gerente preenche o campo
6. Botão "Salvar" volta a estar habilitado
7. Continua do passo 8
```

#### FA-001.3: Nenhuma Cama Adicionada
```
Passo 8 - No passo de validação:
1. Sistema detecta que lista de camas está vazia
2. Sistema exibe erro: "Adicione pelo menos uma cama"
3. Seção "Camas" é destacada em vermelho
4. Gerente adiciona uma cama (volta ao passo 6)
5. Continua do passo 8
```

#### FA-001.4: Valor de Preço Inválido
```
Passo 8 - No passo de validação:
1. Sistema detecta preço "abc" ou "-100"
2. Sistema marca campo em vermelho
3. Sistema exibe: "Preço deve ser um número positivo"
4. Gerente corrige para "250.00"
5. Continua do passo 8
```

### Regras de Negócio Associadas

- RN001: Número de quarto deve ser único
- RN002: Capacidade entre 1 e 10
- RN003: Preço deve ser maior que zero
- RN004: Tipos permitidos: Básico, Moderno, Luxo
- RN006: Todo quarto deve ter pelo menos uma cama

### Dados Alterados

| Tabela | Operação | Detalhes |
|--------|----------|----------|
| QUARTO | INSERT | Novo registro com status 'LIVRE' |
| CAMA | INSERT | Um ou mais registros com quarto_id |

---

## 5. Caso de Uso: CU-002 - Listar Quartos

### Informações Gerais

| Atributo | Descrição |
|----------|-----------|
| **ID** | CU-002 |
| **Nome** | Listar Quartos |
| **Ator Principal** | Gerente de Hotel, Recepcionista |
| **Prioridade** | Crítica (Must Have) |
| **Complexidade** | Baixa |

### Descrição

O ator acessa a lista de todos os quartos cadastrados com informações principais e status de disponibilidade.

### Pré-condições

- ✅ Ator está autenticado no sistema
- ✅ Ator tem permissão para visualizar quartos
- ✅ Existe conectividade com o banco de dados

### Pós-condições

- ✅ Lista de quartos é exibida
- ✅ Status de cada quarto é apresentado visualmente
- ✅ Ator pode realizar ações (filtrar, ordenar, editar)

### Fluxo Principal

```
1. Ator acessa "Gestão de Quartos"
2. Sistema conecta ao banco de dados
3. Sistema recupera todos os quartos da tabela QUARTO
4. Para cada quarto, recupera dados de CAMA relacionados
5. Sistema exibe tabela com colunas:
   - Número | Tipo | Preço | Disponibilidade | Ações
6. Quartos LIVRE aparecem com chip verde
7. Quartos OCUPADO aparecem com chip vermelho
8. Quartos MANUTENÇÃO_LIMPEZA aparecem com chip amarelo
9. Ator visualiza 10 quartos por página
10. Controles de paginação aparecem no rodapé
```

### Fluxos Alternativos

#### FA-002.1: Nenhum Quarto Cadastrado
```
Passo 4 - Query retorna vazio:
1. Sistema detecta que não há quartos
2. Sistema exibe mensagem: "Nenhum quarto cadastrado"
3. Ator vê botão "Novo Quarto" destacado
4. Caso de uso encerra
```

#### FA-002.2: Erro de Conectividade
```
Passo 2-3 - Falha na conexão:
1. Sistema tenta conectar ao banco
2. Conexão falha (timeout)
3. Sistema exibe erro: "Erro ao conectar ao banco de dados"
4. Ator pode tentar novamente
```

### Dados Lidos

| Tabela | Operação | Filtro |
|--------|----------|--------|
| QUARTO | SELECT | Todos os registros |
| CAMA | SELECT | WHERE quarto_id IN (...) |

---

## 6. Caso de Uso: CU-003 - Editar Quarto

### Informações Gerais

| Atributo | Descrição |
|----------|-----------|
| **ID** | CU-003 |
| **Nome** | Editar Quarto Existente |
| **Ator Principal** | Gerente de Hotel |
| **Prioridade** | Crítica (Must Have) |
| **Complexidade** | Média |

### Descrição

O gerente modifica informações de um quarto existente, incluindo dados básicos, amenidades e camas.

### Pré-condições

- ✅ Gerente está autenticado
- ✅ Quarto existe no banco de dados
- ✅ Gerente clicou no ícone de edição de um quarto

### Pós-condições

- ✅ Dados do quarto são atualizados no banco
- ✅ Mudanças são refletidas imediatamente na lista
- ✅ Histórico de alteração é registrado
- ✅ Mensagem de sucesso é exibida

### Fluxo Principal

```
1. Gerente clica no ícone de lápis de um quarto
2. Sistema carrega dados atuais do quarto
3. Sistema exibe formulário pre-preenchido
4. Gerente modifica o preço de 250 para 300
5. Gerente clica em "Atualizar"
6. Sistema valida os campos (mesmo as validações do CU-001)
7. Sistema executa UPDATE na tabela QUARTO
8. Sistema exibe mensagem de sucesso
9. Lista de quartos é atualizada
10. Quarto modificado reflete a mudança (preço = 300)
```

### Fluxos Alternativos

#### FA-003.1: Mudança no Número do Quarto para Duplicada
```
Passo 6 - Validação:
1. Sistema detecta novo número 102 já existe
2. Sistema exibe erro: "Número 102 já existe"
3. Campo é marcado em vermelho
4. Gerente volta com número original
5. Continua do passo 6
```

#### FA-003.2: Remover Cama
```
Passo 4 - Gerente remove uma cama:
1. Gerente clica ícone de lixeira na cama "Casal King"
2. Modal de confirmação aparece
3. Gerente clica "Confirmar"
4. Cama é removida da lista local
5. Continua do passo 5 normalmente
6. Sistema executa DELETE na tabela CAMA
```

### Dados Alterados

| Tabela | Operação | Condição |
|--------|----------|----------|
| QUARTO | UPDATE | WHERE id = quarto_id |
| CAMA | DELETE | WHERE quarto_id = ? (se removidas) |
| CAMA | INSERT | (se adicionadas) |

---

## 7. Caso de Uso: CU-004 - Cadastrar Novo Hóspede

### Informações Gerais

| Atributo | Descrição |
|----------|-----------|
| **ID** | CU-004 |
| **Nome** | Cadastrar Novo Hóspede |
| **Ator Principal** | Recepcionista |
| **Prioridade** | Crítica (Must Have) |
| **Complexidade** | Baixa |

### Descrição

A recepcionista registra um novo hóspede no sistema com dados pessoais e de contato.

### Pré-condições

- ✅ Recepcionista está autenticada
- ✅ Recepcionista tem permissão para cadastrar hóspedes
- ✅ CPF do hóspede não existe no banco
- ✅ Formulário é acessível

### Pós-condições

- ✅ Novo hóspede é criado no banco de dados
- ✅ Hóspede está disponível para seleção em reservas
- ✅ Registro de auditoria é gravado
- ✅ Hóspede aparece na lista
- ✅ Mensagem de sucesso é exibida

### Fluxo Principal

```
1. Recepcionista acessa "Gestão de Hóspedes"
2. Clica em "Novo Hóspede"
3. Sistema exibe formulário vazio
4. Recepcionista preenche:
   - Nome: "João"
   - Sobrenome: "Silva"
   - CPF: "123.456.789-10"
   - Email: "joao.silva@email.com"
5. Recepcionista clica em "Salvar"
6. Sistema valida CPF (dígito verificador)
7. Sistema valida email (formato RFC)
8. Sistema verifica unicidade de CPF
9. Sistema insere registro na tabela HOSPEDE
10. Sistema exibe "Hóspede cadastrado com sucesso"
11. Sistema redireciona para lista
12. Novo hóspede aparece na lista
```

### Fluxos Alternativos

#### FA-004.1: CPF Já Cadastrado
```
Passo 8 - Verificação de unicidade:
1. Sistema detecta que CPF 123.456.789-10 já existe
2. Sistema exibe: "CPF já cadastrado"
3. Link "Visualizar hóspede existente" aparece
4. Recepcionista pode clicar para ver dados existentes
```

#### FA-004.2: CPF com Dígito Verificador Inválido
```
Passo 6 - Validação de CPF:
1. Sistema valida dígitos verificadores (Módulo 11)
2. CPF "123.456.789-00" falha na validação
3. Sistema exibe: "CPF inválido"
4. Campo é marcado em vermelho
5. Recepcionista corrige para CPF válido
6. Continua do passo 6
```

#### FA-004.3: Email Inválido
```
Passo 7 - Validação de email:
1. Sistema detecta formato inválido "joao@"
2. Sistema exibe: "Email inválido"
3. Campo é marcado em vermelho
4. Recepcionista corrige para "joao@email.com"
5. Continua do passo 6
```

### Regras de Negócio Associadas

- RN009: CPF deve ser único
- RN010: Email em formato válido
- RN011: Nome e sobrenome com mínimo 3 caracteres

### Dados Alterados

| Tabela | Operação | Detalhes |
|--------|----------|----------|
| HOSPEDE | INSERT | Novo registro com data_criacao |

---

## 8. Caso de Uso: CU-005 - Criar Nova Reserva

### Informações Gerais

| Atributo | Descrição |
|----------|-----------|
| **ID** | CU-005 |
| **Nome** | Criar Nova Reserva |
| **Ator Principal** | Recepcionista |
| **Prioridade** | Crítica (Must Have) |
| **Complexidade** | Alta |

### Descrição

A recepcionista cria uma nova reserva vinculando um quarto disponível, um hóspede e um período de datas.

### Pré-condições

- ✅ Recepcionista está autenticada
- ✅ Recepcionista tem permissão para criar reservas
- ✅ Hóspede existe no banco de dados
- ✅ Quarto existe e está com status "LIVRE"
- ✅ Período solicitado não tem conflito com outras reservas

### Pós-condições

- ✅ Nova reserva é criada com status "ATIVA"
- ✅ Quarto muda para status "OCUPADO"
- ✅ Reserva aparece na lista
- ✅ Confirmação com número da reserva é exibida
- ✅ Transação é atômica (tudo sucede ou nada sucede)

### Fluxo Principal

```
1. Recepcionista acessa "Gestão de Reservas"
2. Clica em "Nova Reserva"
3. Sistema exibe formulário de reserva
4. Recepcionista seleciona:
   - Quarto: 102 (filtrado apenas LIVRES)
   - Hóspede: "João Silva" (autocomplete)
   - Data de Entrada: 2026-02-20
   - Data de Saída: 2026-02-25
5. Sistema calcula automaticamente:
   - Diárias: 5 noites
   - Valor Total: 5 × 250 = R$ 1.250,00
6. Recepcionista visualiza resumo
7. Clica em "Confirmar Reserva"
8. Sistema exibe modal de confirmação com resumo
9. Modal mostra botão "Confirmar Tudo"
10. Recepcionista clica "Confirmar Tudo"
11. Sistema inicia transação de banco de dados
12. Sistema valida período (não há conflitos)
13. Sistema verifica novamente que quarto é LIVRE
14. Sistema insere registro em RESERVA (status ATIVA)
15. Sistema atualiza status do QUARTO para OCUPADO
16. Sistema faz commit da transação
17. Sistema exibe: "Reserva #12345 criada com sucesso"
18. Sistema redireciona para lista de reservas
19. Nova reserva aparece com quarto marcado como OCUPADO
```

### Fluxos Alternativos

#### FA-005.1: Conflito de Datas Detectado
```
Passo 12 - Validação de período:
1. Sistema detecta que quarto 102 tem reserva:
   - Entrada: 2026-02-18
   - Saída: 2026-02-22
2. Nova solicitação (2026-02-20 a 2026-02-25) sobrepõe
3. Sistema exibe aviso: "Quarto indisponível neste período"
4. Aviso mostra: "Disponível de 2026-02-25 em diante"
5. Recepcionista pode:
   a) Selecionar outro quarto (volta ao passo 4)
   b) Usar datas sugeridas
   c) Cancelar (caso de uso encerra)
```

#### FA-005.2: Data de Entrada no Passado
```
Passo 12 - Validação de datas:
1. Sistema detecta 2026-02-10 < data_hoje (2026-02-16)
2. Sistema exibe erro: "Data não pode ser no passado"
3. Recepcionista corrige data
4. Volta ao passo 12
```

#### FA-005.3: Quarto Não Está Mais LIVRE
```
Passo 13 - Verificação adicional:
1. Outro usuário criou reserva no quarto 102 entre os passos 4-13
2. Sistema detecta status mudou para OCUPADO
3. Sistema exibe: "Quarto já foi reservado por outro usuário"
4. Transação é abortada (rollback)
5. Recepcionista deve tentar novamente
```

#### FA-005.4: Data de Saída Menor que Entrada
```
Passo 5 - Cálculo:
1. Recepcionista insere:
   - Entrada: 2026-02-25
   - Saída: 2026-02-20
2. Sistema detecta saída < entrada
3. Sistema exibe erro: "Data de saída deve ser maior que entrada"
4. Recepcionista corrige datas
5. Calcula novamente
```

### Regras de Negócio Associadas

- RN013: Quarto deve estar LIVRE
- RN014: Data entrada < data saída
- RN015: Apenas quartos LIVRES podem ser reservados
- RN016: Cálculo de valor total automático
- RN020: Período de reserva exclusivo
- RN024: Usar transações ACID

### Dados Alterados

| Tabela | Operação | Detalhes |
|--------|----------|----------|
| RESERVA | INSERT | Novo registro com status ATIVA |
| QUARTO | UPDATE | WHERE id = quarto_id, status = OCUPADO |

---

## 9. Caso de Uso: CU-006 - Editar Reserva

### Informações Gerais

| Atributo | Descrição |
|----------|-----------|
| **ID** | CU-006 |
| **Nome** | Editar Reserva Existente |
| **Ator Principal** | Recepcionista |
| **Prioridade** | Crítica (Must Have) |
| **Complexidade** | Alta |

### Descrição

A recepcionista modifica dados de uma reserva existente (datas, quarto, hóspede).

### Pré-condições

- ✅ Recepcionista está autenticada
- ✅ Reserva existe com status ATIVA ou CONFIRMADA
- ✅ Recepcionista clicou em editar uma reserva

### Pós-condições

- ✅ Dados da reserva são atualizados
- ✅ Se quarto mudou: quarto antigo volta a LIVRE, novo muda para OCUPADO
- ✅ Valor total é recalculado
- ✅ Mudanças são refletidas na lista
- ✅ Mensagem de sucesso é exibida

### Fluxo Principal

```
1. Recepcionista clica em ícone de edição da reserva
2. Sistema carrega dados atuais:
   - Quarto: 102
   - Hóspede: João Silva
   - Entrada: 2026-02-20
   - Saída: 2026-02-25
   - Status: ATIVA
   - Valor: R$ 1.250,00
3. Recepcionista muda entrada para 2026-02-19
4. Sistema recalcula: 6 × 250 = R$ 1.500,00
5. Recepcionista clica "Atualizar"
6. Sistema valida o novo período
7. Sistema inicia transação
8. Sistema verifica se quarto ainda OCUPADO por essa reserva
9. Sistema verifica se novo período está livre
10. Sistema atualiza RESERVA (nova data_entrada, novo valor)
11. Sistema faz commit
12. Sistema exibe: "Reserva #12345 atualizada"
13. Lista reflete mudanças
```

### Fluxos Alternativos

#### FA-006.1: Mudar Quarto
```
Passo 3 - Gerente muda quarto:
1. Recepcionista seleciona novo quarto (105)
2. Sistema valida que quarto 105 está LIVRE no período
3. Continua do passo 5 normalmente
4. No passo 10: QUARTO 102 volta para LIVRE, 105 muda para OCUPADO
```

#### FA-006.2: Novo Período Tem Conflito
```
Passo 6 - Validação:
1. Sistema detecta conflito na nova data
2. Sistema exibe: "Conflito de datas com outra reserva"
3. Sugestões de datas livres aparecem
4. Recepcionista corrige datas
5. Volta ao passo 6
```

### Dados Alterados

| Tabela | Operação | Condição |
|--------|----------|----------|
| RESERVA | UPDATE | WHERE id = reserva_id |
| QUARTO | UPDATE | Se quarto mudou |

---

## 10. Caso de Uso: CU-007 - Cancelar Reserva

### Informações Gerais

| Atributo | Descrição |
|----------|-----------|
| **ID** | CU-007 |
| **Nome** | Cancelar Reserva |
| **Ator Principal** | Recepcionista e Gerente |
| **Prioridade** | Alta (Should Have) |
| **Complexidade** | Média |

### Descrição

A recepcionista cancela uma reserva existente, liberando o quarto.

### Pré-condições

- ✅ Recepcionista está autenticada
- ✅ Reserva existe com status ATIVA ou CONFIRMADA
- ✅ Recepcionista clicou em botão de cancelamento

### Pós-condições

- ✅ Reserva muda para status CANCELADA
- ✅ Quarto volta para status LIVRE
- ✅ Histórico é mantido para auditoria
- ✅ Mensagem de sucesso é exibida
- ✅ Transação é atômica

### Fluxo Principal

```
1. Recepcionista clica em "Cancelar" na reserva
2. Modal de confirmação aparece com texto:
   "Tem certeza que deseja cancelar a reserva #12345?"
3. Campo opcional "Motivo do cancelamento" aparece
4. Recepcionista pode preencher motivo (opcional)
5. Botões: "Cancelar Reserva" e "Voltar"
6. Recepcionista clica "Cancelar Reserva"
7. Sistema inicia transação
8. Sistema muda status RESERVA para CANCELADA
9. Sistema muda status QUARTO para LIVRE
10. Se motivo foi preenchido, registra em auditoria
11. Sistema faz commit
12. Modal desaparece
13. Sistema exibe: "Reserva cancelada com sucesso"
14. Reserva continua listada com status CANCELADA
15. Quarto agora aparece como LIVRE na lista de quartos
```

### Fluxos Alternativos

#### FA-007.1: Recepcionista Clica "Voltar"
```
Passo 6 - Usuário clausula:
1. Recepcionista clica "Voltar"
2. Modal fecha
3. Nada é alterado
4. Caso de uso encerra
```

### Dados Alterados

| Tabela | Operação | Detalhes |
|--------|----------|----------|
| RESERVA | UPDATE | status = CANCELADA |
| QUARTO | UPDATE | status = LIVRE |

---

## 11. Caso de Uso: CU-008 - Alterar Disponibilidade de Quarto

### Informações Gerais

| Atributo | Descrição |
|----------|-----------|
| **ID** | CU-008 |
| **Nome** | Alterar Disponibilidade de Quarto |
| **Ator Principal** | Gerente de Hotel e Gerente de Limpeza |
| **Prioridade** | Crítica (Must Have) |
| **Complexidade** | Baixa |

### Descrição

O gerente altera manualmente o status de disponibilidade de um quarto (Livre, Ocupado, Manutenção/Limpeza).

### Pré-condições

- ✅ Ator está autenticado
- ✅ Quarto existe e é exibido na lista
- ✅ Ator tem permissão para alterar status

### Pós-condições

- ✅ Status do quarto é atualizado imediatamente
- ✅ Mudança é persistida no banco
- ✅ Lista reflete a mudança visualmente
- ✅ Feedback visual é exibido

### Fluxo Principal

```
1. Gerente visualiza lista de quartos
2. Clica no chip de disponibilidade ou num botão próximo
3. Dropdown aparece com opções:
   - Livre
   - Ocupado
   - Manutenção e Limpeza
4. Gerente seleciona "Manutenção e Limpeza"
5. Sistema confirma seleção localmente
6. Sistema executa UPDATE no banco
7. Chip muda de cor (amarelo)
8. Mensagem "Status atualizado" aparece brevemente
9. Quarto fica indisponível para novas reservas
```

### Fluxos Alternativos

#### FA-008.1: Quarto com Reserva Ativa
```
Passo 4 - Gerente tenta mudar para MANUTENÇÃO:
1. Sistema detecta que quarto tem reserva ATIVA
2. Sistema exibe aviso:
   "Não é possível: quarto tem reserva ativa até 2026-02-25"
3. Dropdown permanece aberto
4. Gerente pode selecionar outra opção ou cancelar
```

### Dados Alterados

| Tabela | Operação | Detalhes |
|--------|----------|----------|
| QUARTO | UPDATE | status = nova_disponibilidade |

---

## 12. Caso de Uso: CU-009 - Buscar Hóspede

### Informações Gerais

| Atributo | Descrição |
|----------|-----------|
| **ID** | CU-009 |
| **Nome** | Buscar Hóspede |
| **Ator Principal** | Recepcionista e Gerente |
| **Prioridade** | Alta (Should Have) |
| **Complexidade** | Baixa |

### Descrição

A recepcionista busca um hóspede por nome ou CPF.

### Pré-condições

- ✅ Recepcionista está autenticada
- ✅ Está na página "Gestão de Hóspedes"
- ✅ Campo de busca é visível

### Pós-condições

- ✅ Hóspedes matching são filtrados na tabela
- ✅ Contador mostra "X de Y resultados"
- ✅ Busca pode ser limpa para retornar a todos

### Fluxo Principal

```
1. Recepcionista está na lista de hóspedes
2. Clica no campo "Buscar por nome ou CPF"
3. Digita "João"
4. Sistema busca em tempo real (a cada caractere)
5. Tabela filtra mostrando apenas hóspedes com "João"
6. Contador mostra "2 de 50 hóspedes"
7. Recepcionista pode clicar num resultado para ver detalhes
```

### Fluxos Alternativos

#### FA-009.1: Nenhum Resultado
```
Passo 5 - Busca retorna vazio:
1. Sistema filtra com termo "Zzzzzz"
2. Nenhum hóspede found
3. Tabela exibe: "Nenhum hóspede encontrado"
4. Botão "Novo Hóspede" fica destacado
```

#### FA-009.2: Limpar Busca
```
Passo 3 - Usuário limpa campo:
1. Recepcionista exclui todo o texto
2. Campo fica vazio
3. Sistema exibe todos os hóspedes novamente
4. Contador volta para "50 de 50"
```

---

## 13. Mapeamento: Casos de Uso → Histórias de Usuário → Requisitos

```
CU-001 (Cadastrar Quarto)
  ├─ US-001 (Cadastrar novo quarto)
  ├─ US-002 (Selecionar amenidades)
  ├─ US-003 (Adicionar camas)
  └─ RF-M001, RF-M003, RF-M004, RF-S012, RF-S014

CU-002 (Listar Quartos)
  ├─ US-004 (Listar quartos)
  └─ RF-M002

CU-003 (Editar Quarto)
  ├─ US-006 (Editar quarto)
  └─ RF-M003, RF-M004

CU-004 (Cadastrar Hóspede)
  ├─ US-008 (Cadastrar hóspede)
  └─ RF-M005, RF-M007, RF-M017, RF-M018

CU-005 (Criar Reserva)
  ├─ US-012 (Criar nova reserva)
  └─ RF-M008, RF-M013, RF-M014, RF-M015

CU-006 (Editar Reserva)
  ├─ US-014 (Editar reserva)
  └─ RF-M010, RF-M013, RF-M014

CU-007 (Cancelar Reserva)
  ├─ US-015 (Cancelar reserva)
  └─ RF-S003, RF-S004

CU-008 (Alterar Disponibilidade)
  ├─ US-007 (Alterar disponibilidade)
  └─ RF-M011

CU-009 (Buscar Hóspede)
  ├─ US-010 (Buscar hóspede)
  └─ RF-S019
```

---

## 14. Matriz de Rastreabilidade - Casos de Uso

| CU ID | Nome | Atores | Pré-condições | Pós-condições | RF Relacionados | Prioridade |
|-------|------|--------|---------------|---------------|-----------------|-----------|
| CU-001 | Cadastrar Quarto | Gerente | Autenticado, Nº único | Quarto criado | RF-M001-M004 | 🔴 Crítica |
| CU-002 | Listar Quartos | Gerente, Recepcionista | Autenticado | Lista exibida | RF-M002 | 🔴 Crítica |
| CU-003 | Editar Quarto | Gerente | Autenticado, Quarto existe | Quarto atualizado | RF-M003 | 🔴 Crítica |
| CU-004 | Cadastrar Hóspede | Recepcionista | Autenticado, CPF único | Hóspede criado | RF-M005-M007 | 🔴 Crítica |
| CU-005 | Criar Reserva | Recepcionista | Autenticado, Quarto LIVRE | Reserva criada, Quarto OCUPADO | RF-M008-M015 | 🔴 Crítica |
| CU-006 | Editar Reserva | Recepcionista | Autenticado, Reserva existe | Reserva atualizada | RF-M010 | 🔴 Crítica |
| CU-007 | Cancelar Reserva | Recepcionista, Gerente | Autenticado, Reserva ATIVA | Reserva CANCELADA, Quarto LIVRE | RF-S003-S004 | 🟡 Alta |
| CU-008 | Alterar Disponibilidade | Gerente | Autenticado, Quarto existe | Status atualizado | RF-M011 | 🔴 Crítica |
| CU-009 | Buscar Hóspede | Recepcionista, Gerente | Autenticado | Hóspedes filtrados | RF-S019 | 🟡 Alta |

---

## 15. Dependências Entre Casos de Uso

```
CU-001 (Cadastrar Quarto)
  ↓
CU-005 (Criar Reserva) ← precisa de CU-004
  ↓                          ↑
CU-006 (Editar Reserva)   CU-004 (Cadastrar Hóspede)
  ↓
CU-007 (Cancelar Reserva)
  ↓
CU-008 (Alterar Disponibilidade)

CU-002 (Listar Quartos)
CU-003 (Editar Quarto)
CU-009 (Buscar Hóspede)
```

---

## 16. Fluxo de Negócio Completo: "Hospedagem Completa"

```
Ator             Ação                             Sistema             Resultado
═════════════════════════════════════════════════════════════════════════════

Gerente ────────→ CU-001: Cadastra quarto        ←──────────────────  Quarto criado
                 (quartos 101-110)

Recepcionista ──→ CU-004: Cadastra hóspede      ←──────────────────  Hóspede criado
                 (João Silva - CPF 123.456...)

Recepcionista ──→ CU-005: Cria reserva           ←──────────────────  Reserva criada
                 (Quarto 102, João, 20-25 fev)     Quarto 102 = OCUPADO

                 Cliente entra no hotel (check-in)

Gerente ────────→ CU-008: Marca quarto 103      ←──────────────────  Quarto para limpeza
                 como MANUTENÇÃO

                 Cliente usa o quarto por 5 noites

                 Cliente sai do hotel (check-out)

Gerente ────────→ CU-007: Cancelar reserva      ←──────────────────  Reserva CANCELADA
                 (opcionalmente, se necessário)   Quarto 102 = LIVRE
                 
                 OU apenas:

Gerente ────────→ CU-008: Marca quarto 102      ←──────────────────  Quarto marcado
                 como MANUTENÇÃO_LIMPEZA          para limpeza

Gerente Limpeza → Limpa quarto 102

Gerente ────────→ CU-008: Marca quarto 102      ←──────────────────  Quarto pronto
                 como LIVRE                        para próxima reserva

Recepcionista ──→ CU-002: Listar quartos        ←──────────────────  Quarto 102 está
                                                    LIVRE e pronto
```

---

## 17. Resumo e Estatísticas

### Total de Casos de Uso: 9

| Tipo | Quantidade | Story Points |
|------|-----------|--------------|
| Crítico (Must Have) | 6 | 38 |
| Alto (Should Have) | 2 | 18 |
| Baixo (Could Have) | 1 | 13 |
| **TOTAL** | **9** | **69** |

### Atores Envolvidos: 3
- Gerente de Hotel
- Recepcionista
- Gerente de Limpeza

### Casos de Uso por Ator

| Ator | Casos |
|------|-------|
| Gerente de Hotel | CU-001, CU-002, CU-003, CU-008 |
| Recepcionista | CU-002, CU-004, CU-005, CU-006, CU-007, CU-009 |
| Gerente de Limpeza | CU-008 (visualização) |

---

**Versão**: 1.0  
**Data**: 16 de fevereiro de 2026  
**Total de Casos de Uso**: 9  
**Total de Fluxos Especificados**: 20+  
**Status**: Pronto para Implementação
