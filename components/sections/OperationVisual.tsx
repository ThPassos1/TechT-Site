import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';
import { GRADIENTS } from '../../constants';
import TypewriterHeadline from '../effects/TypewriterHeadline';

const OperationVisual: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const headingDelay = reducedMotion ? 0 : 0.2;
  const headingInterval = reducedMotion ? 0 : 76;
  const headingText = 'Processos, vendas e IA operando em uma unica esteira comercial.';
  const titleDoneDelay = reducedMotion
    ? 0
    : (headingDelay * 1000 + headingText.length * headingInterval) / 1000 + 0.1;

  return (
    <section className="relative py-16 md:py-20 bg-[#060607] border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#040506]/95 via-[#05070e]/85 to-[#040506]/95" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#00D2FF] mb-4">
            Operacao completa
          </p>
          <TypewriterHeadline
            as="h2"
            startOnInView
            startDelayMs={headingDelay * 1000}
            charIntervalMs={headingInterval}
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
            segments={[
              { text: 'Processos, vendas e IA operando em uma ' },
              { text: 'unica esteira comercial', className: GRADIENTS.text },
              { text: '.' },
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: titleDoneDelay }}
            className="text-gray-300/90 text-base md:text-lg leading-relaxed max-w-2xl"
          >
            Da captacao ao fechamento: campanhas, CRM, automacoes, dashboards e leitura de dados em um fluxo
            unico. A camada visual representa seu time em operacao real, com foco em previsibilidade e escala.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
};

export default OperationVisual;
