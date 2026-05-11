import React, { useMemo } from 'react';

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

type ParticleConfig = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 26,
  className = '',
}) => {
  const particles = useMemo<ParticleConfig[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.45 + 0.15,
      })),
    [count]
  );

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle, idx) => (
        <span
          key={`particle-${idx}`}
          className="absolute rounded-full bg-[#00D2FF] particle-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
