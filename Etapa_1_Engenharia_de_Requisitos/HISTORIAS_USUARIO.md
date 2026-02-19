# Sistema de Reserva de Hotel - Histórias de Usuário

## 1. Introdução

Este documento contém todas as histórias de usuário do sistema de reserva de hotel no formato padrão:

```
Como [tipo de usuário]
Eu quero [ação/funcionalidade]
Para que [benefício/valor]
```

Com critérios de aceitação no formato **Gherkin** (Given-When-Then).

---

## 2. Histórias de Usuário - Gestão de Quartos

### US-001: Cadastrar novo quarto com informações básicas

**Prioridade**: 🔴 CRÍTICA (Must Have)  
**Estimativa**: 8 story points  
**Ator**: Gerente de Hotel

**Descrição**:
```
Como Gerente de Hotel
Eu quero cadastrar um novo quarto com número, capacidade, tipo e preço
Para que eu possa gerenciar os quartos disponíveis no hotel
```

**Critérios de Aceitação**:

**AC-001.1**: Validação de número de quarto único
```gherkin
Given que estou no formulário de cadastro de quarto
When eu insiro um número que já existe no sistema
Then devo ver mensagem de erro "Número do quarto já existe"
And o formulário não deve ser submetido
```

**AC-001.2**: Preenchimento e validação de campos obrigatórios
```gherkin
Given que estou no formulário de cadastro de quarto
When eu deixo algum campo obrigatório vazio
Then esses campos devem ser marcados em vermelho
And devo ver mensagem "Este campo é obrigatório"
And o botão "Salvar" deve ficar desabilitado
```

**AC-001.3**: Seleção de tipo de quarto
```gherkin
Given que estou no formulário de cadastro
When eu clico no select "Tipo do quarto"
Then devo ver as opções: "Básico", "Moderno", "Luxo"
And devo poder selecionar uma delas
```

**AC-001.4**: Validação de capacidade
```gherkin
Given que estou preenchendo o campo capacidade
When eu insiro um valor inválido (0, negativo, ou texto)
Then devo ver mensagem de erro "Capacidade deve ser um número entre 1 e 10"
And o campo deve ficar em vermelho
```

**AC-001.5**: Validação de preço
```gherkin
Given que estou preenchendo o campo "Preço por diária"
When eu insiro um preço negativo ou zero
Then devo ver mensagem "Preço deve ser maior que zero"
And o campo deve ser marcado em vermelho
```

**AC-001.6**: Sucesso no cadastro
```gherkin
Given que todos os campos estão preenchidos corretamente
When eu clico no botão "Salvar"
Then devo ver mensagem de sucesso "Quarto cadastrado com sucesso"
And devo ser redirecionado para a lista de quartos
And o quarto apareça com status "LIVRE"
And a data_criacao deve estar registrada no banco
```

---

### US-002: Selecionar amenidades do quarto

**Prioridade**: 🔴 CRÍTICA (Must Have)  
**Estimativa**: 3 story points  
**Ator**: Gerente de Hotel

**Descrição**:
```
Como Gerente de Hotel
Eu quero selecionar amenidades do quarto (Frigobar, Café da manhã, Ar-condicionado, TV)
Para que eu registre as características e serviços inclusos em cada quarto
```

**Critérios de Aceitação**:

**AC-002.1**: Checkboxes para amenidades
```gherkin
Given que estou no formulário de cadastro de quarto
When eu visualizo a seção de amenidades
Then devo ver 4 checkboxes: "Frigobar", "Café da manhã", "Ar-condicionado", "TV"
And todos devem estar inicialmente deselecionados (exceto AC e TV que vêm marcados)
```

**AC-002.2**: Marcar e desmarcar amenidades
```gherkin
Given que estou no formulário de cadastro
When eu clico no checkbox "Frigobar"
Then ele deve ficar marcado
And eu devo poder desmarcar clicando novamente
```

