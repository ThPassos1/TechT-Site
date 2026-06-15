import React, { useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SEOHead from './components/SEOHead';
// import { GoogleTagManager, trackPageView } from './components/analytics/GoogleTagManager'; // TODO: Ativar com GTM ID
import Hero from './components/sections/Hero';
import Contact from './components/sections/Contact';
import { GoogleTagManager, trackPageView } from './components/analytics/GoogleTagManager';
import { useAppPreferences } from './context/AppPreferencesContext';

import Blog from './components/sections/blog.tsx';
import BlogPost from "./components/sections/blog/BlogPost";

const Offerings = React.lazy(() => import('./components/sections/Offerings'));
const OperationVisual = React.lazy(() => import('./components/sections/OperationVisual'));

// Hook de Scroll Automático
const ScrollToSection = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const targetId = pathname.substring(1);
    trackPageView(pathname || '/');

    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const headerOffset = 100;

    const scrollToId = () => {
      const element = document.getElementById(targetId);
      if (!element) return false;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      return true;
    };

    // 1ª tentativa imediata, depois RAF, depois retry curto.
    // Cobre o caso de navegação entre /servicos -> /sobre (DOM já montado)
    // e também o de deep-link inicial (DOM pode ainda estar a montar).
    if (scrollToId()) return;

    let attempts = 0;
    let rafId = 0;
    const tick = () => {
      attempts += 1;
      if (scrollToId() || attempts >= 12) return;
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
};

type SeoEntry = {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  noindex?: boolean;
};

const SEO_ROUTES_PT: Record<string, SeoEntry> = {
  '/': {
    title: 'TechT | Agência de marketing, tecnologia e automação com IA em Manaus',
    description:
      'Agência de marketing e tecnologia em Manaus especializada em tráfego pago, social media, produção audiovisual, criação de sites, automação com inteligência artificial e agentes de IA para WhatsApp.',
    keywords: [
      'agência de marketing em Manaus',
      'agência de tráfego pago em Manaus',
      'social media em Manaus',
      'automação com IA em Manaus',
      'criação de sites em Manaus',
      'agência de tecnologia em Manaus',
      'inteligência artificial para empresas',
      'agentes de IA para WhatsApp',
      'produção audiovisual em Manaus',
    ],
    canonicalPath: '/',
  },
  '/agencia-marketing-manaus': {
    title: 'Agência de Marketing em Manaus | TechT',
    description:
      'Estrutura de operação de marketing em Manaus com tráfego pago, social media, conteúdo e inteligência aplicada para crescimento previsível.',
    keywords: [
      'agência de marketing em Manaus',
      'marketing digital em Manaus',
      'agência TechT Manaus',
    ],
    canonicalPath: '/agencia-marketing-manaus',
  },
  '/trafego-pago-manaus': {
    title: 'Agência de Tráfego Pago em Manaus | TechT',
    description:
      'Gestão de tráfego pago em Manaus com estratégia, criativos, otimização contínua e leitura de dados para aumentar conversões.',
    keywords: ['tráfego pago em Manaus', 'Meta Ads Manaus', 'Google Ads Manaus'],
    canonicalPath: '/trafego-pago-manaus',
  },
  '/social-media-manaus': {
    title: 'Social Media em Manaus | TechT',
    description:
      'Social media em Manaus com planejamento editorial, produção de conteúdo, reels e direção criativa para marcas que querem autoridade.',
    keywords: ['social media em Manaus', 'reels em Manaus', 'conteúdo para redes sociais'],
    canonicalPath: '/social-media-manaus',
  },
  '/automacao-ia-manaus': {
    title: 'Automação com IA em Manaus | TechT',
    description:
      'Automação com inteligência artificial para empresas em Manaus, com agentes de IA para WhatsApp, CRM e rotina comercial.',
    keywords: [
      'automação com IA em Manaus',
      'inteligência artificial para empresas',
      'agentes de IA para WhatsApp',
    ],
    canonicalPath: '/automacao-ia-manaus',
  },
  '/criacao-sites-manaus': {
    title: 'Criação de Sites em Manaus | TechT',
    description:
      'Criação de sites em Manaus com foco em performance, posicionamento premium, conversão e integração com mídia e operação comercial.',
    keywords: ['criação de sites em Manaus', 'desenvolvimento web em Manaus', 'site para empresas'],
    canonicalPath: '/criacao-sites-manaus',
  },
};

const SEO_ROUTES_EN: Record<string, SeoEntry> = {
  '/': {
    title: 'TechT | Marketing, technology and AI automation in Manaus',
    description:
      'TechT is a premium agency in Manaus combining paid media, social media, audiovisual production, websites and AI automation for business growth.',
    keywords: [
      'marketing agency in Manaus',
      'paid media Manaus',
      'social media Manaus',
      'AI automation for business',
    ],
    canonicalPath: '/',
  },
};

const FUTURE_SEO_PATHS = [
  '/agencia-marketing-manaus',
  '/trafego-pago-manaus',
  '/social-media-manaus',
  '/automacao-ia-manaus',
  '/criacao-sites-manaus',
] as const;

const HomePage = () => {
  const { locale } = useAppPreferences();
  const location = useLocation();
  const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://techt-site.vercel.app').replace(/\/$/, '');
  const activeMap = locale === 'pt' ? SEO_ROUTES_PT : SEO_ROUTES_EN;

  const seo = useMemo(() => {
    const currentPath = location.pathname || '/';
    const fallback = activeMap['/'];
    const entry = activeMap[currentPath] ?? fallback;
    return {
      ...entry,
      url: `${siteUrl}${currentPath}`,
      canonical: `${siteUrl}${entry.canonicalPath}`,
    };
  }, [activeMap, location.pathname, siteUrl]);

  return (
    <main>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
        canonical={seo.canonical}
      />
      <section className="sr-only" aria-label="SEO local da TechT">
        <h2>Agência de marketing e tecnologia em Manaus</h2>
        <p>
          A TechT atende empresas em Manaus com tráfego pago, social media, produção audiovisual,
          criação de conteúdo, branding, criação de sites, desenvolvimento web e automação com IA.
        </p>
        <p>
          Implementamos inteligência artificial para empresas e agentes de IA para WhatsApp para
          acelerar atendimento, qualificação e vendas.
        </p>
      </section>
      <Hero />
      <React.Suspense fallback={<div aria-hidden className="min-h-[420px]" />}>
        <OperationVisual />
      </React.Suspense>
      <React.Suspense fallback={<div aria-hidden className="min-h-[640px]" />}>
        <Offerings />
      </React.Suspense>
      <Contact />
    </main>
  );
};

const HOME_ROUTES = new Set([
  '/',
  '/sobre',
  '/inteligencia',
  '/portfolio',
  '/servicos',
  '/contato',
  ...FUTURE_SEO_PATHS,
]);

const App: React.FC = () => {
  const gtmId = import.meta.env.VITE_GTM_ID;
  const AnimatedRoutes = () => {
    const location = useLocation();

    // Todas as rotas que renderizam HomePage compartilham a mesma key,
    // para que a página não desmonte ao navegar entre seções e o scroll
    // por âncora (#sobre, #servicos, etc.) funcione corretamente.
    const animationKey = HOME_ROUTES.has(location.pathname)
      ? 'home'
      : location.pathname;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex-grow"
        >
          <Routes location={location}>
            {/* Páginas principais */}
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<HomePage />} />
            <Route path="/inteligencia" element={<HomePage />} />
            <Route path="/portfolio" element={<HomePage />} />
            <Route path="/servicos" element={<HomePage />} />
            <Route path="/contato" element={<HomePage />} />
            <Route path="/agencia-marketing-manaus" element={<HomePage />} />
            <Route path="/trafego-pago-manaus" element={<HomePage />} />
            <Route path="/social-media-manaus" element={<HomePage />} />
            <Route path="/automacao-ia-manaus" element={<HomePage />} />
            <Route path="/criacao-sites-manaus" element={<HomePage />} />

            {/* Blog */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <Router>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      
      <ScrollToSection />
      <div className="min-h-screen flex flex-col">
        <Header />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
