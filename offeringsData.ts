import type { Locale } from './context/AppPreferencesContext';
import mediaFeatureCampaign from './assets/videos/Campanha Cinematográfica.mp4';
import mediaDirectionSet from './assets/videos/Direção criativa do set.MOV';
import mediaPremium4k from './assets/videos/optimized/premium-4k-hq.mp4';
import mediaBehindScenes from './assets/videos/bastidores da produção.mp4';
import mediaReelLaunch from './assets/videos/optimized/reel-launch-hq.mp4';
import mediaInstitutional from './assets/videos/optimized/institutional-brand-hq.mp4';
import mediaStudioProduction from './assets/videos/optimized/studio-production-hq.mp4';
import mediaSocialVertical from './assets/videos/Social midia - Formatos.mp4';
import mediaPosterFeatureCampaign from './assets/videos/posters/feature-campaign.jpg';
import mediaPosterDirectionSet from './assets/videos/posters/direction-set.jpg';
import mediaPosterPremium4k from './assets/videos/posters/premium-4k.jpg';
import mediaPosterInstitutional from './assets/videos/posters/institutional-brand.jpg';
import mediaPosterBehindScenes from './assets/videos/posters/behind-scenes.jpg';
import mediaPosterReelLaunch from './assets/videos/posters/reel-launch.jpg';
import mediaPosterStudioProduction from './assets/videos/posters/studio-production.jpg';
import mediaPosterSocialVertical from './assets/videos/posters/social-vertical.jpg';

/**
 * Copy do site: marketing empresarial completo + Ecossistema TechT;
 * IA como apoio a decisões e análises em todo o stack.
 */

