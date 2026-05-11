import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { GRADIENTS, WHATSAPP_URL } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';
import Container from '../ui/Container';

const Problem: React.FC = () => {
  const { problem } = SITE_CONFIG;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="problema" className="relative py-20 md:py-32 overflow-hidden bg-black/50 border-t border-b border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">
              {problem.badge}
            </span>
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            {problem.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {problem.subtitle}
          </p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {problem.items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <AlertCircle
                  className="w-6 h-6 text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            Ajudamos empresas a sair dessa situação em 90 dias...
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block ${GRADIENTS.primary} text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)]`}
          >
            Vamos Conversar
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default Problem;
