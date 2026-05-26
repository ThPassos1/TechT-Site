import React, { useRef } from 'react';
import { motion, useReducedMotion, useInView, type Variants } from 'framer-motion';
import {
  Megaphone,
  Users,
  Sparkles,
  Workflow,
  LayoutDashboard,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import Container from '../ui/Container';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import TypewriterHeadline from '../effects/TypewriterHeadline';

type Metric = { id: string; value: number; suffix?: string; label: string };
type Node = { id: string; label: string; icon: string };
type AboutShape = {
  badge: string;
  title: string;
  titleHighlight: string;
  titleSuffix: string;
  manifestoEyebrow?: string;
  manifestoLead?: string;
  manifestoTail?: string;
  metrics?: readonly Metric[];
  ecosystemHub?: string;
  ecosystemNodes?: readonly Node[];
};

const NODE_ICON: Record<string, LucideIcon> = {
  media: Megaphone,
  crm: Users,
  ai: Sparkles,
  automation: Workflow,
  dashboard: LayoutDashboard,
  whatsapp: MessageCircle,
};

// 6 nodes positioned hexagonally around a central hub.
// Coordinates expressed as percentages of the visual area.
const NODE_POSITIONS: Array<{ x: number; y: number }> = [
  { x: 50, y: 10 },   // top
  { x: 86, y: 28 },   // top-right
  { x: 86, y: 72 },   // bottom-right
  { x: 50, y: 90 },   // bottom
  { x: 14, y: 72 },   // bottom-left
  { x: 14, y: 28 },   // top-left
];

const HUB = { x: 50, y: 50 };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1], delay: i * 0.06 },
  }),
};

const Backdrop: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => (
  <>
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage:
          'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
      }}
    />
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[860px] h-[480px] rounded-full blur-[140px]"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(0,210,255,0.16) 0%, rgba(0,210,255,0) 70%)',
      }}
      animate={reducedMotion ? undefined : { opacity: [0.6, 0.85, 0.6] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -bottom-40 right-[-10%] w-[560px] h-[560px] rounded-full blur-[160px]"
      style={{
        background:
          'radial-gradient(circle at center, rgba(157,80,187,0.14) 0%, rgba(157,80,187,0) 70%)',
      }}
      animate={reducedMotion ? undefined : { opacity: [0.55, 0.8, 0.55] }}
      transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
    />
  </>
);

const EcosystemNode: React.FC<{
  node: Node;
  pos: { x: number; y: number };
  index: number;
  reducedMotion: boolean;
}> = ({ node, pos, index, reducedMotion }) => {
  const Icon = NODE_ICON[node.icon] ?? Sparkles;
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: 0.35 + index * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -5, 0] }
        }
        transition={{
          duration: 4 + (index % 3) * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.35,
        }}
        className="group flex items-center gap-2.5 pl-2.5 pr-3.5 py-2 rounded-[14px] border border-white/10 bg-[#0c0c10]/85 backdrop-blur-md shadow-[0_18px_40px_-22px_rgba(0,0,0,0.85)] hover:border-white/20 transition-colors"
      >
        <span className="relative inline-flex items-center justify-center w-7 h-7 rounded-[10px] bg-white/[0.05] border border-white/10 text-[#9DE9FF]">
          <Icon className="w-3.5 h-3.5" strokeWidth={1.6} />
          <span
            aria-hidden
            className="absolute inset-0 rounded-[10px] opacity-60"
            style={{
              boxShadow: '0 0 14px rgba(0,210,255,0.18) inset',
            }}
          />
        </span>
        <span className="text-[12px] font-medium tracking-wide text-white/90">
          {node.label}
        </span>
      </motion.div>
    </motion.div>
  );
};

