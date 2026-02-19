--- START OF FILE PIPELINE_DEPLOY.md ---

# Sistema de Reserva de Hotel - Estratégia de Pipeline e Deploy

Este documento descreve o fluxo de automação para garantir a qualidade do código e a entrega contínua do sistema.

## 1. Arquitetura de Infraestrutura (Docker)

### 1.1 Backend (Node.js)
*   **Imagem Base**: `node:18-alpine` (Leveza e segurança).
*   **Build**: Multi-stage.
    1.  `build-stage`: Instala dependências e compila TypeScript.
    2.  `production-stage`: Copia apenas `/dist` e `node_modules` de produção.

### 1.2 Frontend (React)
*   **Build**: Vite gera arquivos estáticos em `/dist`.
*   **Servidor**: Nginx configurado para roteamento SPA (Single Page Application).

## 2. Fluxo de CI/CD (GitHub Actions)

### Gatilhos (Triggers)
- **CI**: Qualquer `push` em branches de funcionalidade (`feature/*`) ou `Pull Requests`.
- **CD Staging**: Merge na branch `main`.
- **CD Production**: Criação de uma `release` ou aprovação manual.

### Estágios do Pipeline

#### Estágio 1: Testes e Qualidade (CI)
1.  `Linting`: Verifica padrões de código.
2.  `Unit Tests`: Executa `jest` nos serviços e entidades.
3.  `Integration Tests`: Sobe um container PostgreSQL temporário e executa os testes de fluxo.
4.  `Docker Build Check`: Garante que os Dockerfiles estão construindo corretamente.

#### Estágio 2: Registro e Homologação (Staging)
1.  `Build & Push`: Envia as imagens marcadas com o hash do commit para o Registry.
2.  `Deploy Staging`: Atualiza o servidor de homologação via SSH ou Webhook.
3.  `Database Migration`: Executa as migrações do banco de dados automaticamente.

#### Estágio 3: Produção (CD)
1.  `Tagging`: Marca a imagem como `latest` e com a versão (ex: `v1.0.2`).
2.  `Rolling Update`: Atualiza as instâncias de produção uma por uma para garantir uptime de 100%.

## 3. Variáveis de Ambiente (Secrets)
As seguintes variáveis devem ser configuradas no cofre (Secrets) do CI/CD:
*   `DB_URL_PROD`: String de conexão com o banco de dados.
*   `JWT_SECRET`: Chave para assinatura de tokens.
*   `DOCKER_USERNAME/PASSWORD`: Credenciais do registro de imagens.
*   `SERVER_SSH_KEY`: Para acesso ao servidor de deploy.

---