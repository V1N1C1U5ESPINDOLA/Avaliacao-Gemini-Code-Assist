# Sistema de Reserva de Hotel - Estratégia de Cobertura de Testes

## 1. Objetivos
Garantir a integridade das regras de negócio (RN), a estabilidade das transações de reserva e a conformidade da interface visual com os requisitos definidos.

## 2. Pirâmide de Testes

### 2.1 Testes Unitários (Base)
*   **Escopo**: Entidades de Domínio e Camada de Serviço (`Application Services`).
*   **Foco**: Validação de Regras de Negócio isoladas e Invariantes.
*   **Implementação**: 
    *   Uso de **Mocks/Fakes** para Repositórios via `InMemoryRepository`.
    *   Validação do **State Pattern** (transições de status de quarto e reserva).
    *   Validação do **Strategy Pattern** (cálculos de preço).
*   **Ferramentas**: Jest.

### 2.2 Testes de Integração (Meio)
*   **Escopo**: Comunicação entre módulos (Quartos ↔ Reservas ↔ Hóspedes).
*   **Foco**: Efeitos colaterais e consistência de estado global.
*   **Cenário Crítico**: O fluxo onde a criação de uma reserva altera o status do quarto no repositório de quartos.
*   **Ferramentas**: Jest + Supertest (para rotas API).

### 2.3 Testes de Componente (Frontend)
*   **Escopo**: Componentes React isolados.
*   **Foco**: Lógica de formulário, validação de inputs (UX) e renderização de cores (Chips de status).
*   **Ferramentas**: React Testing Library + Jest.

### 2.4 Testes End-to-End - E2E (Topo)
*   **Escopo**: Jornada do usuário (Caminho Feliz).
*   **Foco**: Fluxo crítico: Cadastro de Hóspede -> Seleção de Quarto -> Confirmação de Reserva -> Verificação de Ocupação.
*   **Ferramentas**: Cypress ou Playwright.

## 3. Diretrizes Técnicas

### 3.1 SOLID & Clean Code nos Testes
*   **DIP (Inversão de Dependência)**: Os serviços dependem de interfaces (`IQuartoRepository`), permitindo que injetemos versões "em memória" nos testes, eliminando a necessidade de um banco de dados real e aumentando a velocidade.
*   **Nomenclatura Descritiva**: Testes devem ser lidos como especificações. Ex: `shouldNotAllowRoomStatusTransitionFromOccupiedToLivreWithoutLimpeza`.

### 3.2 Cobertura de Requisitos (Rastreabilidade)
*   **RN001 (Número Único)**: Coberto por teste unitário no `QuartoService`.
*   **RN009 (CPF Válido)**: Coberto por teste unitário na entidade `Hospede`.
*   **RN013 (Quarto Livre para Reserva)**: Coberto por teste de integração no `ReservaService`.
*   **Design (Cores Verde/Azul)**: Coberto por testes de componente via inspeção de classes CSS/Tailwind.

## 4. Metas de Cobertura

| Camada | Meta de Cobertura | Tipo de Teste |
| :--- | :--- | :--- |
| **Domínio (Entities)** | 100% | Unitário |
| **Serviços (Application)** | 90% | Unitário/Integração |
| **API (Controllers)** | 80% | Integração (HTTP) |
| **Frontend (Componentes)** | 70% | Componente |

## 5. Manutenção
Os testes devem ser executados em cada Pull Request via pipeline de CI (Continuous Integration). Qualquer quebra em testes críticos (Reservas) bloqueia o merge.

---