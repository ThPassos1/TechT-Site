
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GRADIENTS, SOCIALS, WHATSAPP_URL } from '../../constants';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import { useAppPreferences } from '../../context/AppPreferencesContext';
import { UI_TEXT, getNavigation } from '../../i18n/ui';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { locale, toggleLocale } = useAppPreferences();
  const ui = UI_TEXT[locale];
  const nav = getNavigation(locale);

  // Bloquear scroll quando o menu estiver aberto para evitar que o fundo se mova
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fix: Explicitly define the Variants type to resolve 'string' not assignable to 'AnimationGeneratorType' in transition
  const menuVariants: Variants = {
    closed: { opacity: 0, x: "100%" },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] border-b transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/80 backdrop-blur-2xl border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.35)]'
            : 'bg-[#050505]/55 backdrop-blur-xl border-white/5'
        }`}
      >
        <Container className="h-20 lg:h-24 flex items-center">
          <Link to="/" className="hover:opacity-90 transition-all duration-300 relative z-10">
            <Logo showText={true} className="h-10 lg:h-12" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-10 ml-16">
            {nav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#00D2FF] hover:-translate-y-0.5 transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={toggleLocale}
              className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs font-bold tracking-wider text-gray-300 hover:text-[#00D2FF] transition-colors"
              aria-label="Toggle language"
            >
              {locale === 'pt' ? 'EN' : 'PT'}
            </button>
            <Link
              to="/contato"
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-tighter transition-all hover:scale-105 active:scale-95 ${GRADIENTS.primary} text-black shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:shadow-[0_0_35px_rgba(146,95,255,0.34)]`}
            >
              {ui.start}
            </Link>
          </nav>

          {/* Mobile Toggle Button */}
          <button 
            className="ml-auto lg:hidden text-white p-2.5 rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform"
            onClick={() => setIsOpen(true)}
            aria-label={ui.openMenu}
          >
            <Menu size={28} />
          </button>
        </Container>
      </header>

      {/* Mobile Menu Takeover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 w-full h-full bg-black z-[999] flex flex-col lg:hidden"
          >
            {/* Menu Header Area */}
            <div className="flex items-center justify-between p-6 h-20 border-b border-white/5 flex-shrink-0">
              <Logo showText={true} className="h-10" />
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white p-2 rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform"
              >
                <X size={32} />
              </button>
            </div>

            {/* Navigation Links - REMOVED justify-center to fix missing top items */}
            <div className="flex-grow flex flex-col px-8 py-12 overflow-y-auto">
              <nav className="space-y-4">
                {nav.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-end justify-between py-4 border-b border-white/5"
                    >
                      <span className="text-4xl md:text-6xl font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[#00D2FF] font-mono text-sm mb-2 opacity-50 group-hover:opacity-100">
                        0{idx + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Action Area */}
              <div className="mt-12 space-y-4 pb-8">
                <Link
                  to="/contato"
                  onClick={() => setIsOpen(false)}
                  className={`block w-full py-4 text-center rounded-2xl font-bold text-lg uppercase tracking-widest ${GRADIENTS.primary} text-black shadow-[0_0_30px_rgba(0,210,255,0.4)]`}
                >
                  {ui.start}
                </Link>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#00D2FF] transition-colors"
                >
                  {ui.whatsappDirect}
                </a>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={toggleLocale}
                    className="py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-gray-300"
                  >
                    {locale === 'pt' ? 'English' : 'Português'}
                  </button>
                </div>

                {/* Social Links Small */}
                <div className="flex justify-center gap-8 py-4">
                  {SOCIALS.map(social => (
                    <a 
                      key={social.name} 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Tagline */}
            <div className="p-8 text-center border-t border-white/5 flex-shrink-0 bg-black">
              <p className="text-[10px] text-gray-700 uppercase tracking-[0.5em] font-bold">
                {ui.menuTagline}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
