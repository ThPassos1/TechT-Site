import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Zap, Shield } from 'lucide-react';
import { GRADIENTS } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';
import Container from '../ui/Container';
import { AnimatedNumber } from '../ui/AnimatedNumber';

const iconMap: { [key: string]: React.ReactNode } = {
  'Mais Leads': <TrendingUp className="w-8 h-8" strokeWidth={1.5} />,
  'Mais Vendas': <Target className="w-8 h-8" strokeWidth={1.5} />,
  'Processo Previsível': <Zap className="w-8 h-8" strokeWidth={1.5} />,
  'Menos Desperdício': <Shield className="w-8 h-8" strokeWidth={1.5} />,
};

const Benefits: React.FC = () => {
  const { benefits } = SITE_CONFIG;

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
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
    <section className="relative py-20 md:py-32 overflow-hidden bg-black/30 border-y border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#00D2FF]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#9D50BB]/5 blur-[120px] rounded-full pointer-events-none" />

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
              {benefits.badge}
            </span>
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {benefits.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {benefits.subtitle}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {benefits.items.map((benefit, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:border-[#00D2FF]/50 hover:bg-[#00D2FF]/10 transition-all"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#9D50BB] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {iconMap[benefit.title] || <TrendingUp className="w-6 h-6" />}
              </div>

              {/* Value */}
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#9D50BB] mb-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                >
                  <AnimatedNumber
                    value={benefit.value}
                    duration={4000}
                  />
                </motion.div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2">
                {benefit.title}
              </h3>

              {/* Description */}
              {benefit.description && (
                <p className="text-sm text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm">
            *Resultados em 90 dias em média. Varia conforme segmento e investimento.
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default Benefits;
