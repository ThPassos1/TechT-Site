import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Clock,
  Filter,
  Workflow,
  TrendingUp,
  Scaling,
  Database,
  Zap,
  Sparkles,
  Check,
  CornerDownLeft,
  type LucideIcon,
} from 'lucide-react';
import Container from '../ui/Container';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import TypewriterHeadline from '../effects/TypewriterHeadline';

type CardItem = { title: string; description?: string };

type VisualData = {
  assistantName: string;
  statusLabel: string;
  customerMessage: string;
  assistantMessage: string;
  options: readonly string[];
  typingLabel: string;
  badges: readonly { label: string }[];
};

type AIAutomationsData = {
  eyebrow: string;
  titleStart: string;
  titleHighlight: string;
  subtitle: string;
  primaryCards: readonly CardItem[];
  secondaryCards: readonly CardItem[];
  visual: VisualData;
};

const easeOut = [0.22, 0.61, 0.36, 1] as const;

const primaryIcons: LucideIcon[] = [Clock, Filter, Workflow, TrendingUp];
const secondaryIcons: LucideIcon[] = [Scaling, Database, Zap, Sparkles];

const AIAutomations: React.FC = () => {
  const config = useSiteConfig();
  const data = (config.offerings as unknown as { aiAutomations?: AIAutomationsData })
    .aiAutomations;
  const reducedMotion = useReducedMotion();

  if (!data) return null;

  return (
    <section
      id="ia-automacoes"
      className="relative py-24 md:py-32 overflow-hidden bg-[#050505] border-y border-white/5 scroll-mt-24"
    >
      <SectionBackdrop />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-7">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#00D2FF]/70" />
            <span className="text-[0.7rem] font-semibold text-[#00D2FF] uppercase tracking-[0.34em]">
              {data.eyebrow}
            </span>
          </div>
          <TypewriterHeadline
            as="h2"
            startOnInView
            startDelayMs={reducedMotion ? 0 : 320}
            charIntervalMs={reducedMotion ? 0 : 70}
            className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.05] tracking-[-0.02em] mb-7"
            segments={[
              { text: data.titleStart },
              {
                text: data.titleHighlight,
                className:
                  'bg-gradient-to-r from-white via-[#7be8ff] to-[#9D50BB] bg-clip-text text-transparent',
              },
            ]}
          />
          <p className="text-gray-400 text-lg md:text-xl leading-[1.6] max-w-2xl">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="lg:col-span-7 relative"
          >
            <CinematicVisual visual={data.visual} reducedMotion={!!reducedMotion} />
          </motion.div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {data.primaryCards.map((card, idx) => {
              const Icon = primaryIcons[idx] ?? Sparkles;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.15 + idx * 0.07, ease: easeOut }}
                  whileHover={reducedMotion ? undefined : { y: -3 }}
                  className="group relative p-5 lg:p-6 rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 0%, rgba(0,210,255,0.16), transparent 60%)',
                    }}
                  />
                  <div className="relative">
                    <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 text-[#00D2FF] group-hover:border-[#00D2FF]/40 group-hover:shadow-[0_0_18px_rgba(0,210,255,0.18)] transition-all duration-300">
                      <Icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
                    </div>
                    <h3 className="text-[1rem] font-semibold text-white leading-snug tracking-[-0.01em] mb-1.5">
                      {card.title}
                    </h3>
                    {card.description ? (
                      <p className="text-[0.85rem] text-gray-500 leading-relaxed">
                        {card.description}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.secondaryCards.map((card, idx) => {
            const Icon = secondaryIcons[idx] ?? Sparkles;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: easeOut }}
                whileHover={reducedMotion ? undefined : { y: -3 }}
                className="group relative p-5 rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.03] border border-white/10 text-[#00D2FF] group-hover:border-[#00D2FF]/40 group-hover:shadow-[0_0_14px_rgba(0,210,255,0.16)] transition-all duration-300 shrink-0">
                    <Icon className="w-[16px] h-[16px]" strokeWidth={1.6} />
                  </div>
                  <h3 className="text-[0.92rem] font-semibold text-white leading-snug tracking-[-0.01em]">
                    {card.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

const SectionBackdrop: React.FC = () => (
  <>
    <div className="absolute top-[18%] -left-32 w-[640px] h-[640px] bg-[#00D2FF]/[0.045] blur-[180px] rounded-full pointer-events-none" />
    <div className="absolute bottom-0 -right-32 w-[520px] h-[520px] bg-[#9D50BB]/[0.06] blur-[160px] rounded-full pointer-events-none" />
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.022] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse at 50% 40%, black 25%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 25%, transparent 70%)',
      }}
    />
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-px pointer-events-none"
      style={{
        background:
          'linear-gradient(to right, transparent, rgba(0,210,255,0.25), rgba(157,80,187,0.25), transparent)',
      }}
    />
  </>
);

