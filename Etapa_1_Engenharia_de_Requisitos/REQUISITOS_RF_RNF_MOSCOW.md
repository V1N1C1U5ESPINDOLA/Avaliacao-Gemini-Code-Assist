# Sistema de Reserva de Hotel - Requisitos Funcionais e Não Funcionais (MoSCoW)

## 1. Introdução

Este documento classifica os requisitos do sistema de reserva de hotel utilizando a metodologia **MoSCoW**:

- **M** - **Must Have** (Deve ter): Requisitos essenciais, sem os quais o sistema não funciona
- **S** - **Should Have** (Deveria ter): Requisitos importantes que agregam valor significativo
- **C** - **Could Have** (Poderia ter): Requisitos desejáveis que melhoram a experiência
- **W** - **Won't Have** (Não terá): Requisitos explicitamente descartados para esta versão

---

## 2. Requisitos Funcionais (RF)

### 2.1 MUST HAVE (M) - Essencial para v1.0

| ID | Descrição | Módulo | Complexidade |
|-----|-----------|--------|--------------|
| **RF-M001** | Cadastrar novo quarto com número, capacidade, tipo, preço e amenidades | Gestão de Quartos | Alta |
| **RF-M002** | Listar todos os quartos com coluna de disponibilidade (Livre, Ocupado, Manutenção e Limpeza) | Gestão de Quartos | Média |
| **RF-M003** | Editar dados de quarto existente (ícone de lápis na lista) | Gestão de Quartos | Média |
| **RF-M004** | Adicionar múltiplas camas a um quarto com tipos específicos (Solteiro, Casal King, Casal Queen) | Gestão de Quartos | Média |
| **RF-M005** | Cadastrar novo hóspede com nome, sobrenome, CPF e email | Gestão de Hóspedes | Baixa |
| **RF-M006** | Listar hóspedes com nome, sobrenome e CPF (sem email) | Gestão de Hóspedes | Baixa |
| **RF-M007** | Validar CPF com algoritmo de dígito verificador | Gestão de Hóspedes | Média |
| **RF-M008** | Criar nova reserva vinculando quarto, hóspede, datas de entrada e saída | Gestão de Reservas | Alta |
| **RF-M009** | Listar reservas com número do quarto, tipo, nome do hóspede e disponibilidade em chip | Gestão de Reservas | Média |
| **RF-M010** | Editar reserva existente (datas, quarto ou hóspede) | Gestão de Reservas | Alta |
| **RF-M011** | Alterar disponibilidade do quarto (Livre, Ocupado, Manutenção e Limpeza) | Gestão de Quartos | Média |
| **RF-M012** | Validar que data_entrada < data_saída | Gestão de Reservas | Baixa |
| **RF-M013** | Validar que quarto está LIVRE antes de criar reserva | Gestão de Reservas | Alta |
| **RF-M014** | Impedir reservas em períodos com conflito de datas | Gestão de Reservas | Alta |
| **RF-M015** | Calcular automaticamente valor total da reserva (diárias × preço) | Gestão de Reservas | Baixa |
| **RF-M016** | Validar número de quarto único | Gestão de Quartos | Baixa |
| **RF-M017** | Validar CPF único entre hóspedes | Gestão de Hóspedes | Baixa |
| **RF-M018** | Validar formato de email válido | Gestão de Hóspedes | Baixa |
| **RF-M019** | Fornecer feedback visual de sucesso ao salvar dados | Todos | Baixa |
| **RF-M020** | Exibir mensagens de erro descritivas para campos inválidos | Todos | Baixa |
| **RF-M021** | Marcar campos em vermelho quando há erro de validação | Todos | Baixa |

**Total MUST HAVE: 21 requisitos**

---

### 2.2 SHOULD HAVE (S) - Importante para v1.0

