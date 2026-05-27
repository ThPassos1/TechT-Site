import React, { useId } from 'react';
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
  <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f14] p-4 md:p-5 ${className}`}>
    <p className="mb-3 text-[10.5px] tracking-wide text-gray-500">{title}</p>
    <div className="overflow-hidden">{children}</div>
  </div>
);

const gridYs = [72, 56.5, 41, 25.5, 10] as const;

const ChartGrid: React.FC = () => (
  <>
    {gridYs.map((y) => (
      <line
        key={y}
        x1={PLOT_BOUNDS.left}
        y1={y}
        x2={PLOT_BOUNDS.right}
        y2={y}
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="0.35"
        strokeDasharray="1 1.5"
      />
    ))}
  </>
);

const ChartAxisLabels: React.FC<{
  yLabels: readonly string[];
  xLabels: readonly string[];
  xPositions: readonly number[];
}> = ({ yLabels, xLabels, xPositions }) => (
  <>
    {yLabels.map((label, i) => (
      <text
        key={label}
        x={1.5}
        y={gridYs[i]! + 2.5}
        fill="#52525b"
        fontSize="4.2"
        fontFamily="ui-monospace, monospace"
      >
        {label}
      </text>
    ))}
    {xLabels.map((label, i) => (
      <text
        key={label}
        x={xPositions[i] ?? 0}
        y={92}
        fill="#52525b"
        fontSize="4.2"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
      >
        {label}
      </text>
    ))}
  </>
);

const PLOT_BOUNDS = { left: 16, right: 98, top: 10, bottom: 72 } as const;
const SERIES_X = [16, 36.5, 57, 77.5, 98] as const;

const risingSeriesPoints = () => {
  const ys = [68, 61, 53, 45, 36];
  return SERIES_X.map((x, i) => ({ x, y: ys[i]! }));
};

const buildLinePath = (pts: { x: number; y: number }[]) =>
  pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

type IntegratedChartProps = {
  reducedMotion: boolean;
  yLabels: readonly string[];
  xLabels: readonly string[];
  heightClass?: string;
};

/** Linha + área com eixos integrados (mobile e desktop) */
const IntegratedLineChart: React.FC<IntegratedChartProps> = ({
  reducedMotion,
  yLabels,
  xLabels,
  heightClass = 'h-28',
}) => {
  const chartId = useId().replace(/:/g, '');
  const pts = risingSeriesPoints();
  const lineD = buildLinePath(pts);
  const areaD = `${lineD} L${pts[pts.length - 1]!.x},${PLOT_BOUNDS.bottom} L${pts[0]!.x},${PLOT_BOUNDS.bottom} Z`;

  return (
    <svg
      viewBox="0 0 100 100"
      className={`block w-full ${heightClass}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${chartId}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9D50BB" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#9D50BB" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${chartId}-clip`}>
          <rect
            x={PLOT_BOUNDS.left - 1}
            y={PLOT_BOUNDS.top}
            width={PLOT_BOUNDS.right - PLOT_BOUNDS.left + 2}
            height={PLOT_BOUNDS.bottom - PLOT_BOUNDS.top}
          />
        </clipPath>
      </defs>

      <ChartAxisLabels yLabels={yLabels} xLabels={xLabels} xPositions={SERIES_X} />

      <g clipPath={`url(#${chartId}-clip)`}>
        <ChartGrid />
        <motion.path
          d={areaD}
          fill={`url(#${chartId}-fill)`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.55, delay: 0.1 }}
        />
        <motion.path
          d={lineD}
          stroke="#A78BFA"
          strokeWidth="1.35"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.65, delay: 0.18 }}
        />
        {pts.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.1"
            fill="#A78BFA"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.28 + i * 0.05 }}
          />
        ))}
      </g>
    </svg>
  );
};

