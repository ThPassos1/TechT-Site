import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';
import { GRADIENTS } from '../../constants';
import { PLATFORM_PREVIEW } from '../../platformData';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import TypewriterHeadline from '../effects/TypewriterHeadline';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Sparkles,
  LayoutDashboard,
  LogOut,
  Sun,
  Users,
  Megaphone,
  Workflow,
  Shield,
  UserCircle,
  type LucideIcon,
} from 'lucide-react';

const toneBorder: Record<string, string> = {
  amber: 'border-amber-500/25 bg-amber-500/5',
  rose: 'border-rose-500/25 bg-rose-500/5',
  cyan: 'border-cyan-500/25 bg-cyan-500/5',
  emerald: 'border-emerald-500/25 bg-emerald-500/5',
  violet: 'border-violet-500/25 bg-violet-500/5',
};

const sidebarIcon: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  crm: Users,
  ads: Megaphone,
  ai: Sparkles,
  ops: Workflow,
  admin: Shield,
  portal: UserCircle,
};

export type IntelligenceProps = {
  /** Dentro de Serviços: mesma faixa visual, entre os cards e os CTAs */
  embedded?: boolean;
};

/* -------------------- Chart sub-components -------------------- */

const ChartFrame: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = '' }) => (
  <div className={`rounded-2xl border border-white/10 bg-[#0f0f14] p-4 md:p-5 ${className}`}>
    <p className="text-[10.5px] text-gray-500 mb-3 tracking-wide">{title}</p>
    {children}
  </div>
);

const YAxisLabels: React.FC<{ labels: readonly string[] }> = ({ labels }) => (
  <div className="flex flex-col justify-between text-[9px] text-gray-600 font-mono pr-2 py-1 shrink-0">
    {labels.map((l) => (
      <span key={l} className="leading-none">
        {l}
      </span>
    ))}
  </div>
);

const XAxisLabels: React.FC<{ labels: readonly string[] }> = ({ labels }) => (
  <div className="flex justify-between text-[9px] text-gray-600 font-mono pt-1">
    {labels.map((l) => (
      <span key={l} className="leading-none">
        {l}
      </span>
    ))}
  </div>
);

const Gridlines: React.FC = () => (
  <>
    {[10, 30, 50, 70, 90].map((y) => (
      <line
        key={y}
        x1="0"
        y1={y}
        x2="100"
        y2={y}
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="0.3"
        strokeDasharray="0.6 1.2"
      />
    ))}
  </>
);

const LineAreaChart: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  // gentle climbing line: 220 max scale → svg coords 0..100
  // values: 18, 22, 28, 34, 40 (rising)
  const pts = [
    { x: 8, y: 78 },
    { x: 30, y: 72 },
    { x: 52, y: 64 },
    { x: 74, y: 56 },
    { x: 96, y: 48 },
  ];
  const lineD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaD = `${lineD} L96,90 L8,90 Z`;
  const totalLength = 240;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineAreaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9D50BB" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#9D50BB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Gridlines />
      <motion.path
        d={areaD}
        fill="url(#lineAreaFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.5 }}
      />
      <motion.path
        d={lineD}
        stroke="#A78BFA"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        initial={{ strokeDashoffset: reducedMotion ? 0 : totalLength }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      {pts.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="0.9"
          fill="#A78BFA"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1 + i * 0.08 }}
        />
      ))}
    </svg>
  );
};

const BarsChart: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  // heights as % of svg height (90 visible)
  const heights = [50, 60, 72, 80, 88];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
      <Gridlines />
      {heights.map((h, i) => {
        const w = 12;
        const gap = (100 - w * heights.length) / (heights.length + 1);
        const x = gap + i * (w + gap);
        const y = 90 - h;
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx={1.2}
            fill="url(#barFill)"
            initial={{ scaleY: reducedMotion ? 1 : 0, transformOrigin: '50% 90%' }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ transformOrigin: `${x + w / 2}px 90px` }}
          />
        );
      })}
    </svg>
  );
};

const PieFunnel: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const segs = [
    { points: '10,18 90,18 78,34 22,34', opacity: 0.85 },
    { points: '22,34 78,34 66,50 34,50', opacity: 0.65 },
    { points: '34,50 66,50 56,66 44,66', opacity: 0.45 },
    { points: '44,66 56,66 52,82 48,82', opacity: 0.3 },
  ];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="funnelFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {segs.map((s, i) => (
        <motion.polygon
          key={i}
          points={s.points}
          fill="url(#funnelFill)"
          opacity={s.opacity}
          initial={{ opacity: reducedMotion ? s.opacity : 0, y: -4 }}
          whileInView={{ opacity: s.opacity, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
        />
      ))}
      {[18, 34, 50, 66, 82].map((y) => (
        <line
          key={y}
          x1="6"
          y1={y}
          x2="94"
          y2={y}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="0.25"
          strokeDasharray="0.6 1.2"
        />
      ))}
    </svg>
  );
};

