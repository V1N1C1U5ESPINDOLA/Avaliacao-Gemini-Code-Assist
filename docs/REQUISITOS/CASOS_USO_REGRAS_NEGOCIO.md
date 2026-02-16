# Sistema de Reserva de Hotel - Casos de Uso e Regras de Negócio

## 1. Casos de Uso Principais

### 1.1 Caso de Uso: Cadastrar Quarto

**Ator Principal**: Gerente do Hotel

**Descrição**: Permite ao gerente registrar um novo quarto no sistema com suas características e amenidades.

**Pré-condições**:
- Usuário está autenticado no sistema
- Usuário possui permissão para adicionar quartos

**Fluxo Principal**:
1. Usuário acessa "Gestão de Quartos"
2. Clica no botão "Novo Quarto"
3. Sistema exibe formulário de cadastro
4. Usuário preenche:
   - Número do quarto (único)
   - Capacidade
   - Tipo (Básico, Moderno, Luxo)
   - Preço por diária
   - Amenidades (Frigobar, Café da manhã, Ar-condicionado, TV)
5. Usuário adiciona tipos de cama (uma ou mais)
6. Usuário clica em "Salvar"
7. Sistema valida dados e persiste no banco
8. Sistema exibe mensagem de sucesso
9. Sistema redireciona para lista de quartos

**Fluxo Alternativo - Validação Falha**:
- 7a. Se algum campo obrigatório está vazio:
  - Sistema marca campo em vermelho
  - Sistema exibe mensagem de erro
  - Usuário corrige dados e tenta novamente

**Fluxo Alternativo - Número Duplicado**:
- 7b. Se número do quarto já existe:
  - Sistema exibe mensagem de erro
  - Usuário modifica número e tenta novamente

**Pós-condições**:
- Novo quarto é criado no banco de dados
- Quarto aparece na lista com status "LIVRE"
- Histórico de criação é registrado

---

### 1.2 Caso de Uso: Listar Quartos

**Ator Principal**: Gerente do Hotel

**Descrição**: Exibe lista de todos os quartos cadastrados com suas informações principais.

**Pré-condições**:
- Usuário está autenticado no sistema

**Fluxo Principal**:
1. Usuário acessa "Gestão de Quartos"
2. Sistema carrega lista de quartos
3. Sistema exibe tabela com colunas:
   - Número do quarto
   - Tipo
   - Preço por diária
   - Disponibilidade
   - Botão de edição
4. Usuário pode:
   - Ordenar por qualquer coluna
   - Filtrar por disponibilidade
   - Buscar por número do quarto
   - Editar um quarto (clicando no ícone de lápis)

**Pós-condições**:
- Usuário visualiza informações atualizadas dos quartos

---

### 1.3 Caso de Uso: Editar Quarto

**Ator Principal**: Gerente do Hotel

**Descrição**: Permite editar informações de um quarto existente.

**Pré-condições**:
- Usuário está autenticado
- Quarto existe no sistema

**Fluxo Principal**:
1. Usuário acessa lista de quartos
2. Clica no ícone de lápis do quarto desejado
3. Sistema carrega formulário com dados atuais
4. Usuário modifica campos necessários
5. Usuário clica em "Atualizar"
6. Sistema valida dados
7. Sistema persiste mudanças
8. Sistema exibe mensagem de sucesso

**Pós-condições**:
- Dados do quarto são atualizados
- Alterações são refletidas imediatamente na lista

---

### 1.4 Caso de Uso: Cadastrar Hóspede

**Ator Principal**: Recepcionista / Gerente

**Descrição**: Registra um novo hóspede no sistema.

**Pré-condições**:
- Usuário está autenticado
- CPF não está duplicado no sistema

**Fluxo Principal**:
1. Usuário acessa "Gestão de Hóspedes"
2. Clica em "Novo Hóspede"
3. Sistema exibe formulário com campos:
   - Nome
   - Sobrenome
   - CPF
   - Email
4. Usuário preenche todos os campos
5. Sistema valida CPF e email
6. Usuário clica em "Salvar"
7. Sistema persiste no banco
8. Sistema exibe mensagem de sucesso

**Fluxo Alternativo - Validação de CPF**:
- 5a. Se CPF é inválido (dígitos verificadores errados):
  - Sistema exibe erro específico
  - Usuário corrige e tenta novamente

**Fluxo Alternativo - CPF Duplicado**:
- 5b. Se CPF já existe:
  - Sistema exibe mensagem informando que hóspede já está cadastrado
  - Sistema oferece opção de gerenciar hóspede existente

**Pós-condições**:
- Novo hóspede é registrado no sistema
- Hóspede aparece na lista