**AC-002.3**: Preservar estado das amenidades
```gherkin
Given que selecionei algumas amenidades
When eu clico em "Salvar"
Then o quarto deve ser criado com as amenidades selecionadas
And ao editar o quarto, as amenidades marcadas anteriormente devem estar selecionadas
```

---

### US-003: Adicionar camas ao quarto

**Prioridade**: 🔴 CRÍTICA (Must Have)  
**Estimativa**: 5 story points  
**Ator**: Gerente de Hotel

**Descrição**:
```
Como Gerente de Hotel
Eu quero adicionar tipos de cama ao quarto (Solteiro, Casal King, Casal Queen)
Para que eu especifique exatamente quais tipos de cama estão disponíveis em cada quarto
```

**Critérios de Aceitação**:

**AC-003.1**: Seção de camas visível
```gherkin
Given que estou no formulário de cadastro de quarto
When eu rolo para baixo
Then devo ver uma seção "Camas" com um select e botão "+ Adicionar Cama"
```

**AC-003.2**: Adicionar múltiplas camas
```gherkin
Given que estou na seção de camas
When eu seleciono "Solteiro" no select e clico "+ Adicionar Cama"
Then devo ver "1x Solteiro" adicionado à lista
And o select deve resetar para a opção padrão
And eu devo poder adicionar mais camas
```

**AC-003.3**: Validação de cama obrigatória
```gherkin
Given que estou preenchendo o formulário de quarto
When eu tento salvar sem adicionar nenhuma cama
Then devo ver mensagem de erro "Adicione pelo menos uma cama"
And o formulário não deve ser submetido
```

**AC-003.4**: Remover cama da lista
```gherkin
Given que adicionei "2x Solteiro" e "1x Casal Queen"
When eu clico no ícone de lixeira próximo a uma cama
Then um modal de confirmação deve aparecer
And ao confirmar, a cama deve ser removida da lista
```

**AC-003.5**: Camas persistem no banco
```gherkin
Given que criei um quarto com "1x Casal King" e "1x Solteiro"
When eu salvo o quarto
Then o sistema deve criar 2 registros na tabela CAMA
And ambos devem referenciar o quarto criado (FK)
```

---

### US-004: Listar quartos com informações principais

**Prioridade**: 🔴 CRÍTICA (Must Have)  
**Estimativa**: 5 story points  
**Ator**: Gerente de Hotel e Recepcionista

**Descrição**:
```
Como Gerente de Hotel e Recepcionista
Eu quero listar todos os quartos com suas informações principais
Para que eu possa visualizar rápidamente o status dos quartos
```

**Critérios de Aceitação**:

**AC-004.1**: Tabela com colunas corretas
```gherkin
Given que acesso a página "Gestão de Quartos"
When a página carrega
Then devo ver uma tabela com colunas: "Número", "Tipo", "Preço", "Disponibilidade", "Ações"
And a tabela deve estar preenchida com todos os quartos cadastrados
```

**AC-004.2**: Status de disponibilidade colorido
```gherkin
Given que vejo a lista de quartos
When visualizo a coluna "Disponibilidade"
Then quartos "LIVRE" devem ter chip verde
And quartos "OCUPADO" devem ter chip vermelho
And quartos "MANUTENÇÃO_LIMPEZA" devem ter chip amarelo
```

**AC-004.3**: Paginar resultados
```gherkin
Given que existem 75 quartos no sistema
When a página carrega
Then devo ver no máximo 10 quartos por página
And controles de paginação devem aparecer no rodapé da tabela
And eu devo poder navegar entre páginas
```

**AC-004.4**: Ordenar por coluna
```gherkin
Given que vejo a tabela de quartos
When eu clico no header "Número"
Then a tabela deve ordenar por número (crescente)
And ao clicar novamente, deve ordenar decrescente
And um ícone de seta deve indicar direção atual
```

---

### US-005: Filtrar quartos por disponibilidade

**Prioridade**: 🟡 ALTA (Should Have)  
**Estimativa**: 3 story points  
**Ator**: Gerente de Hotel e Recepcionista