/** Barras alinhadas aos mesmos pontos do eixo X */
const IntegratedBarsChart: React.FC<IntegratedChartProps> = ({
  reducedMotion,
  yLabels,
  xLabels,
  heightClass = 'h-28',
}) => {
  const chartId = useId().replace(/:/g, '');
  const barHeights = [34, 42, 50, 56, 62];
  const barWidth = 11;

  return (
    <svg
      viewBox="0 0 100 100"
      className={`block w-full ${heightClass}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${chartId}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <clipPath id={`${chartId}-clip`}>
          <rect
            x={PLOT_BOUNDS.left - 1}
            y={PLOT_BOUNDS.top}
            width={PLOT_BOUNDS.right - PLOT_BOUNDS.left + 2}
            height={PLOT_BOUNDS.bottom - PLOT_BOUNDS.top}
          />
        </clipPath>
      </defs>

      <ChartAxisLabels yLabels={yLabels} xLabels={xLabels} xPositions={SERIES_X} />

      <g clipPath={`url(#${chartId}-clip)`}>
        <ChartGrid />
        {barHeights.map((h, i) => {
          const cx = SERIES_X[i]!;
          const x = cx - barWidth / 2;
          const y = PLOT_BOUNDS.bottom - h;
          return (
            <motion.rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={h}
              rx={1.2}
              fill={`url(#${chartId}-bar)`}
              initial={{ opacity: 0, scaleY: reducedMotion ? 1 : 0.2 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12 + i * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
              style={{ transformOrigin: `${cx}px ${PLOT_BOUNDS.bottom}px` }}
            />
          );
        })}
      </g>
    </svg>
  );
};

const PieFunnel: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const chartId = useId().replace(/:/g, '');
  const segs = [
    { points: '10,18 90,18 78,34 22,34', opacity: 0.85 },
    { points: '22,34 78,34 66,50 34,50', opacity: 0.65 },
    { points: '34,50 66,50 56,66 44,66', opacity: 0.45 },
    { points: '44,66 56,66 52,82 48,82', opacity: 0.3 },
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id={`${chartId}-funnel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="82"
        cy="22"
        r="11"
        fill="#22D3EE"
        fillOpacity="0.35"
        stroke="#22D3EE"
        strokeOpacity="0.6"
        strokeWidth="0.6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      />
      {segs.map((s, i) => (
        <motion.polygon
          key={i}
          points={s.points}
          fill={`url(#${chartId}-funnel)`}
          initial={{ opacity: reducedMotion ? s.opacity : 0 }}
          whileInView={{ opacity: s.opacity }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
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
      <div className="md:text-left">
        <h4 className="text-base font-bold text-white">Dashboard</h4>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">{P.moduleCaption}</p>
      </div>

      <div className="mb-3 mt-5 flex items-center gap-2 md:justify-start justify-center">
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
        <IntegratedLineChart
          reducedMotion={reduced}
          yLabels={P.axis.y}
          xLabels={P.axis.x}
        />
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
        <div className="section-intro-mobile mb-8 text-center md:mb-16 md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: titleDoneDelay }}
            className="mb-4 block text-xs font-bold uppercase tracking-[0.4em] text-[#00D2FF]"
          >
            {intelligence.badge}
          </motion.span>
          <TypewriterHeadline
            as="h2"
            startOnInView
            startDelayMs={headingDelay * 1000}
            charIntervalMs={headingInterval}
            className="mb-5 text-center text-3xl font-bold text-white sm:text-4xl md:mb-6 md:text-left md:text-6xl"
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
          className="mx-auto max-w-3xl text-base leading-relaxed text-gray-400 sm:text-lg text-center md:text-left"
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
              <div className="grid grid-cols-1 gap-3 overflow-hidden lg:grid-cols-2">
                <ChartFrame title="Performance semanal">
                  <IntegratedLineChart
                    reducedMotion={reduced}
                    yLabels={P.axis.y}
                    xLabels={P.axis.x}
                    heightClass="h-32"
                  />
                </ChartFrame>

                <ChartFrame title="Leads por dia">
                  <IntegratedBarsChart
                    reducedMotion={reduced}
                    yLabels={P.axis.y}
                    xLabels={P.axis.x}
                    heightClass="h-32"
                  />
                </ChartFrame>

                <ChartFrame title="Funil de conversão">
                  <div className="flex h-32 items-center justify-center overflow-hidden">
                    <div className="h-full w-full max-w-[220px]">
                      <PieFunnel reducedMotion={reduced} />
                    </div>
                  </div>
                </ChartFrame>

                <ChartFrame title="Mapa de atividade">
                  <div className="h-32 overflow-hidden">
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
