import React from 'react';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * AuroraGradient - Fundo com gradiente animado similar a aurora boreal
 * Ideal para seções inteiras ou backgrounds
 */
export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aurora Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer 1 - Cyan Aurora */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-[#00D2FF]/20 via-transparent to-transparent blur-[100px] animate-pulse"
          style={{
            animation: 'aurora 15s ease-in-out infinite',
          }}
        />

        {/* Layer 2 - Purple Aurora */}
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-[#9D50BB]/20 via-transparent to-transparent blur-[100px] animate-pulse"
          style={{
            animation: 'aurora 20s ease-in-out infinite 2s',
          }}
        />

        {/* Layer 3 - Cyan Aurora (subtle) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-[#00D2FF]/10 via-transparent to-transparent blur-[100px] animate-pulse"
          style={{
            animation: 'aurora 25s ease-in-out infinite 5s',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative">{children}</div>

      {/* Keyframes */}
      <style>{`
        @keyframes aurora {
          0%, 100% {
            opacity: 0.5;
            transform: translate(0, 0);
          }
          50% {
            opacity: 1;
            transform: translate(10px, 10px);
          }
        }
      `}</style>
    </div>
  );
};

export default AuroraBackground;