**Descrição**:
```
Como Gerente de Hotel e Recepcionista
Eu quero filtrar quartos por disponibilidade (Livre, Ocupado, Manutenção)
Para que eu possa visualizar rapidamente quais quartos estão disponíveis para reserva
```

**Critérios de Aceitação**:

**AC-005.1**: Filtro visível na página
```gherkin
Given que estou na lista de quartos
When a página carrega
Then devo ver um select "Filtrar por disponibilidade"
And ele deve ter opções: "Todos", "Livre", "Ocupado", "Manutenção e Limpeza"
```

**AC-005.2**: Filtrar quartos livres
```gherkin
Given que estou na lista de quartos
When eu seleciono "Livre"
Then a tabela deve mostrar apenas quartos com status "LIVRE"
And o contador deve mostrar "5 de 20 quartos" (exemplo)
```

**AC-005.3**: Retornar a todos os quartos
```gherkin
Given que tenho um filtro aplicado
When eu seleciono "Todos" no filtro
Then a tabela deve mostrar todos os quartos novamente
```

---

### US-006: Editar quarto existente

**Prioridade**: 🔴 CRÍTICA (Must Have)  
**Estimativa**: 5 story points  
**Ator**: Gerente de Hotel

**Descrição**:
```
Como Gerente de Hotel
Eu quero editar informações de um quarto existente
Para que eu possa atualizações dados quando houver mudanças
```

**Critérios de Aceitação**:

**AC-006.1**: Acessar formulário de edição
```gherkin
Given que estou na lista de quartos
When eu clico no ícone de lápis de um quarto
Then um modal ou página de edição deve abrir
And o formulário deve estar preenchido com os dados atuais do quarto
```

**AC-006.2**: Modificar informações
```gherkin
Given que estou no formulário de edição
When eu mudo o preço de 150 para 180
And clico em "Atualizar"
Then devo ver mensagem de sucesso "Quarto atualizado"
And o preço deve ser atualizado na lista
And a alteração deve ser refletida no banco de dados
```

**AC-006.3**: Não permitir duplicação de número
```gherkin
Given que estou editando o quarto 101
When eu tentar mudar o número para 102 (que já existe)
Then devo ver mensagem de erro "Número já existe"
And o quarto não deve ser atualizado
```

**AC-006.4**: Editar amenidades
```gherkin
Given que estou editando um quarto
When eu desmarco o checkbox "Frigobar"
And clico em "Atualizar"
Then o quarto deve ser atualizado sem frigobar
And ao reabrir o formulário, o checkbox deve estar desmarcado
```

**AC-006.5**: Gerenciar camas na edição
```gherkin
Given que estou editando um quarto que tem "1x Casal King"
When eu remove essa cama e adiciono "2x Solteiro"
And clico em "Atualizar"
Then a cama King deve ser deletada da tabela CAMA
And as 2 camas Solteiro devem ser inseridas
```

---

### US-007: Alterar disponibilidade do quarto

**Prioridade**: 🔴 CRÍTICA (Must Have)  
**Estimativa**: 3 story points  
**Ator**: Gerente de Hotel e Recepcionista

**Descrição**:
```
Como Gerente de Hotel e Recepcionista
Eu quero alterar manualmente o status de disponibilidade de um quarto
Para que eu possa marcar quartos para manutenção, limpeza ou liberar para uso
```

**Critérios de Aceitação**:

**AC-007.1**: Opção de mudar status
```gherkin
Given que vejo um quarto na lista
When eu clico no chip de disponibilidade ou num botão próximo
Then um dropdown deve aparecer com opções: "Livre", "Ocupado", "Manutenção e Limpeza"
```

**AC-007.2**: Confirmar mudança de status
```gherkin
Given que cliquei para mudar status de "Livre" para "Manutenção e Limpeza"
When seleciono "Manutenção e Limpeza"
Then devo ver uma confirmação rápida "Status atualizado"
And o chip deve mudar de cor imediatamente
```

