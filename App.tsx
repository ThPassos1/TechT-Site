import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SEOHead from './components/SEOHead';
// import { GoogleTagManager, trackPageView } from './components/analytics/GoogleTagManager'; // TODO: Ativar com GTM ID
import Hero from './components/sections/Hero';
import Offerings from './components/sections/Offerings';
import Contact from './components/sections/Contact';
import OperationVisual from './components/sections/OperationVisual';
import { GoogleTagManager, trackPageView } from './components/analytics/GoogleTagManager';
import { useAppPreferences } from './context/AppPreferencesContext';

import Blog from './components/sections/blog.tsx';
import BlogPost from "./components/sections/blog/BlogPost";

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

const HomePage = () => {
  const { locale } = useAppPreferences();
  const seo = locale === 'pt'
    ? {
        title: 'TechT — Marketing empresarial completo e Ecossistema TechT (Manaus e remoto)',
        description:
          'Pacote de marketing empresarial: tráfego, conteúdo, páginas, WhatsApp e plataforma Ecossistema TechT — CRM, mídia e números num só lugar. IA apoia análises e decisões. Manaus e remoto.',
        keywords: [
          'TechT',
          'marketing empresarial',
          'agência de marketing Manaus',
          'tráfego pago Meta Ads',
          'Google Ads Manaus',
          'Ecossistema TechT',
          'CRM integrado',
          'automação WhatsApp',
          'landing page conversão',
          'e-commerce',
          'sistemas sob medida',
        ],
      }
    : {
        title: 'TechT — Full marketing operation and TechT Ecosystem',
        description:
          'Complete marketing package: paid media, content, landing pages, WhatsApp and TechT Ecosystem platform with CRM, media and metrics in one place.',
        keywords: [
          'TechT',
          'marketing operation',
          'performance marketing',
          'Meta Ads',
          'Google Ads',
          'CRM platform',
          'marketing automation',
          'landing page conversion',
        ],
      };

  return (
    <main>
      <SEOHead title={seo.title} description={seo.description} keywords={seo.keywords} />
      <Hero />
      <OperationVisual />
      <Offerings />
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
