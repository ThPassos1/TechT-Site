# Prompt para o agente de desenvolvimento no Cursor

Copia e cola no chat do Cursor (modo **Agent**) quando fores trabalhar no **Ecossistema TechT** (backend/app), não no site de marketing.

---

## Instruções fixas

1. Lê primeiro **`docs/TECHT_PLATFORM_SPEC.md`** e segue a visão de produto e os módulos descritos.  
2. Não inventes requisitos que contradigam multi-tenant, segurança e isolamento por cliente.  
3. Para integrações WhatsApp/n8n, propõe **contratos de webhook** claros (evento, `tenantId`, payload, assinatura).  
4. Prioriza **MVP utilizável**: auth + CRM + dashboard antes de gráficos avançados.  
5. Documenta decisões em `docs/` ou `README` do projeto de app quando mudares arquitetura.

---

## Prompt modelo (colar e completar)

```
Contexto: estou a desenvolver o Ecossistema TechT, SaaS multi-tenant para agências de marketing.

Fonte de verdade: docs/TECHT_PLATFORM_SPEC.md (neste repo ou no repo da app).

Objetivo desta sessão: [DESCREVE — ex.: "implementar modelo Tenant + User no Prisma" ou "endpoint de webhook n8n"].

Stack atual: [PREENCHE].

Restrições: [ex.: Postgres, NestJS, sem quebrar API existente].

Entrega esperada: [ficheiros alterados, testes, migrações].
```

---

## Site de marketing (este repositório)

- A secção **Ecossistema TechT** no site usa dados de `platformData.ts` só para **UI ilustrativa**.  
- Alterações ao produto real não precisam duplicar aqui, exceto se quiseres atualizar o mock para refletir novos módulos.