| ID | Descrição | Módulo | Complexidade |
|-----|-----------|--------|--------------|
| **RF-S001** | Editar dados de hóspede existente | Gestão de Hóspedes | Média |
| **RF-S002** | Cancelar reserva existente | Gestão de Reservas | Média |
| **RF-S003** | Atualizar status do quarto para OCUPADO ao criar reserva | Gestão de Reservas | Média |
| **RF-S004** | Restaurar status do quarto para LIVRE ao cancelar reserva | Gestão de Reservas | Média |
| **RF-S005** | Filtrar quartos por disponibilidade na lista | Gestão de Quartos | Média |
| **RF-S006** | Filtrar quartos por tipo na lista | Gestão de Quartos | Média |
| **RF-S007** | Filtrar quartos por faixa de preço na lista | Gestão de Quartos | Média |
| **RF-S008** | Ordenar lista de quartos por coluna (número, tipo, preço) | Gestão de Quartos | Baixa |
| **RF-S009** | Buscar quarto por número na lista | Gestão de Quartos | Baixa |
| **RF-S010** | Autocomplete de hóspede ao criar reserva | Gestão de Reservas | Média |
| **RF-S011** | Exibir datas disponíveis sugeridas ao conflitar com outras reservas | Gestão de Reservas | Alta |
| **RF-S012** | Validar capacidade mínima do quarto (≥1 hóspede) | Gestão de Quartos | Baixa |
| **RF-S013** | Validar capacidade máxima do quarto (≤10 hóspedes) | Gestão de Quartos | Baixa |
| **RF-S014** | Exigir pelo menos 1 cama ao cadastrar quarto | Gestão de Quartos | Média |
| **RF-S015** | Impedir deletar hóspede com reserva ativa | Gestão de Hóspedes | Média |
| **RF-S016** | Mostrar informações resumidas (campo de leitura) de quarto selecionado | Gestão de Reservas | Baixa |
| **RF-S017** | Mostrar informações resumidas de hóspede selecionado | Gestão de Reservas | Baixa |
| **RF-S018** | Ordenar lista de hóspedes por nome | Gestão de Hóspedes | Baixa |
| **RF-S019** | Buscar hóspede por nome ou CPF | Gestão de Hóspedes | Baixa |
| **RF-S020** | Ordenar lista de reservas por data de entrada | Gestão de Reservas | Baixa |

**Total SHOULD HAVE: 20 requisitos**

---

### 2.3 COULD HAVE (C) - Legal ter em v2.0 ou futuro

| ID | Descrição | Módulo | Complexidade |
|-----|-----------|--------|--------------|
| **RF-C001** | Exportar lista de quartos para PDF/Excel | Gestão de Quartos | Média |
| **RF-C002** | Exportar lista de hóspedes para PDF/Excel | Gestão de Hóspedes | Média |
| **RF-C003** | Exportar lista de reservas para PDF/Excel | Gestão de Reservas | Média |
| **RF-C004** | Gerar relatório de ocupação por período | Gestão de Reservas | Alta |
| **RF-C005** | Gerar relatório de receita por período | Gestão de Reservas | Alta |
| **RF-C006** | Buscar reservas por período de datas | Gestão de Reservas | Média |
| **RF-C007** | Buscar reservas por número de quarto | Gestão de Reservas | Baixa |
| **RF-C008** | Buscar reservas por nome de hóspede | Gestão de Reservas | Baixa |
| **RF-C009** | Permitir upload de foto do quarto | Gestão de Quartos | Alta |
| **RF-C010** | Adicionar descrição detalhada do quarto | Gestão de Quartos | Baixa |
| **RF-C011** | Adicionar avaliações de hóspedes | Gestão de Reservas | Alta |
| **RF-C012** | Sistema de avisos/alertas para manutenção necessária | Gestão de Quartos | Média |
| **RF-C013** | Histórico de preços dos quartos | Gestão de Quartos | Média |
| **RF-C014** | Aplicar descontos temporários a quartos | Gestão de Quartos | Média |
| **RF-C015** | Sistema de pontos/loyalidade para hóspedes | Gestão de Hóspedes | Alta |
| **RF-C016** | Notificação por email para confirmação de reserva | Gestão de Reservas | Alta |
| **RF-C017** | Notificação por email 24h antes do check-in | Gestão de Reservas | Alta |
| **RF-C018** | Integração com gateway de pagamento | Gestão de Reservas | Alta |
| **RF-C019** | Gerador de código QR para chave digital | Gestão de Quartos | Média |
| **RF-C020** | Dashboard com indicadores principais (ocupação, receita, etc) | Dashboard | Alta |

**Total COULD HAVE: 20 requisitos**

---

### 2.4 WON'T HAVE (W) - Fora do escopo v1.0

