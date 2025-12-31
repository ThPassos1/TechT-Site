
import React from 'react';
import { GRADIENTS } from '../../constants';
import { SITE_CONFIG } from '../../siteConfig';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * Componente de Logo da TechT.
 * Reconstrução fiel e definitiva da logo "TP" baseada na imagem do usuário.
 */
const Logo: React.FC<LogoProps> = ({ className = "h-12", showText = true }) => {
  const { brand } = SITE_CONFIG;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative group flex items-center">
        {/* Glow atmosférico dinâmico */}
        <div 
          className="absolute inset-0 blur-2xl rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" 
          style={{ backgroundColor: brand.logoGlow }} 
        />
        
        <div className="relative z-10">
          <svg 
            viewBox="0 0 100 100" 
            className="h-10 w-10 lg:h-12 lg:w-12 filter drop-shadow-[0_0_10px_rgba(0,210,255,0.5)] transition-transform duration-500 group-hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoGradTP_Fiel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" />
                <stop offset="50%" stopColor="#4A90E2" />
                <stop offset="100%" stopColor="#9D50BB" />
              </linearGradient>
              
              {/* Filtro para profundidade sutil */}
              <filter id="bevel" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                <feOffset in="blur" dx="0.5" dy="0.5" result="offset" />
                <feComposite in="SourceGraphic" in2="offset" operator="over" />
              </filter>
            </defs>
            
            <g filter="url(#bevel)">
              {/* Haste Horizontal Superior (T) */}
              <path 
                d="M15 30 H75 V38 H15 Z" 
                fill="url(#logoGradTP_Fiel)" 
              />
              
              {/* Haste Vertical (Pilar central) */}
              <path 
                d="M38 30 V85 H46 V30 Z" 
                fill="url(#logoGradTP_Fiel)" 
              />
              
              {/* Loop do P (Retangular integrado) */}
              <path 
                d="M46 42 H72 V68 H46 V74 H78 V36 H46 V42Z" 
                fill="url(#logoGradTP_Fiel)" 
              />
              
              {/* Highlights de brilho para fidelidade máxima */}
              <path d="M15 30 H75 V31 H15 Z" fill="white" fillOpacity="0.4" />
              <path d="M46 42 H72 V43 H46 Z" fill="white" fillOpacity="0.2" />
              <path d="M38 30 V85 H39 V30 Z" fill="white" fillOpacity="0.2" />
            </g>
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col justify-center border-l border-white/10 pl-4 h-10">
          <span className="text-white font-bold text-lg lg:text-2xl tracking-[0.2em] leading-none font-mono uppercase">
            {brand.name}<span className={GRADIENTS.text}>{brand.highlight}</span>
          </span>
          <span className="text-[7px] lg:text-[8px] text-[#00D2FF] tracking-[0.4em] font-bold uppercase opacity-80 mt-1">
            {brand.tagline}
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
