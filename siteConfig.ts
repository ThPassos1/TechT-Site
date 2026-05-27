/**
 * SITE CONFIGURATION - TECHT ECOSYSTEM
 * Utilize este arquivo para alterar rapidamente os textos e imagens de todo o ecossistema.
 */

/* 🔹 IMPORTS DAS IMAGENS */
import logoImage from "./assets/images/logo.png";
import aboutImage from "./assets/images/thiago.jpeg";

import landingpage from "./assets/images/portfolio/landingpage.png";
import ecomerce from "./assets/images/portfolio/ecomerce.png";
import agenciadeviagem from "./assets/images/portfolio/agenciadeviagem.png";
import barbearia from "./assets/images/portfolio/barbearia.png";
import sistemas from "./assets/images/portfolio/sistemas.png";

import blogCriptografiaImg from "./assets/images/blog/criptografiaquantica.png";
import { getOfferings } from "./offeringsData";
import type { Locale } from "./context/AppPreferencesContext";

const SITE_CONFIG_PT = {
  // Identidade da Marca
  brand: {
    name: "TECHT",
    highlight: "",
    tagline: "Tecnologia que gera resultados",
    logoGlow: "#00D2FF",
    logoImage: logoImage,
  },

  hero: {
    badge: "TechT — operação completa de marketing (Manaus & remoto)",
    titlePart1: "Do primeiro cliente à ",
    titleHighlight: "venda",
    titlePart2: ", num só ecossistema.",
    description:
      "Você contrata uma operação completa de marketing para gerar clientes com consistência. Da mídia ao fechamento, cada etapa elimina desperdício e aumenta previsibilidade. A IA apoia validações e análises. Estratégia e execução seguem com método humano, no Ecossistema TechT.",
    ctaButton: "Quero estruturar minha operação de marketing",
    ctaSecondary: "Ver a plataforma",
    primaryWaMessage:
      "Olá! Vim pelo site da TechT. Quero entender como vocês estruturam uma operação completa de marketing (do primeiro cliente à venda) e como o Ecossistema TechT organiza execução, análises e decisões.",
  },

  offerings: getOfferings('pt'),

  intelligence: {
    badge: "Ecossistema TechT",
    title: "A ",
    titleHighlight: "central de operação",
    titleSuffix: " da agência",
    description:
      "Central multi-cliente com CRM, tráfego, portal, agenda, automações, financeiro e relatórios. IA apoia validação e priorização, com decisão humana. WhatsApp, fluxos automáticos, login seguro e área admin.",
  },

  about: {
    badge: "Ecossistema TechT",
    title: "Tecnologia, mídia e operação ",
    titleHighlight: "conectadas para gerar crescimento",
    titleSuffix: ".",
    image: aboutImage,
    description:
      "A TechT é um ecossistema que conecta tecnologia, mídia, conteúdo, CRM, automações, IA e operação comercial em um único sistema de crescimento. Cada parte se comunica para reduzir desperdício, aumentar previsibilidade e trazer clareza estratégica em cada decisão.",
    founderName: "TechT",
    stats: {
      label: "Projetos entregues",
      year: "2026",
      count: "+50",
    },
    purpose: {
      title: "Operação conectada",
      text: "Mídia, CRM, conteúdo, automações e dados operando como um único sistema — sem ilhas, sem retrabalho.",
    },
    expertise: {
      title: "Inteligência aplicada",
      text: "IA presente em análises, validações e recomendações para acelerar decisões com base em sinais reais.",
    },
    manifestoEyebrow: "Visão",
    manifestoLead:
      "A TechT é uma empresa de tecnologia aplicada ao crescimento. Operamos como um ecossistema conectado — mídia, CRM, IA, automações, dashboards e WhatsApp orquestrados em um único sistema, em que cada camada conversa com a próxima para reduzir desperdício, aumentar previsibilidade e trazer contexto a cada decisão.",
    manifestoTail:
      "A IA acelera análises, validações e recomendações. O direcionamento estratégico continua humano, orientado pelo contexto real de cada cliente — execução premium, etapa por etapa.",
    valueCards: [
      {
        id: "operation",
        title: "Operação conectada",
        text: "Mídia, CRM, conteúdo, automações e dados operando como um único sistema — sem ilhas e sem retrabalho.",
      },
      {
        id: "intelligence",
        title: "Inteligência aplicada",
        text: "IA presente em análises, validações e priorização para acelerar decisões com base em sinais reais.",
      },
      {
        id: "growth",
        title: "Crescimento estruturado",
        text: "Cada etapa medida, ajustada e otimizada para que sua receita cresça com previsibilidade — não por acaso.",
      },
      {
        id: "ecosystem",
        title: "Plataforma proprietária",
        text: "Uma camada própria que organiza execução, números e contexto em uma única visão da operação.",
      },
    ],
    metrics: [
      { id: "projects", value: 50, suffix: "+", label: "Projetos entregues" },
      { id: "ops", value: 12, suffix: "+", label: "Operações ativas" },
      { id: "camps", value: 80, suffix: "+", label: "Campanhas gerenciadas" },
      { id: "flows", value: 1200, suffix: "+", label: "Fluxos automatizados" },
    ],
    ecosystemHub: "TECHT",
    ecosystemNodes: [
      { id: "midia", label: "Mídia", icon: "media" },
      { id: "crm", label: "CRM", icon: "crm" },
      { id: "ia", label: "IA", icon: "ai" },
      { id: "automacoes", label: "Automações", icon: "automation" },
      { id: "dashboards", label: "Dashboards", icon: "dashboard" },
      { id: "whatsapp", label: "WhatsApp", icon: "whatsapp" },
    ],
  },

  // SEÇÃO Portfolio (MANTÉM)
  portfolio: [
    {
      id: "institutional-sites",
      title: "Operação com CRM e funil",
      description:
        "Tráfego, páginas de captura e acompanhamento de oportunidades em um fluxo único.",
      category: "Case de Sucesso",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      tags: ["Growth", "Lead Gen", "Automação"],
    },
    {
      id: "landingpage",
      title: "Landing Pages de Conversão",
      description:
        "Páginas que convertem 8-12% do tráfego em leads qualificados.",
      category: "Presença Digital",
      imageUrl: landingpage,
      tags: ["CRO", "Copy", "UX"],
    },
    {
      id: "ecomerce",
      title: "E-commerce com IA",
      description:
        "Loja online que oferece produtos via recomendação inteligente.",
      category: "E-commerce",
      imageUrl: ecomerce,
      tags: ["Vendas", "IA", "Automação"],
    },
    {
      id: "agencia-de-viagem",
      title: "Agência Digital de Serviços",
      description: "Sistema completo de vendas online para prestadores.",
      category: "SaaS",
      imageUrl: agenciadeviagem,
      tags: ["Booking", "Payment", "CRM"],
    },
    {
      id: "barbearia",
      title: "Sistema de Agendamento Automatizado",
      description:
        "CRM + Agendamento + Lembretes automáticos reduzem no-shows em 95%.",
      category: "Operações",
      imageUrl: barbearia,
      tags: ["Automação", "WhatsApp", "CRM"],
    },
    {
      id: "sistemas",
      title: "Dashboards de Inteligência",
      description:
        "Visualização em tempo real de leads, conversões, ROI e faturamento.",
      category: "Analytics",
      imageUrl: sistemas,
      tags: ["BI", "Analytics", "Real-time"],
    },
  ],

  // SEÇÃO Blog (MANTÉM)
  blog: {
    title: "Conteúdo TechT",
    subtitle:
      "Tráfego pago, CRM, automação e cases reais — para quem leva crescimento a sério.",
    posts: [
      {
        id: "post-1",
        title: "Criptografia Quântica: O Futuro da Segurança Digital",
        excerpt:
          "Como as novas tecnologias de criptografia estão se preparando para a era da computação quântica e o que isso significa para sua empresa.",
        date: "24 de Outubro, 2025",
        author: "Thiago Passos",
        category: "CIBERSEGURANÇA",
        image: blogCriptografiaImg,
        imageCaption: "Criptografia Quântica: segurança do futuro",
        content: `
          <p class="mb-4 leading-relaxed">
            A evolução da tecnologia trouxe inúmeros benefícios para empresas e usuários,
            mas também aumentou significativamente os riscos relacionados à segurança da informação.
            Com o avanço da <strong>computação quântica</strong>, os métodos tradicionais de criptografia
            começam a enfrentar um grande desafio.
          </p>
          <h2 class="text-2xl font-bold mt-8 mb-4 text-white">O que é Criptografia Quântica?</h2>
          <p class="mb-4 leading-relaxed">
            A criptografia quântica é um conjunto de técnicas baseadas nos princípios da
            <strong>mecânica quântica</strong>. Diferente da criptografia clássica, ela utiliza
            propriedades físicas das partículas para garantir a segurança da informação.
          </p>
          <p class="mb-4 leading-relaxed">
            Um dos principais conceitos é a <strong>Distribuição Quântica de Chaves (QKD)</strong>,
            que permite a troca segura de chaves criptográficas, tornando qualquer tentativa
            de interceptação imediatamente detectável.
          </p>
          <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Por que a Computação Quântica é uma Ameaça?</h2>
          <p class="mb-4 leading-relaxed">
            Algoritmos como RSA e ECC dependem da dificuldade de certos cálculos matemáticos.
            Computadores quânticos, utilizando algoritmos como o <strong>Algoritmo de Shor</strong>,
            podem quebrar essas proteções muito mais rapidamente.
          </p>
          <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Como a Criptografia Quântica Protege os Dados?</h2>
          <ul class="list-disc list-inside mb-4 leading-relaxed">
            <li>Detecta tentativas de espionagem em tempo real</li>
            <li>Oferece comunicação extremamente segura</li>
            <li>Protege dados contra ataques futuros</li>
            <li>Aumenta a confiabilidade das transmissões</li>
          </ul>
          <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Desafios e Limitações</h2>
          <p class="mb-4 leading-relaxed">
            Apesar de promissora, a criptografia quântica ainda enfrenta desafios como
            alto custo de implementação, infraestrutura complexa e limitações de distância.
          </p>
          <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Impacto para Empresas e Governos</h2>
          <p class="mb-4 leading-relaxed">
            Setores como finanças, saúde, telecomunicações e governo já estudam a adoção
            dessas tecnologias para garantir a segurança de dados sensíveis e a confiança
            dos usuários.
          </p>
          <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Conclusão</h2>
          <p class="mb-4 leading-relaxed">
            A criptografia quântica representa o futuro da segurança digital.
            Preparar-se desde já para essa nova era é essencial para empresas que
            levam a proteção de dados a sério.
          </p>
        `,
      },
      {
        id: "post-2",
        title: "Geração de Leads com IA: Dobrar Conversões em 90 Dias",
        excerpt:
          "Estratégia passo a passo que nossos clientes usam para gerar mais leads qualificados com automação inteligente.",
        date: "15 de Outubro, 2024",
        author: "Thiago Passos",
        category: "GROWTH",
      },
      {
        id: "post-3",
        title: "CRM + Automação: O Stack que Escalou 50 Empresas",
        excerpt:
          "Como integrar CRM, chatbot e email automático em um funil que roda 24 horas sem você.",
        date: "05 de Outubro, 2024",
        author: "Thiago Passos",
        category: "AUTOMAÇÃO",
      },
      {
        id: "post-4",
        title: "Meta Ads + Google Ads: Máquina Híbrida de Clientes",
        excerpt:
          "Combinar tráfego pago em duas plataformas é a receita secreta de empresas que geram mais de 100K/mês.",
        date: "28 de Setembro, 2024",
        author: "Thiago Passos",
        category: "TRÁFEGO",
      },
    ],
  },

  // SEÇÃO Contact (renomeado para "Entre em Contato")
  contact: {
    title: "Inicie sua ",
    titleHighlight: "Transformação",
    titleSuffix: "",
    description:
      "Conte seu nicho, ticket e meta de crescimento. Desenhamos o plano da sua operação de marketing, com etapas claras, prioridades reais e o melhor próximo passo para aquisição.",
    email: "thiagopassos.dev@gmail.com",
    location: "Manaus - AM | Atendimento Global",
  },
} as const;