---

### 1.5 Caso de Uso: Criar Reserva

**Ator Principal**: Recepcionista

**Descrição**: Cria uma nova reserva vinculando um hóspede a um quarto por um período.

**Pré-condições**:
- Usuário está autenticado
- Hóspede existe no sistema
- Quarto existe e está LIVRE

**Fluxo Principal**:
1. Usuário acessa "Gestão de Reservas"
2. Clica em "Nova Reserva"
3. Sistema exibe formulário com campos:
   - Seleção de quarto (lista de quartos LIVRES)
   - Seleção de hóspede (autocomplete)
   - Data de entrada
   - Data de saída
4. Usuário preenche todos os campos
5. Sistema calcula número de diárias e valor total
6. Sistema valida:
   - Data de entrada < data de saída
   - Data de entrada >= data atual
   - Quarto está LIVRE no período
7. Usuário clica em "Confirmar Reserva"
8. Sistema muda status do quarto para OCUPADO
9. Sistema cria reserva com status ATIVA
10. Sistema exibe confirmação com número da reserva

**Fluxo Alternativo - Datas Inválidas**:
- 6a. Se período já tem reservas:
  - Sistema exibe aviso
  - Sistema sugere datas disponíveis alternativas

**Pós-condições**:
- Reserva é criada com status ATIVA
- Quarto muda para status OCUPADO
- Hóspede é vinculado à reserva

---

### 1.6 Caso de Uso: Editar Reserva

**Ator Principal**: Recepcionista

**Descrição**: Permite modificar dados de uma reserva (datas, hóspede, quarto).

**Pré-condições**:
- Usuário está autenticado
- Reserva existe

**Fluxo Principal**:
1. Usuário acessa lista de reservas
2. Clica no ícone de lápis da reserva
3. Sistema carrega formulário com dados atuais
4. Usuário pode modificar:
   - Datas da reserva
   - Hóspede
   - Quarto (se houver disponibilidade)
5. Sistema valida mudanças
6. Usuário confirma alterações
7. Sistema atualiza dados
8. Sistema exibe mensagem de sucesso

**Pós-condições**:
- Dados da reserva são atualizados
- Se quarto foi alterado, status dos quartos é atualizado

---

## 2. Regras de Negócio

### 2.1 Gestão de Quartos

**RN001**: Número de Quarto é Único
- Não podem existir dois quartos com o mesmo número
- O sistema deve validar antes de permitir cadastro

**RN002**: Capacidade Mínima
- A capacidade do quarto deve ser no mínimo 1 hóspede
- A capacidade máxima é 10 hóspedes

**RN003**: Preço por Diária
- Preço deve ser maior que zero
- Preço é formatado com 2 casas decimais

**RN004**: Tipos de Quarto
- Apenas 3 tipos são permitidos: Básico, Moderno, Luxo
- Não é possível criar novo tipo sem alterar código

**RN005**: Amenidades
- São opcionais (booleanas)
- Padrão: ar-condicionado e TV geralmente inclusos

**RN006**: Tipos de Cama
- Todo quarto deve ter pelo menos uma cama
- O sistema deve evitar salvar quarto sem camas

**RN007**: Disponibilidade do Quarto
- Livre: Disponível para reserva
- Ocupado: Tem reserva ativa
- Manutenção e Limpeza: Indisponível temporariamente

**RN008**: Alteração de Disponibilidade
- Um quarto só pode ser alterado para "Manutenção e Limpeza" se não tiver reservas ativas
- Gerente pode marcar quarto para limpeza após checkout

---

### 2.2 Gestão de Hóspedes

**RN009**: CPF Único
- Cada hóspede tem um CPF único
- Não podem existir dois hóspedes com mesmo CPF
- CPF é validado com algoritmo de dígito verificador

**RN010**: Email Válido
- Email deve estar em formato válido (padrão RFC 5322)
- Email é obrigatório

**RN011**: Nome e Sobrenome
- Ambos campos são obrigatórios
- Devem conter apenas letras e espaços
- Mínimo 3 caracteres cada

**RN012**: Histórico de Hóspedes
- Uma vez cadastrado, hóspede não pode ser deletado
- Informações podem ser atualizadas
- Mantém ligação histórica com reservas passadas

**RN013**: Hóspede em Múltiplas Reservas
- Um hóspede pode ter múltiplas reservas simultâneas (quartos diferentes)
- Um hóspede pode ter múltiplas reservas em períodos diferentes

---

### 2.3 Gestão de Reservas

**RN014**: Período de Reserva
- Data de entrada deve ser menor que data de saída
- Data de entrada não pode ser anterior à data atual (não retroativo)

