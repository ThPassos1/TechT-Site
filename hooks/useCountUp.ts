import { useEffect, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  delay?: number;
}

/**
 * useCountUp - Hook para animar números contando
 * Ideal para usar em múltiplos componentes
 */
export const useCountUp = ({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  delay = 0,
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const timer = setTimeout(() => {
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = start + (end - start) * progress;

        setCount(parseFloat(value.toFixed(decimals)));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, start, duration, decimals, delay]);

  return count;
};

export default useCountUp;
