
import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { GRADIENTS, SOCIALS, EMAIL_JS_CONFIG } from '../../constants';
import { useContactForm } from '../../hooks/useContactForm';

const Contact: React.FC = () => {
  const { form, status, errorMsg, handleChange, handleSubmit } = useContactForm();

  return (
    <section id="contato" className="py-24 relative bg-[#080808]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Inicie sua <span className={GRADIENTS.text}>Transformação</span></h2>
            <p className="text-gray-400 text-lg mb-12">
              Pronto para elevar seu ecossistema digital? Fale com nosso time de especialistas para arquitetar sua presença online.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D2FF]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Email</p>
                  <p className="text-white font-medium">{EMAIL_JS_CONFIG.DESTINATION_EMAIL}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9D50BB]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Localização</p>
                  <p className="text-white font-medium">Manaus - AM | Atendimento Global</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-4">Siga-nos</p>
              <div className="flex space-x-4">
                {SOCIALS.map(social => (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Seu Nome</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]/50 transition-all"
                  placeholder="Ex: João Silva"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">E-mail</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]/50 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Como podemos ajudar?</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]/50 transition-all resize-none"
                  placeholder="Descreva seu projeto ou serviço de interesse..."
                />
              </div>

              {errorMsg && (
                <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
              )}

              <button 
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center ${
                  status === 'success' ? 'bg-green-500 text-white' : `${GRADIENTS.primary} text-black`
                }`}
              >
                {status === 'sending' ? (
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : status === 'success' ? (
                  'Mensagem Enviada!'
                ) : (
                  'Enviar Agora'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