**AC-007.3**: Restrição: não ocupar quarto reservado
```gherkin
Given que um quarto tem uma reserva ativa "OCUPADO"
When eu trato de marcar como "Manutenção e Limpeza"
Then devo ver aviso "Não é possível: quarto tem reserva ativa"
And o status não deve mudar
```

---

## 3. Histórias de Usuário - Gestão de Hóspedes

### US-008: Cadastrar novo hóspede

**Prioridade**: 🔴 CRÍTICA (Must Have)  
**Estimativa**: 5 story points  
**Ator**: Recepcionista e Gerente

**Descrição**:
```
Como Recepcionista e Gerente
Eu quero cadastrar um novo hóspede com nome, sobrenome, CPF e email
Para que eu possa criar reservas vinculadas a esse hóspede
```

**Critérios de Aceitação**:

**AC-008.1**: Formulário com campos obrigatórios
```gherkin
Given que estou no formulário "Cadastro de Hóspede"
When a página carrega
Then devo ver campos: "Nome", "Sobrenome", "CPF", "Email"
And todos os campos devem estar vazios inicialmente
```

**AC-008.2**: Validação de CPF
```gherkin
Given que estou preenchendo o CPF
When eu insiro "123.456.789-00" (CPF com dígito verificador inválido)
Then devo ver mensagem de erro "CPF inválido"
And o campo deve ser marcado em vermelho
```

**AC-008.3**: Validar CPF único
```gherkin
Given que um hóspede com CPF "123.456.789-10" já existe
When eu tento cadastrar outro com mesmo CPF
Then devo ver mensagem "CPF já cadastrado"
And um link para "Visualizar hóspede existente"
```

**AC-008.4**: Validação de email
```gherkin
Given que estou preenchendo o email
When eu insiro "email-invalido"
Then devo ver mensagem "Email inválido"
And o campo deve ser marcado em vermelho
```

**AC-008.5**: Validação de nome e sobrenome
```gherkin
Given que estou preenchendo Nome ou Sobrenome
When eu deixo em branco ou insiro menos de 3 caracteres
Then devo ver mensagem "Mínimo 3 caracteres"
And o campo deve ser marcado em vermelho
```

**AC-008.6**: Cadastro bem-sucedido
```gherkin
Given que todos os campos estão preenchidos corretamente
When eu clico em "Salvar"
Then devo ver mensagem "Hóspede cadastrado com sucesso"
And devo ser redirecionado para lista de hóspedes
And o novo hóspede deve aparecer na lista
```

---

### US-009: Listar hóspedes cadastrados

**Prioridade**: 🔴 CRÍTICA (Must Have)  
**Estimativa**: 3 story points  
**Ator**: Recepcionista e Gerente

**Descrição**:
```
Como Recepcionista e Gerente
Eu quero listar todos os hóspedes cadastrados
Para que eu possa visualizar e gerenciar os dados dos hóspedes
```

**Critérios de Aceitação**:

**AC-009.1**: Tabela com colunas corretas
```gherkin
Given que acesso a página "Gestão de Hóspedes"
When a página carrega
Then devo ver tabela com colunas: "Nome", "Sobrenome", "CPF"
And a coluna "Email" NÃO deve aparecer
And todos os hóspedes devem estar listados
```

**AC-009.2**: Paginação de resultados
```gherkin
Given que existem 50 hóspedes no sistema
When a página carrega
Then devo ver até 10 hóspedes por página
And controles de paginação devem estar visíveis
```

**AC-009.3**: Ordenar por coluna
```gherkin
Given que vejo a tabela de hóspedes
When eu clico no header "Nome"
Then a tabela deve ordenar alfabeticamente (A-Z)
And ao clicar novamente, deve ordenar (Z-A)
```

---

### US-010: Buscar hóspede por nome ou CPF