**RN015**: Disponibilidade de Quarto para Reserva
- Só é possível reservar quartos em status LIVRE
- O quarto não pode estar reservado no período desejado
- Sistema deve verificar conflitos com outras reservas

**RN016**: Cálculo de Valor Total
- Valor Total = (Data Saída - Data Entrada) × Preço Diária
- Exemplo: 3 noites × R$ 100 = R$ 300
- Deve incluir possíveis taxas no futuro

**RN017**: Status da Reserva
- Ao criar: ATIVA
- Pode ser: CONFIRMADA, CANCELADA, CONCLUIDA
- Transições válidas: ATIVA → CONFIRMADA, ATIVA → CANCELADA, CONFIRMADA → CONCLUIDA

**RN018**: Mudança de Status do Quarto
- Ao criar reserva: status do quarto muda para OCUPADO
- Ao cancelar reserva: status volta para LIVRE
- Ao checkout: possível marcar quarto para limpeza

**RN019**: Cancelamento de Reserva
- Reserva pode ser cancelada se status for ATIVA ou CONFIRMADA
- Ao cancelar: quarto volta ao status LIVRE
- Sistema mantém histórico de cancelamento

**RN020**: Período de Reserva Exclusivo
- Um quarto não pode ter duas reservas sobrepostas
- Sistema valida automaticamente ao criar/editar

**RN021**: Dados Obrigatórios da Reserva
- Quarto: obrigatório
- Hóspede: obrigatório
- Data entrada: obrigatória
- Data saída: obrigatória

---

### 2.4 Validações Gerais

**RN022**: Integridade Referencial
- Não é possível deletar hóspede com reserva ativa
- Deletar quarto deleta suas camas relacionadas

**RN023**: Auditoria
- Todas criações devem registrar: data_criacao
- Todas edições devem registrar: data_atualizacao (futuro)
- Manter histórico de operações críticas

**RN024**: Concorrência
- Sistema deve evitar double-booking
- Usar transações no banco de dados para reservas

---

## 3. Matrix de Rastreabilidade

| ID Requisito | Descrição | Caso de Uso | Regra Negócio | Status |
|--------------|-----------|-----------|---------------|--------|
| REQ-001 | Cadastro Quarto | UC1.1 | RN001-008 | Planejado |
| REQ-002 | Listagem Quartos | UC1.2 | RN007 | Planejado |
| REQ-003 | Edição Quarto | UC1.3 | RN001-008 | Planejado |
| REQ-004 | Cadastro Hóspede | UC1.4 | RN009-013 | Planejado |
| REQ-005 | Listagem Hóspedes | - | RN013 | Planejado |
| REQ-006 | Edição Hóspede | - | RN009-013 | Planejado |
| REQ-007 | Criar Reserva | UC1.5 | RN014-024 | Planejado |
| REQ-008 | Listar Reservas | UC1.6 | RN017-018 | Planejado |
| REQ-009 | Editar Reserva | UC1.6 | RN014-024 | Planejado |
| REQ-010 | Validações | Todos | RN001-024 | Planejado |
| REQ-011 | Interface | Todos | - | Planejado |

---

## 4. Fluxos de Processos de Negócio

### 4.1 Fluxo: Realizar uma Reserva

```
Cliente Ligando
    ↓
Recepcionista Atende
    ↓
Recepcionista Verifica Disponibilidade
    ↓ (se há quarto disponível)
Recepcionista Cadastra Hóspede (se novo)
    ↓
Recepcionista Cria Reserva
- Seleciona quarto
- Define datas
- Calcula valor
    ↓
Sistema Bloqueia Quarto
    ↓
Recepcionista Confirma Reserva
    ↓
Confirmação é Enviada ao Cliente
    ↓
Reserva Ativa no Sistema
```

### 4.2 Fluxo: Check-in de Hóspede

```
Hóspede Chega ao Hotel
    ↓
Recepcionista Verifica Reserva
    ↓
Hóspede Confere Quarto
    ↓
Quarto Marcado como OCUPADO (se não estava)
    ↓
Hóspede Recebe Chave
    ↓
Checkout Esperado em Data Saída
```

### 4.3 Fluxo: Checkout e Limpeza

```
Data de Saída
    ↓
Hóspede Deixa Quarto
    ↓
Recepcionista Marca Quarto como MANUTENÇÃO_LIMPEZA
    ↓
Gerente de Limpeza Limpa Quarto
    ↓
Gerente Marca Quarto como LIVRE
    ↓
Quarto Pronto para Nova Reserva
```

---

**Versão**: 1.0  
**Data de criação**: 16 de fevereiro de 2026  
**Autor**: Especificação de Casos de Uso
