import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { GRADIENTS, WHATSAPP_URL } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';
import Container from '../ui/Container';
import { trackPlanSelection, trackWhatsAppClick } from '../analytics/GoogleTagManager';

const SelectPlans: React.FC = () => {
  const { plans } = SITE_CONFIG;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        type: 'spring' as const,
        stiffness: 100,
      },
    }),
  };

  return (
    <section id="planos" className="relative py-20 md:py-32 overflow-hidden bg-black/30 border-b border-white/5">
      {/* Background Glow */}
      <div className="absolute top-0 center w-96 h-96 bg-[#9D50BB]/5 blur-[120px] rounded-full pointer-events-none left-1/2 -translate-x-1/2" />

      {/* Shimmer Animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

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
              {plans.badge}
            </span>
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {plans.title}
            <span className={GRADIENTS.text}>{plans.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {plans.subtitle}
          </p>
        </motion.div>

        {/* Plans Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {plans.cards.map((plan, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              className={`group relative rounded-2xl overflow-hidden transition-all ${
                plan.highlighted
                  ? 'md:scale-105 border-2 border-[#00D2FF] bg-[#00D2FF]/10'
                  : 'border border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              {/* Animated glow background */}
              {plan.highlighted && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00D2FF]/10 via-transparent to-[#9D50BB]/10 blur-xl" />
                </div>
              )}

              {/* Glassmorphism Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative p-8 backdrop-blur">
                {/* Badge for Featured Plan */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className={`${GRADIENTS.primary} text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,210,255,0.4)]`}>
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Placeholder */}
                <div className="text-3xl font-bold text-gray-500 mb-6">
                  Sob consulta
                </div>

                {/* CTA Button */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackPlanSelection(plan.name);
                    trackWhatsAppClick('plan-' + plan.name.toLowerCase());
                  }}
                  className={`block w-full text-center py-3 rounded-full font-bold text-sm uppercase tracking-tighter transition-all mb-8 relative group/btn overflow-hidden ${
                    plan.highlighted
                      ? `${GRADIENTS.primary} text-black hover:scale-105 shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_30px_rgba(0,210,255,0.6)]`
                      : 'border border-white/20 text-white hover:border-[#00D2FF] hover:text-[#00D2FF]'
                  }`}
                >
                  {/* Shine effect overlay para botão highlighted */}
                  {plan.highlighted && (
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{
                          animation: 'shimmer 3s infinite',
                          transform: 'translateX(-100%)',
                        }}
                      />
                    </div>
                  )}
                  <span className="relative">{plan.cta}</span>
                </a>

                {/* Features List */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#00D2FF] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center border-t border-white/10 pt-12"
        >
          <p className="text-gray-400 mb-6">
            Não tenho certeza qual plano escolher?
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('plans-specialist')}
            className="inline-block border border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-tighter hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all"
          >
            Falar Com Especialista
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default SelectPlans;