export const getSiteConfig = (locale: Locale) => {
  if (locale === 'en') {
    return {
      ...SITE_CONFIG_PT,
      brand: {
        ...SITE_CONFIG_PT.brand,
        tagline: 'Technology that drives results',
      },
      hero: {
        badge: 'TechT — complete marketing operation (Manaus & remote)',
        titlePart1: 'From first customer to ',
        titleHighlight: 'sale',
        titlePart2: ', in one ecosystem.',
        description:
          'You hire a complete marketing operation built to win customers consistently. From media to close, every stage cuts waste and builds predictability. AI supports validation and analysis. Strategy and execution stay human-led, inside the TechT Ecosystem.',
        ctaButton: 'I want to structure my marketing operation',
        ctaSecondary: 'See the platform',
        primaryWaMessage:
          'Hello! I came from TechT website. I want to understand how you structure a complete marketing operation (from first customer to sale) and how TechT Ecosystem organizes execution, analysis and decisions.',
      },
      offerings: getOfferings('en'),
      intelligence: {
        badge: 'TechT Ecosystem',
        title: 'The ',
        titleHighlight: 'agency operations hub',
        titleSuffix: '',
        description:
          'Multi-client hub with CRM, paid media, portal, scheduling, automations, finance and reports. AI supports validation and prioritization, with human-led decisions. WhatsApp, automated flows, secure login and admin area.',
      },
      about: {
        ...SITE_CONFIG_PT.about,
        badge: 'TechT Ecosystem',
        title: 'Technology, media and operation ',
        titleHighlight: 'connected to drive growth',
        titleSuffix: '.',
        description:
          'TechT is an ecosystem that connects technology, media, content, CRM, automations, AI and sales operation into a single growth system. Every layer talks to the next to reduce waste, increase predictability and bring strategic clarity to every decision.',
        founderName: 'TechT',
        stats: {
          ...SITE_CONFIG_PT.about.stats,
          label: 'Projects delivered',
        },
        purpose: {
          title: 'Connected operation',
          text: 'Media, CRM, content, automations and data running as a single system — no silos, no rework.',
        },
        expertise: {
          title: 'Applied intelligence',
          text: 'AI embedded in analysis, validation and prioritization to speed up decisions based on real signals.',
        },
        manifestoEyebrow: 'Vision',
        manifestoLead:
          'TechT is a technology company applied to growth. We operate as a connected ecosystem — media, CRM, AI, automations, dashboards and WhatsApp orchestrated into a single system, where each layer talks to the next to reduce waste, increase predictability and bring context to every decision.',
        manifestoTail:
          'AI accelerates analysis, validation and recommendations. Strategic direction stays human, guided by each client’s real context — premium execution, stage by stage.',
        valueCards: [
          {
            id: 'operation',
            title: 'Connected operation',
            text: 'Media, CRM, content, automations and data running as a single system — no silos and no rework.',
          },
          {
            id: 'intelligence',
            title: 'Applied intelligence',
            text: 'AI present in analysis, validation and prioritization to speed up decisions based on real signals.',
          },
          {
            id: 'growth',
            title: 'Structured growth',
            text: 'Every step measured, tuned and optimized so your revenue grows predictably — not by chance.',
          },
          {
            id: 'ecosystem',
            title: 'Proprietary platform',
            text: 'An in-house layer that organizes execution, numbers and context into a single operation view.',
          },
        ],
        metrics: [
          { id: 'projects', value: 50, suffix: '+', label: 'Projects delivered' },
          { id: 'ops', value: 12, suffix: '+', label: 'Active operations' },
          { id: 'camps', value: 80, suffix: '+', label: 'Campaigns managed' },
          { id: 'flows', value: 1200, suffix: '+', label: 'Automated flows' },
        ],
        ecosystemHub: 'TECHT',
        ecosystemNodes: [
          { id: 'midia', label: 'Media', icon: 'media' },
          { id: 'crm', label: 'CRM', icon: 'crm' },
          { id: 'ia', label: 'AI', icon: 'ai' },
          { id: 'automacoes', label: 'Automations', icon: 'automation' },
          { id: 'dashboards', label: 'Dashboards', icon: 'dashboard' },
          { id: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp' },
        ],
      },
      contact: {
        ...SITE_CONFIG_PT.contact,
        title: 'Start your ',
        titleHighlight: 'Transformation',
        titleSuffix: '',
        description:
          'Tell us your niche, average ticket and growth goals. We design your marketing operation with clear stages, real priorities and a practical next step.',
        location: 'Manaus - AM | Global service',
      },
    };
  }

  return SITE_CONFIG_PT;
};

export const SITE_CONFIG = SITE_CONFIG_PT;
