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
  ChevronLeft,
  Phone,
  Video,
  Smile,
  Paperclip,
  Mic,
  CheckCheck,
  type LucideIcon,
} from 'lucide-react';
import Container from '../ui/Container';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import TypewriterHeadline from '../effects/TypewriterHeadline';
import assistantAvatar from '../../assets/images/IA TechT.png';
import WhatsAppIcon from '../ui/WhatsAppIcon';

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
          className="max-w-3xl mb-14 md:mb-20 section-intro-mobile md:text-left"
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
            className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.05] tracking-[-0.02em] mb-7 text-center md:text-left"
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
    : { y: [0, -2, 0], opacity: [0.35, 1, 0.35] };

  return (
    <div className="relative mx-auto w-full max-w-[390px] lg:mx-0">
      <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-[#25D366]/10 blur-3xl opacity-60" />

      <div className="relative overflow-hidden rounded-[28px] border border-[#2a3942]/80 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
        {/* Header estilo WhatsApp */}
        <div className="flex items-center gap-2.5 bg-[#202c33] px-2.5 py-2.5">
          <button
            type="button"
            aria-hidden
            className="p-1.5 text-[#aebac1] hover:text-[#e9edef]"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <div className="relative shrink-0">
            <img
              src={assistantAvatar}
              alt=""
              className="h-10 w-10 rounded-full border border-[#2a3942] object-cover object-top"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#202c33] bg-[#25D366]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-medium leading-tight text-[#e9edef]">
              {visual.assistantName}
            </p>
            <p className="truncate text-xs text-[#8696a0]">{visual.statusLabel}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 pr-1 text-[#aebac1]">
            <Video className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <Phone className="h-[17px] w-[17px]" strokeWidth={1.8} />
          </div>
        </div>

        {/* Área de conversa */}
        <div
          className="relative min-h-[380px] space-y-3 px-3 py-4"
          style={{
            backgroundColor: '#0b141a',
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(37,211,102,0.03), transparent 35%), radial-gradient(circle at 80% 70%, rgba(0,92,75,0.05), transparent 40%)',
          }}
        >
          <div className="mb-1 flex items-center justify-center gap-1.5">
            <span className="rounded-full bg-[#182229] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#8696a0]">
              Hoje
            </span>
          </div>

          {/* Cliente — bolha verde à direita */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.25, ease: easeOut }}
            className="flex justify-end"
          >
            <div className="max-w-[86%] rounded-lg rounded-tr-none bg-[#005c4b] px-3 py-2 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
              <p className="text-[14px] leading-[1.45] text-[#e9edef]">{visual.customerMessage}</p>
              <div className="mt-1 flex items-end justify-end gap-1">
                <span className="text-[11px] leading-none text-[#ffffff99]">14:32</span>
                <CheckCheck className="h-4 w-4 text-[#53bdeb]" strokeWidth={2} />
              </div>
            </div>
          </motion.div>

          {/* Assistente — bolha cinza à esquerda */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.85, ease: easeOut }}
            className="flex items-end gap-2"
          >
            <img
              src={assistantAvatar}
              alt=""
              aria-hidden
              className="mb-1 h-7 w-7 shrink-0 rounded-full border border-[#2a3942] object-cover object-top"
            />
            <div className="max-w-[86%] rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
              <p className="text-[14px] leading-[1.45] text-[#e9edef]">{visual.assistantMessage}</p>
              <div className="mt-2.5 flex flex-col gap-1.5">
                {visual.options.map((opt) => (
                  <span
                    key={opt}
                    className="rounded-lg border border-[#00a884]/35 bg-[#111b21] px-3 py-2 text-center text-[13px] font-medium text-[#00a884]"
                  >
                    {opt}
                  </span>
                ))}
              </div>
              <div className="mt-1 flex justify-end">
                <span className="text-[11px] leading-none text-[#8696a0]">14:33</span>
              </div>
            </div>
          </motion.div>

          {/* Digitando */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.45 }}
            className="flex items-end gap-2"
          >
            <img
              src={assistantAvatar}
              alt=""
              aria-hidden
              className="mb-1 h-7 w-7 shrink-0 rounded-full border border-[#2a3942] object-cover object-top"
            />
            <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-sm bg-[#202c33] px-4 py-3">
              {[0, 0.15, 0.3].map((delay) => (
                <motion.span
                  key={delay}
                  className="h-2 w-2 rounded-full bg-[#8696a0]"
                  animate={dotAnim}
                  transition={
                    reducedMotion
                      ? undefined
                      : { duration: 1, repeat: Infinity, delay, ease: 'easeInOut' }
                  }
                />
              ))}
            </div>
            <span className="mb-1 text-[11px] text-[#8696a0]">{visual.typingLabel}…</span>
          </motion.div>
        </div>

        {/* Barra inferior estilo WhatsApp */}
        <div className="flex items-end gap-2 bg-[#202c33] px-2 py-2">
          <button type="button" aria-hidden className="p-2 text-[#8696a0]">
            <Smile className="h-6 w-6" strokeWidth={1.6} />
          </button>
          <div className="flex min-h-[42px] flex-1 items-center gap-2 rounded-full bg-[#2a3942] px-4 py-2">
            <Paperclip className="h-5 w-5 shrink-0 text-[#8696a0]" strokeWidth={1.8} />
            <span className="truncate text-[15px] text-[#8696a0]">Mensagem</span>
          </div>
          <button
            type="button"
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-[#111b21]"
          >
            <Mic className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 border-t border-[#2a3942] bg-[#111b21] px-3 py-2">
          <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#8696a0]">
            Agente de IA no WhatsApp
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -10, y: 6 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
        className="absolute -left-2 top-[24%] hidden items-center gap-2 rounded-full border border-[#25D366]/25 bg-[#111b21]/95 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md md:flex lg:-left-8"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/15">
          <Check className="h-3 w-3 text-emerald-400" strokeWidth={3} />
        </span>
        <span className="whitespace-nowrap text-[0.72rem] font-medium text-gray-200">
          {visual.badges[0]?.label}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 10, y: 6 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.1, ease: easeOut }}
        className="absolute -right-2 bottom-[16%] hidden items-center gap-2 rounded-full border border-[#25D366]/25 bg-[#111b21]/95 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md md:flex lg:-right-6"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/15">
          <Zap className="h-3 w-3 text-[#25D366]" strokeWidth={2.4} />
        </span>
        <span className="whitespace-nowrap text-[0.72rem] font-medium text-gray-200">
          {visual.badges[1]?.label}
        </span>
      </motion.div>
    </div>
  );
};

export default AIAutomations;
