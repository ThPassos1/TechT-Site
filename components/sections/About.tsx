
import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { GRADIENTS } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';

const About: React.FC = () => {
  const { about } = SITE_CONFIG;

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
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-white">
              {about.title}<span className={GRADIENTS.text}>{about.titleHighlight}</span>{about.titleSuffix}
            </h2>
            
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
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
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050505] bg-white/10 flex items-center justify-center text-[10px] font-bold">
                    {i === 3 ? about.stats.count : ''}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">
                {about.stats.label} <span className="text-[#00D2FF]">{about.stats.year}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default About;
