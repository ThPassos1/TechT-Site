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

export const SITE_CONFIG = {
  // Identidade da Marca
  brand: {
    name: "TECH",
    highlight: "T",
    tagline: "Evolução Digital",
    logoGlow: "#00D2FF",
    logoImage: logoImage, // agora usando import
  },

  // Seção Hero (Início)
  hero: {
    badge: "Evolução Digital & Performance",
    titlePart1: "Sites, Sistemas e ",
    titleHighlight: "Tráfego Pago",
    titlePart2: " de Elite.",
    description:
      "A TechT une engenharia de software de ponta com estratégias de tráfego agressivas para impulsionar seu faturamento no ambiente digital.",
    ctaButton: "Quero Crescer Agora",
  },

  // BLOG
  blog: {
    title: "Insights Tecnológicos",
    subtitle:
      "Explorando a próxima fronteira da inovação digital e estratégias de growth.",
    posts: [
      {
        id: "post-1",
        title: "Criptografia Quântica: O Futuro da Segurança Digital",
        excerpt:
          "Como as novas tecnologias de criptografia estão se preparando para a era da computação quântica e o que isso significa para sua empresa.",
        date: "24 de Outubro, 2025",
        author: "Thiago Passos",
        category: "CIBERSEGURANÇA",
        image: blogCriptografiaImg, // import usado
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
        title: "Otimização de Conversão (CRO) para Landing Pages de Alta Escala",
        excerpt:
          "Descubra os segredos psicológicos por trás das páginas que convertem 3x mais que a média do mercado.",
        date: "15 de Outubro, 2024",
        author: "Thiago Passos",
        category: "PERFORMANCE",
      },
      {
        id: "post-3",
        title: "Arquitetura Serverless com Node.js e Google Cloud",
        excerpt:
          "Reduza custos de infraestrutura e aumente a escalabilidade do seu sistema usando funções sem servidor.",
        date: "05 de Outubro, 2024",
        author: "Thiago Passos",
        category: "ENGENHARIA",
      },
      {
        id: "post-4",
        title: "A Revolução do Tráfego Pago com IA no Meta Ads",
        excerpt:
          "Como os novos algoritmos de inteligência artificial do Facebook estão mudando a forma como segmentamos públicos.",
        date: "28 de Setembro, 2024",
        author: "Thiago Passos",
        category: "GROWTH",
      },
    ],
  },

  // PORTFÓLIO
  portfolio: [
    {
      id: "institutional-sites",
      title: "Sites Institucionais de Elite",
      description:
        "Desenvolvimento de presença digital robusta com foco em autoridade de marca e carregamento instantâneo.",
      category: "Presença Digital",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      tags: ["Performance", "UX/UI", "SEO"],
    },
    {
      id: "landingpage",
      title: "Landing Pages de Alta Conversão",
      description:
        "Geração de leads, aumento de conversões, promoção de ofertas específicas e redução do custo de aquisição de clientes (CAC).",
      category: "Presença Digital",
      imageUrl: landingpage,
      tags: ["Performance", "UX/UI", "SEO"],
    },
    {
      id: "ecomerce",
      title: "E-commerces Escaláveis",
      description:
        "Lojas virtuais de alta performance preparadas para grandes volumes de tráfego e checkout seguro.",
      category: "Growth",
      imageUrl: ecomerce,
      tags: ["Direct Response", "Scale", "Copy"],
    },
    {
      id: "agencia-de-viagem",
      title: "Agência de Viagem",
      description: "Seus Clientes merecem o Melhor.",
      category: "Vendas Online",
      imageUrl: agenciadeviagem,
      tags: ["Shopify", "WooCommerce", "Payment APIs"],
    },
    {
      id: "barbearia",
      title: "Barbearia Online",
      description:
        "Soluções de software complexas desenvolvidas sob medida para resolver dores específicas do seu negócio.",
      category: "Engenharia",
      imageUrl: barbearia,
      tags: ["Node.js", "React", "Cloud"],
    },
    {
      id: "sistemas",
      title: "Dashboards",
      description:
        "Visualização de dados em tempo real para tomada de decisão baseada em números, não em achismos.",
      category: "Inteligência",
      imageUrl: sistemas,
      tags: ["Business Intelligence", "Analytics", "Data"],
    },
  ],

  // Seção Intelligence (Painel de Gerenciamento)
  intelligence: {
    badge: "TechT Intelligence",
    title: "Sua Operação com ",
    titleHighlight: "Transparência",
    titleSuffix: " Total.",
    description:
      "Esqueça relatórios estáticos em PDF. Nosso sistema proprietário consolida dados de todas as suas fontes de tráfego em um dashboard vivo e inteligente.",
    metrics: [
      { label: "Investimento Total", value: "R$ 84.520,50", trend: "+12.5%" },
      { label: "Conversões Totais", value: "2.150", trend: "+8.2%" },
      { label: "ROAS Médio", value: "4.09x", trend: "+2.1%" },
      { label: "Faturamento Gerado", value: "R$ 345.800,00", trend: "+14.8%" },
    ],
  },

  // Seção Tráfego Pago
  traffic: {
    badge: "Growth & Performance",
    title: "Vendas no ",
    titleHighlight: "Automático",
    titleSuffix: " com Tráfego de Elite.",
    description:
      "Não fazemos apenas anúncios. Construímos funis de vendas de alta performance que utilizam inteligência de dados para encontrar seu cliente ideal onde ele estiver.",
    features: [
      {
        title: "Meta Ads Expert",
        desc: "Domínio total de Facebook e Instagram para escala vertical e horizontal de faturamento.",
      },
      {
        title: "Google Ads (Search)",
        desc: "Apareça para quem já está procurando pelo seu produto ou serviço no momento da decisão.",
      },
      {
        title: "Data Intelligence",
        desc: "Instalação avançada de Pixel, API de Conversão e rastreamento para ROI real.",
      },
      {
        title: "Relatórios de Elite",
        desc: "Dashboards em tempo real para você acompanhar cada centavo investido e retornado.",
      },
    ],
  },

  // Seção Sobre
  about: {
    badge: "Nossa Essência",
    title: "Arquitetando o ",
    titleHighlight: "Futuro",
    titleSuffix: " através do Código.",
    image: aboutImage, // ← corrigido para usar import
    description:
      "A TechT nasceu da visão de que o desenvolvimento de software não deve ser apenas funcional, mas uma obra de arte tecnológica. Sob a liderança de Thiago Passos, transformamos desafios complexos em ecossistemas digitais fluidos.",
    founderName: "Thiago Passos",
    stats: {
      label: "Projetos Entregues em",
      year: "2024",
      count: "+10",
    },
    purpose: {
      title: "Propósito",
      text: "Empoderar marcas através de tecnologia de ponta e estratégias de conversão agressivas.",
    },
    expertise: {
      title: "Expertise",
      text: "Dominamos o full-stack moderno para criar sistemas que não apenas funcionam, mas escalam com segurança.",
    },
  },

  // Seção de Contato
  contact: {
    title: "Inicie sua ",
    titleHighlight: "Transformação",
    description:
      "Pronto para elevar seu ecossistema digital? Fale com nosso time de especialistas para arquitetar sua presença online.",
    email: "thiagopassos.dev@gmail.com",
    location: "Manaus - AM | Atendimento Global",
  },
};
