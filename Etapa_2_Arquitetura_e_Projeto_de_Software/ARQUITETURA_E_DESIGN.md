# Sistema de Reserva de Hotel - Arquitetura e Design

## 1. Arquitetura da Aplicação

### 1.1 Estrutura de Camadas

```
┌─────────────────────────────────────────────┐
│      Camada de Apresentação (UI)            │
│  ┌───────────────────────────────────────┐  │
│  │  Componentes React/Vue/Angular        │  │
│  │  - Formulários                        │  │
│  │  - Tabelas                            │  │
│  │  - Modais                             │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│    Camada de Lógica de Negócio (BL)        │
│  ┌───────────────────────────────────────┐  │
│  │  Services                             │  │
│  │  - QuartoService                      │  │
│  │  - HospedeService                     │  │
│  │  - ReservaService                     │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│      Camada de Acesso a Dados (DAL)        │
│  ┌───────────────────────────────────────┐  │
│  │  Repositórios/DAOs                    │  │
│  │  - QuartoRepository                   │  │
│  │  - HospedeRepository                  │  │
│  │  - ReservaRepository                  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│      Camada de Banco de Dados               │
│  ┌───────────────────────────────────────┐  │
│  │  Base de Dados Relacional             │  │
│  │  - PostgreSQL / MySQL / SQLite        │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### 1.2 Estrutura de Pastas Recomendada

```
projeto-hotel-reservas/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Quartos/
│   │   │   ├── CadastroQuarto.jsx
│   │   │   └── ListaQuartos.jsx
│   │   ├── Hospedes/
│   │   │   ├── CadastroHospede.jsx
│   │   │   └── ListaHospedes.jsx
│   │   ├── Reservas/
│   │   │   ├── CadastroReserva.jsx
│   │   │   └── ListaReservas.jsx
│   │   └── Common/
│   │       ├── Header.jsx
│   │       ├── Sidebar.jsx
│   │       └── Footer.jsx
│   ├── services/
│   │   ├── quartoService.js
│   │   ├── hospedeService.js
│   │   ├── reservaService.js
│   │   └── api.js
│   ├── pages/
│   │   ├── GestaoDashboard.jsx
│   │   ├── GestaaoQuartos.jsx
│   │   ├── GestaoHospedes.jsx
│   │   └── GestaoReservas.jsx
│   ├── assets/
│   │   ├── colors.css
│   │   ├── fonts/
│   │   └── images/
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── components.css
│   ├── utils/
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── helpers.js
│   ├── App.jsx
│   └── index.js
├── api/
│   ├── routes/
│   │   ├── quartos.js
│   │   ├── hospedes.js
│   │   └── reservas.js
│   ├── controllers/
│   │   ├── quartoController.js
│   │   ├── hospedeController.js
│   │   └── reservaController.js
│   ├── models/
│   │   ├── Quarto.js
│   │   ├── Hospede.js
│   │   └── Reserva.js
│   ├── middleware/
│   │   └── validation.js
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeds/
│   │   └── config.js
│   └── server.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── REQUISITOS/
│   ├── API/
│   └── ARQUITETURA/
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 2. Paleta de Cores

### 2.1 Cores Principais

| Cor | Hex | RGB | Uso |
|-----|-----|-----|-----|
| Verde Primário | `#00A86B` | 0, 168, 107 | Botões, links, highlights |
| Verde Escuro | `#005A3D` | 0, 90, 61 | Backgrounds, bordas |
| Azul Primário | `#0066CC` | 0, 102, 204 | Ações secundárias, links |
| Azul Escuro | `#003D99` | 0, 61, 153 | Backgrounds alternativos |
| Azul Claro | `#E6F2FF` | 230, 242, 255 | Backgrounds de cards |
| Verde Claro | `#E6F7F0` | 230, 247, 240 | Backgrounds alternativos |

### 2.2 Cores Neutras

| Cor | Hex | RGB | Uso |
|-----|-----|-----|-----|
| Branco | `#FFFFFF` | 255, 255, 255 | Backgrounds principais |
| Cinza Claro | `#F5F5F5` | 245, 245, 245 | Backgrounds secundários |
| Cinza Médio | `#CCCCCC` | 204, 204, 204 | Bordas, divisores |
| Cinza Escuro | `#666666` | 102, 102, 102 | Texto secundário |
| Preto | `#000000` | 0, 0, 0 | Texto principal |

### 2.3 Cores de Status

