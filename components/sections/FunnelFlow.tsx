import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { GRADIENTS, WHATSAPP_URL } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';
import Container from '../ui/Container';

const FunnelFlow: React.FC = () => {
  const { funnel } = SITE_CONFIG;

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  return (
    <section id="funil" className="relative py-20 md:py-32 overflow-hidden bg-black/50">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-t from-[#9D50BB]/10 to-transparent pointer-events-none" />

      <Container className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00D2FF]">
              {funnel.badge}
            </span>
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {funnel.title}
            <span className={GRADIENTS.text}>{funnel.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            {funnel.description}
          </p>
        </motion.div>

        {/* Funnel Steps - Vertical Timeline */}
        <div className="max-w-2xl mx-auto">
          {funnel.steps.map((item, idx) => (
            <div key={idx}>
              <motion.div
                custom={idx}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="relative"
              >
                {/* Step Card */}
                <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:border-[#00D2FF]/50 hover:bg-white/10 transition-all group">
                  {/* Step Badge */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#9D50BB] text-white font-bold text-sm">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed ml-14">
                    {item.description}
                  </p>
                </div>
              </motion.div>

              {/* Arrow between steps */}
              {idx < funnel.steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: (idx + 1) * 0.2, duration: 0.5 }}
                  className="flex justify-center py-4"
                >
                  <ArrowDown className="w-6 h-6 text-[#00D2FF] animate-pulse" strokeWidth={1.5} />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Esse fluxo já gerou <strong className="text-[#00D2FF]">+50K leads</strong> para nossos clientes.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block ${GRADIENTS.primary} text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)]`}
          >
            Falar Com Especialista
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default FunnelFlow;