**Prioridade**: 🟡 ALTA (Should Have)  
**Estimativa**: 3 story points  
**Ator**: Recepcionista e Gerente

**Descrição**:
```
Como Recepcionista e Gerente
Eu quero buscar um hóspede por nome ou CPF
Para que eu encontre rapidamente o hóspede que preciso
```

**Critérios de Aceitação**:

**AC-010.1**: Campo de busca visível
```gherkin
Given que estou na lista de hóspedes
When a página carrega
Then devo ver um campo "Buscar por nome ou CPF"
And um botão "Buscar" ou ícone de lupa
```

**AC-010.2**: Buscar por nome
```gherkin
Given que estou no campo de busca
When eu digito "João" e pressiono Enter
Then a tabela deve filtrar mostrando apenas hóspedes com "João" no nome
And o contador deve mostrar "2 de 50 resultados"
```

**AC-010.3**: Buscar por CPF
```gherkin
Given que estou no campo de busca
When eu digito "123.456.789-10"
Then a tabela deve mostrar apenas o hóspede com esse CPF
```

**AC-010.4**: Limpar filtro
```gherkin
Given que tenho um filtro de busca ativo
When eu clico em "Limpar" ou excluo todo o texto
Then a tabela deve voltar a mostrar todos os hóspedes
```

---

### US-011: Editar dados de hóspede

**Prioridade**: 🟡 ALTA (Should Have)  
**Estimativa**: 3 story points  
**Ator**: Gerente e Recepcionista

**Descrição**:
```
Como Gerente e Recepcionista
Eu quero editar informações de um hóspede (exceto CPF)
Para que eu possa corrigir dados incorretos ou atualizados
```

**Critérios de Aceitação**:

**AC-011.1**: Acessar edição
```gherkin
Given que estou na lista de hóspedes
When eu clico em um hóspede ou num botão de edição
Then um formulário deve abrir com dados atuais preenchidos
```

**AC-011.2**: Editar nome e sobrenome
```gherkin
Given que estou no formulário de edição
When eu mudo o nome de "João" para "João Paulo"
And clico em "Atualizar"
Then devo ver "Hóspede atualizado com sucesso"
And a lista deve refletir a mudança
```

**AC-011.3**: Editar email
```gherkin
Given que estou editando um hóspede
When eu mudo o email para um novo válido
And clico em "Atualizar"
Then o email deve ser atualizado no banco
```

**AC-011.4**: CPF não deve sido editável
```gherkin
Given que estou no formulário de edição
When visualizo o campo "CPF"
Then ele deve estar desabilitado (readonly)
And devo ver mensagem "CPF não pode ser alterado"
```

---

## 4. Histórias de Usuário - Gestão de Reservas

### US-012: Criar nova reserva

**Prioridade**: 🔴 CRÍTICA (Must Have)  
**Estimativa**: 8 story points  
**Ator**: Recepcionista

**Descrição**:
```
Como Recepcionista
Eu quero criar uma nova reserva vinculando um quarto, hóspede e datas
Para que eu registre a ocupação do quarto no sistema
```

**Critérios de Aceitação**:

**AC-012.1**: Formulário de reserva com campos obrigatórios
```gherkin
Given que estou na página "Criar Reserva"
When a página carrega
Then devo ver campos: "Quarto", "Hóspede", "Data de Entrada", "Data de Saída"
And um botão "Confirmar Reserva"
```

**AC-012.2**: Listar apenas quartos LIVRES
```gherkin
Given que clico no select "Quarto"
When a lista carrega
Then devo ver apenas quartos com status "LIVRE"
And quartos "OCUPADO" ou "MANUTENÇÃO_LIMPEZA" NÃO devem aparecer
```

**AC-012.3**: Autocomplete de hóspede
```gherkin
Given que estou no campo "Hóspede"
When eu digito "Jo"
Then devo ver sugestões de hóspedes começando com "Jo"
And eu devo poder selecionar um da lista
```

