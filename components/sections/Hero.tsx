
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GRADIENTS, whatsappPrefill } from '../../constants';
import Container from '../ui/Container';
import { trackWhatsAppClick } from '../analytics/GoogleTagManager';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { UI_TEXT } from '../../i18n/ui';
import { useAppPreferences } from '../../context/AppPreferencesContext';
import AuroraBackground from '../effects/AuroraBackground';
import ShineEffect from '../effects/ShineEffect';
import TypewriterHeadline from '../effects/TypewriterHeadline';
import WaveBackdrop from '../effects/WaveBackdrop';
import GlowBorder from '../effects/GlowBorder';

const Hero: React.FC = () => {
  const { hero } = useSiteConfig();
  const { locale } = useAppPreferences();
  const ui = UI_TEXT[locale];
  const reducedMotion = useReducedMotion();
  const typeStartDelay = reducedMotion ? 0 : 1100;
  const typeCharInterval = reducedMotion ? 0 : 105;
  const fullHeadline = `${hero.titlePart1}${hero.titleHighlight}${hero.titlePart2}`;
  const typingDurationSeconds = reducedMotion
    ? 0
    : (typeStartDelay + fullHeadline.length * typeCharInterval) / 1000;
  const afterTypingDelay = typingDurationSeconds + (reducedMotion ? 0 : 0.12);

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden isolate">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,12,18,0.42),rgba(5,5,7,0.92)_58%,rgba(4,4,6,0.98)_100%)]" />
      <WaveBackdrop className="opacity-70 z-[1]" />
      <AuroraBackground className="absolute inset-0 opacity-35 z-[2]" />
      <div className="lava-blob w-[420px] h-[420px] top-[-110px] left-[8%] bg-[#00D2FF]/18 z-[2]" />
      <div
        className="lava-blob w-[380px] h-[380px] bottom-[-120px] right-[12%] bg-[#9D50BB]/18 z-[2]"
        style={{ animationDelay: '3s', animationDuration: '19s' }}
      />
      <div
        className="lava-blob w-[260px] h-[260px] top-[28%] right-[33%] bg-[#2e7bff]/16 z-[2]"
        style={{ animationDelay: '1.2s', animationDuration: '15s' }}
      />
      <div className="hero-grid-mask opacity-40 z-[3]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D2FF]/8 blur-[120px] rounded-full pointer-events-none z-[2]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9D50BB]/8 blur-[120px] rounded-full pointer-events-none z-[2]" />

      {/* Vinheta de leitura: escurece sutilmente o centro onde está o texto */}
      <div
        aria-hidden
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 62% 48% at 50% 40%, rgba(5,5,8,0.78) 0%, rgba(5,5,8,0.55) 35%, rgba(5,5,8,0.25) 60%, transparent 80%)',
        }}
      />

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {hero.badge?.trim() ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: afterTypingDelay }}
              className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#00D2FF]">{hero.badge}</span>
            </motion.div>
          ) : null}

          <TypewriterHeadline
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white leading-[1.05]"
            startDelayMs={typeStartDelay}
            charIntervalMs={typeCharInterval}
            segments={[
              { text: hero.titlePart1 },
              { text: hero.titleHighlight, className: GRADIENTS.text },
              { text: hero.titlePart2 },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: afterTypingDelay + 0.16 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: afterTypingDelay + 0.34 }}
            className="flex flex-col items-center justify-center gap-8 mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <GlowBorder
                className="rounded-full inline-block"
                thickness="1.5px"
                duration="4.5s"
              >
                <ShineEffect
                  duration={4.6}
                  className={`${GRADIENTS.primary} rounded-full inline-block shadow-[0_0_30px_rgba(0,210,255,0.42)] hover:shadow-[0_0_38px_rgba(140,100,255,0.34)] hover:scale-[1.03] transition-all duration-300 will-change-transform`}
                >
                  <a
                    href={whatsappPrefill(
                      hero.primaryWaMessage ||
                        'Olá! Vim pelo site da TechT e quero falar com o time comercial.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('hero')}
                    className="relative z-10 block text-black px-10 py-4 font-bold text-lg text-center min-w-[240px] rounded-full"
                  >
                    {hero.ctaButton}
                  </a>
                </ShineEffect>
              </GlowBorder>

            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {['TP', 'A', 'B'].map((initial, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-[#050505] bg-gradient-to-br from-white/20 to-white/5 text-[10px] font-bold flex items-center justify-center text-[#00D2FF]"
                    title={ui.clientsPartners}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-left text-xs text-gray-500 max-w-[230px] leading-snug">
                {ui.heroMicrocopy}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>

      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-transparent via-[#02050f]/55 to-[#050505]" />
    </section>
  );
};

export default Hero;