export const OFFERINGS_PT = {
  /** Narrativa única: ciclo + ecossistema (substitui blocos duplicados). */
  ecosystem: {
    badge: "Operação completa",
    title: "Do primeiro cliente ",
    titleHighlight: "à venda",
    titleSuffix: " — com método, clareza e execução",
    intro:
      "Aqui o marketing funciona como sistema: mídia, conteúdo, presença, relacionamento e operação conectados. Cada etapa é tratada como parte da receita, não como tarefa isolada.",
    steps: [
      {
        title: "Aquisição",
        text: "Tráfego pago e conteúdo com estratégia, leitura de dados e otimização contínua para atrair as pessoas certas.",
      },
      {
        title: "Relacionamento",
        text: "WhatsApp, CRM e automações para responder no tempo certo, acompanhar cada lead e manter clareza no processo.",
      },
      {
        title: "Conversão",
        text: "Páginas, mensagens, ofertas e rotinas comerciais pensadas para transformar interesse em oportunidade real.",
      },
      {
        title: "Operação",
        text: "Painéis, análises, portal do cliente e inteligência aplicada para decidir melhor e evoluir a operação com consistência.",
      },
    ],
  },

  included: {
    eyebrow: "Ecossistema TechT",
    title: "Tudo conectado. ",
    titleHighlight: "Decisões mais inteligentes.",
    titleSuffix: "",
    intro:
      "Um ecossistema que integra dados, processos e pessoas para crescer com mais previsibilidade e clareza no dia a dia.",
    hub: {
      label: "IA",
      description:
        "Valida, analisa e recomenda o melhor caminho para cada cliente.",
    },
    nodes: [
      {
        id: "paid-media",
        title: "Mídia paga",
        description: "Campanhas multicanais com performance.",
        anchor: { x: 22, y: 9 },
      },
      {
        id: "crm",
        title: "CRM",
        description: "Dados e histórico que conectam jornadas.",
        anchor: { x: 14, y: 28 },
      },
      {
        id: "automations",
        title: "Automações",
        description: "Processos inteligentes que escalam resultados.",
        anchor: { x: 10, y: 42 },
      },
      {
        id: "analytics",
        title: "Análises",
        description: "Insights que transformam dados em ação.",
        anchor: { x: 13, y: 59 },
      },
      {
        id: "recommendations",
        title: "Recomendações",
        description: "Próximos passos com base em dados.",
        anchor: { x: 22, y: 83 },
      },
      {
        id: "content",
        title: "Conteúdo",
        description: "Estratégia e produção que geram valor.",
        anchor: { x: 76, y: 13 },
      },
      {
        id: "social",
        title: "Social media",
        description: "Presença, engajamento e comunidade.",
        anchor: { x: 88, y: 27 },
      },
      {
        id: "whatsapp",
        title: "WhatsApp",
        description: "Relacionamento direto e conversões.",
        anchor: { x: 90, y: 43 },
      },
      {
        id: "dashboards",
        title: "Dashboards",
        description: "Visão clara do que importa de verdade.",
        anchor: { x: 88, y: 59 },
      },
      {
        id: "sales-routine",
        title: "Rotina comercial",
        description: "Processos, atividades e acompanhamento.",
        anchor: { x: 76, y: 79 },
      },
    ],
    legend: [
      { label: "Dados integrados" },
      { label: "IA e automações" },
      { label: "Foco no cliente" },
      { label: "Decisões estratégicas" },
    ],
    footer: {
      highlight: "Tudo conectado para gerar resultados reais",
      text: "Da estratégia à execução, cada parte do ecossistema trabalha junto com a IA para entregar crescimento sustentável e previsível para o seu negócio.",
    },
    blocks: [],
  },

  mediaShowcase: {
    eyebrow: "Mídia & Produção",
    titleStart: "Mídia, produção e conteúdo com ",
    titleHighlight: "padrão premium",
    subtitle:
      "Conteúdo produzido para valorizar sua marca, posicionar com clareza e apoiar o crescimento digital, com direção criativa e produção cinematográfica.",
    watchLabel: "Assistir",
    closeLabel: "Fechar vídeo",
    emptyLabel: "Em breve novos conteúdos nesta categoria.",
    categories: [
      { id: "all", label: "Todos" },
      { id: "reels", label: "Reels" },
      { id: "campaigns", label: "Campanhas" },
      { id: "direction", label: "Direção criativa" },
      { id: "production", label: "Produção" },
      { id: "behind", label: "Bastidores" },
      { id: "social", label: "Social media" },
      { id: "institutional", label: "Institucional" },
      { id: "premium", label: "Captação premium" },
    ],
    items: [
      {
        id: "feature-campaign",
        title: "Campanha cinematográfica — case institucional",
        category: "campaigns",
        size: "featured",
        poster: mediaPosterFeatureCampaign,
        videoSrc: mediaFeatureCampaign,
      },
      {
        id: "direction-set",
        title: "Direção criativa em set",
        category: "direction",
        size: "wide",
        poster: mediaPosterDirectionSet,
        videoSrc: mediaDirectionSet,
      },
      {
        id: "premium-4k",
        title: "Captação premium em 4K",
        category: "premium",
        size: "wide",
        poster: mediaPosterPremium4k,
        videoSrc: mediaPremium4k,
      },
      {
        id: "institutional-brand",
        title: "Conteúdo institucional",
        category: "institutional",
        size: "wide",
        poster: mediaPosterInstitutional,
        videoSrc: mediaInstitutional,
      },
      {
        id: "behind-scenes",
        title: "Bastidores da produção",
        category: "behind",
        size: "vertical",
        poster: mediaPosterBehindScenes,
        videoSrc: mediaBehindScenes,
      },
      {
        id: "reel-launch",
        title: "Reel de lançamento",
        category: "reels",
        size: "vertical",
        poster: mediaPosterReelLaunch,
        videoSrc: mediaReelLaunch,
      },
      {
        id: "studio-production",
        title: "Produção em estúdio",
        category: "production",
        size: "vertical",
        poster: mediaPosterStudioProduction,
        videoSrc: mediaStudioProduction,
      },
      {
        id: "social-vertical",
        title: "Social media — formatos verticais",
        category: "social",
        size: "vertical",
        poster: mediaPosterSocialVertical,
        videoSrc: mediaSocialVertical,
      },
    ],
  },

  aiAutomations: {
    eyebrow: "IA & Automações",
    titleStart: "Atendimento inteligente e ",
    titleHighlight: "automações que escalam empresas",
    subtitle:
      "Menos tarefa manual, menos lead perdido e mais capacidade de vender. Automação e IA no WhatsApp, no CRM e na rotina comercial.",
    primaryCards: [
      {
        title: "Atendimento inteligente 24h",
        description: "Respostas no tempo certo, todos os dias, sem perder oportunidades.",
      },
      {
        title: "Qualificação automática de leads",
        description: "Critérios inteligentes entregam contatos prontos para o time comercial.",
      },
      {
        title: "Processos automatizados",
        description: "Tarefas repetitivas viram fluxos que liberam a operação para o que importa.",
      },
      {
        title: "Acompanhamento comercial inteligente",
        description: "Follow-ups no momento certo, com contexto, para elevar a taxa de conversão.",
      },
    ],
    secondaryCards: [
      { title: "Escalabilidade operacional" },
      { title: "Centralização de informações" },
      { title: "Mais produtividade para a equipe" },
      { title: "Experiência premium para o cliente" },
    ],
    visual: {
      assistantName: "Assistente TechT",
      statusLabel: "online · agente de IA no WhatsApp",
      customerMessage: "Olá! Quero saber mais sobre como vocês trabalham.",
      assistantMessage:
        "Posso te agendar uma conversa rápida com o time ainda nesta semana. Qual horário funciona melhor para você?",
      options: ["Manhã", "Tarde", "Fim do dia"],
      typingLabel: "digitando",
      badges: [
        { label: "Lead qualificado" },
        { label: "Resposta em < 30s" },
      ],
    },
  },

  disclaimer:
    "Investimento e escopo saem do diagnóstico. Entendemos seu momento, ticket e operação antes de montar a proposta, com prioridades reais e execução contínua.",

  cta: {
    primaryLabel: "Quero uma análise gratuita do marketing da minha empresa",
    waMessage:
      "Olá! Vim pelo site da TechT e quero uma análise gratuita do marketing da minha empresa — preciso entender onde estou perdendo oportunidades e como estruturar a operação para crescer com previsibilidade.",
    secondaryLabel: "Prefiro enviar um briefing por formulário",
    secondaryHref: "/contato",
  },
  mediaCta: {
    label: "Quero conteúdos no mesmo padrão para a minha marca",
    waMessage:
      "Olá! Vim pelo site da TechT e quero conversar sobre criar conteúdos e produção visual no mesmo padrão premium para a minha marca.",
  },
} as const;

