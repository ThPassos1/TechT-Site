import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';
import { GRADIENTS } from '../../constants';
import TypewriterHeadline from '../effects/TypewriterHeadline';
import GlowBorder from '../effects/GlowBorder';
import operationLoopMp4 from '../../assets/videos/operation-loop.mp4';
import operationLoopWebm from '../../assets/videos/operation-loop.webm';
import operationLoopPoster from '../../assets/videos/operation-loop-poster.jpg';

const OperationVisual: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingDelay = reducedMotion ? 0 : 0.2;
  const headingInterval = reducedMotion ? 0 : 60;
  const headingText = 'Processos, vendas e IA operando em uma unica esteira comercial.';
  const titleDoneDelay = reducedMotion
    ? 0
    : (headingDelay * 1000 + headingText.length * headingInterval) / 1000 + 0.1;

  // Algumas configurações de browser bloqueiam autoplay até o usuário
  // interagir. Tentamos `.play()` ao montar e quando o vídeo fica
  // visível (caso o autoplay nativo seja recusado).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => undefined);
    };
    tryPlay();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) tryPlay();
        });
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative py-16 md:py-20 bg-[#060607] border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#040506]/95 via-[#05070e]/85 to-[#040506]/95" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <TypewriterHeadline
            as="h2"
            startOnInView
            startDelayMs={headingDelay * 1000}
            charIntervalMs={headingInterval}
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
            segments={[
              { text: 'Processos, vendas e IA operando em uma ' },
              { text: 'unica esteira comercial', className: GRADIENTS.text },
              { text: '.' },
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: titleDoneDelay }}
            className="text-gray-300/90 text-base md:text-lg leading-relaxed max-w-2xl"
          >
            Da captacao ao fechamento: campanhas, CRM, automacoes, dashboards e leitura de dados em um fluxo
            unico. A camada visual representa seu time em operacao real, com foco em previsibilidade e escala.
          </motion.p>
        </motion.div>
      </Container>

      {/* Card de vídeo — quase tela cheia, com borda luminosa rotacional */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="relative mt-12 md:mt-16 px-4 sm:px-6 md:px-8"
      >
        <GlowBorder
          className="rounded-[28px] block mx-auto w-full max-w-[min(1640px,96vw)]"
          thickness="2px"
          duration="7s"
        >
          <div
            className="relative z-10 rounded-[28px] overflow-hidden bg-black shadow-[0_40px_120px_rgba(0,0,0,0.55),0_0_60px_rgba(0,210,255,0.10)] aspect-video"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={operationLoopPoster}
              disablePictureInPicture
              controlsList="nodownload noplaybackrate noremoteplayback"
              aria-label="TechT — operação completa em fluxo único"
              className="block w-full h-full object-cover bg-black"
            >
              {/* WebM/VP9 primeiro: 42% menor, browsers modernos preferem */}
              <source src={operationLoopWebm} type="video/webm" />
              {/* MP4/H.264 com +faststart como fallback universal */}
              <source src={operationLoopMp4} type="video/mp4" />
            </video>

            {/* Gradiente sutil na base para integrar com o fundo da seção */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            {/* Brilho de canto para reforçar o look premium */}
            <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#00D2FF]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#9D50BB]/12 blur-3xl" />
          </div>
        </GlowBorder>
      </motion.div>
    </section>
  );
};

export default OperationVisual;
