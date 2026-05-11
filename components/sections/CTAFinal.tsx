import React from 'react';
import { motion } from 'framer-motion';
import { GRADIENTS, WHATSAPP_URL, WHATSAPP_SCHEDULE_URL } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';
import Container from '../ui/Container';
import { trackWhatsAppClick, trackScheduling } from '../analytics/GoogleTagManager';

const CTAFinal: React.FC = () => {
  const { ctaFinal } = SITE_CONFIG;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black/50 border-b border-white/5">
      {/* Background Beams */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D2FF]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9D50BB]/10 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white">
            {ctaFinal.title}
            <span className={GRADIENTS.text}>{ctaFinal.titleHighlight}</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 mb-12">
            {ctaFinal.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('cta-final')}
              className={`${GRADIENTS.primary} text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,210,255,0.4)] inline-block`}
            >
              💬 Falar no WhatsApp
            </a>

            <a
              href={WHATSAPP_SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackScheduling('cta-final')}
              className="px-10 py-4 rounded-full font-bold text-lg border-2 border-white/20 text-white hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all inline-block text-center"
            >
              📅 Agendar Reunião
            </a>
          </div>

          {/* Subtext */}
          <p className="text-gray-500 text-sm mt-8">
            Responderemos em até 2 horas • Sem compromisso
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTAFinal;
