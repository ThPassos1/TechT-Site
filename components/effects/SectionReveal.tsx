import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
}

/**
 * Revela a secção ao entrar na viewport. Se o utilizador saltar o bloco
 * (ex.: navegação #/sobre), o conteúdo deixa de ficar preso em opacity: 0.
 */
const SectionReveal: React.FC<SectionRevealProps> = ({ children, delay = 0 }) => {
  const reducedMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [jumpedPast, setJumpedPast] = useState(false);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const node = wrapRef.current;
    if (!node) return;

    const check = () => {
      const r = node.getBoundingClientRect();
      // Secção inteira já ficou acima da área visível (scroll saltou esta faixa)
      if (r.bottom <= 0) setJumpedPast(true);
    };

    check();
    const id = window.requestAnimationFrame(check);
    const t = window.setTimeout(check, 180);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });

    return () => {
      window.cancelAnimationFrame(id);
      window.clearTimeout(t);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <>{children}</>;
  }

  const instant = jumpedPast;

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
      animate={
        instant ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined
      }
      whileInView={
        instant ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -24px 0px' }}
      transition={{
        duration: instant ? 0.05 : 1.05,
        ease: [0.22, 1, 0.36, 1],
        delay: instant ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
