import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import Container from '../ui/Container';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { useAppPreferences } from '../../context/AppPreferencesContext';
import WhatsAppCTA from '../ui/WhatsAppCTA';
import OperationFlow from './OperationFlow';

const MediaShowcase = React.lazy(() => import('./MediaShowcase'));
const AIAutomations = React.lazy(() => import('./AIAutomations'));
const Intelligence = React.lazy(() => import('./Intelligence'));

const SectionFallback: React.FC<{ minHeight?: string }> = ({ minHeight = '320px' }) => (
  <div aria-hidden className="w-full" style={{ minHeight }} />
);

const Offerings: React.FC = () => {
  const { offerings: o } = useSiteConfig();
  const { locale } = useAppPreferences();
  const disclaimerEyebrow = locale === 'pt' ? 'Próximo passo' : 'Next step';

  return (
    <section
      id="servicos"
      className="pt-12 md:pt-16 pb-20 md:pb-28 relative overflow-hidden bg-gradient-to-b from-[#070710] via-[#06060c] to-[#050508] border-t border-white/5"
    >
      <Container className="relative">
        <OperationFlow />
      </Container>

      <React.Suspense fallback={<SectionFallback minHeight="480px" />}>
        <MediaShowcase />
      </React.Suspense>

      <React.Suspense fallback={<SectionFallback minHeight="420px" />}>
        <AIAutomations />
      </React.Suspense>

      <React.Suspense fallback={<SectionFallback minHeight="360px" />}>
        <Intelligence embedded />
      </React.Suspense>

      <Container className="relative pt-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-2xl mx-auto mb-12 md:mb-14"
        >
          <div className="relative px-6 md:px-8 py-6 md:py-7 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-white/[0.015] to-transparent shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] overflow-hidden">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-10 top-0 h-px"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(0,210,255,0.4), transparent)',
              }}
            />
            <div className="flex items-start gap-4">
              <span className="mt-0.5 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-[#00D2FF] shrink-0 shadow-[0_0_18px_rgba(0,210,255,0.12)]">
                <Compass className="w-[18px] h-[18px]" strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-[0.66rem] font-semibold text-[#00D2FF] uppercase tracking-[0.3em] mb-2">
                  {disclaimerEyebrow}
                </p>
                <p className="text-[0.95rem] md:text-base text-gray-300 leading-relaxed">
                  {o.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <WhatsAppCTA
            label={o.cta.primaryLabel}
            message={o.cta.waMessage}
            trackLabel="ecosystem-cta"
            size="lg"
          />
        </motion.div>
      </Container>
    </section>
  );
};

export default Offerings;
