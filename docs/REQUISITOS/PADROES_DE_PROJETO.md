# Sistema de Reserva de Hotel - Padrões de Projeto (Design Patterns)

Este documento detalha os padrões de projeto aplicados ao sistema para garantir manutenibilidade, testabilidade e escalabilidade.

## 1. Padrões Criacionais

### 1.1 Factory Pattern (Fábrica)
- **Onde se aplica**: Instanciação de objetos complexos como `Quarto` (que possui uma lista de `Cama`).
- **Problema**: Evitar que a lógica de criação de um agregado complexo fique espalhada pelos Controllers ou Services.
- **Solução**: `QuartoFactory` cria o objeto Quarto garantindo que ele venha com as amenidades padrão e a lista de camas validada.

## 2. Padrões Estruturais

### 2.1 Repository Pattern (Repositório)
- **Onde se aplica**: Camada de Acesso a Dados (DAL).
- **Problema**: Acoplamento direto entre a lógica de negócio e o ORM/SQL.
- **Solução**: Isolamos as queries no `ReservaRepository`, `QuartoRepository`, etc. O Service solicita dados sem saber se vêm do PostgreSQL, de um cache ou de um arquivo.

### 2.2 DTO (Data Transfer Object)
- **Onde se aplica**: Comunicação entre Frontend -> Controller -> Service.
- **Problema**: Expor a estrutura interna do banco de dados (Entidades) diretamente na API (risco de segurança e acoplamento).
- **Solução**: Objetos como `CriarReservaDTO` filtram exatamente o que pode ser recebido.

## 3. Padrões Comportamentais

### 3.1 Strategy Pattern (Estratégia)
- **Onde se aplica**: Cálculo de Preços e Descontos (`ReservaService`).
- **Problema**: Múltiplos `if/else` para calcular o valor total (descontos de feriado, estadias longas, taxas de fim de semana).
- **Solução**: Interface `PrecificacaoStrategy`.
    - `PrecoBaseStrategy`: Cálculo padrão.
    - `DescontoLongaEstadiaStrategy`: Aplica 10% para > 7 dias.
    - `TaxaAltaTemporadaStrategy`: Aplica acréscimo em datas específicas.

### 3.2 State Pattern (Estado)
- **Onde se aplica**: Gestão de Status de Quartos e Reservas.
- **Problema**: Permitir transições de status inválidas (ex: mudar quarto de "Ocupado" direto para "Livre" sem passar por "Limpeza").
- **Solução**: O comportamento do objeto muda de acordo com o estado atual (`QuartoState`, `ReservaState`). Uma reserva no estado `CANCELADA` não pode ser editada.

### 3.3 Observer Pattern (Observador)
- **Onde se aplica**: Eventos de Pós-Reserva.
- **Problema**: O `ReservaService` fica muito grande se tiver que enviar e-mail, atualizar estoque e gerar log ao mesmo tempo.
- **Solução**: O Service dispara o evento `ReservaConfirmada`. Diferentes "Listeners" (E-mailService, LogService, QuartoService) reagem a esse evento de forma independente.

---