| Status | Cor | Hex | Uso |
|--------|-----|-----|-----|
| Sucesso | Verde | `#00AA00` | Mensagens de sucesso |
| Erro | Vermelho | `#DD0000` | Mensagens de erro |
| Aviso | Amarelo | `#FFCC00` | Mensagens de aviso |
| Informação | Azul | `#0066CC` | Mensagens informativas |
| Ocupado | Vermelho | `#DD0000` | Status ocupado |
| Livre | Verde | `#00A86B` | Status livre |
| Manutenção | Amarelo | `#FFCC00` | Status em manutenção |

### 2.4 Exemplo de uso em CSS

```css
:root {
  /* Cores Primárias */
  --cor-verde-primario: #00A86B;
  --cor-verde-escuro: #005A3D;
  --cor-azul-primario: #0066CC;
  --cor-azul-escuro: #003D99;
  --cor-azul-claro: #E6F2FF;
  --cor-verde-claro: #E6F7F0;
  
  /* Cores Neutras */
  --cor-branco: #FFFFFF;
  --cor-cinza-claro: #F5F5F5;
  --cor-cinza-medio: #CCCCCC;
  --cor-cinza-escuro: #666666;
  --cor-preto: #000000;
  
  /* Cores de Status */
  --cor-sucesso: #00AA00;
  --cor-erro: #DD0000;
  --cor-aviso: #FFCC00;
  --cor-info: #0066CC;
}
```

---

## 3. Design de Componentes

### 3.1 Padrões de Componentes

#### Botão Primário
- Cor de fundo: Verde Primário (#00A86B)
- Cor de texto: Branco
- Padding: 10px 20px
- Border radius: 4px
- Font-weight: 600

#### Campo de Entrada
- Border: 1px sólido Cinza Médio (#CCCCCC)
- Border radius: 4px
- Padding: 8px 12px
- Font-size: 14px

#### Cards/Painéis
- Background: Branco ou Azul Claro (#E6F2FF)
- Border: 1px sólido Cinza Médio
- Border radius: 8px
- Box-shadow: 0 2px 4px rgba(0,0,0,0.1)

#### Tabelas
- Header background: Azul Primário (#0066CC) ou Verde Escuro (#005A3D)
- Texto no header: Branco
- Alternância de linhas: Branco e Cinza Claro (#F5F5F5)

### 3.2 Tipografia

| Elemento | Font-size | Font-weight | Line-height |
|----------|-----------|-------------|-------------|
| H1 (Títulos principais) | 32px | 700 | 1.4 |
| H2 (Subtítulos) | 24px | 600 | 1.4 |
| H3 (Seções) | 20px | 600 | 1.4 |
| Parágrafo | 14px | 400 | 1.6 |
| Small (Auxiliar) | 12px | 400 | 1.5 |
| Label de form | 13px | 500 | 1.5 |

---

## 4. Fluxos de Interface

### 4.1 Fluxo Principal da Aplicação

```
Acesso à Aplicação
        ↓
┌─────────────────────────┐
│   Dashboard Principal   │
│  ┌─────────────────┐   │
│  │ Menu Principal  │   │
│  │ - Quartos       │   │
│  │ - Hóspedes      │   │
│  │ - Reservas      │   │
│  └─────────────────┘   │
└─────────────────────────┘
        ↓ (seleciona módulo)
   ┌────┴────┬──────────┬──────────┐
   ↓         ↓          ↓          ↓
Quartos  Hóspedes  Reservas   Dashboard
```

### 4.2 Fluxo de Navegação

- **Home/Dashboard**: Visão geral do sistema
- **Gestão de Quartos**: Cadastro, listagem e edição de quartos
- **Gestão de Hóspedes**: Cadastro, listagem e edição de hóspedes
- **Gestão de Reservas**: Criação, listagem e edição de reservas

---

## 5. Responsividade

### 5.1 Breakpoints

| Dispositivo | Largura | Comportamento |
|-------------|---------|----------------|
| Mobile | < 768px | Layout em coluna única, menu colapsável |
| Tablet | 768px - 1024px | Layout adaptado, menu lateral retrátil |
| Desktop | > 1024px | Layout completo com sidebar fixo |

---

## 6. Acessibilidade

- Contraste mínimo de 4.5:1 para texto
- Suporte a navegação por teclado
- Labels em todos os campos de formulário
- Ícones acompanhados de texto descritivo
- Formulários com validação clara

---

**Versão**: 1.0  
**Data de criação**: 16 de fevereiro de 2026  
**Autor**: Especificação de Arquitetura
