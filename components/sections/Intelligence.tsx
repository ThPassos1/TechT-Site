import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';
import { GRADIENTS } from '../../constants';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import TypewriterHeadline from '../effects/TypewriterHeadline';

export type IntelligenceProps = {
  /** Dentro de Serviços: mesma faixa visual, entre os cards e os CTAs */
  embedded?: boolean;
};

const LOGIN_IMAGE_1X = '/images/ecossistema-login.png';
const LOGIN_IMAGE_2X = '/images/ecossistema-login@2x.png';
const LOGIN_WIDTH = 1024;
const LOGIN_HEIGHT = 572;

const PlatformLoginPreview: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.99 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d0d0f] shadow-[0_40px_120px_rgba(0,0,0,0.75)]"
  >
    <img
      src={LOGIN_IMAGE_1X}
      srcSet={`${LOGIN_IMAGE_1X} 1x, ${LOGIN_IMAGE_2X} 2x`}
      sizes="(min-width: 1280px) 1200px, 100vw"
      width={LOGIN_WIDTH}
      height={LOGIN_HEIGHT}
      alt="Tela de login do Ecossistema TechT — CRM, tráfego pago, automações, financeiro e portal do cliente"
      loading="eager"
      decoding="sync"
      fetchPriority="high"
      className="block h-auto w-full"
    />
    <p className="border-t border-white/5 bg-[#0a0a0c] px-4 py-3 text-left text-[9px] text-gray-600 md:px-6 md:text-[10px]">
      Interface ilustrativa do Ecossistema TechT. Login seguro com reconhecimento automático de perfil.
    </p>
  </motion.div>
);

const Intelligence: React.FC<IntelligenceProps> = ({ embedded = false }) => {
  const { intelligence } = useSiteConfig();
  const reducedMotion = useReducedMotion();
  const headingDelay = reducedMotion ? 0 : 0.4;
  const headingInterval = reducedMotion ? 0 : 70;
  const headingTextLength = `${intelligence.title}${intelligence.titleHighlight}${intelligence.titleSuffix}`.length;
  const titleDoneDelay = reducedMotion
    ? 0
    : (headingDelay * 1000 + headingTextLength * headingInterval) / 1000 + 0.1;

  const shell =
    'relative overflow-hidden bg-[#0a0a0c]' +
    (embedded ? ' py-12 md:py-20 border-t border-white/5' : ' py-16 md:py-24');

  return (
    <section id="inteligencia" className={shell}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#9D50BB]/8 via-transparent to-[#00D2FF]/5 pointer-events-none" />
      <div className="lava-blob w-[280px] h-[280px] left-[6%] top-[14%] bg-[#00D2FF]/12" />
      <div
        className="lava-blob w-[340px] h-[340px] right-[4%] bottom-[8%] bg-[#9D50BB]/14"
        style={{ animationDelay: '2s', animationDuration: '20s' }}
      />

      <Container className="relative">
        <div className="mb-8 max-w-3xl text-left md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: titleDoneDelay }}
            className="mb-7 inline-flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00D2FF]/70" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-[#00D2FF]">
              {intelligence.badge}
            </span>
          </motion.div>
          <TypewriterHeadline
            as="h2"
            startOnInView
            startDelayMs={headingDelay * 1000}
            charIntervalMs={headingInterval}
            className="mb-5 text-left text-3xl font-bold text-white sm:text-4xl md:mb-6 md:text-6xl"
            segments={[
              { text: intelligence.title },
              { text: intelligence.titleHighlight, className: GRADIENTS.text },
              { text: intelligence.titleSuffix },
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: titleDoneDelay + 0.12 }}
            className="max-w-3xl text-left text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            {intelligence.description}
          </motion.p>
        </div>

        <PlatformLoginPreview />
      </Container>
    </section>
  );
};

export default Intelligence;