**AC-012.4**: Validação de datas
```gherkin
Given que estou preenchendo as datas
When eu insiro uma data de entrada MAIOR que data de saída
Then devo ver erro "Data de entrada deve ser menor que data de saída"
And o formulário não deve ser submetido
```

**AC-012.5**: Validação de data passada
```gherkin
Given que estou preenchendo a data de entrada
When eu seleciono uma data anterior a hoje
Then devo ver erro "Data não pode ser no passado"
And o campo deve ser marcado em vermelho
```

**AC-012.6**: Verificar conflito de datas
```gherkin
Given que seleciono um quarto que tem reserva de 2026-02-20 a 2026-02-25
When eu tento criar uma reserva de 2026-02-23 a 2026-02-27
Then devo ver aviso "Quarto indisponível para este período"
And sugestões de datas livres devem aparecer
```

**AC-012.7**: Calcular valor total automaticamente
```gherkin
Given que preenchi: quarto com R$ 100/dia, entrada 2026-02-20, saída 2026-02-23
When eu visualizo o formulário
Then devo ver "Diárias: 3" e "Valor Total: R$ 300,00"
And o cálculo deve ser (data_saída - data_entrada) × preço_diária
```

**AC-012.8**: Confirmar e criar reserva
```gherkin
Given que todos os campos estão preenchidos corretamente
When eu clico em "Confirmar Reserva"
Then devo ver modal de confirmação com resumo
And um botão "Confirmar Tudo" deve aparecer
And ao confirmar, a reserva deve ser criada com status "ATIVA"
And o quarto deve mudar para "OCUPADO"
And mensagem de sucesso com número da reserva deve aparecer
```

---

### US-013: Listar reservas

**Prioridade**: 🔴 CRÍTICA (Must Have)  
**Estimativa**: 5 story points  
**Ator**: Recepcionista e Gerente

**Descrição**:
```
Como Recepcionista e Gerente
Eu quero listar todas as reservas com informações principais
Para que eu possa acompanhar as reservas do hotel
```

**Critérios de Aceitação**:

**AC-013.1**: Tabela com colunas corretas
```gherkin
Given que acesso "Gestão de Reservas"
When a página carrega
Then devo ver tabela com colunas: "Quarto", "Tipo", "Hóspede", "Disponibilidade", "Ações"
And todas as reservas devem estar listadas
```

**AC-013.2**: Chip de disponibilidade com cores
```gherkin
Given que vejo a coluna "Disponibilidade"
When visualizo os chips
Then "OCUPADO" deve ser vermelho
And "LIVRE" deve ser verde
And "MANUTENÇÃO_LIMPEZA" deve ser amarelo
```

**AC-013.3**: Botão de ação (editar)
```gherkin
Given que vejo uma reserva na tabela
When eu clico no ícone de lápis
Then um modal de edição deve abrir
And os dados atuais da reserva devem aparecer
```

**AC-013.4**: Paginação e ordenação
```gherkin
Given que estou vendo a lista de reservas
When a página carrega
Then devo poder ordenar por "Quarto", "Hóspede", "Data"
And paginação deve estar disponível
```

---

### US-014: Editar reserva existente

**Prioridade**: 🔴 CRÍTICA (Must Have)  
**Estimativa**: 8 story points  
**Ator**: Recepcionista

**Descrição**:
```
Como Recepcionista
Eu quero editar uma reserva existente (datas, hóspede ou quarto)
Para que eu possa corrigir erros ou atender mudanças solicitadas
```

**Critérios de Aceitação**:

**AC-014.1**: Abrir formulário de edição
```gherkin
Given que cliquei numa reserva para editar
When o formulário abre
Then devo ver os dados atuais preenchidos
And campos: "Quarto", "Hóspede", "Data Entrada", "Data Saída"
```

**AC-014.2**: Mudar datas da reserva
```gherkin
Given que estou editando uma reserva
When eu mudo "Data de Entrada" de 2026-02-20 para 2026-02-21
And clico em "Atualizar"
Then a reserva deve ser atualizada
And o valor total deve ser recalculado
And mensagem de sucesso deve aparecer
```

