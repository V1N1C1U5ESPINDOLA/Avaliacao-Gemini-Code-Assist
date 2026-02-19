# Sistema de Reserva de Hotel - Runbook de Resposta a Incidentes

Este documento orienta a equipe técnica na mitigação de falhas críticas detectadas pelo monitoramento.

## 1. Classificação de Severidade

| Nível | Impacto | Resposta Esperada |
| :--- | :--- | :--- |
| **S1 (Crítico)** | Sistema fora do ar ou impossibilidade de criar reservas. | Intervenção imediata (24/7). |
| **S2 (Alto)** | Lentidão extrema ou falha em módulo específico (ex: Hóspedes). | Resposta em até 2 horas. |
| **S3 (Médio)** | Erros visuais ou falha em relatórios. | Correção em horário comercial. |

## 2. Procedimentos de Recuperação

### 2.1 Cenário: Falha de Conexão com Banco de Dados (S1)
**Sintoma:** Endpoint `/health` retorna `status: "ERROR"` e logs exibem `ECONNREFUSED`.

1.  **Verificação:** Validar se o container do banco está rodando: `docker ps | grep hotel_db`.
2.  **Ação I:** Reiniciar o serviço de banco: `docker-compose restart db`.
3.  **Ação II:** Verificar logs de armazenamento: `docker logs hotel_db` (Checar se o disco está cheio).
4.  **Escalação:** Se o banco não subir, acionar o DBA para restauração do último backup diário.

### 2.2 Cenário: Latência Alta nas Reservas (S2)
**Sintoma:** Alerta de P95 > 1s no endpoint de criação de reservas.

1.  **Verificação:** Abrir o monitoramento de recursos e checar uso de CPU do Backend.
2.  **Ação I:** Escalar horizontalmente (subir mais uma instância do App via Docker).
3.  **Ação II (Database):** Executar `EXPLAIN ANALYZE` na query de busca de conflitos para identificar falta de índices.
4.  **Ação III (Cache):** Se implementado, verificar se o Redis está respondendo.

### 2.3 Cenário: Erros após Deploy (Rollback) (S1)
**Sintoma:** Aumento súbito de erros 5xx logo após atualização do sistema.

1.  **Ação I (Rollback Imediato):** Reverter para a versão anterior da imagem Docker estável.
    - Comando: `docker-compose pull && docker-compose up -d` (apontando para a tag da versão anterior no `docker-compose.yml`).
2.  **Investigação:** Analisar logs estruturados procurando pelo `correlation_id` dos erros.
3.  **Correção:** Corrigir em ambiente de *Staging* antes de tentar novo deploy.

## 3. Comunicação de Incidente
Em caso de S1, a recepção do hotel deve ser notificada imediatamente para:
1.  Utilizar o procedimento de reserva manual (papel/contingência).
2.  Informar aos hóspedes sobre a indisponibilidade temporária.

---