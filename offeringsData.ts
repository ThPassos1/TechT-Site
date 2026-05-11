import type { Locale } from './context/AppPreferencesContext';

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
      "Aqui o marketing funciona como sistema: mídia, conteúdo, presença, relacionamento e operação conectados. Cada etapa é tratada como parte da receita, não como tarefa isolada. A IA fortalece validações, análises e recomendações de rota; o direcionamento estratégico continua humano e orientado ao seu contexto.",
    steps: [
      {
        title: "Aquisição",
        text: "Tráfego pago e conteúdo com estratégia e execução consistentes; testes e leitura de dados indicam onde investir e o que otimizar com segurança.",
      },
      {
        title: "Relacionamento",
        text: "WhatsApp e automações para responder no tempo certo, qualificar e acompanhar sem perder timing — com processo claro para o time.",
      },
      {
        title: "Conversão",
        text: "Páginas e mensagens pensadas para agendar ou vender; copy, oferta e mensuração trabalhando juntas para elevar taxa e qualidade.",
      },
      {
        title: "Operação",
        text: "Ecossistema TechT: CRM, campanhas, portal do cliente e painéis — insights e análises que ajudam a decidir melhor, numa visão única da agência.",
      },
    ],
  },

  included: {
    title: "O que ",
    titleHighlight: "está incluído",
    titleSuffix: " nessa visão",
    intro:
      "Cada frente abaixo compõe o pacote de marketing empresarial. Na plataforma, recursos de IA ajudam em validações e análises para apoiar boas decisões — sem substituir o julgamento do gestor. Escopo e cronograma fechamos no diagnóstico.",
    blocks: [
      {
        title: "Mídia & conteúdo",
        services: [
          "Reels",
          "Posts",
          "Diárias de gravação",
          "Direção criativa",
          "Conteúdo personalizado",
        ],
        showcase: [
          {
            type: "image",
            title: "Reel de campanha",
            description: "Vídeo curto para chamar atenção e fazer mais pessoas conhecerem sua empresa.",
            src:
              "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop",
            videoSrc:
              "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          },
          {
            type: "image",
            title: "Direção criativa no set",
            src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
            description:
              "Acompanhamos a gravação para garantir um conteúdo bonito, claro e com a cara da sua marca.",
            videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
          },
          {
            type: "image",
            title: "Conteúdo social personalizado",
            src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1600&auto=format&fit=crop",
            description: "Criamos posts e peças do jeito certo para o seu público em cada rede social.",
            videoSrc:
              "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          },
          {
            type: "image",
            title: "Bastidores de gravação",
            src: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1600&auto=format&fit=crop",
            description:
              "Mostramos o processo real de produção para gerar autoridade e confiança no conteúdo da marca.",
            videoSrc: "https://www.w3schools.com/html/movie.mp4",
          },
        ],
        companyGallery: [
          {
            type: "image",
            title: "Projeto real 01",
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
          },
          {
            type: "image",
            title: "Projeto real 02",
            src: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=1600&auto=format&fit=crop",
          },
          {
            type: "video",
            title: "Projeto real 03 (vídeo)",
            src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            poster:
              "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
          },
        ],
        bullets: [
          "Campanhas em Meta e Google com foco em resultado, mensuração e ritmo de otimização",
          "Social media com cadência, direção criativa e narrativa alinhada à sua oferta",
        ],
      },
      {
        title: "Presença & conversão",
        services: [],
        showcase: [],
        bullets: [
          "Sites, landings e páginas de vendas quando fizer parte do funil combinado",
          "Estrutura para conversão e SEO técnico onde importa; testes para evoluir mensagem e oferta",
        ],
      },
      {
        title: "Atendimento & relacionamento",
        services: [],
        showcase: [],
        bullets: [
          "Fluxos no WhatsApp com integração a automações (ex.: n8n) e contexto no CRM",
          "Qualificação e acompanhamento com processo definido — inclusive quando o volume sobe",
        ],
      },
      {
        title: "Ecossistema TechT (plataforma)",
        services: [],
        showcase: [],
        bullets: [
          "Multi-cliente (multi-tenant): CRM, tráfego, portal do cliente, agenda, financeiro e painéis com insights que complementam sua leitura",
          "Login seguro, área admin e visão única de vendas, mídia e números para decidir com mais base",
        ],
      },
    ],
  },

  disclaimer:
    "Investimento e escopo saem do diagnóstico: entendemos seu momento, ticket e operação e montamos a proposta com prioridades reais, execução forte e evolução contínua.",

  cta: {
    primaryLabel: "Quero montar minha operação completa",
    waMessage:
      "Olá! Vim pelo site da TechT. Quero entender como vocês estruturam uma operação completa de marketing (do primeiro cliente à venda) e como o Ecossistema TechT organiza execução, análises e decisões.",
    secondaryLabel: "Prefiro enviar um briefing por formulário",
    secondaryHref: "/contato",
  },
} as const;

export const OFFERINGS_EN: typeof OFFERINGS_PT = {
  ecosystem: {
    badge: 'Full Operation',
    title: 'From first customer ',
    titleHighlight: 'to sale',
    titleSuffix: ' — with method, clarity and execution',
    intro:
      'Marketing works as a connected system here: media, content, digital presence, relationship and operations. Every stage supports revenue, not isolated tasks. AI strengthens validation, analysis and next-step recommendations; strategic direction stays human and contextual.',
    steps: [
      {
        title: 'Acquisition',
        text: 'Paid media and content with consistent strategy and execution; tests and data reviews show where to invest and what to optimize with confidence.',
      },
      {
        title: 'Relationship',
        text: 'WhatsApp and automations to answer on time, qualify leads and follow up without losing momentum — with a clear process for the team.',
      },
      {
        title: 'Conversion',
        text: 'Pages and messaging designed to book or sell; offer, copy and measurement working together to improve conversion quality.',
      },
      {
        title: 'Operation',
        text: 'TechT Ecosystem: CRM, campaigns, client portal and dashboards — insights and analysis to support better decisions in one operational view.',
      },
    ],
  },
  included: {
    title: 'What is ',
    titleHighlight: 'included',
    titleSuffix: ' in this approach',
    intro:
      'Each front below is part of a complete marketing package. In the platform, AI helps validation and analysis to support decisions — without replacing manager judgment. Scope and timeline are defined in diagnosis.',
    blocks: [
      {
        title: 'Media & content',
        services: [
          'Reels',
          'Posts',
          'On-site recording days',
          'Creative direction',
          'Custom content',
        ],
        showcase: [
          {
            type: 'image',
            title: 'Campaign reel',
            description:
              'Short-format creative piece focused on attention, authority and first-touch engagement.',
            src:
              'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop',
            videoSrc:
              'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          },
          {
            type: 'image',
            title: 'Creative direction on set',
            src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
            description:
              'Creative supervision during production to keep message and visual language aligned.',
            videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
          },
          {
            type: 'image',
            title: 'Custom social content',
            src: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1600&auto=format&fit=crop',
            description: 'Content tailored to each brand positioning and platform behavior.',
            videoSrc:
              'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          },
          {
            type: 'image',
            title: 'Production behind the scenes',
            src: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1600&auto=format&fit=crop',
            description:
              'Behind-the-scenes capture to reinforce craftsmanship and trust in your social production workflow.',
            videoSrc: 'https://www.w3schools.com/html/movie.mp4',
          },
        ],
        companyGallery: [
          {
            type: 'image',
            title: 'Real project 01',
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
          },
          {
            type: 'image',
            title: 'Real project 02',
            src: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=1600&auto=format&fit=crop',
          },
          {
            type: 'video',
            title: 'Real project 03 (video)',
            src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
            poster:
              'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
          },
        ],
        bullets: [
          'Meta and Google campaigns focused on results, measurement and optimization cadence',
          'Social content with creative direction and narrative aligned to your offer',
        ],
      },
      {
        title: 'Presence & conversion',
        services: [],
        showcase: [],
        bullets: [
          'Websites, landing pages and sales pages whenever they are part of the agreed funnel',
          'Conversion-first structure and technical SEO where it matters; testing to refine offer and messaging',
        ],
      },
      {
        title: 'Service & relationship',
        services: [],
        showcase: [],
        bullets: [
          'WhatsApp flows integrated with automations (e.g. n8n) and CRM context',
          'Qualification and follow-up with a defined process, even when demand volume grows',
        ],
      },
      {
        title: 'TechT Ecosystem (platform)',
        services: [],
        showcase: [],
        bullets: [
          'Multi-tenant setup: CRM, traffic, client portal, scheduling, finance and dashboards with insights that complement your analysis',
          'Secure login, admin area and one unified view of sales, media and numbers for faster decisions',
        ],
      },
    ],
  },
  disclaimer:
    'Investment and scope come from diagnosis: we assess your moment, ticket and operation to build a proposal with real priorities, strong execution and continuous evolution.',
  cta: {
    primaryLabel: 'I want to build my full operation',
    waMessage:
      'Hello! I came from TechT website. I want to understand how you structure a complete marketing operation (from first customer to sale) and how TechT Ecosystem organizes execution, analysis and decisions.',
    secondaryLabel: 'I prefer to send a briefing form',
    secondaryHref: '/contato',
  },
};

export const getOfferings = (locale: Locale) => (locale === 'en' ? OFFERINGS_EN : OFFERINGS_PT);
export const OFFERINGS = OFFERINGS_PT;

