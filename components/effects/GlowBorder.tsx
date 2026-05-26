import React from 'react';

interface GlowBorderProps {
  children: React.ReactNode;
  /** Classes Tailwind extras (controle externo do raio, display etc.) */
  className?: string;
  /** Espessura da borda luminosa (default 1.5px) */
  thickness?: string;
  /** Duração de uma volta completa do feixe (default '4s') */
  duration?: string;
  /** Cor principal do feixe (default cyan da marca) */
  color?: string;
  /** Cor do realce central do feixe (default branco) */
  accent?: string;
  /** Multiplicador global de opacidade (default 1) */
  opacity?: number;
  /** Quando true, a borda só aparece no hover (suaviza cards) */
  hoverOnly?: boolean;
  /** Atributo HTML opcional (ex.: 'span' para inline) */
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

/**
 * GlowBorder — moldura com feixe luminoso que rotaciona ao redor do
 * elemento (estilo "moving beam"), criando um acabamento premium.
 *
 * Implementado via `@property --glow-angle` + conic-gradient mascarado
 * apenas no anel da borda (ver `index.css → .glow-border`).
 *
 * Importante: o componente NÃO impõe background ou raio nos filhos —
 * passe via `className` (ex.: `rounded-2xl`) e cuide do bg no filho.
 */
const GlowBorder: React.FC<GlowBorderProps> = ({
  children,
  className = '',
  thickness,
  duration,
  color,
  accent,
  opacity,
  hoverOnly = false,
  as = 'div',
  style,
}) => {
  const Tag = as as React.ElementType;
  const cssVars: React.CSSProperties = {
    ...(thickness ? { ['--glow-thickness' as never]: thickness } : {}),
    ...(duration ? { ['--glow-duration' as never]: duration } : {}),
    ...(color ? { ['--glow-color' as never]: color } : {}),
    ...(accent ? { ['--glow-accent' as never]: accent } : {}),
    ...(typeof opacity === 'number'
      ? { ['--glow-opacity' as never]: String(opacity) }
      : {}),
    ...style,
  };

  return (
    <Tag
      className={`glow-border ${hoverOnly ? 'glow-border-hover' : ''} ${className}`.trim()}
      style={cssVars}
    >
      {children}
    </Tag>
  );
};

export default GlowBorder;
