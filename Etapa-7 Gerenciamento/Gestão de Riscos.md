# Gestão de Riscos do Projeto

## 1. Riscos Técnicos e Gerenciais

| Risco | Tipo | Impacto | Probabilidade | Plano de Mitigação |
| :--- | :--- | :--- | :--- | :--- |
| **Conflito de Disponibilidade** | Técnico | Crítico | Média | Implementar travas (locks) no banco de dados para evitar reservas duplicadas no mesmo quarto/data. |
| **Alucinação de IA no Código** | Técnico | Médio | Alta | Revisão humana obrigatória (Peer Review) para todo código gerado por LLMs. |
| **Atraso na Integração de UI** | Gerencial | Médio | Baixa | Utilizar Storybook para desenvolvimento isolado de componentes antes da integração. |
| **Vazamento de Dados (LGPD)** | Segurança | Crítico | Baixa | Anonimização de dados sensíveis em ambientes de teste e criptografia de emails/CPFs em produção. |



## 2. Planos de Contingência
* **Falha crítica em Produção:** Reversão automática (Rollback) via pipeline de CI/CD para a última versão estável.
* **Saída de membro da equipe:** Documentação técnica atualizada em cada Sprint para facilitar o Onboarding.