| ID | Descrição | Módulo | Razão |
|-----|-----------|--------|-------|
| **RF-W001** | Sistema de múltiplos hotéis | Múltiplo | Escopo definido para hotel único |
| **RF-W002** | Integração com OTA (Booking, Airbnb, etc) | Múltiplo | Requer desenvolvimento específico |
| **RF-W003** | Sincronização com calendários (Google, Outlook) | Múltiplo | Fora do escopo inicial |
| **RF-W004** | Chat em tempo real com hóspedes | Suporte | Fora do escopo inicial |
| **RF-W005** | Sistema de telefonia VoIP | Suporte | Requer infraestrutura específica |
| **RF-W006** | Integração com TV por assinatura do hotel | Hotel | Não é sistema de software |
| **RF-W007** | Controle de acesso eletrônico de portas | Hotel | Requer hardware específico |
| **RF-W008** | Integração com sistema POS de restaurante | Hotel | Sistema separado |
| **RF-W009** | Agendamento de serviços (limpeza, manutenção) | Hotel | Fora do escopo inicial |
| **RF-W010** | Gestão de funcionários e escala de trabalho | RH | Sistema separado |

**Total WON'T HAVE: 10 requisitos**

---

## 3. Requisitos Não Funcionais (RNF)

### 3.1 MUST HAVE (M) - Essencial para v1.0

| ID | Descrição | Categoria | Métrica/Meta |
|-----|-----------|-----------|--------------|
| **RNF-M001** | Interface web responsiva | Acessibilidade | Funcionamento em Desktop, Tablet, Mobile |
| **RNF-M002** | Paleta de cores verde e azul | Design | Verde #00A86B, Azul #0066CC |
| **RNF-M003** | Componentes modernos e intuitivos | UX | Sem componentes desatualizados |
| **RNF-M004** | Segurança: validação em backend | Segurança | Todas as entradas validadas no servidor |
| **RNF-M005** | Integridade referencial no banco | Dados | Constraints FK implementadas |
| **RNF-M006** | Transações ACID para operações críticas | Banco de Dados | Double-booking impossível |
| **RNF-M007** | Prevenção de SQL Injection | Segurança | Prepared statements obrigatório |
| **RNF-M008** | Controle de acesso básico | Segurança | Autenticação mínima no sistema |
| **RNF-M009** | Mensagens de erro claras e úteis | UX | Não exibir erros genéricos |
| **RNF-M010** | Tempo de carregamento inicial < 3 segundos | Performance | Página inicial |
| **RNF-M011** | Suporte a navegadores modernos | Compatibilidade | Chrome, Firefox, Edge, Safari (últimas 2 versões) |
| **RNF-M012** | Registro de auditoria (data_criacao) | Auditoria | Rastreamento de criação de dados |
| **RNF-M013** | Confirmação antes de ações destrutivas | UX | Modal de confirmação para delete |
| **RNF-M014** | Feedback visual em ações (loading, sucesso) | UX | Indicadores para ações assíncronas |
| **RNF-M015** | Banco de dados relacional | Arquitetura | PostgreSQL ou MySQL ou SQLite |

**Total MUST HAVE: 15 requisitos**

---

### 3.2 SHOULD HAVE (S) - Importante para v1.0

| ID | Descrição | Categoria | Métrica/Meta |
|-----|-----------|-----------|--------------|
| **RNF-S001** | Layout intuitivo com menu lateral | UX | Navegação clara entre módulos |
| **RNF-S002** | Tema escuro opcional | UX | Modo claro/escuro |
| **RNF-S003** | Ícones representativos em botões | UX | Ícone de lápis para editar, lixo para deletar |
| **RNF-S004** | Tooltips em campos complexos | UX | Ajuda contextual |
| **RNF-S005** | Suporte a teclado (Tab, Enter) | Acessibilidade | Navegação sem mouse |
| **RNF-S006** | Contraste de cores acessível | Acessibilidade | WCAG 2.1 AA (4.5:1) |
| **RNF-S007** | Labels associadas a campos | Acessibilidade | Campos com <label for=""> |
| **RNF-S008** | Suporte a screen readers | Acessibilidade | ARIA labels básicos |
| **RNF-S009** | Respostas da API em JSON | Arquitetura | RESTful API padrão |
| **RNF-S010** | Paginação em listas grandes | Performance | 50 itens por página |
| **RNF-S011** | Cache de dados em frontend | Performance | Evitar requisições desnecessárias |
| **RNF-S012** | Validação em tempo real em formulários | UX | Feedback imediato |
| **RNF-S013** | Suporte a múltiplos idiomas | UX | Estrutura i18n preparada |
| **RNF-S014** | Logs estruturados no servidor | Operações | Sistema de logs bem organizado |
| **RNF-S015** | Backup automático do banco | Operações | Diariamente |
| **RNF-S016** | Documentação de API | Desenvolvimento | Swagger/OpenAPI |
| **RNF-S017** | Documentação de código (comentários relevantes) | Desenvolvimento | Métodos complexos documentados |
| **RNF-S018** | Testes unitários | QA | Cobertura ≥ 70% |
| **RNF-S019** | Testes de integração | QA | Fluxos críticos testados |
| **RNF-S020** | Suporte a múltiplas resoluções | Compatibilidade | 320px até 4K |

