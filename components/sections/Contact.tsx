
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';
import { GRADIENTS, SOCIALS, EMAIL_JS_CONFIG } from '../../constants';
import { useContactForm } from '../../hooks/useContactForm';
import { BorderBeam } from '../effects/BorderBeam';
import { trackFormSubmit } from '../analytics/GoogleTagManager';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { useAppPreferences } from '../../context/AppPreferencesContext';
import { UI_TEXT } from '../../i18n/ui';
import TypewriterHeadline from '../effects/TypewriterHeadline';

const Contact: React.FC = () => {
  const { form, status, errorMsg, handleChange, handleSubmit } = useContactForm();
  const { contact } = useSiteConfig();
  const { locale } = useAppPreferences();
  const ui = UI_TEXT[locale];
  const reducedMotion = useReducedMotion();
  const headingDelay = reducedMotion ? 0 : 0.36;
  const headingInterval = reducedMotion ? 0 : 105;
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
              <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-4">{ui.contactFollow}</p>
              <div className="flex space-x-4">
                {SOCIALS.map(social => (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all">
                    {social.icon}
                  </a>
                ))}
              </div>
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

              <button 
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center relative overflow-hidden group/btn ${
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
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
