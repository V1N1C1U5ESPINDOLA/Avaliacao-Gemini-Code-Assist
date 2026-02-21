# Plano de Projeto: Sistema de Reserva de Hotel

## 1. Cronograma Baseado em Sprints
O projeto será executado utilizando a metodologia ágil **Scrum**, com **Sprints de 15 dias**. O objetivo é entregar um MVP (Mínimo Produto Viável) funcional em 8 semanas.

| Sprint | Fase | Objetivos Principais | Entregáveis |
| :--- | :--- | :--- | :--- |
| **Sprint 1** | **Fundação** | Setup do ambiente, modelagem de dados e CRUD de Quartos. | API de Quartos, Schema do Banco, Testes Unitários de Domínio. |
| **Sprint 2** | **Hóspedes & UI** | CRUD de Hóspedes e desenvolvimento da identidade visual. | Tela de Hóspedes, Layout base (Verde/Azul), Integração com API. |
| **Sprint 3** | **Reservas** | Implementação da lógica de reservas e disponibilidade. | Motor de reservas, Chips de status, Lógica de check-in/out. |
| **Sprint 4** | **QA & Deploy** | Refinamento de UI, Testes de Integração e Homologação. | Sistema completo, Relatório de Qualidade, Deploy em Staging. |



## 2. Estimativa de Esforço
A estimativa foi realizada em **Story Points (SP)**, utilizando a escala de Fibonacci (1, 2, 3, 5, 8, 13, 21).

* **Módulo Gestão de Quartos (13 SP):** Complexidade média devido à gestão de sub-objetos (Camas) e validações de tipos.
* **Módulo Gestão de Hóspedes (5 SP):** Baixa complexidade; CRUD padrão com validação de CPF.
* **Módulo Gestão de Reservas (21 SP):** Alta complexidade; exige controle de concorrência, cálculo de datas e mudança de estados.
* **Frontend & Design System (8 SP):** Desenvolvimento de componentes modernos e aplicação da paleta de cores verde/azul.

**Esforço Total Estimado:** 47 Story Points.