/**
 * Dados para o mock do Ecossistema TechT no site (preview ilustrativo).
 * Produto real: ver docs/TECHT_PLATFORM_SPEC.md
 */

export const PLATFORM_PREVIEW = {
  productName: "Ecossistema TechT",
  subtitle: "CRM, tráfego pago, automações, financeiro e portal cliente",
  clientLabel: "Cliente em gestão",
  clientName: "Aurora Estética",
  moduleCaption:
    "Panorama da operação com métricas, rotinas e sinais importantes em tempo real.",
  adminLabel: "Administrador TechT — Visão Admin",

  sidebar: [
    { label: "Dashboard", icon: "dashboard", active: true },
    { label: "CRM", icon: "crm" },
    { label: "TRÁFEGO PAGO", icon: "ads" },
    { label: "TECHT AI", icon: "ai" },
    { label: "OPERAÇÕES", icon: "ops" },
    { label: "ADMIN", icon: "admin" },
    { label: "PORTAL DO CLIENTE", icon: "portal" },
  ],

  insightsIA: [
    {
      label: "Leads sem resposta",
      value: "7",
      sub: "3 com SLA crítico (>4h)",
      tone: "amber" as const,
    },
    {
      label: "Campanhas com problema",
      value: "2",
      sub: "CPC alto e queda de conversões",
      tone: "rose" as const,
    },
    {
      label: "Oportunidades",
      value: "4",
      sub: "Remarketing e upsell de contrato",
      tone: "cyan" as const,
    },
    {
      label: "Crescimento",
      value: "+18%",
      sub: "Leads vs semana anterior",
      tone: "emerald" as const,
    },
    {
      label: "Queda performance",
      value: "-6%",
      sub: "ROAS médio — revisar criativos Meta",
      tone: "violet" as const,
    },
  ],

  kpis: [
    { label: "Total de Leads", value: "1389" },
    { label: "Valor do Pipeline", value: "890.000 R$" },
    { label: "ROAS Médio", value: "4.8x" },
    { label: "Receita", value: "384.250 R$" },
  ],

  charts: [
    { id: "line", title: "Line + Area animado" },
    { id: "bars", title: "Barras crescendo" },
    { id: "pie", title: "Pie + Funnel" },
    { id: "radar", title: "Radar + Heatmap D3" },
  ],

  axis: {
    x: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    y: ["220", "165", "110", "55", "0"],
  },
} as const;
