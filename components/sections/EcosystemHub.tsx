import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Megaphone,
  FileText,
  Share2,
  MessageCircle,
  Users,
  Workflow,
  LayoutDashboard,
  BarChart3,
  Lightbulb,
  ClipboardCheck,
  Sparkles,
  Network,
  Target,
  UserRound,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { GRADIENTS } from '../../constants';
import TypewriterHeadline from '../effects/TypewriterHeadline';
import techtAiBot from '../../assets/images/IA TechT.png';

const easeOut = [0.22, 0.61, 0.36, 1] as const;

export type EcosystemNode = {
  id: string;
  title: string;
  description: string;
  /** Posição percentual no diagrama (0–100) */
  anchor: { x: number; y: number };
};

export type EcosystemIncludedData = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  titleSuffix: string;
  intro: string;
  hub: {
    label: string;
    description: string;
  };
  nodes: readonly EcosystemNode[];
  legend: readonly { label: string }[];
  footer: {
    highlight: string;
    text: string;
  };
};

const HUB_CENTER = { x: 50, y: 50 };
const STAGE_SHIFT_X = '-4%';
const STAGE_PX = 660;
/** Escala mobile: maior que w/660 para legibilidade; scroll horizontal se passar da tela */
const MOBILE_SCALE_MIN = 0.64;
const MOBILE_SCALE_MAX = 0.82;
const MOBILE_SCALE_DIVISOR = 500;
const NODE_BOUNDS = { minX: 10, maxX: 90, minY: 8, maxY: 88 };

/** Trilho orbital externo — “bus” do circuito (viewBox 0–100) */
const HUB_FRAME = { x: 13, y: 11, w: 74, h: 78, r: 11 };

/** Anéis concêntricos ao redor do núcleo IA */
const ORBIT_RADII = [10.5, 14.5, 18.5] as const;

/** Junções bus → órbita interna (cardeais + diagonais) */
const HUB_INGRESS = [
  { id: 'n', x: 50, y: 11 },
  { id: 's', x: 50, y: 89 },
  { id: 'w', x: 13, y: 50 },
  { id: 'e', x: 87, y: 50 },
  { id: 'nw', x: 20, y: 18 },
  { id: 'ne', x: 80, y: 18 },
  { id: 'sw', x: 20, y: 82 },
  { id: 'se', x: 80, y: 82 },
] as const;

type CardSide = 'left' | 'right' | 'top' | 'bottom';
type LinkTier = 'primary' | 'secondary' | 'aux';
type RouteMode = 'orbit' | 'relay';

type CircuitPathDef = {
  id: string;
  d: string;
  nodes: { x: number; y: number }[];
  tier: LinkTier;
};

function roundedRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): string {
  return [
    `M ${x + r} ${y}`,
    `H ${x + w - r}`,
    `Q ${x + w} ${y} ${x + w} ${y + r}`,
    `V ${y + h - r}`,
    `Q ${x + w} ${y + h} ${x + w - r} ${y + h}`,
    `H ${x + r}`,
    `Q ${x} ${y + h} ${x} ${y + h - r}`,
    `V ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    'Z',
  ].join(' ');
}

/** Ponto no trilho orbital mais próximo do card */
function frameAnchorPoint(
  anchor: { x: number; y: number },
  frame: typeof HUB_FRAME
): { x: number; y: number } {
  const cx = frame.x + frame.w / 2;
  const cy = frame.y + frame.h / 2;
  const dx = anchor.x - cx;
  const dy = anchor.y - cy;
  const left = frame.x;
  const right = frame.x + frame.w;
  const top = frame.y;
  const bottom = frame.y + frame.h;
  const inset = frame.r * 0.55;

  if (Math.abs(dx) >= Math.abs(dy)) {
    const y = Math.min(bottom - inset, Math.max(top + inset, anchor.y));
    return dx > 0 ? { x: right, y } : { x: left, y };
  }
  const x = Math.min(right - inset, Math.max(left + inset, anchor.x));
  return dy > 0 ? { x, y: bottom } : { x, y: top };
}

function getCardSide(anchor: { x: number; y: number }): CardSide {
  if (anchor.y < 20 && Math.abs(anchor.x - HUB_CENTER.x) < 24) return 'top';
  if (anchor.y > 72 && Math.abs(anchor.x - HUB_CENTER.x) < 30) return 'bottom';
  return anchor.x < HUB_CENTER.x ? 'left' : 'right';
}

function cardExitPoint(
  anchor: { x: number; y: number },
  side: CardSide
): { x: number; y: number } {
  const offset = 2.8;
  switch (side) {
    case 'left':
      return { x: anchor.x + offset, y: anchor.y };
    case 'right':
      return { x: anchor.x - offset, y: anchor.y };
    case 'top':
      return { x: anchor.x, y: anchor.y + offset };
    case 'bottom':
      return { x: anchor.x, y: anchor.y - offset };
  }
}

function pointOnCircle(
  cx: number,
  cy: number,
  radius: number,
  angle: number
): { x: number; y: number } {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function buildCardBezierPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
  side: CardSide,
  bend = 9
): string {
  const tension = bend;
  let cx1: number;
  let cy1: number;
  let cx2: number;
  let cy2: number;

  switch (side) {
    case 'left':
      cx1 = start.x + tension;
      cy1 = start.y;
      cx2 = end.x - tension * 0.5;
      cy2 = end.y;
      break;
    case 'right':
      cx1 = start.x - tension;
      cy1 = start.y;
      cx2 = end.x + tension * 0.5;
      cy2 = end.y;
      break;
    case 'top':
      cx1 = start.x;
      cy1 = start.y + tension * 0.75;
      cx2 = end.x;
      cy2 = end.y - tension * 0.5;
      break;
    case 'bottom':
      cx1 = start.x;
      cy1 = start.y - tension * 0.75;
      cx2 = end.x;
      cy2 = end.y + tension * 0.5;
      break;
  }

  return `M ${start.x} ${start.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${end.x} ${end.y}`;
}

function buildRelayBezierPath(
  start: { x: number; y: number },
  relay: { x: number; y: number },
  end: { x: number; y: number },
  side: CardSide
): string {
  const offset = side === 'left' ? 8 : side === 'right' ? -8 : 0;
  const vertical = side === 'top' ? 8 : side === 'bottom' ? -8 : 0;
  const c1x = start.x + offset;
  const c1y = start.y + vertical;
  const c2x = relay.x - offset * 0.55;
  const c2y = relay.y - vertical * 0.55;
  const c3x = relay.x + offset * 0.5;
  const c3y = relay.y + vertical * 0.5;
  const c4x = end.x - offset * 0.35;
  const c4y = end.y - vertical * 0.35;

  return `M ${start.x} ${start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${relay.x} ${relay.y} C ${c3x} ${c3y}, ${c4x} ${c4y}, ${end.x} ${end.y}`;
}

function buildOrbitIngressPath(
  start: { x: number; y: number },
  hub: { x: number; y: number },
  targetRadius: number
): { d: string; end: { x: number; y: number } } {
  const angle = Math.atan2(start.y - hub.y, start.x - hub.x);
  const end = pointOnCircle(hub.x, hub.y, targetRadius, angle);
  const dist = Math.hypot(start.x - end.x, start.y - end.y) || 1;
  const bulge = 4.2;
  const perpX = (-(start.y - hub.y) / dist) * bulge;
  const perpY = ((start.x - hub.x) / dist) * bulge;
  const cx = (start.x + end.x) / 2 + perpX;
  const cy = (start.y + end.y) / 2 + perpY;

  return {
    d: `M ${start.x} ${start.y} Q ${cx} ${cy}, ${end.x} ${end.y}`,
    end,
  };
}

function buildNucleusBridgePath(
  hub: { x: number; y: number },
  angle: number,
  fromRadius: number,
  toRadius: number
): string {
  const start = pointOnCircle(hub.x, hub.y, fromRadius, angle);
  const end = pointOnCircle(hub.x, hub.y, toRadius, angle);
  const mx = hub.x + (start.x - hub.x) * 0.42 + Math.sin(angle) * 1.8;
  const my = hub.y + (start.y - hub.y) * 0.42 - Math.cos(angle) * 1.8;

  return `M ${start.x} ${start.y} Q ${mx} ${my}, ${end.x} ${end.y}`;
}

function buildCircuitGeometry(
  nodes: EcosystemNode[],
  frame: typeof HUB_FRAME,
  hub: { x: number; y: number }
): {
  cardPaths: CircuitPathDef[];
  ingressPaths: CircuitPathDef[];
  nucleusPaths: CircuitPathDef[];
  junctionNodes: { x: number; y: number }[];
} {
  const primaryIds = new Set(['paid-media', 'content', 'automations', 'sales-routine']);
  const auxIds = new Set(['crm', 'dashboards']);
  const relayMap: Partial<Record<string, { x: number; y: number }>> = {
    crm: { x: 24, y: 36 },
    analytics: { x: 22, y: 62 },
    social: { x: 78, y: 35 },
    dashboards: { x: 78, y: 62 },
    recommendations: { x: 30, y: 79 },
    'sales-routine': { x: 68, y: 81 },
  };

  const cardPaths = nodes.map((node) => {
    const side = getCardSide(node.anchor);
    const start = cardExitPoint(node.anchor, side);
    const end = frameAnchorPoint(node.anchor, frame);
    const tier: LinkTier = primaryIds.has(node.id) ? 'primary' : auxIds.has(node.id) ? 'aux' : 'secondary';
    const relay = relayMap[node.id];
    const mode: RouteMode = relay ? 'relay' : 'orbit';

    return {
      id: node.id,
      d: mode === 'relay' && relay ? buildRelayBezierPath(start, relay, end, side) : buildCardBezierPath(start, end, side, 11),
      nodes: relay ? [start, relay, end] : [start, end],
      tier,
    };
  });

  const ingressPaths: CircuitPathDef[] = [];
  const junctionNodes: { x: number; y: number }[] = [];

  HUB_INGRESS.forEach((junction) => {
    const { d, end } = buildOrbitIngressPath(junction, hub, ORBIT_RADII[0]);
    ingressPaths.push({
      id: `ingress-${junction.id}`,
      d,
      nodes: [junction, end],
      tier: junction.id === 'n' || junction.id === 's' ? 'primary' : 'secondary',
    });
    junctionNodes.push(junction, end);
  });

  const nucleusIngress = HUB_INGRESS.filter(({ id }) => ['n', 's', 'nw', 'se'].includes(id));
  const nucleusPaths = nucleusIngress.map((junction) => {
    const angle = Math.atan2(junction.y - hub.y, junction.x - hub.x);
    return {
      id: `nucleus-${junction.id}`,
      d: buildNucleusBridgePath(hub, angle, ORBIT_RADII[0], ORBIT_RADII[0] * 0.52),
      nodes: [],
      tier: junction.id === 'n' || junction.id === 's' ? 'primary' : 'aux',
    };
  });

  return { cardPaths, ingressPaths, nucleusPaths, junctionNodes };
}

const nodeIcons: Record<string, LucideIcon> = {
  'paid-media': Megaphone,
  crm: Users,
  automations: Workflow,
  analytics: BarChart3,
  recommendations: Lightbulb,
  content: FileText,
  social: Share2,
  whatsapp: MessageCircle,
  dashboards: LayoutDashboard,
  'sales-routine': ClipboardCheck,
};

const legendIcons: LucideIcon[] = [Network, Sparkles, UserRound, TrendingUp];

type EcosystemHubProps = {
  data: EcosystemIncludedData;
};

const EcosystemHub: React.FC<EcosystemHubProps> = ({ data }) => {
  const reducedMotion = useReducedMotion();

  const normalizedNodes = useMemo(
    () =>
      data.nodes.map((node) => ({
        ...node,
        anchor: {
          x: Math.min(NODE_BOUNDS.maxX, Math.max(NODE_BOUNDS.minX, node.anchor.x)),
          y: Math.min(NODE_BOUNDS.maxY, Math.max(NODE_BOUNDS.minY, node.anchor.y)),
        },
      })),
    [data.nodes]
  );

  return (
    <div className="relative z-10 mt-8 md:mt-14 lg:mt-28">
      <div className="lg:grid lg:grid-cols-[minmax(0,22rem)_1fr] xl:grid-cols-[minmax(0,24rem)_1fr] gap-10 xl:gap-14 items-start">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px 0px 100px 0px' }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="relative hidden lg:block lg:sticky lg:top-28"
        >
          <div className="inline-flex items-center gap-3 mb-7">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#9D50BB]/80" />
            <span className="text-[0.7rem] font-semibold text-[#c9a8ff] uppercase tracking-[0.34em]">
              {data.eyebrow}
            </span>
          </div>
          <TypewriterHeadline
            as="h3"
            startOnInView
            startDelayMs={reducedMotion ? 0 : 280}
            charIntervalMs={reducedMotion ? 0 : 65}
            className="text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[2.85rem] font-bold text-white leading-[1.12] tracking-[-0.02em] mb-5 md:mb-6"
            segments={[
              { text: data.title },
              { text: data.titleHighlight, className: GRADIENTS.text },
              { text: data.titleSuffix },
            ]}
          />
          <p className="text-gray-400 text-[0.95rem] sm:text-lg md:text-xl leading-[1.65] max-w-md">
            {data.intro}
          </p>
          <div className="hidden lg:block mt-14 xl:mt-16">
            <Legend items={data.legend} />
          </div>
        </motion.header>

        <div className="relative min-w-0">
          <HubDiagramStage
            hub={data.hub}
            nodes={normalizedNodes}
            reducedMotion={!!reducedMotion}
          />

          <div className="mt-4 lg:hidden">
            <Legend items={data.legend} stacked />
          </div>
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '80px 0px 80px 0px' }}
        transition={{ duration: 0.5, delay: 0.15, ease: easeOut }}
        className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-5 py-5 md:px-8 md:py-6 rounded-2xl border border-white/[0.1] bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-transparent"
      >
        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#9D50BB]/15 border border-[#9D50BB]/30 text-[#c9a8ff]">
            <Sparkles className="w-[17px] h-[17px]" strokeWidth={1.65} />
          </span>
          <p className="text-base md:text-lg font-semibold text-white tracking-[-0.01em]">
            {data.footer.highlight}
          </p>
        </div>
        <p className="text-[0.92rem] md:text-[0.95rem] text-gray-400 leading-relaxed md:border-l md:border-white/10 md:pl-8">
          {data.footer.text}
        </p>
      </motion.footer>
    </div>
  );
};

type HubDiagramStageProps = {
  hub: EcosystemIncludedData['hub'];
  nodes: EcosystemNode[];
  reducedMotion: boolean;
};

/** Mesmo diagrama hub-and-spoke do desktop, escalado para caber no mobile */
const HubDiagramStage: React.FC<HubDiagramStageProps> = ({ hub, nodes, reducedMotion }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      if (w >= STAGE_PX) {
        setScale(1);
        return;
      }
      const target = Math.min(
        MOBILE_SCALE_MAX,
        Math.max(MOBILE_SCALE_MIN, (w + 28) / MOBILE_SCALE_DIVISOR),
      );
      setScale(target);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaledHeight = STAGE_PX * scale;
  const isCompact = scale < 1;

  return (
    <div
      ref={wrapRef}
      className={`relative w-full rounded-[32px] border border-white/[0.06] bg-gradient-to-br from-[#0a0a12]/90 via-[#06060c]/60 to-[#0a0814]/80 lg:min-h-[660px] xl:min-h-[700px] ${
        isCompact ? 'overflow-x-auto overscroll-x-contain touch-pan-x' : 'overflow-hidden lg:overflow-visible'
      }`}
    >
      <div
        className={`flex w-full py-2 lg:min-h-[660px] lg:items-center lg:justify-center lg:px-8 lg:py-10 xl:min-h-[700px] ${
          isCompact ? 'min-w-max justify-center px-1' : 'justify-center'
        }`}
      >
        <div
          className="relative shrink-0 overflow-hidden lg:overflow-visible"
          style={{
            width: isCompact ? scaledHeight : STAGE_PX,
            height: isCompact ? scaledHeight : STAGE_PX,
          }}
        >
          <div
            className="relative"
            style={{
              width: STAGE_PX,
              height: STAGE_PX,
              transform: isCompact
                ? `scale(${scale})`
                : `translateX(${STAGE_SHIFT_X})`,
              transformOrigin: isCompact ? 'top left' : 'top center',
            }}
          >
          <div className="absolute inset-0 overflow-hidden rounded-[28px]">
            <HubBackdrop reducedMotion={reducedMotion} />
          </div>
          <ConnectorSvg
            hub={HUB_CENTER}
            frame={HUB_FRAME}
            nodes={nodes}
            reducedMotion={reducedMotion}
          />
          <div className="pointer-events-none absolute inset-0 z-[25] flex items-center justify-center">
            <HubCore hub={hub} reducedMotion={reducedMotion} />
          </div>
          {nodes.map((node, idx) => (
            <OrbitalNode
              key={node.id}
              node={node}
              index={idx}
              reducedMotion={reducedMotion}
              touchLayout={isCompact}
            />
          ))}
          </div>
        </div>
      </div>
      {isCompact ? (
        <p className="pb-2 text-center text-[0.62rem] uppercase tracking-[0.22em] text-gray-600 lg:hidden">
          Deslize para ver todo o ecossistema
        </p>
      ) : null}
    </div>
  );
};

type HubCoreProps = {
  hub: EcosystemIncludedData['hub'];
  reducedMotion: boolean;
  compact?: boolean;
  mobileHero?: boolean;
};

const HubCore: React.FC<HubCoreProps> = ({ hub, reducedMotion, compact, mobileHero }) => {
  const size = mobileHero
    ? 'w-[196px] h-[196px] sm:w-[212px] sm:h-[212px]'
    : compact
      ? 'w-[148px] h-[148px]'
      : 'w-[172px] h-[172px] xl:w-[188px] xl:h-[188px]';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="relative flex flex-col items-center"
    >
      <div className={`relative ${size} flex items-center justify-center`}>
        {!reducedMotion ? (
          <>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border border-[#00D2FF]/25 animate-pulse"
            />
            <span
              aria-hidden
              className="absolute inset-[10%] rounded-full border border-[#9D50BB]/20"
              style={{ animation: 'pulse 3s ease-in-out infinite 0.5s' }}
            />
          </>
        ) : null}
        <span
          aria-hidden
          className="absolute inset-[6%] rounded-full bg-gradient-to-br from-[#00D2FF]/12 via-transparent to-[#9D50BB]/14 blur-sm"
        />
        <div className="relative z-10 w-[88%] h-[88%] rounded-full border border-white/15 bg-[#08080e]/95 shadow-[0_0_60px_rgba(0,210,255,0.15),0_0_80px_rgba(157,80,187,0.12)] backdrop-blur-sm overflow-hidden">
          <motion.img
            src={techtAiBot}
            alt={`${hub.label} TechT`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[center_35%] scale-[1.15]"
            animate={
              reducedMotion
                ? undefined
                : {
                    scale: [1.15, 1.2, 1.15],
                  }
            }
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

type OrbitalNodeProps = {
  node: EcosystemNode;
  index: number;
  reducedMotion: boolean;
  stacked?: boolean;
  touchLayout?: boolean;
};

const OrbitalNode: React.FC<OrbitalNodeProps> = ({
  node,
  index,
  reducedMotion,
  stacked,
  touchLayout,
}) => {
  const Icon = nodeIcons[node.id] ?? Target;
  const alignRight = node.anchor.x > HUB_CENTER.x + 6;
  const alignCenter = Math.abs(node.anchor.x - HUB_CENTER.x) < 6;

  const transformOrigin = stacked
    ? 'center center'
    : alignCenter
      ? 'center center'
      : alignRight
        ? 'right center'
        : 'left center';

  const positionStyle = stacked
    ? undefined
    : {
        left: `${node.anchor.x}%`,
        top: `${node.anchor.y}%`,
        transform: `translate(${alignCenter ? '-50%' : alignRight ? '-100%' : '0'}, -50%)`,
      };

  const cardClassName = stacked
    ? 'group relative w-full flex gap-3.5 p-4 sm:p-[1.1rem] rounded-2xl border border-white/[0.1] bg-[#0a0a0f]/92 hover:border-[#3B82F6]/25 hover:shadow-[0_0_24px_rgba(59,130,246,0.1)] transition-[box-shadow,border-color] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
    : `group relative ${touchLayout ? 'w-[11.4rem]' : 'w-[10.9rem] xl:w-[11.8rem]'} p-3.5 rounded-2xl border border-white/[0.1] bg-[#0a0a0f]/92 backdrop-blur-sm transition-[box-shadow,border-color,background-color] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#3B82F6]/30 hover:bg-[#0b0b12]/95 hover:shadow-[0_0_28px_rgba(59,130,246,0.14),0_10px_36px_rgba(0,0,0,0.38)] ${
        alignCenter ? 'text-center' : alignRight ? 'text-right' : 'text-left'
      }`;

  const cardContent = (
    <div
      className={`flex gap-2.5 ${
        stacked
          ? 'items-start'
          : alignCenter
            ? 'flex-col items-center'
            : alignRight
              ? 'flex-row-reverse items-start'
              : 'items-start'
      }`}
    >
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 text-[#00D2FF] shrink-0 group-hover:border-[#3B82F6]/40 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.18)] transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
        <Icon className="w-[14px] h-[14px]" strokeWidth={1.65} />
      </span>
      <div className={alignCenter && !stacked ? 'flex flex-col items-center' : ''}>
        <h4 className={`font-semibold text-white tracking-[-0.01em] leading-tight ${
          touchLayout ? 'text-[0.9rem]' : 'text-[0.88rem] sm:text-[0.92rem] xl:text-[0.84rem]'
        }`}>
          {node.title}
        </h4>
        <p
          className={`mt-1 text-gray-400 leading-snug transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            touchLayout
              ? 'text-[0.8rem] text-gray-300'
              : stacked
                ? 'text-[0.8rem] sm:text-[0.82rem] group-hover:text-gray-300'
                : 'max-h-[3.2rem] overflow-hidden text-[0.8rem] sm:text-[0.82rem] xl:text-[0.75rem] leading-relaxed group-hover:max-h-[6.4rem] group-hover:text-gray-300'
          }`}
        >
          {node.description}
        </p>
      </div>
    </div>
  );

  const motionCard = (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '60px 0px 60px 0px' }}
      transition={{
        opacity: { duration: 0.45, delay: index * 0.04, ease: easeOut },
        y: { duration: 0.45, delay: index * 0.04, ease: easeOut },
        scale: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
      }}
      whileHover={reducedMotion ? undefined : { scale: stacked ? 1.03 : 1.05 }}
      style={{ transformOrigin }}
      className={cardClassName}
    >
      {cardContent}
    </motion.article>
  );

  if (stacked) return motionCard;

  return (
    <div style={positionStyle} className="absolute z-10 hover:z-30">
      {motionCard}
    </div>
  );
};

type ConnectorSvgProps = {
  hub: { x: number; y: number };
  frame: typeof HUB_FRAME;
  nodes: EcosystemNode[];
  reducedMotion: boolean;
};

type CircuitNodeProps = {
  x: number;
  y: number;
  color?: string;
  reducedMotion: boolean;
  delay?: number;
  size?: number;
};

const CircuitNode: React.FC<CircuitNodeProps> = ({
  x,
  y,
  color = '#7be8ff',
  reducedMotion,
  delay = 0,
  size = 0.4,
}) => (
  <motion.circle
    cx={x}
    cy={y}
    r={size}
    fill={color}
    filter="url(#circuit-node-glow)"
    animate={
      reducedMotion
        ? { r: size }
        : {
            r: [size * 0.82, size * 1.12, size * 0.82],
            opacity: [0.55, 1, 0.55],
          }
    }
    transition={{
      duration: 3.4,
      repeat: reducedMotion ? 0 : Infinity,
      ease: 'easeInOut',
      delay,
    }}
  />
);

type CircuitPathLineProps = {
  d: string;
  index: number;
  reducedMotion: boolean;
  energyDuration?: number;
  tier: LinkTier;
};

const CircuitPathLine: React.FC<CircuitPathLineProps> = ({
  d,
  index,
  reducedMotion,
  energyDuration = 3.8,
  tier,
}) => {
  const weight = tier === 'primary' ? 0.2 : tier === 'secondary' ? 0.16 : 0.13;
  const baseOpacity = tier === 'primary' ? 0.84 : tier === 'secondary' ? 0.52 : 0.28;
  const glowOpacity = tier === 'primary' ? 0.17 : tier === 'secondary' ? 0.1 : 0.05;
  const dashOpacity = tier === 'aux' ? 0.45 : 1;

  return (
    <g>
    <path
      d={d}
      fill="none"
      stroke="url(#neon-grad)"
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={baseOpacity}
      style={{ filter: 'drop-shadow(0 0 6px rgba(139,92,246,0.55))' }}
    />
    <path
      d={d}
      fill="none"
      stroke="url(#neon-grad)"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={glowOpacity}
      filter="url(#circuit-glow)"
    />
    {!reducedMotion ? (
      <motion.path
        d={d}
        fill="none"
        stroke="url(#energy-grad)"
        strokeWidth="0.22"
        strokeLinecap="round"
        strokeDasharray="0.05 1.95"
        filter="url(#circuit-glow)"
        opacity={dashOpacity}
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: [-2, -8] }}
        transition={{
          duration: energyDuration + (index % 4) * 0.35,
          repeat: Infinity,
          ease: 'linear',
          delay: index * 0.14,
        }}
      />
    ) : null}
    </g>
  );
};

const ConnectorSvg: React.FC<ConnectorSvgProps> = ({
  hub,
  frame,
  nodes,
  reducedMotion,
}) => {
  const { cardPaths, ingressPaths, nucleusPaths, junctionNodes } = useMemo(
    () => buildCircuitGeometry(nodes, frame, hub),
    [nodes, frame, hub]
  );

  const busPath = roundedRectPath(frame.x, frame.y, frame.w, frame.h, frame.r);
  const orbitMotionPath = (radius: number) => {
    const x = hub.x + radius;
    return `M ${x} ${hub.y} A ${radius} ${radius} 0 1 1 ${hub.x - radius} ${hub.y} A ${radius} ${radius} 0 1 1 ${x} ${hub.y}`;
  };

  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="neon-grad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.92" />
          <stop offset="48%" stopColor="#3B82F6" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="energy-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
          <stop offset="42%" stopColor="#8B5CF6" stopOpacity="0.85" />
          <stop offset="58%" stopColor="#3B82F6" stopOpacity="1" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </linearGradient>
        <filter id="circuit-glow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="0.32" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="circuit-node-glow" x="-220%" y="-220%" width="540%" height="540%">
          <feGaussianBlur stdDeviation="0.45" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Órbita principal dominante */}
      <circle
        cx={hub.x}
        cy={hub.y}
        r={22.5}
        fill="none"
        stroke="url(#neon-grad)"
        strokeWidth="0.24"
        opacity="0.32"
        style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.32))' }}
      />
      {!reducedMotion ? (
        <motion.circle
          cx={hub.x}
          cy={hub.y}
          r={22.5}
          fill="none"
          stroke="url(#energy-grad)"
          strokeWidth="0.18"
          strokeDasharray="0.65 2.8"
          opacity="0.42"
          animate={{ strokeDashoffset: [0, -2.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      ) : null}

      {/* Anéis orbitais secundários */}
      {ORBIT_RADII.map((radius, i) => (
        <g key={`orbit-${radius}`}>
          <circle
            cx={hub.x}
            cy={hub.y}
            r={radius}
            fill="none"
            stroke="url(#neon-grad)"
            strokeWidth="0.12"
            opacity={0.12 + i * 0.04}
            style={{ filter: 'blur(0.4px)' }}
          />
          {!reducedMotion ? (
            <motion.circle
              cx={hub.x}
              cy={hub.y}
              r={radius}
              fill="none"
              stroke="url(#neon-grad)"
              strokeWidth="0.1"
              strokeDasharray="0.4 2.2"
              opacity={0.18 + i * 0.03}
              animate={{ strokeDashoffset: [0, -2.6] }}
              transition={{
                duration: 14 + i * 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ) : null}
        </g>
      ))}

      {/* Partículas orbitando suavemente */}
      {!reducedMotion
        ? [0, 1, 2].map((i) => (
            <circle
              key={`particle-${i}`}
              r="0.28"
              fill="#3B82F6"
              opacity="0.85"
              filter="url(#circuit-node-glow)"
            >
              <animateMotion
                dur={`${16 + i * 2}s`}
                repeatCount="indefinite"
                begin={`${i * 5.3}s`}
                path={orbitMotionPath(ORBIT_RADII[1])}
              />
            </circle>
          ))
        : null}

      {/* Trilho orbital externo (bus principal) */}
      <path
        d={busPath}
        fill="none"
        stroke="url(#neon-grad)"
        strokeWidth="0.18"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.82"
        style={{ filter: 'drop-shadow(0 0 6px rgba(139,92,246,0.6))' }}
      />
      <path
        d={busPath}
        fill="none"
        stroke="url(#neon-grad)"
        strokeWidth="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.12"
        filter="url(#circuit-glow)"
      />
      {!reducedMotion ? (
        <motion.path
          d={busPath}
          fill="none"
          stroke="url(#energy-grad)"
          strokeWidth="0.2"
          strokeLinecap="round"
          strokeDasharray="0.08 2.4"
          filter="url(#circuit-glow)"
          animate={{ strokeDashoffset: [-2.48, -9.92] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />
      ) : null}

      {/* CARD → bus (curvas Bezier com hierarquia) */}
      {cardPaths.map((path, i) => (
        <g key={path.id}>
          <CircuitPathLine d={path.d} index={i} reducedMotion={reducedMotion} tier={path.tier} />
          {path.nodes.map((node, nodeIdx) => (
            <CircuitNode
              key={`${path.id}-node-${nodeIdx}`}
              x={node.x}
              y={node.y}
              color={nodeIdx === 0 ? '#8B5CF6' : '#06B6D4'}
              reducedMotion={reducedMotion}
              delay={i * 0.08 + nodeIdx * 0.12}
              size={nodeIdx === 0 ? 0.36 : 0.44}
            />
          ))}
        </g>
      ))}

      {/* BUS → órbita interna */}
      {ingressPaths.map((path, i) => (
        <g key={path.id}>
          <CircuitPathLine
            d={path.d}
            index={i + cardPaths.length}
            reducedMotion={reducedMotion}
            energyDuration={4.2}
            tier={path.tier}
          />
          {path.nodes.map((node, nodeIdx) => (
            <CircuitNode
              key={`${path.id}-node-${nodeIdx}`}
              x={node.x}
              y={node.y}
              color={nodeIdx === 0 ? '#3B82F6' : '#8B5CF6'}
              reducedMotion={reducedMotion}
              delay={0.4 + i * 0.1 + nodeIdx * 0.08}
            />
          ))}
        </g>
      ))}

      {/* Órbita interna → núcleo IA */}
      {nucleusPaths.map((path, i) => (
        <CircuitPathLine
          key={path.id}
          d={path.d}
          index={i + cardPaths.length + ingressPaths.length}
          reducedMotion={reducedMotion}
          energyDuration={5}
          tier={path.tier}
        />
      ))}

      {/* Nodes nos cruzamentos do bus */}
      {junctionNodes.map((node, i) => (
        <CircuitNode
          key={`junction-${i}`}
          x={node.x}
          y={node.y}
          color="#3B82F6"
          reducedMotion={reducedMotion}
          delay={i * 0.06}
          size={0.34}
        />
      ))}
    </svg>
  );
};

type LegendProps = {
  items: readonly { label: string }[];
  stacked?: boolean;
};

const Legend: React.FC<LegendProps> = ({ items, stacked }) => (
  <div
    className={
      stacked
        ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full'
        : 'z-20 grid grid-cols-1 gap-3 w-full max-w-[19rem] p-4 xl:p-5 rounded-2xl border border-white/[0.1] bg-[#06060c]/85 backdrop-blur-sm shadow-[0_12px_40px_rgba(0,0,0,0.28)]'
    }
  >
    {items.map((item, idx) => {
      const Icon = legendIcons[idx] ?? Network;
      return (
        <div
          key={item.label}
          className="flex items-center gap-3 text-[0.82rem] xl:text-[0.88rem] text-gray-300"
        >
          <Icon className="w-4 h-4 xl:w-[18px] xl:h-[18px] text-[#00D2FF]/85 shrink-0" strokeWidth={1.6} />
          <span>{item.label}</span>
        </div>
      );
    })}
  </div>
);

type HubBackdropProps = { reducedMotion: boolean };

const HubBackdrop: React.FC<HubBackdropProps> = ({ reducedMotion }) => (
  <>
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.09) 0%, rgba(14,20,36,0) 58%), radial-gradient(ellipse at 56% 42%, rgba(139,92,246,0.08) 0%, rgba(10,12,18,0) 62%)',
      }}
    />
    <div
      aria-hidden
      className="absolute w-[420px] h-[420px] rounded-full bg-[#00D2FF]/[0.06] blur-[100px]"
      style={{
        left: `${HUB_CENTER.x}%`,
        top: `${HUB_CENTER.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    />
    <div
      aria-hidden
      className="absolute w-[360px] h-[360px] rounded-full bg-[#9D50BB]/[0.08] blur-[90px]"
      style={{
        left: `${HUB_CENTER.x}%`,
        top: `${HUB_CENTER.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    />
    <div
      aria-hidden
      className="absolute w-[560px] h-[560px] rounded-full border border-[#3B82F6]/[0.08] blur-[1px]"
      style={{
        left: `${HUB_CENTER.x}%`,
        top: `${HUB_CENTER.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    />
    {!reducedMotion ? (
      <>
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          animate={{ opacity: [0.028, 0.055, 0.028] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 22%, rgba(6,182,212,0.35) 0 1px, transparent 1.8px), radial-gradient(circle at 74% 72%, rgba(139,92,246,0.32) 0 1px, transparent 1.9px), radial-gradient(circle at 58% 16%, rgba(59,130,246,0.3) 0 1px, transparent 2px)',
          }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
      </>
    ) : null}
  </>
);

export default EcosystemHub;