type CinematicVisualProps = { visual: VisualData; reducedMotion: boolean };

const CinematicVisual: React.FC<CinematicVisualProps> = ({ visual, reducedMotion }) => {
  const dotAnim = reducedMotion
    ? undefined
    : { y: [0, -3, 0], opacity: [0.35, 1, 0.35] };

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-[#00D2FF]/10 via-transparent to-[#9D50BB]/12 blur-3xl opacity-70 pointer-events-none" />

      <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-b from-[#0a0a0d] to-[#050507] shadow-[0_30px_80px_-20px_rgba(0,210,255,0.10),0_20px_60px_-10px_rgba(157,80,187,0.10)]">
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.015]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/12" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/12" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/12" />
          </div>
          <div className="flex items-center gap-2.5 ml-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00D2FF] to-[#9D50BB] flex items-center justify-center shadow-[0_0_14px_rgba(0,210,255,0.4)]">
              <Sparkles className="w-3.5 h-3.5 text-black" strokeWidth={2.4} />
            </div>
            <div className="leading-tight">
              <p className="text-[0.82rem] font-semibold text-white tracking-[-0.005em]">
                {visual.assistantName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="relative flex w-1.5 h-1.5">
                  {!reducedMotion ? (
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  ) : null}
                  <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[0.66rem] text-gray-400 tracking-wide">
                  {visual.statusLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 md:px-6 py-6 md:py-7 space-y-4 min-h-[360px]">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.3, ease: easeOut }}
            className="flex justify-start"
          >
            <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-tl-md bg-white/[0.04] border border-white/[0.06]">
              <p className="text-[0.86rem] text-gray-200 leading-relaxed">
                {visual.customerMessage}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.9, ease: easeOut }}
            className="flex justify-end"
          >
            <div className="max-w-[88%]">
              <div className="px-4 py-3 rounded-2xl rounded-tr-md bg-gradient-to-br from-[#00D2FF]/[0.10] to-[#9D50BB]/[0.10] border border-[#00D2FF]/20 shadow-[0_0_24px_rgba(0,210,255,0.08)]">
                <p className="text-[0.88rem] text-white leading-relaxed mb-3">
                  {visual.assistantMessage}
                </p>
                <div className="flex flex-wrap gap-2">
                  {visual.options.map((opt) => (
                    <span
                      key={opt}
                      className="px-2.5 py-1 rounded-full text-[0.72rem] font-medium text-white/90 bg-white/[0.05] border border-white/10"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.5 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
              {[0, 0.15, 0.3].map((delay) => (
                <motion.span
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]"
                  animate={dotAnim}
                  transition={
                    reducedMotion
                      ? undefined
                      : { duration: 1, repeat: Infinity, delay, ease: 'easeInOut' }
                  }
                />
              ))}
            </div>
            <span className="text-[0.7rem] text-gray-500">{visual.typingLabel}</span>
          </motion.div>
        </div>

        <div className="flex items-center gap-3 px-5 md:px-6 py-3.5 border-t border-white/[0.06] bg-white/[0.012]">
          <div className="flex-1 h-7 rounded-full bg-white/[0.04] border border-white/[0.06]" />
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00D2FF] to-[#9D50BB] flex items-center justify-center shadow-[0_0_12px_rgba(0,210,255,0.35)]">
            <CornerDownLeft className="w-3.5 h-3.5 text-black" strokeWidth={2.4} />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -10, y: 6 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
        className="hidden md:flex absolute -left-5 lg:-left-10 top-[26%] items-center gap-2 px-3.5 py-2 rounded-full bg-[#0c0c10]/95 border border-white/10 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
      >
        <span className="w-5 h-5 rounded-full bg-emerald-400/15 border border-emerald-400/40 flex items-center justify-center">
          <Check className="w-3 h-3 text-emerald-400" strokeWidth={3} />
        </span>
        <span className="text-[0.72rem] font-medium text-gray-200 whitespace-nowrap">
          {visual.badges[0]?.label}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 10, y: 6 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.1, ease: easeOut }}
        className="hidden md:flex absolute -right-4 lg:-right-8 bottom-[14%] items-center gap-2 px-3.5 py-2 rounded-full bg-[#0c0c10]/95 border border-white/10 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
      >
        <span className="w-5 h-5 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/40 flex items-center justify-center">
          <Zap className="w-3 h-3 text-[#00D2FF]" strokeWidth={2.4} />
        </span>
        <span className="text-[0.72rem] font-medium text-gray-200 whitespace-nowrap">
          {visual.badges[1]?.label}
        </span>
      </motion.div>
    </div>
  );
};

export default AIAutomations;
