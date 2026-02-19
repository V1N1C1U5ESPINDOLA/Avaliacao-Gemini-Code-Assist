# Sistema de Reserva de Hotel - Monitoramento e Observabilidade

Este documento define os padrões de logs e as métricas para garantir a saúde e performance do sistema.

## 1. Padrão de Logs (Estruturado)
Todas as camadas devem utilizar o Logger centralizado emitindo JSON.

**Exemplo de Log de Erro:**
```json
{
  "timestamp": "2026-02-16T14:30:00Z",
  "level": "ERROR",
  "correlation_id": "a1-b2-c3-d4",
  "module": "Reservas",
  "message": "Falha ao criar reserva: Quarto já ocupado",
  "context": { "quartoId": "101", "hospedeId": "99" },
  "stack": "Error: ..."
}