import React from 'react';

interface BorderBeamProps {
  children?: React.ReactNode;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

/**
 * BorderBeam - Anima brilho percorrendo a borda do elemento
 * Ideal para cards, containers e elementos de destaque
 */
export const BorderBeam: React.FC<BorderBeamProps> = ({
  children,
  duration = 20,
  delay = 0,
  colorFrom = 'rgba(0, 210, 255, 0.5)',
  colorTo = 'rgba(157, 80, 187, 0.5)',
}) => {
  return (
    <div className="relative">
      {/* Animated border beam */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 95deg, ${colorTo} 180deg, transparent 260deg)`,
          animation: `border-beam-spin ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          maskImage: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskImage:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
};

export default BorderBeam;
