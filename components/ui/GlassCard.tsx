import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  neon?: boolean;
}

/**
 * GlassCard - Card com efeito glassmorphism
 * Reutilizável para qualquer tipo de card
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true,
  neon = false,
}) => {
  const baseClass = `
    rounded-2xl border border-white/10 bg-white/5 backdrop-blur
    transition-all duration-300
    ${hover ? 'hover:border-[#00D2FF]/50 hover:bg-white/10' : ''}
    ${neon && hover ? 'hover:shadow-[0_0_20px_rgba(0,210,255,0.3)]' : ''}
    ${className}
  `;

  return (
    <div className={baseClass}>
      {children}
    </div>
  );
};

export default GlassCard;