const EcosystemVisual: React.FC<{
  hubLabel: string;
  nodes: readonly Node[];
  reducedMotion: boolean;
}> = ({ hubLabel, nodes, reducedMotion }) => {
  const limited = nodes.slice(0, NODE_POSITIONS.length);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="relative w-full"
    >
      <div className="relative w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-square rounded-[28px] overflow-hidden border border-white/[0.07] bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
        {/* inner radial sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,210,255,0.10) 0%, rgba(0,0,0,0) 60%)',
          }}
        />
        {/* top hairline */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(255,255,255,0.16), transparent)',
          }}
        />

        {/* connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="aboutFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,210,255,0.55)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="100%" stopColor="rgba(157,80,187,0.55)" />
            </linearGradient>
          </defs>
          {limited.map((_, i) => {
            const pos = NODE_POSITIONS[i];
            return (
              <g key={i}>
                <line
                  x1={`${HUB.x}%`}
                  y1={`${HUB.y}%`}
                  x2={`${pos.x}%`}
                  y2={`${pos.y}%`}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={1}
                />
                <motion.line
                  x1={`${HUB.x}%`}
                  y1={`${HUB.y}%`}
                  x2={`${pos.x}%`}
                  y2={`${pos.y}%`}
                  stroke="url(#aboutFlowGrad)"
                  strokeWidth={1.2}
                  strokeDasharray="3 10"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0, opacity: 0 }}
                  whileInView={{
                    strokeDashoffset: reducedMotion ? 0 : -260,
                    opacity: 0.9,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    strokeDashoffset: {
                      duration: 7 + (i % 3) * 1.4,
                      repeat: reducedMotion ? 0 : Infinity,
                      ease: 'linear',
                    },
                    opacity: {
                      duration: 0.8,
                      delay: 0.35 + i * 0.06,
                      ease: 'easeOut',
                    },
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* hub */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="relative">
            <span
              aria-hidden
              className="absolute -inset-10 rounded-full blur-2xl opacity-80"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(0,210,255,0.30) 0%, rgba(0,210,255,0) 70%)',
              }}
            />
            <motion.div
              className="relative px-5 py-3 rounded-2xl border border-white/15 bg-[#0a0a0e]/90 backdrop-blur-md shadow-[0_22px_60px_-22px_rgba(0,210,255,0.45)]"
              animate={
                reducedMotion
                  ? undefined
                  : { boxShadow: [
                      '0 22px 60px -22px rgba(0,210,255,0.35)',
                      '0 22px 60px -22px rgba(0,210,255,0.55)',
                      '0 22px 60px -22px rgba(0,210,255,0.35)',
                    ] }
              }
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-3 top-0 h-px"
                style={{
                  background:
                    'linear-gradient(to right, transparent, rgba(0,210,255,0.45), transparent)',
                }}
              />
              <span className="font-mono text-[1.05rem] md:text-[1.25rem] tracking-[0.4em] font-semibold text-white">
                {hubLabel}
              </span>
              <span
                aria-hidden
                className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-[#00D2FF] align-middle shadow-[0_0_10px_rgba(0,210,255,0.9)]"
              />
            </motion.div>
            <motion.span
              aria-hidden
              className="block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D2FF]/25"
              style={{ width: 180, height: 180 }}
              animate={
                reducedMotion ? undefined : { opacity: [0.45, 0.15, 0.45], scale: [1, 1.12, 1] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* nodes */}
        {limited.map((node, i) => (
          <EcosystemNode
            key={node.id}
            node={node}
            pos={NODE_POSITIONS[i]}
            index={i}
            reducedMotion={reducedMotion}
          />
        ))}

        {/* corner labels (editorial detail) */}
        <span className="absolute left-5 top-4 text-[10px] tracking-[0.32em] uppercase text-white/35 font-medium">
          Operação // Tempo real
        </span>
        <span className="absolute right-5 bottom-4 text-[10px] tracking-[0.32em] uppercase text-white/30 font-medium">
          v1.0 // 2026
        </span>
      </div>
    </motion.div>
  );
};

