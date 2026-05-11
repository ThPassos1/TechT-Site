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
  Sparkles,
  LayoutDashboard,
  Star,
  LogOut,
} from 'lucide-react';

const toneBorder: Record<string, string> = {
  amber: 'border-amber-500/25 bg-amber-500/5',
  rose: 'border-rose-500/25 bg-rose-500/5',
  cyan: 'border-cyan-500/25 bg-cyan-500/5',
  emerald: 'border-emerald-500/25 bg-emerald-500/5',
  violet: 'border-violet-500/25 bg-violet-500/5',
};

export type IntelligenceProps = {
  /** Dentro de Serviços: mesma faixa visual, entre os cards e os CTAs */
  embedded?: boolean;
};

const Intelligence: React.FC<IntelligenceProps> = ({ embedded = false }) => {
  const { intelligence } = useSiteConfig();
  const P = PLATFORM_PREVIEW;
  const reducedMotion = useReducedMotion();
  const headingDelay = reducedMotion ? 0 : 0.4;
  const headingInterval = reducedMotion ? 0 : 105;
  const headingTextLength = `${intelligence.title}${intelligence.titleHighlight}${intelligence.titleSuffix}`.length;
  const titleDoneDelay = reducedMotion
    ? 0
    : (headingDelay * 1000 + headingTextLength * headingInterval) / 1000 + 0.1;

  const shell =
    'relative overflow-hidden bg-[#0a0a0c]' +
    (embedded ? ' py-16 md:py-20 border-t border-white/5' : ' py-24');

  return (
    <section id="inteligencia" className={shell}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#9D50BB]/8 via-transparent to-[#00D2FF]/5 pointer-events-none" />
      <div className="lava-blob w-[280px] h-[280px] left-[6%] top-[14%] bg-[#00D2FF]/12" />
      <div
        className="lava-blob w-[340px] h-[340px] right-[4%] bottom-[8%] bg-[#9D50BB]/14"
        style={{ animationDelay: '2s', animationDuration: '20s' }}
      />

      <Container className="relative">
        <div className="text-center mb-12 md:mb-16">
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
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
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
            className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            {intelligence.description}
          </motion.p>
        </div>

        {/* Mock Ecossistema TechT — estilo SaaS dark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0f] shadow-[0_40px_120px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col md:flex-row min-h-[560px] md:min-h-[620px]"
        >
          {/* Sidebar */}
          <aside className="w-full md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-[#0a0a0c] p-4 flex flex-col max-h-[220px] md:max-h-none overflow-y-auto md:overflow-visible">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D2FF] to-[#9D50BB] flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white leading-tight">{P.productName}</p>
                  <p className="text-[8px] text-gray-600 uppercase tracking-wider">SaaS</p>
                </div>
              </div>
            </div>

            <nav className="space-y-6 flex-1 text-[10px] font-bold tracking-widest">
              {P.sidebar.map((section) => (
                <div key={section.group}>
                  <p className="text-gray-600 mb-2 px-2">{section.group}</p>
                  <ul className="space-y-0.5">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <span
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-default ${
                            item.active
                              ? 'bg-gradient-to-r from-[#9D50BB]/40 to-[#00D2FF]/20 text-white'
                              : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {item.star ? <Star className="w-3 h-3 text-amber-400 shrink-0" /> : null}
                          <span className="truncate">{item.label}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[9px] text-gray-600">
              <span className="truncate">Admin TechT</span>
              <LogOut className="w-3.5 h-3.5 opacity-50" />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#111116]">
            <header className="h-14 md:h-16 border-b border-white/5 px-4 md:px-6 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate">{P.productName}</h3>
                <p className="text-[9px] text-gray-600 truncate">{P.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400">
                  <Bell className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] text-gray-400"
                >
                  {P.clientContext}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <span className="text-[9px] px-2 py-1 rounded bg-white/5 text-gray-500">PT</span>
              </div>
            </header>

            <div className="p-4 md:p-6 overflow-y-auto max-h-[70vh] md:max-h-none">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-white">Dashboard</h4>
                  <p className="text-[11px] text-gray-500 mt-1">{P.moduleCaption}</p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9D50BB] to-[#00D2FF] flex items-center justify-center shadow-lg shadow-[#9D50BB]/30">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-gray-600 mb-4 uppercase tracking-widest">Insights IA</p>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3 mb-8">
                {P.insightsIA.map((card) => (
                  <div
                    key={card.label}
                    className={`rounded-xl border p-3 ${toneBorder[card.tone] ?? 'border-white/10 bg-white/[0.03]'}`}
                  >
                    <p className="text-[9px] text-gray-500 uppercase tracking-tighter mb-1 leading-tight">{card.label}</p>
                    <p className="text-lg font-bold text-white font-mono">{card.value}</p>
                    <p className="text-[9px] text-gray-600 mt-1 leading-snug">{card.sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {P.kpis.map((k) => (
                  <div key={k.label} className="rounded-xl border border-white/10 bg-[#16161d] p-4">
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-2">{k.label}</p>
                    <p className="text-xl font-bold text-white font-mono">{k.value}</p>
                    <p className={`text-[9px] mt-1 ${k.trendUp ? 'text-emerald-500/90' : 'text-gray-600'}`}>
                      {k.trend}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-[#0f0f14] p-5 h-44 flex flex-col justify-end">
                  <p className="text-[10px] text-gray-600 mb-2">Tendência (ilustrativo)</p>
                  <div className="flex items-end justify-between gap-1 h-24">
                    {[35, 42, 48, 55, 62, 70, 78].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-[#9D50BB]/40 to-[#00D2FF]/60 opacity-90"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0f0f14] p-5 h-44 flex items-center justify-center">
                  <p className="text-[11px] text-gray-600 text-center px-4">
                    Funil, radar e heatmaps podem plugar nos mesmos dados — roadmap da plataforma.
                  </p>
                </div>
              </div>

              <p className="text-[9px] text-gray-600 text-center mt-6">
                Interface ilustrativa para comunicar o produto. Métricas são exemplo visual, não garantia de resultado.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Intelligence;
