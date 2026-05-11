# Ecossistema TechT — Especificação do produto (SaaS)

Documento de referência para **desenvolvimento, priorização e alinhamento com IA no Cursor**. Atualize este ficheiro quando o produto evoluir.

## Frase única

**Ecossistema TechT** é a *central de operação* da agência de marketing digital: vendas, mídia, cliente e números numa interface moderna, com **multi-tenant** (vários clientes), **backend e base de dados profissionais**, e integrações com **WhatsApp / IA via webhooks** (ex.: n8n).

---

## Personas

| Papel | Necessidade principal |
|--------|------------------------|
| **Agência / dono** | Ver todos os clientes, pipeline, mídia e financeiro; trocar de contexto sem sair do sistema. |
| **Operação / tráfego** | Campanhas, analytics, alertas de performance. |
| **Comercial / CS** | CRM: leads, pipeline, conversas, propostas, tarefas. |
| **Cliente final (portal)** | Ver o que importa para ele: resultados, documentos, agenda (visão filtrada). |
| **Admin** | Cadastro de clientes (tenants), permissões, configurações globais. |

---

## Módulos funcionais (macro)

1. **Autenticação & autorização**  
   - Login seguro (sessão/JWT conforme stack).  
   - Papéis: super-admin agência, usuário agência, cliente (portal).  
   - Isolamento de dados por **tenant** (cliente da agência).

2. **CRM**  
   - Leads, pipeline (estágios configuráveis), contatos, empresas.  
   - Conversas (histórico; integração futura ou atual com WhatsApp).  
   - Tarefas, propostas, produtos, relatórios exportáveis.

3. **Tráfego pago**  
   - Campanhas (metadados / sync com APIs Meta/Google conforme roadmap).  
   - Analytics: métricas agregadas, comparativos, alertas (ex.: CPC alto, queda de conversão).

4. **TechT AI**  
   - Insights automáticos (ex.: leads sem resposta, campanhas com problema, oportunidades).  
   - Recomendações e relatórios gerados (depende de modelo e dados disponíveis).

5. **Portal do cliente**  
   - Visão reduzida: KPIs acordados, documentos, status de campanhas/projetos.  
   - **Agenda**: integração futura com calendário (Google Calendar, Outlook, etc.) — definir escopo MVP.

6. **Automação**  
   - Orquestração externa via **webhooks** (n8n): entrada/saída de eventos (novo lead, mensagem, agendamento).  
   - Contrato de eventos documentado (ver secção Integrações).

7. **Financeiro**  
   - Faturamento, custos de mídia, margem por cliente (definir granularidade MVP vs. fase 2).

8. **Painéis & analytics**  
   - Dashboard principal com KPIs, gráficos (linha, barras; funil/radar em roadmap).  
   - Exportação (PDF/CSV) onde fizer sentido.

---

## Requisitos não funcionais

- **Segurança**: HTTPS, segredos em variáveis de ambiente, validação de input, RBAC.  
- **Performance**: paginação em listas grandes; cache onde aplicável.  
- **Observabilidade**: logs estruturados, erros rastreáveis (Sentry ou similar em produção).  
- **Backup**: estratégia de backup da base de dados (definir com hosting).

---

## Integrações (prioridade sugerida)

| Integração | Uso | Notas |
|------------|-----|--------|
| **WhatsApp (Cloud API / provedor)** | Mensagens, status de entrega | Webhooks → n8n → API Ecossistema |
| **n8n** | Automação de fluxos | Webhooks assinados; idempotência |
| **Meta / Google Ads** | Sincronizar campanhas e custos | APIs oficiais; tokens OAuth por conta |

Contrato mínimo de webhook (exemplo — ajustar ao teu backend):

```http
POST /api/webhooks/n8n
Headers: X-Signature: <hmac>
Body: { "event": "lead.created", "tenantId": "...", "payload": { ... } }
```

---

## Stack (preencher pela equipa)

| Camada | Tecnologia |
|--------|------------|
| Frontend | _React / Next / etc._ |
| Backend | _Node / Nest / etc._ |
| Base de dados | _Postgres / etc._ |
| Fila / jobs | _opcional_ |
| Infra | _VPS / Railway / AWS / etc._ |

---

## Roadmap sugerido (épicos)

1. **MVP**: auth multi-tenant + CRM básico + dashboard com dados mock ou import manual.  
2. **Tráfego**: ligação a uma fonte de verdade (CSV/API) + analytics interno.  
3. **IA**: insights baseados em regras + evolução para LLM com dados reais.  
4. **Portal cliente** + **agenda**.  
5. **Financeiro** consolidado.

---

## Ligação ao site de marketing (`TechT` repo)

O repositório do site consome `platformData.ts` apenas para **mock visual** na secção “Ecossistema TechT”. O produto real vive noutro repositório ou pasta de app; mantenha os textos alinhados com esta especificação.
