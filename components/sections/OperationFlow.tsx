import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Target,
  MessageCircle,
  Zap,
  LineChart,
  type LucideIcon,
} from 'lucide-react';
import { GRADIENTS } from '../../constants';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import TypewriterHeadline from '../effects/TypewriterHeadline';
import EcosystemHub, { type EcosystemIncludedData } from './EcosystemHub';

const easeOut = [0.22, 0.61, 0.36, 1] as const;

const stepIcons: LucideIcon[] = [Target, MessageCircle, Zap, LineChart];

const OperationFlow: React.FC = () => {
  const { offerings: o } = useSiteConfig();
  const reducedMotion = useReducedMotion();
  const eco = o.ecosystem;
  const included = o.included as unknown as EcosystemIncludedData;

  return (
    <div className="relative pb-14 md:pb-16">
      <OperationBackdrop reducedMotion={!!reducedMotion} />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '120px 0px 120px 0px' }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="relative z-10 max-w-4xl mb-10 md:mb-16 section-intro-mobile md:text-left"
      >
        <div className="inline-flex items-center gap-3 mb-7">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#00D2FF]/70" />
          <span className="text-[0.7rem] font-semibold text-[#00D2FF] uppercase tracking-[0.34em]">
            {eco.badge}
          </span>
        </div>
        <TypewriterHeadline
          as="h2"
          startOnInView
          startDelayMs={reducedMotion ? 0 : 320}
          charIntervalMs={reducedMotion ? 0 : 70}
          className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6 md:mb-7 text-center md:text-left"
          segments={[
            { text: `${eco.title}\n` },
            { text: eco.titleHighlight, className: GRADIENTS.text },
            { text: eco.titleSuffix },
          ]}
        />
        <p className="text-gray-400 text-[0.95rem] sm:text-lg md:text-xl leading-[1.65] max-w-3xl">
          {eco.intro}
        </p>
      </motion.div>

      <div className="relative z-10">
        <FlowStrip steps={eco.steps} reducedMotion={!!reducedMotion} />
      </div>

      <EcosystemHub data={included} />
    </div>
  );
};

type Step = { title: string; text: string };

type FlowStripProps = {
  steps: readonly Step[];
  reducedMotion: boolean;
};