**Total SHOULD HAVE: 20 requisitos**

---

### 3.3 COULD HAVE (C) - Legal ter em v2.0 ou futuro

| ID | Descrição | Categoria | Métrica/Meta |
|-----|-----------|-----------|--------------|
| **RNF-C001** | Sincronização em tempo real com WebSocket | Performance | Atualizar listas sem refresh |
| **RNF-C002** | Modo offline com sincronização posterior | Disponibilidade | Funcionar sem internet temporariamente |
| **RNF-C003** | Aplicativo mobile nativo (iOS/Android) | Plataforma | App store e Google Play |
| **RNF-C004** | Progressive Web App (PWA) | Plataforma | Instalação como app |
| **RNF-C005** | Autenticação por SSO | Segurança | Google, Microsoft, SAML |
| **RNF-C006** | Autenticação de dois fatores (2FA) | Segurança | SMS ou autenticador |
| **RNF-C007** | Criptografia de dados em repouso | Segurança | Dados sensíveis encriptados |
| **RNF-C008** | Criptografia de dados em trânsito | Segurança | HTTPS obrigatório |
| **RNF-C009** | GDPR compliance | Segurança | Direito ao esquecimento |
| **RNF-C010** | Conformidade LGPD (Lei Geral de Proteção de Dados) | Segurança | Proteção de dados pessoais |
| **RNF-C011** | Analytics e rastreamento de uso | Operações | Google Analytics ou similar |
| **RNF-C012** | CDN para distribuição de conteúdo estático | Performance | CloudFlare ou AWS CloudFront |
| **RNF-C013** | Cache de servidor (Redis) | Performance | Reduzir carga de BD |
| **RNF-C014** | Compressão de imagens | Performance | WebP com fallback JPEG |
| **RNF-C015** | Service Worker para offline | Performance | Cache de dados críticos |
| **RNF-C016** | Implementação de CI/CD | DevOps | GitHub Actions ou GitLab CI |
| **RNF-C017** | Testes E2E | QA | Selenium ou Cypress |
| **RNF-C018** | Testes de carga | QA | K6 ou JMeter |
| **RNF-C019** | Monitoramento e alertas 24/7 | Operações | Sentry, DataDog ou similar |
| **RNF-C020** | Integração com APM (Application Performance Monitoring) | Operações | New Relic ou Datadog |

**Total COULD HAVE: 20 requisitos**

---

### 3.4 WON'T HAVE (W) - Fora do escopo v1.0

| ID | Descrição | Categoria | Razão |
|-----|-----------|-----------|-------|
| **RNF-W001** | Suporte a Internet Explorer 11 | Compatibilidade | Navegador descontinuado |
| **RNF-W002** | Suporte a dispositivos muito antigos | Compatibilidade | Android < 6.0, iOS < 12 |
| **RNF-W003** | Arquitetura de microsserviços | Arquitetura | Monolítico mais apropriado para v1 |
| **RNF-W004** | Implementação de GraphQL | Arquitetura | REST suficiente para v1 |
| **RNF-W005** | Integração com blockchain | Tecnologia | Sem necessidade técnica |
| **RNF-W006** | Inteligência artificial para recomendações | Tecnologia | Sem dados suficientes |
| **RNF-W007** | Machine Learning para previsão de demanda | Negócio | Fora do escopo inicial |

**Total WON'T HAVE: 7 requisitos**

---

## 4. Resumo Executivo

### 4.1 Total de Requisitos por Categoria

| Tipo | Must Have | Should Have | Could Have | Won't Have | **Total** |
|------|-----------|-------------|-----------|-----------|----------|
| **Funcionais** | 21 | 20 | 20 | 10 | **71** |
| **Não-Funcionais** | 15 | 20 | 20 | 7 | **62** |
| **TOTAL GERAL** | **36** | **40** | **40** | **17** | **133** |

