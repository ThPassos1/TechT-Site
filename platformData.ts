/**
 * Dados para o mock do Ecossistema TechT no site (preview ilustrativo).
 * Produto real: ver docs/TECHT_PLATFORM_SPEC.md
 */

export const PLATFORM_PREVIEW = {
  productName: "Ecossistema TechT",
  subtitle:
    "CRM, tráfego pago, automações, financeiro e portal do cliente — visão unificada.",
  clientContext: "Cliente em gestão (exemplo)",
  moduleCaption: "Módulo Core com analytics e operações em tempo real.",

  sidebar: [
    {
      group: "Principal",
      items: [{ label: "Dashboard", active: true }],
    },
    {
      group: "CRM",
      items: [
        { label: "Leads", active: false },
        { label: "Pipeline", active: false },
        { label: "Contatos", active: false },
        { label: "Empresas", active: false },
        { label: "Conversas", active: false, star: true },
        { label: "Tarefas", active: false },
        { label: "Propostas", active: false },
        { label: "Produtos", active: false },
        { label: "Relatórios", active: false },
      ],
    },
    {
      group: "Tráfego pago",
      items: [
        { label: "Campanhas", active: false, star: true },
        { label: "Analytics", active: false },
      ],
    },
    {
      group: "TechT AI",
      items: [
        { label: "Insights", active: false },
        { label: "Recomendações", active: false },
        { label: "Relatórios IA", active: false },
      ],
    },
  ],

  insightsIA: [
    {
      label: "Leads sem resposta",
      value: "7",
      sub: "3 com SLA crítico > 4h",
      tone: "amber" as const,
    },
    {
      label: "Campanhas com alerta",
      value: "2",
      sub: "CPC alto / queda de conversão",
      tone: "rose" as const,
    },
    {
      label: "Oportunidades",
      value: "4",
      sub: "Remarketing e upsell",
      tone: "cyan" as const,
    },
    {
      label: "Crescimento",
      value: "+18%",
      sub: "Leads vs. semana anterior",
      tone: "emerald" as const,
    },
    {
      label: "Performance mídia",
      value: "-6%",
      sub: "ROAS médio — revisar criativos",
      tone: "violet" as const,
    },
  ],

  kpis: [
    { label: "Total de leads", value: "1389", trend: "+12%", trendUp: true },
    { label: "Valor no pipeline", value: "R$ 890k", trend: "Consolidado", trendUp: true },
    { label: "ROAS médio", value: "4.8x", trend: "Meta + Google", trendUp: true },
    { label: "Receita", value: "R$ 384k", trend: "Período atual", trendUp: true },
  ],
} as const;