const FlowStrip: React.FC<FlowStripProps> = ({ steps, reducedMotion }) => {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute top-[44%] left-[8%] right-[8%] h-px -translate-y-1/2 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.22] to-transparent" />
        {!reducedMotion ? (
          <>
            <motion.div
              className="absolute top-0 h-full w-[20%]"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(0,210,255,0.85) 50%, transparent)',
                filter: 'blur(0.4px)',
              }}
              initial={{ left: '-24%' }}
              animate={{ left: '110%' }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 0.4,
              }}
            />
            <motion.div
              className="absolute top-0 h-full w-[14%]"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(157,80,187,0.65) 50%, transparent)',
                filter: 'blur(0.4px)',
              }}
              initial={{ left: '-18%' }}
              animate={{ left: '110%' }}
              transition={{
                duration: 7.5,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 0.8,
                delay: 2.2,
              }}
            />
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-5 relative z-10">
        {steps.map((step, idx) => (
          <React.Fragment key={step.title}>
            <StepCard step={step} index={idx} reducedMotion={reducedMotion} />
            {idx < steps.length - 1 ? (
              <div className="lg:hidden flex justify-center -my-1">
                <div className="relative w-px h-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#00D2FF]/0 via-white/[0.18] to-[#00D2FF]/0" />
                  {!reducedMotion ? (
                    <motion.div
                      className="absolute left-0 w-full h-1/3"
                      style={{
                        background:
                          'linear-gradient(to bottom, transparent, rgba(0,210,255,0.65), transparent)',
                      }}
                      initial={{ top: '-40%' }}
                      animate={{ top: '120%' }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: idx * 0.4,
                      }}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

type StepCardProps = {
  step: Step;
  index: number;
  reducedMotion: boolean;
};

const StepCard: React.FC<StepCardProps> = ({ step, index, reducedMotion }) => {
  const Icon = stepIcons[index] ?? Target;
  const stepLabel = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '120px 0px 120px 0px' }}
      transition={{
        duration: 0.6,
        delay: 0.08 + index * 0.08,
        ease: easeOut,
      }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      className="group relative p-6 md:p-7 rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-[3px] overflow-hidden transition-colors duration-300 hover:border-white/25"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)',
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(80% 60% at 30% 0%, rgba(0,210,255,0.22), transparent 65%)',
        }}
      />

      <div className="relative flex items-start justify-between mb-5">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 text-[#00D2FF] group-hover:border-[#00D2FF]/40 group-hover:shadow-[0_0_22px_rgba(0,210,255,0.18)] transition-all duration-300">
          <Icon className="w-[19px] h-[19px]" strokeWidth={1.6} />
        </div>
        <span className="font-mono text-[0.7rem] tracking-[0.18em] text-white/30">
          {stepLabel}
        </span>
      </div>

      <div className="relative">
        <h3 className="text-[1.18rem] md:text-xl font-semibold text-white tracking-[-0.01em] mb-2.5">
          {step.title}
        </h3>
        <p className="text-[0.93rem] text-gray-400 leading-relaxed">
          {step.text}
        </p>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.04]"
      />
    </motion.article>
  );
};

type OperationBackdropProps = { reducedMotion: boolean };

const OperationBackdrop: React.FC<OperationBackdropProps> = ({ reducedMotion }) => (
  <div className="absolute inset-0 -z-0 pointer-events-none">
    <div
      aria-hidden
      className="absolute inset-x-0 -inset-y-12 rounded-[40px] opacity-90"
      style={{
        background:
          'radial-gradient(120% 70% at 50% 0%, rgba(0,210,255,0.06), transparent 60%), radial-gradient(120% 70% at 50% 100%, rgba(157,80,187,0.07), transparent 60%)',
      }}
    />

    <motion.div
      aria-hidden
      className="absolute -left-24 top-[6%] w-[460px] h-[460px] rounded-full bg-[#00D2FF]/[0.085] blur-[140px]"
      animate={
        reducedMotion ? undefined : { x: [0, 36, -10, 0], y: [0, -22, 14, 0] }
      }
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      aria-hidden
      className="absolute -right-28 bottom-[4%] w-[500px] h-[500px] rounded-full bg-[#9D50BB]/[0.10] blur-[160px]"
      animate={
        reducedMotion ? undefined : { x: [0, -40, 14, 0], y: [0, 28, -10, 0] }
      }
      transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      aria-hidden
      className="absolute left-[42%] top-[38%] w-[360px] h-[360px] rounded-full bg-[#7be8ff]/[0.05] blur-[140px]"
      animate={
        reducedMotion ? undefined : { x: [0, -22, 18, 0], y: [0, 12, -16, 0] }
      }
      transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
    />

    {!reducedMotion ? (
      <motion.div
        aria-hidden
        className="absolute top-[34%] -translate-y-1/2 -left-[20%] w-[160%] h-[180px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,210,255,0.07) 35%, rgba(157,80,187,0.08) 55%, transparent)',
          filter: 'blur(40px)',
        }}
        animate={{ x: ['-6%', '6%', '-6%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    ) : null}

    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
        maskImage:
          'radial-gradient(ellipse at 50% 30%, black 25%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at 50% 30%, black 25%, transparent 75%)',
      }}
    />

    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-px"
      style={{
        background:
          'linear-gradient(to right, transparent, rgba(0,210,255,0.32), rgba(157,80,187,0.32), transparent)',
      }}
    />
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-px"
      style={{
        background:
          'linear-gradient(to right, transparent, rgba(157,80,187,0.22), rgba(0,210,255,0.22), transparent)',
      }}
    />
  </div>
);

export default OperationFlow;
