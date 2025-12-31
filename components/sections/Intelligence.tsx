
import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { GRADIENTS, DASHBOARD_ICONS } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';
import { Search, Bell, HelpCircle } from 'lucide-react';

const Intelligence: React.FC = () => {
  const { intelligence } = SITE_CONFIG;

  return (
    <section id="inteligencia" className="py-24 relative overflow-hidden bg-[#020205]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#00D2FF]/5 blur-[150px] rounded-full pointer-events-none" />

      <Container>
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-[#00D2FF] uppercase tracking-[0.4em] mb-4 block"
          >
            {intelligence.badge}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            {intelligence.title}<span className={GRADIENTS.text}>{intelligence.titleHighlight}</span>{intelligence.titleSuffix}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            {intelligence.description}
          </motion.p>
        </div>

        {/* Dashboard Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-[#08080c] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex h-[700px] w-full"
        >
          {/* Sidebar */}
          <div className="w-56 h-full border-r border-white/5 bg-[#050508] hidden md:flex flex-col p-6">
            <div className="flex items-center gap-3 mb-12">
              {/* Logo TP Fiel no Dashboard de Gerenciamento */}
              <div className="w-9 h-9 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]">
                  <defs>
                    <linearGradient id="logoGradDashTP" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D2FF" />
                      <stop offset="100%" stopColor="#9D50BB" />
                    </linearGradient>
                  </defs>
                  <g>
                    <path d="M15 30 H75 V38 H15 Z" fill="url(#logoGradDashTP)" />
                    <path d="M38 30 V85 H46 V30 Z" fill="url(#logoGradDashTP)" />
                    <path d="M46 42 H72 V68 H46 V74 H78 V36 H46 V42Z" fill="url(#logoGradDashTP)" />
                  </g>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-widest text-white leading-none">TechT</span>
                <span className="text-[7px] text-gray-500 font-bold uppercase tracking-tighter mt-1">Intelligence</span>
              </div>
            </div>

            <nav className="space-y-2 flex-grow">
              {[
                { label: 'VISÃO GERAL', icon: DASHBOARD_ICONS.Overview, active: true },
                { label: 'CLIENTES', icon: DASHBOARD_ICONS.Clients, active: false },
                { label: 'RELATÓRIOS', icon: DASHBOARD_ICONS.Reports, active: false },
                { label: 'USUÁRIOS', icon: DASHBOARD_ICONS.Users, active: false }
              ].map(item => (
                <div key={item.label} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${item.active ? 'bg-[#00D2FF]/10 text-[#00D2FF]' : 'text-gray-600 hover:text-white hover:bg-white/5'}`}>
                  {item.icon}
                  <span className="text-[10px] font-bold tracking-widest">{item.label}</span>
                </div>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden ring-1 ring-[#00D2FF]/30">
                <img 
                  src="./thiago.jpg" 
                  alt="User" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'; }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white leading-none">THIAGO PASSOS</span>
                <span className="text-[8px] text-gray-600 font-bold uppercase mt-1">GESTOR</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow flex flex-col bg-[#050508]/50">
            {/* Top Bar */}
            <div className="h-16 border-b border-white/5 flex items-center justify-between px-8">
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-white">Bem-vindo ao Painel TechT</h3>
                <p className="text-[10px] text-gray-600 uppercase tracking-widest">Controle de Performance • 2025</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-[#00D2FF]/50" placeholder="Pesquisar..." />
                </div>
                <Bell size={14} className="text-gray-600 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            {/* Metrics Scroll Area */}
            <div className="p-8 overflow-y-auto scrollbar-hide">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="text-lg font-bold text-white">Performance da Carteira</h4>
                  <p className="text-[10px] text-gray-600">Métricas consolidadas de todos os clientes ativos.</p>
                </div>
                <button className="px-4 py-1.5 rounded-lg bg-[#00D2FF] text-black font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all">Exportar PDF</button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {intelligence.metrics.map((metric, i) => (
                  <div key={i} className="bg-[#0a0a0f] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#00D2FF] transition-colors">
                        <HelpCircle size={14} />
                      </div>
                      <span className="text-[10px] font-bold text-green-500 flex items-center">
                        <span className="mr-1">↑</span> {metric.trend}
                      </span>
                    </div>
                    <p className="text-[9px] text-gray-600 uppercase font-bold tracking-[0.2em] mb-1">{metric.label}</p>
                    <p className="text-xl font-bold text-white font-mono">{metric.value}</p>
                    {/* Small Wave Graph */}
                    <div className="absolute bottom-0 right-0 w-24 h-12 opacity-30 pointer-events-none">
                      <svg viewBox="0 0 100 40" className="w-full h-full">
                        <path d="M0 30 Q 25 20, 50 30 T 100 20" stroke={i % 2 === 0 ? "#00D2FF" : "#9D50BB"} fill="none" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Graph */}
                <div className="lg:col-span-2 bg-[#0a0a0f] border border-white/5 p-6 rounded-[2rem]">
                  <div className="flex items-center justify-between mb-10">
                    <h5 className="text-sm font-bold text-white">Escala de Faturamento <span className="text-gray-700 ml-2">?</span></h5>
                    <div className="flex gap-4 text-[9px] font-bold tracking-widest text-gray-600">
                      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00D2FF]" /> GASTO</div>
                      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#9D50BB]" /> RETORNO</div>
                    </div>
                  </div>
                  
                  <div className="h-64 w-full relative">
                    <svg viewBox="0 0 1000 300" className="w-full h-full">
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        d="M0 150 Q 200 100, 400 180 T 800 120 L 1000 250"
                        fill="none"
                        stroke="#9D50BB"
                        strokeWidth="4"
                      />
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                        d="M0 250 Q 250 240, 500 260 T 1000 240"
                        fill="none"
                        stroke="#00D2FF"
                        strokeWidth="4"
                      />
                    </svg>
                    <div className="absolute inset-0 border-b border-white/5 flex flex-col justify-between opacity-30 pointer-events-none">
                      {[...Array(5)].map((_, i) => <div key={i} className="w-full border-t border-white/5" />)}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-[9px] font-mono text-gray-700 tracking-widest">
                    <span>JAN</span><span>FEV</span><span>MAR</span><span>ABR</span><span>MAI</span><span>JUN</span><span>JUL</span><span>AGO</span>
                  </div>
                </div>

                {/* Funnel Section */}
                <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-[2rem]">
                  <h5 className="text-sm font-bold text-white mb-2">Funil de Performance <span className="text-gray-700 ml-2">?</span></h5>
                  <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-8">Taxas de Conversão</p>

                  <div className="space-y-8">
                    {[
                      { label: 'IMPRESSÕES', val: '1.25M', perc: 100 },
                      { label: 'CLIQUES', val: '45.2K', perc: 45 },
                      { label: 'LEADS', val: '8.4K', perc: 15 },
                      { label: 'VENDAS', val: '2.1K', perc: 8 }
                    ].map((step, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] text-gray-500 font-bold tracking-widest">{step.label}</span>
                          <span className="text-xs font-bold text-white font-mono">{step.val}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${step.perc}%` }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                            className={`h-full ${i % 2 === 0 ? 'bg-[#00D2FF]' : 'bg-[#9D50BB]'}`} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Intelligence;