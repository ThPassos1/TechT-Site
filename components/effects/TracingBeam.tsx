import React, { useEffect, useRef } from 'react';

interface TracingBeamProps {
  from?: { x: number; y: number };
  to?: { x: number; y: number };
  duration?: number;
  color?: string;
}

/**
 * TracingBeam - SVG line que é desenhada progressivamente
 * Ideal para conectar elementos ou criar visual de fluxo
 */
export const TracingBeam: React.FC<TracingBeamProps> = ({
  from = { x: 0, y: 0 },
  to = { x: 100, y: 100 },
  duration = 2,
  color = '#00D2FF',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const line = svgRef.current.querySelector('line');
    if (!line) return;

    const length = line.getTotalLength();

    // Configurar stroke-dasharray para criar efeito de desenho
    line.style.strokeDasharray = String(length);
    line.style.strokeDashoffset = String(length);

    // Trigger animation
    setTimeout(() => {
      line.style.transition = `stroke-dashoffset ${duration}s ease-in-out`;
      line.style.strokeDashoffset = '0';
    }, 10);
  }, [duration]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${to.x} ${to.y}`}
      preserveAspectRatio="none"
      className="absolute inset-0 pointer-events-none"
      style={{ overflow: 'visible' }}
    >
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  );
};

export default TracingBeam;
