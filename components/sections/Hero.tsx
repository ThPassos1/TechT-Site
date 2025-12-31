
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GRADIENTS, SOCIALS } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';
import Container from '../ui/Container';

const Hero: React.FC = () => {
  const { hero } = SITE_CONFIG;

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D2FF]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9D50BB]/10 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00D2FF]">{hero.badge}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white">
            {hero.titlePart1}<span className={GRADIENTS.text}>{hero.titleHighlight}</span>{hero.titlePart2}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link 
              to="/contato"
              className={`${GRADIENTS.primary} text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,210,255,0.4)] inline-block text-center`}
            >
              {hero.ctaButton}
            </Link>
            
            {/* Social Buttons Group */}
            <div className="flex items-center gap-4">
              {SOCIALS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:border-[#00D2FF] hover:shadow-[0_0_15px_rgba(0,210,255,0.2)] transition-all"
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-[-1] opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />
    </section>
  );
};

export default Hero;
