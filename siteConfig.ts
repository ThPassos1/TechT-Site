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
    tagline: "Evolução Digital",
    logoGlow: "#00D2FF",
    logoImage: logoImage,
  },

  hero: {
    badge: "TechT — operação completa de marketing (Manaus & remoto)",
    titlePart1: "Do primeiro cliente à ",
    titleHighlight: "venda",
    titlePart2: ", num só ecossistema.",
    description:
      "Você contrata uma operação completa de marketing para adquirir clientes com consistência. Da mídia ao fechamento, cada etapa reduz desperdício e aumenta previsibilidade. A IA apoia validações e análises; estratégia e execução seguem com método humano, no Ecossistema TechT.",
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
      "SaaS multi-cliente para organizar a operação da agência: CRM, tráfego, portal do cliente, agenda, automações, financeiro e analytics. A camada de IA apoia validações, priorização e leitura de cenário (sem substituir decisão). WhatsApp integrado, fluxos (ex.: n8n), login seguro e área admin. Interface moderna; backend e banco profissionais por trás.",
  },

  about: {
    badge: "Sobre nós",
    title: "Arquitetando o ",
    titleHighlight: "Futuro",
    titleSuffix: " através do Código.",
    image: aboutImage,
    description:
      "A TechT é liderada por Thiago Passos e une marketing de performance, conteúdo e engenharia de software num pacote pensado para empresas que levam aquisição a sério. A IA está presente no processo e nos sistemas para apoiar análises e prioridades — o protagonista continua sendo uma operação de marketing bem executada, etapa por etapa.",
    founderName: "Thiago Passos",
    stats: {
      label: "Projetos entregues",
      year: "2026",
      count: "+50",
    },
    purpose: {
      title: "Inovação",
      text: "Estratégia e execução com stack atual: performance, UX e ferramentas que dão clareza para decidir melhor na aquisição.",
    },
    expertise: {
      title: "Suporte",
      text: "Perto do seu time depois do go-live: campanhas, automações e plataforma evoluindo junto com o negócio.",
    },
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
        tagline: 'Digital Evolution',
      },
      hero: {
        badge: 'TechT — complete marketing operation (Manaus & remote)',
        titlePart1: 'From first customer to ',
        titleHighlight: 'sale',
        titlePart2: ', in one ecosystem.',
        description:
          'You hire a complete marketing operation to acquire customers consistently. From media to closing, each stage reduces waste and increases predictability. AI supports validation and analysis; strategy and execution remain human-led inside TechT Ecosystem.',
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
          'Multi-tenant SaaS to organize your operation: CRM, traffic, client portal, scheduling, automations, finance and analytics — with an AI layer to support validation, prioritization and data reading (not replacement).',
      },
      about: {
        ...SITE_CONFIG_PT.about,
        badge: 'About us',
        title: 'Engineering the ',
        titleHighlight: 'Future',
        titleSuffix: ' through code.',
        description:
          'TechT is led by Thiago Passos and combines performance marketing, content and software engineering in one package for businesses that take acquisition seriously. AI supports analysis and priorities, while a well-executed marketing operation remains the core.',
        stats: {
          ...SITE_CONFIG_PT.about.stats,
          label: 'Projects delivered',
        },
        purpose: {
          title: 'Innovation',
          text: 'Strategy and execution with a modern stack: performance, UX and tools that improve decision clarity in acquisition.',
        },
        expertise: {
          title: 'Support',
          text: 'Close to your team after go-live: campaigns, automations and platform evolving with your business.',
        },
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
