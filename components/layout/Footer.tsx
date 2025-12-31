
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import { NAVIGATION, SOCIALS, GRADIENTS } from '../../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-[#030303]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          <div className="space-y-6">
            <Logo showText={true} />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Especialistas em arquitetura de sistemas, design artesanal e aceleração de lucro através de tráfego inteligente.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Navegação</h4>
            <div className="grid grid-cols-2 gap-4">
              {NAVIGATION.map(item => (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  className="text-gray-500 hover:text-[#00D2FF] text-sm transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Conecte-se</h4>
            <div className="flex gap-4">
              {SOCIALS.map(social => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all group"
                  title={social.name}
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[10px] uppercase tracking-widest">
            © 2025 TechT. Desenvolvido por <span className={GRADIENTS.text}>Thiago Passos</span>.
          </p>
          
          <div className="flex items-center space-x-3 text-[10px] font-mono text-gray-600 tracking-tighter">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>CORE SYSTEM SECURE</span>
            </div>
            <span className="opacity-30">|</span>
            <span>AMAZONAS, BRAZIL</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;