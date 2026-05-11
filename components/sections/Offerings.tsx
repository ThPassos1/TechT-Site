import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Megaphone, Share2, Globe, Bot, LayoutDashboard } from 'lucide-react';
import Container from '../ui/Container';
import { GRADIENTS, whatsappPrefill } from '../../constants';
import { trackWhatsAppClick } from '../analytics/GoogleTagManager';
import Intelligence from './Intelligence';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { useAppPreferences } from '../../context/AppPreferencesContext';
import { UI_TEXT } from '../../i18n/ui';
import BorderBeam from '../effects/BorderBeam';
import TracingBeam from '../effects/TracingBeam';
import TypewriterHeadline from '../effects/TypewriterHeadline';
import { MediaCaseRail, type MediaCaseItem } from './MediaCaseShowcase';

const pillarIcon = (i: number) => {
  const cls = 'w-8 h-8 text-[#00D2FF]';
  const icons = [
    <Megaphone key="p0" className={cls} />,
    <Share2 key="p1" className={cls} />,
    <Bot key="p2" className={cls} />,
    <LayoutDashboard key="p3" className={cls} />,
  ];
  return icons[i] ?? <Globe className={cls} />;
};

const Offerings: React.FC = () => {
  const { offerings: o } = useSiteConfig();
  const { locale } = useAppPreferences();
  const ui = UI_TEXT[locale];
  const eco = o.ecosystem;
  const reducedMotion = useReducedMotion();
  const primaryHeadingDelay = reducedMotion ? 0 : 0.38;
  const primaryHeadingInterval = reducedMotion ? 0 : 105;
  const primaryHeadingLength = `${eco.title}${eco.titleHighlight}${eco.titleSuffix}`.length;
  const primaryDoneDelay = reducedMotion
    ? 0
    : (primaryHeadingDelay * 1000 + primaryHeadingLength * primaryHeadingInterval) / 1000 + 0.1;
  const includedHeadingDelay = reducedMotion ? 0 : 0.34;
  const includedHeadingInterval = reducedMotion ? 0 : 100;
  const includedHeadingLength = `${o.included.title}${o.included.titleHighlight}${o.included.titleSuffix}`.length;
  const includedDoneDelay = reducedMotion
    ? 0
    : (includedHeadingDelay * 1000 + includedHeadingLength * includedHeadingInterval) / 1000 + 0.1;

  return (
    <section id="servicos" className="py-20 md:py-28 relative overflow-hidden bg-[#050505] border-t border-white/5">
      <div className="absolute top-1/3 right-0 w-[min(100%,480px)] h-[480px] bg-[#9D50BB]/6 blur-[140px] rounded-full pointer-events-none" />
      <div className="lava-blob w-[320px] h-[320px] left-[-80px] top-[8%] bg-[#00D2FF]/14" />
      <div
        className="lava-blob w-[300px] h-[300px] right-[-70px] bottom-[8%] bg-[#9D50BB]/15"
        style={{ animationDelay: '2.8s', animationDuration: '18s' }}
      />

      <Container className="relative">
        {/* Ecossistema — narrativa única (ciclo em quatro passos) */}
        <div className="mb-20 md:mb-24">
          <span className="text-xs font-bold text-[#00D2FF] uppercase tracking-[0.35em] mb-4 block">
            {eco.badge}
          </span>
          <TypewriterHeadline
            as="h2"
            startOnInView
            startDelayMs={primaryHeadingDelay * 1000}
            charIntervalMs={primaryHeadingInterval}
            className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-4xl"
            segments={[
              { text: eco.title },
              { text: eco.titleHighlight, className: GRADIENTS.text },
              { text: eco.titleSuffix },
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: primaryDoneDelay }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mb-12 leading-relaxed"
          >
            {eco.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: primaryDoneDelay + 0.12 }}
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <TracingBeam
              from={{ x: 0, y: 20 }}
              to={{ x: 100, y: 75 }}
              duration={2.6}
              color="rgba(0, 210, 255, 0.35)"
            />
            {eco.steps.map((step, idx) => (
              <BorderBeam key={step.title} duration={12 + idx * 2} delay={idx * 0.4}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#00D2FF]/35 hover:shadow-[0_0_26px_rgba(0,210,255,0.16)] transition-all duration-300"
                >
                  <div className="mb-4 transition-transform duration-300">{pillarIcon(idx)}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.text}</p>
                </motion.div>
              </BorderBeam>
            ))}
          </motion.div>
        </div>

        {/* Seções do pacote (substitui cards) */}
        <div className="mb-16">
          <TypewriterHeadline
            as="h2"
            startOnInView
            startDelayMs={includedHeadingDelay * 1000}
            charIntervalMs={includedHeadingInterval}
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            segments={[
              { text: o.included.title },
              { text: o.included.titleHighlight, className: GRADIENTS.text },
              { text: o.included.titleSuffix },
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: includedDoneDelay }}
            className="text-gray-500 mb-10 max-w-3xl"
          >
            {o.included.intro}
          </motion.p>
        </div>
      </Container>

      {o.included.blocks.map((block) => {
        const lowerTitle = block.title.toLowerCase();
        const isPlatformSection =
          lowerTitle.includes('ecossistema') || lowerTitle.includes('ecosystem');
        const isMediaBlock =
          lowerTitle.includes('mídia') || lowerTitle.includes('midia') || lowerTitle.includes('media');

        const mediaLabels = {
          watchVideo: ui.mediaWatchVideo,
          viewCase: ui.mediaViewCase,
          prev: ui.mediaPrev,
          next: ui.mediaNext,
          close: ui.mediaClose,
        };

        return (
          <React.Fragment key={block.title}>
            <section className="py-14 md:py-16 border-y border-white/5 bg-[#060606]">
              <Container>
                <div
                  className={`${
                    block.showcase?.length && !isMediaBlock
                      ? 'max-w-6xl mx-auto text-center'
                      : block.showcase?.length
                        ? 'max-w-[min(1200px,100%)] mx-auto'
                        : 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'
                  }`}
                >
                  <div
                    className={
                      block.showcase?.length
                        ? isMediaBlock
                          ? 'text-center'
                          : ''
                        : 'lg:col-span-4'
                    }
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{block.title}</h3>
                  </div>

                  <div
                    className={
                      block.showcase?.length
                        ? isMediaBlock
                          ? 'mt-6 w-full'
                          : 'max-w-4xl mx-auto mt-6'
                        : 'lg:col-span-8'
                    }
                  >
                    <ul
                      className={`space-y-4 text-gray-400 leading-relaxed ${
                        block.showcase?.length ? (isMediaBlock ? 'text-left max-w-3xl mx-auto' : 'text-left') : ''
                      }`}
                    >
                      {block.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="text-[#9D50BB] mt-1">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {block.services?.length ? (
                      <div
                        className={`mt-7 flex flex-wrap gap-2 ${
                          block.showcase?.length ? 'justify-center' : ''
                        }`}
                      >
                        {block.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/[0.04] border border-white/10 text-gray-300"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {block.showcase?.length ? (
                      isMediaBlock ? (
                        <div className="mt-10 w-full text-left">
                          <MediaCaseRail
                            items={block.showcase as unknown as MediaCaseItem[]}
                            variant="featured"
                            labels={mediaLabels}
                          />
                        </div>
                      ) : (
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                          {(block.showcase as MediaCaseItem[]).slice(0, 3).map((item) => (
                            <article
                              key={`${block.title}-main-${item.title}`}
                              className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]"
                            >
                              <div className="aspect-[16/10] bg-black/30">
                                {item.type === 'video' ? (
                                  <video
                                    className="w-full h-full object-cover"
                                    src={item.src}
                                    poster={item.poster}
                                    controls
                                    muted
                                    playsInline
                                    preload="metadata"
                                  />
                                ) : (
                                  <img
                                    className="w-full h-full object-cover"
                                    src={item.src}
                                    alt={item.title}
                                    loading="lazy"
                                  />
                                )}
                              </div>
                              <div className="px-4 py-3">
                                <p className="text-sm md:text-base text-gray-300">{item.title}</p>
                                {item.description ? (
                                  <p className="text-xs md:text-sm text-gray-500 mt-1 leading-relaxed">
                                    {item.description}
                                  </p>
                                ) : null}
                              </div>
                            </article>
                          ))}
                        </div>
                      )
                    ) : null}
                  </div>

                  {block.companyGallery?.length && !isMediaBlock ? (
                    <div className="mt-12 pt-8 border-t border-white/10 text-left w-full">
                      <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6">
                        {ui.mediaGalleryLabel}
                      </p>
                    </div>
                  ) : null}
                </div>
              </Container>
            </section>

            {isPlatformSection ? <Intelligence embedded /> : null}
          </React.Fragment>
        );
      })}

      <Container className="relative">
        <p className="text-center text-sm text-gray-500 max-w-2xl mx-auto mb-14 px-4">{o.disclaimer}</p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto p-10 md:p-12 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <a
              href={whatsappPrefill(o.cta.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('ecosystem-cta')}
              className={`px-8 py-4 rounded-full font-bold text-center ${GRADIENTS.primary} text-black shadow-[0_0_30px_rgba(0,210,255,0.35)]`}
            >
              {o.cta.primaryLabel}
            </a>
            <Link
              to={o.cta.secondaryHref}
              className="px-8 py-4 rounded-full font-bold border-2 border-white/20 text-white hover:border-[#00D2FF] hover:text-[#00D2FF] transition-colors text-center"
            >
              {o.cta.secondaryLabel}
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Offerings;