export const OFFERINGS_EN: typeof OFFERINGS_PT = {
  ecosystem: {
    badge: 'Full Operation',
    title: 'From first customer ',
    titleHighlight: 'to sale',
    titleSuffix: ' — with method, clarity and execution',
    intro:
      'Marketing works as a connected system here: media, content, digital presence, relationship and operations. Every stage supports revenue, not isolated tasks.',
    steps: [
      {
        title: 'Acquisition',
        text: 'Paid media and content with strategy, data reading and continuous optimization to attract the right people.',
      },
      {
        title: 'Relationship',
        text: 'WhatsApp, CRM and automations to respond on time, follow up every lead and keep clarity in the process.',
      },
      {
        title: 'Conversion',
        text: 'Pages, messages, offers and sales routines designed to turn interest into real opportunities.',
      },
      {
        title: 'Operation',
        text: 'Dashboards, analyses, client portal and applied intelligence to decide better and evolve the operation with consistency.',
      },
    ],
  },
  included: {
    eyebrow: 'TechT Ecosystem',
    title: 'Everything connected. ',
    titleHighlight: 'Smarter decisions.',
    titleSuffix: '',
    intro:
      'An ecosystem that connects data, processes and people so you can grow with more clarity and predictability every day.',
    hub: {
      label: 'AI',
      description:
        'Validates, analyzes and recommends the best path for each client.',
    },
    nodes: [
      {
        id: 'paid-media',
        title: 'Paid media',
        description: 'Multichannel campaigns built for performance.',
        anchor: { x: 22, y: 9 },
      },
      {
        id: 'crm',
        title: 'CRM',
        description: 'Data and history that connect every journey.',
        anchor: { x: 14, y: 28 },
      },
      {
        id: 'automations',
        title: 'Automations',
        description: 'Smart processes that scale results.',
        anchor: { x: 10, y: 42 },
      },
      {
        id: 'analytics',
        title: 'Analytics',
        description: 'Insights that turn data into action.',
        anchor: { x: 13, y: 59 },
      },
      {
        id: 'recommendations',
        title: 'Recommendations',
        description: 'Next steps grounded in real data.',
        anchor: { x: 22, y: 83 },
      },
      {
        id: 'content',
        title: 'Content',
        description: 'Strategy and production that create value.',
        anchor: { x: 76, y: 13 },
      },
      {
        id: 'social',
        title: 'Social media',
        description: 'Presence, engagement and community.',
        anchor: { x: 88, y: 27 },
      },
      {
        id: 'whatsapp',
        title: 'WhatsApp',
        description: 'Direct relationships and conversions.',
        anchor: { x: 90, y: 43 },
      },
      {
        id: 'dashboards',
        title: 'Dashboards',
        description: 'A clear view of what truly matters.',
        anchor: { x: 88, y: 59 },
      },
      {
        id: 'sales-routine',
        title: 'Sales routine',
        description: 'Processes, activities and follow-through.',
        anchor: { x: 76, y: 79 },
      },
    ],
    legend: [
      { label: 'Integrated data' },
      { label: 'AI and automations' },
      { label: 'Customer focus' },
      { label: 'Strategic decisions' },
    ],
    footer: {
      highlight: 'Everything connected to drive real results',
      text: 'From strategy to execution, every part of the ecosystem works with AI to deliver sustainable, predictable growth for your business.',
    },
    blocks: [],
  },
  mediaShowcase: {
    eyebrow: 'Media & Production',
    titleStart: 'Media, production and content with ',
    titleHighlight: 'premium standards',
    subtitle:
      'Content made to elevate your brand, clarify positioning and support digital growth, with creative direction and cinematic production.',
    watchLabel: 'Watch',
    closeLabel: 'Close video',
    emptyLabel: 'New content coming soon to this category.',
    categories: [
      { id: 'all', label: 'All' },
      { id: 'reels', label: 'Reels' },
      { id: 'campaigns', label: 'Campaigns' },
      { id: 'direction', label: 'Creative direction' },
      { id: 'production', label: 'Production' },
      { id: 'behind', label: 'Behind the scenes' },
      { id: 'social', label: 'Social media' },
      { id: 'institutional', label: 'Institutional' },
      { id: 'premium', label: 'Premium capture' },
    ],
    items: [
      {
        id: 'feature-campaign',
        title: 'Cinematic campaign — institutional case',
        category: 'campaigns',
        size: 'featured',
        poster: mediaPosterFeatureCampaign,
        videoSrc: mediaFeatureCampaign,
      },
      {
        id: 'direction-set',
        title: 'Creative direction on set',
        category: 'direction',
        size: 'wide',
        poster: mediaPosterDirectionSet,
        videoSrc: mediaDirectionSet,
      },
      {
        id: 'premium-4k',
        title: 'Premium 4K capture',
        category: 'premium',
        size: 'wide',
        poster: mediaPosterPremium4k,
        videoSrc: mediaPremium4k,
      },
      {
        id: 'institutional-brand',
        title: 'Institutional content',
        category: 'institutional',
        size: 'wide',
        poster: mediaPosterInstitutional,
        videoSrc: mediaInstitutional,
      },
      {
        id: 'behind-scenes',
        title: 'Behind the scenes of production',
        category: 'behind',
        size: 'vertical',
        poster: mediaPosterBehindScenes,
        videoSrc: mediaBehindScenes,
      },
      {
        id: 'reel-launch',
        title: 'Launch reel',
        category: 'reels',
        size: 'vertical',
        poster: mediaPosterReelLaunch,
        videoSrc: mediaReelLaunch,
      },
      {
        id: 'studio-production',
        title: 'Studio production',
        category: 'production',
        size: 'vertical',
        poster: mediaPosterStudioProduction,
        videoSrc: mediaStudioProduction,
      },
      {
        id: 'social-vertical',
        title: 'Social media — vertical formats',
        category: 'social',
        size: 'vertical',
        poster: mediaPosterSocialVertical,
        videoSrc: mediaSocialVertical,
      },
    ],
  },
  aiAutomations: {
    eyebrow: 'AI & Automations',
    titleStart: 'Smart service and ',
    titleHighlight: 'automations that scale companies',
    subtitle:
      'Less manual work, fewer lost leads and more room to sell. Automation and AI across WhatsApp, CRM and your sales routine.',
    primaryCards: [
      {
        title: '24h intelligent service',
        description: 'Right-time responses, every day, with no missed opportunities.',
      },
      {
        title: 'Automatic lead qualification',
        description: 'Smart criteria deliver contacts ready for the sales team.',
      },
      {
        title: 'Automated processes',
        description: "Repetitive tasks become flows that free up your team's focus.",
      },
      {
        title: 'Smart sales follow-up',
        description: 'Context-aware follow-ups at the right moment to lift conversion.',
      },
    ],
    secondaryCards: [
      { title: 'Operational scalability' },
      { title: 'Centralized information' },
      { title: 'More productivity for the team' },
      { title: 'Premium customer experience' },
    ],
    visual: {
      assistantName: 'TechT Assistant',
      statusLabel: 'online · AI agent on WhatsApp',
      customerMessage: 'Hi! I want to know more about how you work.',
      assistantMessage:
        'I can book a quick chat with the team this week. What time works best for you?',
      options: ['Morning', 'Afternoon', 'Evening'],
      typingLabel: 'typing',
      badges: [
        { label: 'Qualified lead' },
        { label: 'Response in < 30s' },
      ],
    },
  },
  disclaimer:
    'Investment and scope come from diagnosis. We learn your moment, ticket and operation before building a proposal with real priorities and steady execution.',
  cta: {
    primaryLabel: 'I want a free marketing analysis for my company',
    waMessage:
      "Hello! I came from TechT website and I want a free marketing analysis for my company — I need to understand where I'm losing opportunities and how to structure the operation to grow with predictability.",
    secondaryLabel: 'I prefer to send a briefing form',
    secondaryHref: '/contato',
  },
  mediaCta: {
    label: 'I want premium content like this for my brand',
    waMessage:
      'Hello! I came from TechT website and I want to talk about creating premium content and visual production for my brand.',
  },
};

export const getOfferings = (locale: Locale) => (locale === 'en' ? OFFERINGS_EN : OFFERINGS_PT);
export const OFFERINGS = OFFERINGS_PT;

