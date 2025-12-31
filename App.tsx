import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Portfolio from './components/sections/Portfolio';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import About from './components/sections/About';
import Traffic from './components/sections/Traffic';
import Intelligence from './components/sections/Intelligence';
import { SITE_CONFIG } from './siteConfig';

import Blog from "./components/sections//blog.tsx";
import BlogPost from "./components/sections/blog/BlogPost";

// Hook de Scroll Automático
const ScrollToSection = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const targetId = pathname.substring(1);

    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
};

// HomePage
const HomePage = () => (
  <main>
    <Hero />
    <About />
    <Traffic />
    <Intelligence />
    <Services />
    <Portfolio />
    <Contact />
  </main>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToSection />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            {/* Páginas principais */}
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<HomePage />} />
            <Route path="/trafego" element={<HomePage />} />
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
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
