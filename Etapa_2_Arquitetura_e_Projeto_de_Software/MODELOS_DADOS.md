# Sistema de Reserva de Hotel - Modelos de Dados

## 1. Diagrama ER (Entity-Relationship)

```
┌─────────────────────┐
│      HOSPEDE        │
├─────────────────────┤
│ id (PK)             │
│ nome                │
│ sobrenome           │
│ cpf (UNIQUE)        │
│ email               │
│ data_cadastro       │
└─────────────────────┘
         │
         │ 1:N
         │
         ├─────────────────────────┐
         │                         │
         ↓                         ↓
┌─────────────────────┐   ┌──────────────────┐
│       QUARTO        │   │      RESERVA     │
├─────────────────────┤   ├──────────────────┤
│ id (PK)             │   │ id (PK)          │
│ numero (UNIQUE)     │   │ quarto_id (FK)   │
│ capacidade          │   │ hospede_id (FK)  │
│ tipo                │   │ data_entrada     │
│ preco_diaria        │   │ data_saida       │
│ frigobar            │   │ status           │
│ cafe_manha          │   │ data_criacao     │
│ ar_condicionado     │   │ valor_total      │
│ tv                  │   └──────────────────┘
│ disponibilidade     │
│ data_cadastro       │
└─────────────────────┘
         │
         │ 1:N
         │
         ↓
┌─────────────────────┐
│        CAMA         │
├─────────────────────┤
│ id (PK)             │
│ quarto_id (FK)      │
│ tipo                │
│ data_criacao        │
└─────────────────────┘
```

---

## 2. Tabela: HOSPEDE

### Descrição
Armazena informações dos hóspedes do hotel.

### Estrutura

| Campo | Tipo | Tamanho | Constraints | Descrição |
|-------|------|---------|-------------|-----------|
| id | INTEGER | - | PK, AUTO_INCREMENT | Identificador único |
| nome | VARCHAR | 100 | NOT NULL | Primeiro nome |
| sobrenome | VARCHAR | 100 | NOT NULL | Último nome |
| cpf | VARCHAR | 14 | NOT NULL, UNIQUE | CPF formatado (xxx.xxx.xxx-xx) |
| email | VARCHAR | 150 | NOT NULL | Endereço de email |
| data_cadastro | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | Data de registro |

### Exemplo de Dados
```
id | nome   | sobrenome | cpf           | email                | data_cadastro
1  | João   | Silva     | 123.456.789-10| joao.silva@email.com | 2026-02-16 10:30:00
2  | Maria  | Santos    | 234.567.890-11| maria.santos@email.com| 2026-02-16 11:00:00
```

---

## 3. Tabela: QUARTO

### Descrição
Armazena informações sobre os quartos disponíveis no hotel.

### Estrutura

| Campo | Tipo | Tamanho | Constraints | Descrição |
|-------|------|---------|-------------|-----------|
| id | INTEGER | - | PK, AUTO_INCREMENT | Identificador único |
| numero | INTEGER | - | NOT NULL, UNIQUE | Número do quarto |
| capacidade | INTEGER | - | NOT NULL | Quantidade de hóspedes |
| tipo | ENUM | - | NOT NULL | Básico, Moderno, Luxo |
| preco_diaria | DECIMAL | 10,2 | NOT NULL | Valor da diária |
| frigobar | BOOLEAN | - | DEFAULT FALSE | Possui frigobar |
| cafe_manha | BOOLEAN | - | DEFAULT FALSE | Inclui café da manhã |
| ar_condicionado | BOOLEAN | - | DEFAULT TRUE | Possui ar-condicionado |
| tv | BOOLEAN | - | DEFAULT TRUE | Possui televisão |
| disponibilidade | ENUM | - | DEFAULT 'LIVRE' | Livre, Ocupado, Manutenção e Limpeza |
| data_cadastro | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | Data de registro |

### Enumerações
- **tipo**: BASICO, MODERNO, LUXO
- **disponibilidade**: LIVRE, OCUPADO, MANUTENCAO_LIMPEZA

### Exemplo de Dados
```
id | numero | capacidade | tipo    | preco_diaria | frigobar | cafe_manha | ar_condicionado | tv | disponibilidade | data_cadastro
1  | 101    | 2          | BASICO  | 150.00       | false    | false      | true            | true | LIVRE          | 2026-02-16 10:00:00
2  | 102    | 3          | MODERNO | 250.00       | true     | true       | true            | true | OCUPADO        | 2026-02-16 10:05:00
3  | 201    | 4          | LUXO    | 450.00       | true     | true       | true            | true | MANUTENCAO_LIMPEZA | 2026-02-16 10:10:00
```

---

## 4. Tabela: CAMA

### Descrição
Especifica os tipos de cama disponíveis em cada quarto.

### Estrutura

| Campo | Tipo | Tamanho | Constraints | Descrição |
|-------|------|---------|-------------|-----------|
| id | INTEGER | - | PK, AUTO_INCREMENT | Identificador único |
| quarto_id | INTEGER | - | FK (QUARTO.id) | Referência ao quarto |
| tipo | ENUM | - | NOT NULL | Tipo de cama |
| data_criacao | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | Data de registro |

### Enumerações
- **tipo**: SOLTEIRO, CASAL_KING, CASAL_QUEEN

### Exemplo de Dados
```
id | quarto_id | tipo        | data_criacao
1  | 1         | SOLTEIRO    | 2026-02-16 10:00:00
2  | 1         | SOLTEIRO    | 2026-02-16 10:00:00
3  | 2         | CASAL_QUEEN | 2026-02-16 10:05:00
4  | 2         | SOLTEIRO    | 2026-02-16 10:05:00
```

