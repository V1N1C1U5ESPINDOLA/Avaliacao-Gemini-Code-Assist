# Histórias de Usuário

## 1. Cadastro de Quartos
**Como** recepcionista do hotel,
**eu quero** cadastrar um novo quarto com todas as informações necessárias,
**para que** ele fique disponível para reservas.

### Critérios de Aceitação
- **Given** que estou na tela de cadastro de quartos,
  **When** preencho todos os campos obrigatórios e salvo,
  **Then** o quarto deve ser adicionado à lista de quartos.
- **Given** que estou na tela de cadastro de quartos,
  **When** tento salvar sem preencher campos obrigatórios,
  **Then** o sistema deve exibir uma mensagem de erro.

---

## 2. Listagem e Edição de Quartos
**Como** recepcionista do hotel,
**eu quero** visualizar e editar a lista de quartos,
**para que** possa manter as informações sempre atualizadas.

### Critérios de Aceitação
- **Given** que estou na tela de listagem de quartos,
  **When** clico no ícone de lápis de um quarto,
  **Then** devo ser direcionado para a tela de edição daquele quarto.
- **Given** que estou na tela de edição de quarto,
  **When** altero informações e salvo,
  **Then** as alterações devem ser refletidas na lista de quartos.

---

## 3. Cadastro de Hóspedes
**Como** recepcionista do hotel,
**eu quero** cadastrar hóspedes com nome, sobrenome, CPF e e-mail,
**para que** possa associá-los às reservas.

### Critérios de Aceitação
- **Given** que estou na tela de cadastro de hóspedes,
  **When** preencho todos os campos obrigatórios e salvo,
  **Then** o hóspede deve ser adicionado à lista de hóspedes.
- **Given** que estou na tela de cadastro de hóspedes,
  **When** tento salvar sem preencher campos obrigatórios,
  **Then** o sistema deve exibir uma mensagem de erro.

---

## 4. Listagem de Hóspedes
**Como** recepcionista do hotel,
**eu quero** visualizar a lista de hóspedes cadastrados,
**para que** possa consultar rapidamente os dados dos hóspedes.

### Critérios de Aceitação
- **Given** que estou na tela de hóspedes,
  **When** acesso a lista,
  **Then** devo ver todos os hóspedes cadastrados, exceto o e-mail.

---

## 5. Gestão de Reservas
**Como** recepcionista do hotel,
**eu quero** criar e editar reservas associando hóspedes a quartos,
**para que** possa controlar a ocupação do hotel.

### Critérios de Aceitação
- **Given** que estou na tela de reservas,
  **When** seleciono um quarto e um hóspede e salvo a reserva,
  **Then** a reserva deve ser registrada e o status do quarto atualizado para "Ocupado".
- **Given** que estou na tela de reservas,
  **When** edito uma reserva existente,
  **Then** as alterações devem ser refletidas na lista de reservas e no status do quarto.

---

## 6. Visualização de Disponibilidade
**Como** recepcionista do hotel,
**eu quero** visualizar a disponibilidade dos quartos,
**para que** possa informar rapidamente aos clientes sobre quartos livres, ocupados ou em manutenção/limpeza.

### Critérios de Aceitação
- **Given** que estou na tela de listagem de quartos ou reservas,
  **When** visualizo a coluna de disponibilidade,
  **Then** devo ver claramente o status de cada quarto (Livre, Ocupado, Manutenção e Limpeza).
