import React, { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

/**
 * AnimatedNumber - Anima números contando-os visualmente
 * Perfeito para métricas, estatísticas e KPIs
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 4000,
  className = '',
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Extrair número de strings como "200%", "50K", etc
  const numValue = (() => {
    if (typeof value === 'number') return value;
    const num = parseFloat(value.toString().replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? 0 : num;
  })();

  useEffect(() => {
    let startValue = 0;
    const startTime = Date.now();
    const increment = numValue / (duration / 16); // 60fps

    const counter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * numValue * 100) / 100;

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(counter);
      }
    };

    requestAnimationFrame(counter);
  }, [numValue, duration]);

  const formattedValue =
    typeof displayValue === 'number'
      ? displayValue.toFixed(decimals)
      : displayValue;

  return (
    <span className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;