**AC-014.3**: Mudar quarto
```gherkin
Given que estou editando uma reserva
When eu seleciono um novo quarto
And esse novo quarto está disponível no período
Then a mudança deve ser permitida
And o quarto anterior volta ao status "LIVRE"
And o novo quarto muda para "OCUPADO"
```

**AC-014.4**: Mudar hóspede
```gherkin
Given que estou editando uma reserva
When eu seleciono um novo hóspede
And clico em "Atualizar"
Then a reserva deve ser vinculada ao novo hóspede
And mensagem de confirmação deve aparecer
```

**AC-014.5**: Validação durante edição
```gherkin
Given que estou editando datas
When eu insiro uma data que conflita com outra reserva (e não é a mesma reserva)
Then devo ver aviso "Conflito de datas"
And sugestões de datas livres devem aparecer
```

---

### US-015: Cancelar reserva

**Prioridade**: 🟡 ALTA (Should Have)  
**Estimativa**: 5 story points  
**Ator**: Recepcionista e Gerente

**Descrição**:
```
Como Recepcionista e Gerente
Eu quero cancelar uma reserva
Para que eu libere o quarto para outras reservas
```

**Critérios de Aceitação**:

**AC-015.1**: Opção de cancelar
```gherkin
Given que estou vendo uma reserva ativa
When eu clico num botão "Cancelar" ou seleciono essa ação
Then um modal de confirmação deve aparecer
```

**AC-015.2**: Confirmação e motivo
```gherkin
Given que cliquei para cancelar
When um modal aparece
Then devo ver "Tem certeza que deseja cancelar?"
And um campo opcional "Motivo do cancelamento"
And botões "Cancelar Reserva" e "Voltar"
```

**AC-015.3**: Liberar quarto
```gherkin
Given que confirmei o cancelamento
When a ação é processada
Then o status da reserva deve mudar para "CANCELADA"
And o status do quarto deve voltar para "LIVRE"
And mensagem de sucesso deve aparecer
```

**AC-015.4**: Histórico mantido
```gherkin
Given que cancelei uma reserva
When eu acesso a lista de reservas
Then a reserva cancelada deve aparecer com status "CANCELADA"
And histórico deve ser mantido para auditoria
```

---

### US-016: Filtrar e buscar reservas por período

**Prioridade**: 🟡 ALTA (Should Have)  
**Estimativa**: 5 story points  
**Ator**: Gerente e Recepcionista

**Descrição**:
```
Como Gerente e Recepcionista
Eu quero filtrar reservas por período de datas
Para que eu possa ver reservas de um período específico
```

**Critérios de Aceitação**:

**AC-016.1**: Filtro de período visível
```gherkin
Given que estou na lista de reservas
When a página carrega
Then devo ver campos "Data de Entrada (De)" e "Data de Entrada (Até)"
And um botão "Filtrar"
```

**AC-016.2**: Filtrar por período
```gherkin
Given que preenchei datas de 2026-02-01 a 2026-02-29
When eu clico em "Filtrar"
Then a tabela deve mostrar apenas reservas com entrada neste período
And contador deve mostrar "12 de 45 reservas"
```

**AC-016.3**: Buscar por número de quarto
```gherkin
Given que estou na lista de reservas
When eu clico num field de busca e digito "102"
Then a tabela deve filtrar mostrando apenas reservas do quarto 102
```

**AC-016.4**: Buscar por nome de hóspede
```gherkin
Given que estou na busca
When eu digito "Maria"
Then devo ver apenas reservas de hóspedes com "Maria" no nome
```

---

## 5. Histórias de Usuário - Dashboard/Relatórios (Could Have)

### US-017: Visualizar disponibilidade de quartos

**Prioridade**: 🟢 BAIXA (Could Have)  
**Estimativa**: 5 story points  
**Ator**: Gerente

