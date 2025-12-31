
import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { SERVICES, GRADIENTS } from '../../constants';

const Services: React.FC = () => {
  return (
    <section id="servicos" className="py-24 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Soluções <span className={GRADIENTS.text}>Completas</span> para seu Negócio</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Não entregamos apenas código; entregamos ativos digitais que geram lucro. Nossa metodologia une o desenvolvimento artesanal à inteligência de dados do tráfego pago.
            </p>
            <div className="space-y-4">
              {[
                'Sites com Core Web Vitals nota 100',
                'Sistemas escaláveis em nuvem',
                'Gestão de Tráfego focada em conversão',
                'Design que converte visitantes em leads'
              ].map(item => (
                <div key={item} className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${GRADIENTS.primary}`}>
                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group relative overflow-hidden"
              >
                <div className={`mb-6 text-[#00D2FF] transition-transform group-hover:scale-110 duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
                
                {/* Accent glow on hover */}
                <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-[#9D50BB]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Services;
