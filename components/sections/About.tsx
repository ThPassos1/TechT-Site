
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';
import { GRADIENTS } from '../../constants';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import TypewriterHeadline from '../effects/TypewriterHeadline';

const About: React.FC = () => {
  const { about } = useSiteConfig();
  const reducedMotion = useReducedMotion();
  const headingDelay = reducedMotion ? 0 : 0.4;
  const headingInterval = reducedMotion ? 0 : 105;
  const headingTextLength = `${about.title}${about.titleHighlight}${about.titleSuffix}`.length;
  const titleDoneDelay = reducedMotion
    ? 0
    : (headingDelay * 1000 + headingTextLength * headingInterval) / 1000 + 0.1;

  return (
    <section id="sobre" className="py-24 relative overflow-hidden bg-[#050505]">
      {/* Luz de fundo decorativa - Sintonizada com o tom da sua foto */}
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-[#00D2FF]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Coluna da Imagem - Otimizada para Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group bg-[#0a0a0a]">
              {/* Moldura de brilho interna */}
              <div className="absolute inset-0 border-2 border-[#00D2FF]/20 rounded-[2rem] z-20 pointer-events-none group-hover:border-[#00D2FF]/40 transition-colors" />
              
              <img 
                src={about.image} 
                alt={`${about.founderName} - Fundador TechT`} 
                className="w-full aspect-[3/4] object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  // Fallback para uma imagem de desenvolvedor dark se o arquivo local não for encontrado
                  (e.target as HTMLImageElement).src = './assets/images/thiago.jpeg';
                }}
              />
              
              {/* Overlay gradiente inferior para fundir a foto com o fundo do site */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Brilho neon atrás da foto */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#00D2FF]/20 to-[#9D50BB]/10 blur-3xl -z-10 rounded-[3rem] opacity-50" />
          </motion.div>

          {/* Coluna de Texto */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold text-[#00D2FF] uppercase tracking-[0.3em] mb-4 block">{about.badge}</span>
            <TypewriterHeadline
              as="h2"
              startOnInView
              startDelayMs={headingDelay * 1000}
              charIntervalMs={headingInterval}
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-white"
              segments={[
                { text: about.title },
                { text: about.titleHighlight, className: GRADIENTS.text },
                { text: about.titleSuffix },
              ]}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: titleDoneDelay }}
              className="space-y-6 text-gray-400 text-lg leading-relaxed"
            >
              <p>
                {about.description.split(about.founderName).map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i !== arr.length - 1 && <span className="text-white font-semibold">{about.founderName}</span>}
                  </React.Fragment>
                ))}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-white font-bold mb-2 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] mr-2" />
                    {about.purpose.title}
                  </h4>
                  <p className="text-sm opacity-80">{about.purpose.text}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-white font-bold mb-2 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D50BB] mr-2" />
                    {about.expertise.title}
                  </h4>
                  <p className="text-sm opacity-80">{about.expertise.text}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: titleDoneDelay + 0.15 }}
              className="mt-12 flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-[#050505] bg-white/10 flex items-center justify-center text-[10px] font-bold text-[#00D2FF]"
                    whileInView={{ scale: [1, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {i === 3 ? <AnimatedNumber value={parseInt(about.stats.count) || 0} duration={4000} /> : ''}
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">
                {about.stats.label} <span className="text-[#00D2FF]">{about.stats.year}</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default About;
