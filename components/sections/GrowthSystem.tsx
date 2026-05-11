import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { GRADIENTS, WHATSAPP_URL } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';
import Container from '../ui/Container';

const GrowthSystem: React.FC = () => {
  const { growthSystem } = SITE_CONFIG;

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        type: 'spring' as const,
        stiffness: 100,
      },
    }),
  };

  return (
    <section id="solucao" className="relative py-20 md:py-32 overflow-hidden bg-black/30 border-b border-white/5">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D2FF]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#9D50BB]/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00D2FF]">
              {growthSystem.badge}
            </span>
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {growthSystem.title}
            <span className={GRADIENTS.text}>{growthSystem.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            {growthSystem.subtitle}
          </p>
        </motion.div>

        {/* 5 Steps Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pb-12">
          {growthSystem.steps.map((step, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="group relative"
            >
              <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:border-[#00D2FF]/50 hover:bg-[#00D2FF]/10 transition-all duration-300 flex flex-col">
                {/* Step Number */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#9D50BB] flex items-center justify-center text-black font-bold text-lg mb-4">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-3 flex-grow">
                  {step.description}
                </p>

                {/* Details */}
                {step.details && (
                  <div className="flex items-start gap-2 pt-3 border-t border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-500">{step.details}</p>
                  </div>
                )}
              </div>

              {/* Connection line (between steps, hidden on mobile) */}
              {idx < growthSystem.steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-[#00D2FF] to-transparent opacity-20" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Esse sistema é o que nossos clientes usam para sair de 0 e chegar em frente aos concorrentes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${GRADIENTS.primary} text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)]`}
            >
              Quero Começar
            </a>
            <button className="px-8 py-3 rounded-full font-bold text-sm uppercase tracking-tighter border border-white/20 text-white hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all">
              Ver Demonstração
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default GrowthSystem;
