
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';
import { GRADIENTS, SOCIALS, EMAIL_JS_CONFIG, whatsappPrefill } from '../../constants';
import { useContactForm } from '../../hooks/useContactForm';
import { BorderBeam } from '../effects/BorderBeam';
import GlowBorder from '../effects/GlowBorder';
import { trackFormSubmit, trackWhatsAppClick } from '../analytics/GoogleTagManager';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { useAppPreferences } from '../../context/AppPreferencesContext';
import { UI_TEXT } from '../../i18n/ui';
import TypewriterHeadline from '../effects/TypewriterHeadline';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  const { form, status, errorMsg, handleChange, handleSubmit } = useContactForm();
  const { contact } = useSiteConfig();
  const { locale } = useAppPreferences();
  const ui = UI_TEXT[locale];
  const reducedMotion = useReducedMotion();
  const headingDelay = reducedMotion ? 0 : 0.36;
  const headingInterval = reducedMotion ? 0 : 70;
  const headingTextLength = `${contact.title}${contact.titleHighlight}${contact.titleSuffix ?? ''}`.length;
  const titleDoneDelay = reducedMotion
    ? 0
    : (headingDelay * 1000 + headingTextLength * headingInterval) / 1000 + 0.1;

  return (
    <section id="contato" className="py-24 relative bg-[#080808]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <TypewriterHeadline
              as="h2"
              startOnInView
              startDelayMs={headingDelay * 1000}
              charIntervalMs={headingInterval}
              className="text-4xl md:text-5xl font-bold mb-6"
              segments={[
                { text: contact.title },
                { text: contact.titleHighlight, className: GRADIENTS.text },
                { text: contact.titleSuffix ?? '' },
              ]}
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: titleDoneDelay }}
              className="text-gray-400 text-lg mb-12"
            >
              {contact.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: titleDoneDelay + 0.12 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D2FF]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">{ui.contactEmail}</p>
                  <p className="text-white font-medium">{EMAIL_JS_CONFIG.DESTINATION_EMAIL}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9D50BB]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">{ui.contactLocation}</p>
                  <p className="text-white font-medium">Manaus - AM | Atendimento Global</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: titleDoneDelay + 0.2 }}
              className="mt-12"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_10px_rgba(37,211,102,0.95)]">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60"
                  />
                </span>
                <p className="text-[11px] text-[#9DE9FF]/80 uppercase font-semibold tracking-[0.32em]">
                  {ui.contactPreferredChannel}
                </p>
              </div>

              {(() => {
                const whats = SOCIALS.find(s => s.name === 'WhatsApp');
                const whatsHref = whats?.href
                  ?? whatsappPrefill(
                    locale === 'pt'
                      ? 'Olá, TechT! Quero conversar sobre minha operação de marketing e agendar uma reunião.'
                      : 'Hi TechT! I would like to talk about my marketing operation and book a meeting.',
                  );
                return (
                  <GlowBorder
                    className="rounded-2xl block"
                    thickness="1.5px"
                    duration="4.5s"
                    color="rgba(37,211,102,0.9)"
                    accent="rgba(255,255,255,0.6)"
                  >
                    <a
                      href={whatsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick('contact-section')}
                      className="group relative z-10 block w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#1FAE52] via-[#22C75E] to-[#1EBE5C] text-white shadow-[0_0_36px_rgba(37,211,102,0.32),0_22px_50px_-22px_rgba(37,211,102,0.55)] hover:shadow-[0_0_50px_rgba(37,211,102,0.5),0_26px_56px_-22px_rgba(37,211,102,0.7)] transition-shadow duration-300"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-6 top-0 h-px"
                        style={{
                          background:
                            'linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)',
                        }}
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                        style={{
                          background:
                            'radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)',
                        }}
                      />
                      <div className="relative flex items-center gap-4 md:gap-5 px-5 md:px-6 py-5 md:py-6">
                        <span className="relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/15 border border-white/25 shrink-0 shadow-[inset_0_0_24px_rgba(255,255,255,0.18)]">
                          <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                          <span
                            aria-hidden
                            className="absolute -top-1 -right-1 inline-flex w-3.5 h-3.5 rounded-full bg-white border-2 border-[#1FAE52]"
                          >
                            <span
                              aria-hidden
                              className="absolute inset-0 rounded-full bg-white animate-ping opacity-70"
                            />
                          </span>
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-white font-bold text-[1.05rem] md:text-[1.15rem] tracking-tight">
                              {ui.contactWhatsTitle}
                            </h3>
                            <span className="inline-flex items-center gap-1.5 text-[10.5px] md:text-[11px] font-semibold uppercase tracking-[0.16em] text-white/95 px-2 py-0.5 rounded-full bg-white/15 border border-white/25">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white" />
                              {ui.contactWhatsOnline}
                            </span>
                          </div>
                          <p className="mt-1 text-[0.85rem] md:text-[0.92rem] text-white/85 leading-snug">
                            {ui.contactWhatsSubtitle}
                          </p>
                        </div>
                        <span className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 border border-white/30 text-white shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2} />
                        </span>
                      </div>
                    </a>
                  </GlowBorder>
                );
              })()}

              {(() => {
                const others = SOCIALS.filter(s => s.name !== 'WhatsApp');
                if (others.length === 0) return null;
                return (
                  <div className="mt-6 flex items-center gap-4">
                    <p className="text-[11px] text-gray-500 uppercase font-semibold tracking-[0.28em] shrink-0">
                      {ui.contactAlsoAt}
                    </p>
                    <span aria-hidden className="flex-1 h-px bg-white/[0.06]" />
                    <div className="flex items-center gap-2">
                      {others.map(social => {
                        const handle =
                          social.name === 'Instagram' ? '@techt.br' : social.name;
                        return (
                          <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white/85 hover:text-white hover:border-white/25 transition-colors"
                          >
                            <span className="text-white/70 group-hover:text-white transition-colors">
                              {social.icon}
                            </span>
                            <span className="text-[12.5px] font-medium tracking-wide">
                              {handle}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/20 backdrop-blur-2xl overflow-hidden group"
          >
            {/* BorderBeam effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl overflow-hidden">
              <BorderBeam colorFrom="#00D2FF" colorTo="#9D50BB" duration={12} />
            </div>

            {/* Shine effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{ui.contactName}</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]/50 focus:border-[#00D2FF] transition-all hover:bg-white/8"
                  placeholder={ui.contactNamePlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">E-mail</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]/50 focus:border-[#00D2FF] transition-all hover:bg-white/8"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{ui.contactHelp}</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]/50 focus:border-[#00D2FF] transition-all resize-none hover:bg-white/8"
                  placeholder={ui.contactMessagePlaceholder}
                />
              </div>

              {errorMsg && (
                <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
              )}

              <GlowBorder
                className="rounded-xl block w-full"
                thickness="1.5px"
                duration="4.5s"
                color={status === 'success' ? 'rgba(34,197,94,0.85)' : undefined}
              >
              <button 
                type="submit"
                disabled={status === 'sending'}
                className={`relative z-10 w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center overflow-hidden group/btn ${
                  status === 'success' ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]' : `${GRADIENTS.primary} text-black hover:shadow-[0_0_30px_rgba(0,210,255,0.5)] hover:scale-105`
                }`}
              >
                {/* Shine effect button */}
                <div className={`absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover/btn:opacity-20 transition-opacity`}>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{
                      animation: 'shimmer 2s infinite',
                      transform: 'translateX(-100%)',
                    }}
                  />
                </div>
                <style>{`
                  @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                  }
                `}</style>
                <span className="relative">
                  {status === 'sending' ? (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : status === 'success' ? (
                    ui.contactMessageSent
                  ) : (
                    ui.contactSendNow
                  )}
                </span>
              </button>
              </GlowBorder>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