**Descrição**:
```
Como Gerente
Eu quero ver um dashboard com disponibilidade dos quartos
Para que eu tenha uma visão rápida do status do hotel
```

**Critérios de Aceitação**:

**AC-017.1**: Cards de status
```gherkin
Given que acesso o dashboard
When a página carrega
Then devo ver cards mostrando:
| Livre | 12 quartos |
| Ocupado | 8 quartos |
| Manutenção | 2 quartos |
And números devem atualizar conforme mudanças
```

---

### US-018: Gerar relatório de ocupação

**Prioridade**: 🟢 BAIXA (Could Have)  
**Estimativa**: 8 story points  
**Ator**: Gerente

**Descrição**:
```
Como Gerente
Eu quero gerar relatório de ocupação por período
Para que eu possa acompanhar performance
```

**Critérios de Aceitação**:

**AC-018.1**: Seleção de período
```gherkin
Given que estou na página de relatórios
When seleciono datas de início e fim
Then um botão "Gerar Relatório" deve estar disponível
```

**AC-018.2**: Exibição do relatório
```gherkin
Given que gerei um relatório
When aparece
Then devo ver: ocupação por quarto, taxa de ocupação geral, receita total
And um botão "Exportar PDF" deve estar disponível
```

---

## 6. Resumo de Histórias de Usuário

### Contagem por Prioridade

| Prioridade | Histórias | Story Points |
|-----------|-----------|--------------|
| 🔴 CRÍTICA (Must Have) | 10 | 48 |
| 🟡 ALTA (Should Have) | 6 | 28 |
| 🟢 BAIXA (Could Have) | 2 | 13 |
| **TOTAL** | **18** | **89** |

### Contagem por Módulo

| Módulo | Histórias | Story Points |
|--------|-----------|--------------|
| Gestão de Quartos | 7 | 28 |
| Gestão de Hóspedes | 4 | 14 |
| Gestão de Reservas | 5 | 31 |
| Dashboard/Relatórios | 2 | 13 |
| **TOTAL** | **18** | **89** |

---

## 7. Mapeamento: Histórias → Requisitos Funcionais

| US ID | Requisito | RF ID |
|-------|-----------|-------|
| US-001 a US-007 | Gestão de Quartos | RF-M001 a RF-M011, RF-S005-S009 |
| US-008 a US-011 | Gestão de Hóspedes | RF-M005 a RF-M007, RF-S001, RF-S018-S019 |
| US-012 a US-016 | Gestão de Reservas | RF-M008 a RF-M015, RF-S003-S004, RF-S010-S011 |
| US-017 a US-018 | Dashboard/Relatórios | RF-C004, RF-C006 |

---

## 8. Estimativa de Esforço (Velocidade de Sprint)

Supondo sprint de 2 semanas com 10 pontos de velocidade:

**Fase 1 - MVP (Must Have)**: 48 pontos
- Sprint 1-2: US-001, US-003, US-004, US-008, US-009 (25 pontos)
- Sprint 3: US-012, US-005 (13 pontos)
- Sprint 4: US-002, US-006, US-007 (11 pontos)
- **Total**: ~5 sprints

**Fase 2 (Should Have)**: 28 pontos
- Sprint 6-7: Restante das histórias
- **Total**: ~3 sprints

**Fase 3 (Could Have)**: 13 pontos
- Sprint 8: Relatórios e dashboards

---

## 9. Rastreamento de Status

Exemplo de planilha/quadro:

| US ID | Título | Status | Sprint | Responsável |
|-------|--------|--------|--------|-------------|
| US-001 | Cadastrar novo quarto | Backlog | - | - |
| US-002 | Selecionar amenidades | Backlog | - | - |
| US-003 | Adicionar camas | Backlog | - | - |

---

**Versão**: 1.0  
**Data**: 16 de fevereiro de 2026  
**Total de Histórias**: 18  
**Total de Critérios de Aceitação**: 85+  
**Status**: Pronto para Sprint Planning
