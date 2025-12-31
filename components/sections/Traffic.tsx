
import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { GRADIENTS, TRAFFIC_ICONS } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';

const Traffic: React.FC = () => {
  const { traffic } = SITE_CONFIG;

  return (
    <section id="trafego" className="py-24 relative overflow-hidden bg-[#030303]">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9D50BB]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-xs font-bold text-[#9D50BB] uppercase tracking-[0.3em] mb-4 block">
              {traffic.badge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
              {traffic.title}<span className={GRADIENTS.text}>{traffic.titleHighlight}</span>{traffic.titleSuffix}
            </h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-xl">
              {traffic.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {traffic.features.map((feature, idx) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#9D50BB]/40 transition-all group"
                >
                  <div className="text-[#9D50BB] mb-4 group-hover:scale-110 transition-transform duration-300">
                    {TRAFFIC_ICONS[idx]}
                  </div>
                  <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Side (Mockup/Infographic) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 p-2 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-[#080808] rounded-[2rem] p-8 min-h-[450px] flex flex-col">
                {/* Simulated Dashboard Header */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Growth_Algorithm_v2.0</div>
                </div>

                {/* Simulated Metrics */}
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {[
                    { label: 'ROAS Médio', val: '4.8x', color: '#00D2FF' },
                    { label: 'CPA Reduzido', val: '-32%', color: '#9D50BB' },
                    { label: 'Leads/Mês', val: '2.4k', color: '#00D2FF' },
                    { label: 'Escala Ativa', val: '85%', color: '#9D50BB' }
                  ].map((m, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">{m.label}</p>
                      <p className="text-3xl font-bold font-mono" style={{ color: m.color }}>{m.val}</p>
                    </div>
                  ))}
                </div>

                {/* Simulated Chart Bars */}
                <div className="flex-grow flex items-end justify-between gap-3 pt-4">
                  {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                      className={`w-full rounded-t-lg ${i % 2 === 0 ? 'bg-[#00D2FF]/20 border-t-2 border-[#00D2FF]' : 'bg-[#9D50BB]/20 border-t-2 border-[#9D50BB]'}`}
                    />
                  ))}
                </div>
                
                {/* Floating Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-3xl bg-black/60 backdrop-blur-xl border border-[#00D2FF]/30 shadow-[0_0_50px_rgba(0,210,255,0.2)]">
                  <p className="text-center font-bold text-white uppercase tracking-widest text-sm mb-1">Status de Campanha</p>
                  <p className="text-center text-[#00D2FF] font-mono font-bold text-xl animate-pulse">ALTA PERFORMANCE</p>
                </div>
              </div>
            </div>
            
            {/* Glow behind visual */}
            <div className="absolute -inset-10 bg-gradient-to-r from-[#00D2FF]/10 to-[#9D50BB]/10 blur-[100px] -z-10 rounded-full" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Traffic;