const RadarHeatmap: React.FC = () => {
  const palette = [
    '#22D3EE', '#34D399', '#FACC15', '#F472B6',
    '#A78BFA', '#60A5FA', '#FBBF24', '#F87171',
    '#5EEAD4', '#C084FC', '#22D3EE', '#34D399',
  ];
  return (
    <div className="grid grid-cols-6 grid-rows-2 gap-1.5 h-full">
      {palette.map((c, i) => (
        <motion.span
          key={i}
          className="rounded-md"
          style={{ background: c }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 0.78, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2 + i * 0.04, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

/* -------------------- Mobile platform preview -------------------- */

type PlatformPreview = typeof PLATFORM_PREVIEW;

const PlatformMobilePreview: React.FC<{
  P: PlatformPreview;
  reduced: boolean;
}> = ({ P, reduced }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="rounded-2xl border border-white/10 bg-[#0d0d0f] shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden"
  >
    <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-[#0a0a0c] px-4 py-3.5">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#00D2FF] to-[#9D50BB] shadow-[0_0_16px_rgba(0,210,255,0.3)]">
          <LayoutDashboard className="h-4 w-4 text-black" strokeWidth={2.2} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">{P.productName}</p>
          <p className="truncate text-[10px] text-gray-500">
            {P.clientLabel}: <span className="font-medium text-[#9DE9FF]">{P.clientName}</span>
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          className="relative rounded-lg border border-white/10 bg-white/5 p-2 text-gray-400"
          aria-label="Notificações"
        >
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#00D2FF]" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#9D50BB] to-[#00D2FF] shadow-lg shadow-[#9D50BB]/25">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>

    <div className="bg-[#111116] p-4">
      <h4 className="text-base font-bold text-white">Dashboard</h4>
      <p className="mt-1 text-xs leading-relaxed text-gray-500">{P.moduleCaption}</p>

      <div className="mb-3 mt-5 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-[#00D2FF]" />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Insights IA</p>
      </div>
      <div className="grid grid-cols-1 gap-2.5">
        {P.insightsIA.slice(0, 4).map((card) => (
          <div
            key={card.label}
            className={`rounded-xl border p-3.5 ${toneBorder[card.tone] ?? 'border-white/10 bg-white/[0.03]'}`}
          >
            <p className="text-[11px] leading-snug text-gray-500">{card.label}</p>
            <p className="mt-1 font-mono text-2xl font-bold text-white">{card.value}</p>
            <p className="mt-1 text-[10px] leading-snug text-gray-600">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {P.kpis.slice(0, 2).map((k) => (
          <div key={k.label} className="rounded-xl border border-white/10 bg-[#16161d] p-3.5">
            <p className="text-[10px] tracking-wide text-gray-500">{k.label}</p>
            <p className="mt-1 font-mono text-lg font-bold text-white">{k.value}</p>
          </div>
        ))}
      </div>

      <ChartFrame title="Performance semanal" className="mt-5">
        <div className="flex h-28">
          <YAxisLabels labels={P.axis.y} />
          <div className="flex flex-1 flex-col">
            <div className="flex-1">
              <LineAreaChart reducedMotion={reduced} />
            </div>
            <XAxisLabels labels={P.axis.x} />
          </div>
        </div>
      </ChartFrame>

      <p className="mt-4 text-center text-[9px] text-gray-600">
        Interface ilustrativa do Ecossistema TechT. Métricas exemplificam o produto, não garantia de resultado.
      </p>
    </div>
  </motion.div>
);

/* -------------------- Section -------------------- */

const Intelligence: React.FC<IntelligenceProps> = ({ embedded = false }) => {
  const { intelligence } = useSiteConfig();
  const P = PLATFORM_PREVIEW;
  const reducedMotion = useReducedMotion();
  const reduced = !!reducedMotion;
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
        <div className="mb-8 text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: titleDoneDelay }}
            className="text-xs font-bold text-[#00D2FF] uppercase tracking-[0.4em] mb-4 block"
          >
            {intelligence.badge}
          </motion.span>
          <TypewriterHeadline
            as="h2"
            startOnInView
            startDelayMs={headingDelay * 1000}
            charIntervalMs={headingInterval}
            className="mb-5 text-3xl font-bold text-white sm:text-4xl md:mb-6 md:text-6xl"
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
            className="mx-auto max-w-3xl text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            {intelligence.description}
          </motion.p>
        </div>

        {/* Mobile — preview enxuto (sem sidebar empilhada) */}
        <div className="md:hidden">
          <PlatformMobilePreview P={P} reduced={reduced} />
        </div>

        {/* Tablet+ — mock completo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="hidden md:flex rounded-[1.75rem] border border-white/10 bg-[#0d0d0f] shadow-[0_40px_120px_rgba(0,0,0,0.75)] overflow-hidden flex-col md:flex-row min-h-[700px]"
        >
          {/* Sidebar */}
          <aside className="w-full md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-[#0a0a0c] p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D2FF] to-[#9D50BB] flex items-center justify-center shadow-[0_0_18px_rgba(0,210,255,0.35)]">
                <LayoutDashboard className="w-4 h-4 text-black" strokeWidth={2.2} />
              </div>
              <p className="text-[12px] font-semibold text-white leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#9DE9FF]">
                {P.productName}
              </p>
            </div>

            <nav className="flex-1 flex flex-col gap-1 text-[11px] font-semibold tracking-wide">
              {P.sidebar.map((item) => {
                const Icon = sidebarIcon[item.icon] ?? LayoutDashboard;
                const isActive = 'active' in item && item.active;
                return (
                  <span
                    key={item.label}
                    className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-default transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-[#9D50BB]/55 via-[#7C3AED]/35 to-[#00D2FF]/20 text-white border border-white/10 shadow-[inset_0_0_18px_rgba(157,80,187,0.15)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
                    <span className="truncate flex-1">{item.label}</span>
                    {!isActive && <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />}
                  </span>
                );
              })}
            </nav>

            <div className="mt-4 pt-3 border-t border-white/5">
              <p className="text-[10px] text-gray-500 mb-2 leading-snug">{P.adminLabel}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-600">
                <LogOut className="w-3 h-3" />
                <span>Sair</span>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#111116]">
            <header className="border-b border-white/5 px-4 md:px-6 py-3 md:py-4 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm md:text-base font-bold text-white truncate">{P.productName}</h3>
                <p className="text-[10px] md:text-[11px] text-gray-500 truncate mt-0.5">{P.subtitle}</p>
                <p className="text-[10px] md:text-[11px] text-gray-500 truncate">
                  {P.clientLabel}:{' '}
                  <span className="text-[#9DE9FF] font-medium">{P.clientName}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" className="relative p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400">
                  <Bell className="w-3.5 h-3.5" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_6px_rgba(0,210,255,0.9)]" />
                </button>
                <button
                  type="button"
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-300"
                >
                  {P.clientName}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <span className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-400 font-medium">
                  PT
                </span>
                <button type="button" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400">
                  <Sun className="w-3.5 h-3.5" />
                </button>
              </div>
            </header>

            <div className="p-4 md:p-6 flex-1 overflow-y-auto max-h-[70vh] md:max-h-none">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-white">Dashboard</h4>
                  <p className="text-[11px] text-gray-500 mt-1 max-w-xl leading-relaxed">
                    {P.moduleCaption}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9D50BB] to-[#00D2FF] flex items-center justify-center shadow-lg shadow-[#9D50BB]/30">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Insights IA */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex w-4 h-4 items-center justify-center rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/30">
                  <Sparkles className="w-2.5 h-2.5 text-[#00D2FF]" />
                </span>
                <p className="text-[10.5px] text-gray-400 uppercase tracking-widest font-semibold">
                  Insights IA
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-2.5 mb-6">
                {P.insightsIA.map((card) => (
                  <div
                    key={card.label}
                    className={`rounded-xl border p-3 ${toneBorder[card.tone] ?? 'border-white/10 bg-white/[0.03]'}`}
                  >
                    <p className="text-[9.5px] text-gray-500 mb-1 leading-tight">{card.label}</p>
                    <p className="text-lg font-bold text-white font-mono">{card.value}</p>
                    <p className="text-[9px] text-gray-600 mt-1 leading-snug">{card.sub}</p>
                  </div>
                ))}
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 mb-6">
                {P.kpis.map((k) => (
                  <div
                    key={k.label}
                    className="rounded-xl border border-white/10 bg-[#16161d] p-3.5 md:p-4"
                  >
                    <p className="text-[10px] text-gray-500 mb-1.5 tracking-wide">{k.label}</p>
                    <p className="text-lg md:text-xl font-bold text-white font-mono">{k.value}</p>
                  </div>
                ))}
              </div>

              {/* Charts 2x2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <ChartFrame title="Line + Area animado">
                  <div className="flex h-32">
                    <YAxisLabels labels={P.axis.y} />
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <LineAreaChart reducedMotion={reduced} />
                      </div>
                      <XAxisLabels labels={P.axis.x} />
                    </div>
                  </div>
                </ChartFrame>

                <ChartFrame title="Barras crescendo">
                  <div className="flex h-32">
                    <YAxisLabels labels={P.axis.y} />
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <BarsChart reducedMotion={reduced} />
                      </div>
                      <XAxisLabels labels={P.axis.x} />
                    </div>
                  </div>
                </ChartFrame>

                <ChartFrame title="Pie + Funnel">
                  <div className="h-32 flex items-center justify-center">
                    <div className="w-full h-full max-w-[200px]">
                      <PieFunnel reducedMotion={reduced} />
                    </div>
                  </div>
                </ChartFrame>

                <ChartFrame title="Radar + Heatmap D3">
                  <div className="h-32">
                    <RadarHeatmap />
                  </div>
                </ChartFrame>
              </div>

              <p className="text-[9px] text-gray-600 text-center mt-6">
                Interface ilustrativa do Ecossistema TechT. Métricas exemplificam o produto, não garantia de resultado.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Intelligence;