const MetricBlock: React.FC<{ metric: Metric; index: number }> = ({ metric, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="relative flex flex-col gap-1 py-5 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0"
    >
      <span className="font-mono text-[2.25rem] md:text-[2.65rem] leading-none tracking-tight text-white font-semibold">
        {inView ? (
          <AnimatedNumber value={metric.value} suffix={metric.suffix ?? ''} duration={1800} />
        ) : (
          <span aria-hidden>0{metric.suffix ?? ''}</span>
        )}
      </span>
      <span className="text-[11px] md:text-[12px] uppercase tracking-[0.28em] text-gray-500 font-medium">
        {metric.label}
      </span>
    </motion.div>
  );
};

const About: React.FC = () => {
  const { about } = useSiteConfig();
  const reducedMotion = !!useReducedMotion();
  const data = about as unknown as AboutShape;

  const metrics: readonly Metric[] = data.metrics ?? [];
  const nodes: readonly Node[] = data.ecosystemNodes ?? [];
  const hub = data.ecosystemHub ?? 'TECHT';

  return (
    <section
      id="sobre"
      className="relative py-24 md:py-32 overflow-hidden bg-[#050508] border-t border-white/5"
    >
      <Backdrop reducedMotion={reducedMotion} />

      <Container className="relative">
        {/* top: 2-col grid — text left, ecosystem visual right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* left: editorial text block */}
          <div className="lg:col-span-6 xl:col-span-5 max-w-xl">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="inline-flex items-center gap-2 text-[10.5px] md:text-[11px] font-semibold uppercase tracking-[0.32em] text-[#9DE9FF]/90"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_10px_rgba(0,210,255,0.9)]" />
              {data.badge}
            </motion.span>

            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="mt-5"
            >
              <TypewriterHeadline
                as="h2"
                startOnInView
                startDelayMs={reducedMotion ? 0 : 320}
                charIntervalMs={reducedMotion ? 0 : 70}
                className="text-[1.95rem] sm:text-4xl md:text-[2.7rem] lg:text-[2.85rem] leading-[1.08] tracking-[-0.02em] font-semibold text-white"
                segments={[
                  { text: data.title },
                  {
                    text: data.titleHighlight,
                    className:
                      'bg-clip-text text-transparent bg-gradient-to-r from-white via-[#9DE9FF] to-[#00D2FF]',
                  },
                  { text: data.titleSuffix },
                ]}
              />
            </motion.div>

            {data.manifestoLead && (
              <motion.p
                variants={fadeUp}
                custom={2}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="mt-7 text-[1rem] md:text-[1.075rem] text-gray-400 leading-relaxed"
              >
                {data.manifestoLead}
              </motion.p>
            )}

            {data.manifestoTail && (
              <motion.div
                variants={fadeUp}
                custom={3}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="mt-8 pt-8 border-t border-white/[0.06]"
              >
                {data.manifestoEyebrow && (
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-[#9DE9FF]/85 mb-3">
                    {data.manifestoEyebrow}
                  </p>
                )}
                <p className="text-[0.95rem] md:text-base text-gray-400 leading-relaxed">
                  {data.manifestoTail}
                </p>
              </motion.div>
            )}
          </div>

          {/* right: ecosystem visual */}
          <div className="lg:col-span-6 xl:col-span-7">
            <EcosystemVisual hubLabel={hub} nodes={nodes} reducedMotion={reducedMotion} />
          </div>
        </div>

        {/* metrics */}
        {metrics.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-16 md:mt-20 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] via-white/[0.015] to-transparent">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-10 top-0 h-px"
                style={{
                  background:
                    'linear-gradient(to right, transparent, rgba(0,210,255,0.35), transparent)',
                }}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y divide-white/[0.06] md:divide-y-0 md:divide-x md:divide-white/[0.06] px-4 md:px-8 py-2 md:py-7">
                {metrics.map((m, i) => (
                  <MetricBlock key={m.id} metric={m} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default About;