---

## 5. Tabela: RESERVA

### Descrição
Armazena as reservas realizadas no hotel.

### Estrutura

| Campo | Tipo | Tamanho | Constraints | Descrição |
|-------|------|---------|-------------|-----------|
| id | INTEGER | - | PK, AUTO_INCREMENT | Identificador único |
| quarto_id | INTEGER | - | FK (QUARTO.id), NOT NULL | Referência ao quarto |
| hospede_id | INTEGER | - | FK (HOSPEDE.id), NOT NULL | Referência ao hóspede |
| data_entrada | DATE | - | NOT NULL | Data de check-in |
| data_saida | DATE | - | NOT NULL | Data de check-out |
| status | ENUM | - | DEFAULT 'ATIVA' | Status da reserva |
| valor_total | DECIMAL | 10,2 | GENERATED | Valor total da reserva |
| data_criacao | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | Data de criação |

### Enumerações
- **status**: ATIVA, CONFIRMADA, CANCELADA, CONCLUIDA

### Regras de Negócio
- Uma reserva só pode ser criada se o quarto está LIVRE
- Ao criar uma reserva, o status do quarto muda para OCUPADO
- Ao cancelar uma reserva, o status do quarto volta para LIVRE
- valor_total = número de diárias × preco_diaria do quarto

### Exemplo de Dados
```
id | quarto_id | hospede_id | data_entrada | data_saida | status      | valor_total | data_criacao
1  | 1         | 1          | 2026-02-20   | 2026-02-22 | ATIVA       | 300.00      | 2026-02-16 10:30:00
2  | 2         | 2          | 2026-02-17   | 2026-02-19 | CONFIRMADA  | 500.00      | 2026-02-16 10:35:00
```

---

## 6. Script SQL - Criação de Tabelas

```sql
-- Tabela HOSPEDE
CREATE TABLE hospede (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela QUARTO
CREATE TABLE quarto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero INT NOT NULL UNIQUE,
    capacidade INT NOT NULL,
    tipo ENUM('BASICO', 'MODERNO', 'LUXO') NOT NULL,
    preco_diaria DECIMAL(10, 2) NOT NULL,
    frigobar BOOLEAN DEFAULT FALSE,
    cafe_manha BOOLEAN DEFAULT FALSE,
    ar_condicionado BOOLEAN DEFAULT TRUE,
    tv BOOLEAN DEFAULT TRUE,
    disponibilidade ENUM('LIVRE', 'OCUPADO', 'MANUTENCAO_LIMPEZA') DEFAULT 'LIVRE',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela CAMA
CREATE TABLE cama (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quarto_id INT NOT NULL,
    tipo ENUM('SOLTEIRO', 'CASAL_KING', 'CASAL_QUEEN') NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quarto_id) REFERENCES quarto(id) ON DELETE CASCADE
);

-- Tabela RESERVA
CREATE TABLE reserva (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quarto_id INT NOT NULL,
    hospede_id INT NOT NULL,
    data_entrada DATE NOT NULL,
    data_saida DATE NOT NULL,
    status ENUM('ATIVA', 'CONFIRMADA', 'CANCELADA', 'CONCLUIDA') DEFAULT 'ATIVA',
    valor_total DECIMAL(10, 2),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quarto_id) REFERENCES quarto(id),
    FOREIGN KEY (hospede_id) REFERENCES hospede(id),
    CONSTRAINT check_datas CHECK (data_entrada < data_saida),
    INDEX idx_quarto (quarto_id),
    INDEX idx_hospede (hospede_id),
    INDEX idx_data_entrada (data_entrada),
    INDEX idx_data_saida (data_saida)
);
```

---

## 7. Índices e Performance

### 7.1 Índices Recomendados

| Tabela | Campo(s) | Tipo | Razão |
|--------|----------|------|-------|
| HOSPEDE | cpf | UNIQUE | Validar unicidade |
| QUARTO | numero | UNIQUE | Validar unicidade |
| RESERVA | quarto_id | INDEX | Buscar reservas por quarto |
| RESERVA | hospede_id | INDEX | Buscar reservas por hóspede |
| RESERVA | data_entrada | INDEX | Buscar reservas por período |
| RESERVA | data_saida | INDEX | Buscar reservas por período |

---

## 8. Relacionamentos

### 8.1 HOSPEDE → RESERVA (1:N)
- Um hóspede pode ter múltiplas reservas
- Não há exclusão em cascata (hóspede não é deletado ao cancelar reserva)

### 8.2 QUARTO → CAMA (1:N)
- Um quarto pode ter múltiplas camas
- Ao deletar um quarto, as camas são deletadas (ON DELETE CASCADE)

### 8.3 QUARTO → RESERVA (1:N)
- Um quarto pode ter múltiplas reservas
- A reserva depende da existência do quarto

---

## 9. Validações de Dados

### Nível de Banco de Dados
- CPF único entre hóspedes
- Número de quarto único
- Data de entrada < data de saída em reservas
- Tipos enumerados respeitam os valores válidos

### Nível de Aplicação
- CPF validado (algoritmo do dígito verificador)
- Email em formato válido (regex ou biblioteca)
- Capacidade do quarto > 0
- Preço > 0
- Data de entrada >= data atual

---

**Versão**: 1.0  
**Data de criação**: 16 de fevereiro de 2026  
**Autor**: Especificação de Dados
