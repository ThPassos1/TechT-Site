import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, BarChart3, Sparkles } from 'lucide-react';
import { GRADIENTS, WHATSAPP_URL } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';
import Container from '../ui/Container';

const iconMap: { [key: string]: React.ReactNode } = {
  'Atende 24 Horas': <Clock className="w-8 h-8" strokeWidth={1.5} />,
  'Qualifica Leads': <Zap className="w-8 h-8" strokeWidth={1.5} />,
  'Sugere Melhorias': <BarChart3 className="w-8 h-8" strokeWidth={1.5} />,
  'Aumenta Conversão': <Sparkles className="w-8 h-8" strokeWidth={1.5} />,
};

const AIFeatures: React.FC = () => {
  const { aiFeatures } = SITE_CONFIG;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="ia" className="relative py-20 md:py-32 overflow-hidden bg-black/50">
      {/* Animated Aurora Background */}
      <style>{`
        @keyframes aurora {
          0%, 100% { opacity: 0.5; transform: translate(0, 0); }
          50% { opacity: 1; transform: translate(10px, 10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 210, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 210, 255, 0.6); }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-[#00D2FF]/20 via-transparent to-transparent blur-[100px]"
          style={{
            animation: 'aurora 15s ease-in-out infinite',
          }}
        />
      </div>

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
              {aiFeatures.badge}
            </span>
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {aiFeatures.title}
            <span className={GRADIENTS.text}>{aiFeatures.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {aiFeatures.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {aiFeatures.features.map((feature, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={itemVariants}
              className={`group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:border-[#00D2FF]/50 hover:bg-[#00D2FF]/10 transition-all overflow-hidden ${
                idx % 2 === 0 ? 'hover:shadow-[0_0_30px_rgba(0,210,255,0.4)]' : ''
              }`}
            >
              {/* Pulse glow on hover - only for even indices */}
              {idx % 2 === 0 && (
                <div
                  className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-[#00D2FF]/10 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                  style={{
                    animation: 'none',
                  }}
                />
              )}

              {/* Shine effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#9D50BB] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {iconMap[feature.title] || <Sparkles className="w-6 h-6" />}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Hint */}
                {feature.hint && (
                  <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                    <span className="text-xs text-[#00D2FF] font-semibold uppercase tracking-wider">
                      💡
                    </span>
                    <p className="text-xs text-gray-400">{feature.hint}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Quer ver a IA em ação? Agende uma demonstração agora mesmo.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block ${GRADIENTS.primary} text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)]`}
          >
            Ver Demonstração
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default AIFeatures;