### 4.2 Distribuição por Prioridade

```
Must Have (CRITICAL)
├── RF-M: 21 requisitos funcionais essenciais
└── RNF-M: 15 requisitos não-funcionais essenciais
    Total: 36 requisitos para v1.0 MÍNIMO

Should Have (HIGH)  
├── RF-S: 20 requisitos funcionais importantes
└── RNF-S: 20 requisitos não-funcionais importantes
    Total: 40 requisitos para v1.0 COMPLETO

Could Have (MEDIUM)
├── RF-C: 20 requisitos funcionais desejáveis
└── RNF-C: 20 requisitos não-funcionais desejáveis
    Total: 40 requisitos para v2.0+

Won't Have (OUT OF SCOPE)
├── RF-W: 10 requisitos funcionais descartados
└── RNF-W: 7 requisitos não-funcionais descartados
    Total: 17 requisitos deixados para o futuro
```

### 4.3 Complexidade por Prioridade

| Prioridade | RF Baixa | RF Média | RF Alta | RNF Baixa | RNF Média | RNF Alta |
|-----------|----------|----------|---------|-----------|-----------|----------|
| **Must Have** | 6 | 9 | 6 | 9 | 5 | 1 |
| **Should Have** | 7 | 10 | 3 | 10 | 8 | 2 |
| **Could Have** | 3 | 7 | 10 | 0 | 7 | 13 |

---

## 5. Roadmap Recomendado

### Fase 1 - v1.0 MVP (Must Have)
**Duração sugerida**: 3-4 sprints (12-16 semanas)

**Funcionalidades criticas**:
- ✅ Gestão completa de quartos (CRUD)
- ✅ Gestão completa de hóspedes (CRUD + edição)
- ✅ Gestão de reservas (criar, editar, listar)
- ✅ Validações essenciais
- ✅ Interface responsiva com cores verde/azul
- ✅ Banco de dados relacional

**RNF não-negociáveis**:
- Segurança básica (validação, SQL injection)
- Performance < 3s carregamento
- ACID transactions
- Suporte navegadores modernos

---

### Fase 2 - v1.1 (Should Have)
**Duração sugerida**: 2-3 sprints (8-12 semanas)
- Edição de hóspede
- Cancelamento de reserva
- Filtros e buscas avançadas
- Testes (unitário + integração)
- Documentação de API

---

### Fase 3 - v2.0 (Could Have)
**Duração sugerida**: 4-6 sprints (16-24 semanas)
- Relatórios e dashboards
- Integração de pagamento
- Notificações por email
- PWA/Mobile app
- Analytics

---

## 6. Matriz de Dependências

### Dependências Críticas

```
Database Schema (Tabelas)
    ↓
Backend APIs (CRUD)
    ↓
Frontend Forms (Cadastro)
    ↓
Validações (RF)
    ↓
Testes (RNF-S018/S019)
    ↓
Deploy (v1.0 Release)
```

### Pré-requisitos por Módulo

**Gestão de Quartos** → Sem dependência externa

**Gestão de Hóspedes** → Depende apenas de tabela HOSPEDE

**Gestão de Reservas** → Depende de QUARTO + HOSPEDE (FKs)

---

## 7. Critérios de Aceitação Genéricos

### Para Requisitos Funcionais (RF)
- ✅ Funcionalidade implementada conforme descrito
- ✅ Validações funcionando (frontend + backend)
- ✅ Banco de dados persistindo dados corretamente
- ✅ Mensagens de erro claras
- ✅ Teste unitário ou integração passando

### Para Requisitos Não-Funcionais (RNF)
- ✅ Métrica atendida (tempo, compatibilidade, cobertura)
- ✅ Performance testada
- ✅ Compatibilidade verificada
- ✅ Documentação atualizada
- ✅ Sem regressões

---

## 8. Notas Importantes

1. **Priorização MoSCoW é dinâmica**: Pode ser revisada com stakeholders
2. **Escopo de v1.0**: Focar em 36 requisitos MUST HAVE primeiro
3. **Testes são obrigatórios**: Mínimo RNF-S018 (70% cobertura)
4. **Validações em dois níveis**: Frontend (UX) + Backend (segurança)
5. **Database-driven**: Modelagem de dados é crítica
6. **Segurança first**: Validar todas as entradas no servidor

---

**Versão**: 1.0  
**Data**: 16 de fevereiro de 2026  
**Status**: Pronto para Planejamento de Sprint
