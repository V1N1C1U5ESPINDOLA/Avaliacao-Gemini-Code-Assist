# Sistema de Reserva de Hotel - Requisitos Funcionais

## 1. Visão Geral

Sistema de gerenciamento de reservas para um único hotel, composto por três módulos principais: Gestão de Quartos, Gestão de Hóspedes e Gestão de Reservas.

### Características Técnicas
- **Interface**: Web
- **Paleta de Cores**: Verde e Azul
- **Componentes**: Modernos

---

## 2. Módulo: Gestão de Quartos

### 2.1 Cadastro de Quarto

O formulário de cadastro deve conter os seguintes campos:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| Número do quarto | Input | Sim | Identificador único do quarto |
| Capacidade | Input | Sim | Quantidade de hóspedes que o quarto acomoda |
| Tipo do quarto | Select | Sim | Opções: Básico, Moderno, Luxo |
| Preço por diária | Input | Sim | Valor da diária do quarto |
| Frigobar | Checkbox | Não | Indica se o quarto possui frigobar |
| Café da manhã incluso | Checkbox | Não | Indica se inclui café da manhã |
| Ar-condicionado | Checkbox | Não | Indica se o quarto possui ar-condicionado |
| TV | Checkbox | Não | Indica se o quarto possui TV |

#### 2.1.1 Seção de Camas

Dentro do cadastro de quarto, existirá uma seção específica para gerenciar camas:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| Tipo de cama | Select | Sim | Opções: Solteiro, Casal King, Casal Queen |

**Nota**: Deve ser possível adicionar múltiplas camas ao mesmo quarto.

### 2.2 Lista de Quartos

Tabela exibindo todos os quartos cadastrados com as seguintes colunas:

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| Número do quarto | Número | Identificador do quarto |
| Tipo do quarto | Texto | Tipo cadastrado (Básico, Moderno, Luxo) |
| Preço por diária | Número | Valor da diária formatado |
| Disponibilidade | Select | Opções: Ocupado, Livre, Manutenção e Limpeza |
| Ação | Botão | Ícone de lápis para editar o quarto |

---

## 3. Módulo: Gestão de Hóspedes

### 3.1 Cadastro de Hóspede

Formulário para registro de novos hóspedes:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| Nome | Input | Sim | Primeiro nome do hóspede |
| Sobrenome | Input | Sim | Último nome do hóspede |
| CPF | Input | Sim | CPF do hóspede (formato: XXX.XXX.XXX-XX) |
| Email | Input | Sim | Endereço de email para contato |

### 3.2 Lista de Hóspedes

Tabela exibindo todos os hóspedes cadastrados:

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| Nome | Texto | Primeiro nome do hóspede |
| Sobrenome | Texto | Último nome do hóspede |
| CPF | Texto | CPF do hóspede |

**Nota**: O email não é exibido nesta listagem.

---

## 4. Módulo: Gestão de Reservas

### 4.1 Lista de Reservas

Tabela exibindo todas as reservas com as seguintes colunas:

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| Número do quarto | Número | ID do quarto reservado |
| Tipo do quarto | Texto | Tipo de quarto (Básico, Moderno, Luxo) |
| Nome do Hóspede | Texto | Nome completo do hóspede |
| Disponibilidade | Chip | Status: Ocupado, Livre, Manutenção e Limpeza |
| Ação | Botão | Ícone de lápis para editar a reserva |

**Nota**: As reservas devem ser vinculadas a hóspedes e quartos existentes no sistema.

---

## 5. Requisitos Adicionais

### 5.1 Validações

- **Número do quarto**: Deve ser único
- **CPF**: Deve ser único e validado (formato e dígitos verificadores)
- **Email**: Deve estar em formato válido
- **Capacidade**: Deve ser um número positivo
- **Preço**: Deve ser um valor decimal positivo

### 5.2 Interface Visual

- Paleta de cores baseada em **verde** e **azul**
- Componentes modernos e responsivos
- Layout intuitivo e fácil de usar
- Feedback visual para ações do usuário

### 5.3 Estado dos Quartos

A disponibilidade pode ser:
- **Livre**: Quarto disponível para reserva
- **Ocupado**: Quarto atualmente ocupado
- **Manutenção e Limpeza**: Quarto indisponível para manutenção ou limpeza

---

## 6. Fluxos Principais

### 6.1 Fluxo de Cadastro de Quarto
1. Usuário acessa "Gestão de Quartos"
2. Clica em "Novo Quarto"
3. Preenche formulário com dados do quarto
4. Adiciona informações de camas
5. Confirma cadastro
6. Quarto aparece na lista

### 6.2 Fluxo de Cadastro de Hóspede
1. Usuário acessa "Gestão de Hóspedes"
2. Clica em "Novo Hóspede"
3. Preenche formulário com dados pessoais
4. Confirma cadastro
5. Hóspede aparece na lista

### 6.3 Fluxo de Criação de Reserva
1. Usuário acessa "Gestão de Reservas"
2. Clica em "Nova Reserva"
3. Seleciona um quarto disponível
4. Seleciona um hóspede
5. Define período de reserva
6. Confirma reserva
7. Reserva aparece na lista

---

## 7. Matriz de Requisitos

| ID | Requisito | Módulo | Prioridade | Status |
|----|-----------|--------|-----------|--------|
| REQ-001 | Cadastro de Quarto | Gestão de Quartos | Alta | Pendente |
| REQ-002 | Listagem de Quartos | Gestão de Quartos | Alta | Pendente |
| REQ-003 | Edição de Quarto | Gestão de Quartos | Alta | Pendente |
| REQ-004 | Cadastro de Hóspede | Gestão de Hóspedes | Alta | Pendente |
| REQ-005 | Listagem de Hóspedes | Gestão de Hóspedes | Alta | Pendente |
| REQ-006 | Edição de Hóspede | Gestão de Hóspedes | Média | Pendente |
| REQ-007 | Cadastro de Reserva | Gestão de Reservas | Alta | Pendente |
| REQ-008 | Listagem de Reservas | Gestão de Reservas | Alta | Pendente |
| REQ-009 | Edição de Reserva | Gestão de Reservas | Alta | Pendente |
| REQ-010 | Validação de Dados | Todos | Alta | Pendente |
| REQ-011 | Interface com cores verde/azul | Todos | Média | Pendente |

---

**Versão**: 1.0  
**Data de criação**: 16 de fevereiro de 2026  
**Autor**: Especificação de Requisitos
