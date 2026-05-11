import React, { useEffect, useMemo } from 'react';

interface ShineEffectProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

/**
 * ShineEffect - Brilho percorrendo elemento (como luz refletida)
 * Ideal para botões, cards e elementos interativos
 */
export const ShineEffect: React.FC<ShineEffectProps> = ({
  children,
  duration = 6,
  delay = 0,
}) => {
  const animationId = useMemo(
    () => Math.random().toString(36).slice(2, 11),
    []
  );

  useEffect(() => {
    const style = document.createElement('style');
    const keyframeName = `shine-${animationId}`;

    style.textContent = `
      @keyframes ${keyframeName} {
        0% {
          left: -100%;
        }
        100% {
          left: 100%;
        }
      }
      
      .shine-animated-${animationId}::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        animation: ${keyframeName} ${duration}s linear infinite;
        animation-delay: ${delay}s;
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [animationId, duration, delay]);

  return (
    <div
      className={`relative overflow-hidden shine-animated-${animationId}`}
    >
      {children}
    </div>
  );
};

export default ShineEffect;
