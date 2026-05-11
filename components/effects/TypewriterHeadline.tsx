import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type Segment = {
  text: string;
  className?: string;
};

interface TypewriterHeadlineProps {
  segments: Segment[];
  className?: string;
  startDelayMs?: number;
  charIntervalMs?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  startOnInView?: boolean;
}

type CharacterItem = {
  value: string;
  className?: string;
};

/** Só inicia a digitação quando o título entra na “faixa” central do ecrã (não com o hero). */
const TypewriterHeadline: React.FC<TypewriterHeadlineProps> = ({
  segments,
  className = '',
  startDelayMs = 900,
  charIntervalMs = 105,
  as = 'h1',
  startOnInView = false,
}) => {
  const reducedMotion = useReducedMotion();
  const [mountEl, setMountEl] = useState<HTMLElement | null>(null);
  const setHeadlineRef = useCallback((el: HTMLElement | null) => {
    setMountEl(el);
  }, []);

  const characters = useMemo<CharacterItem[]>(
    () =>
      segments.flatMap((segment) =>
        [...segment.text].map((value) => ({ value, className: segment.className }))
      ),
    [segments]
  );
  const [visibleCount, setVisibleCount] = useState(reducedMotion ? characters.length : 0);

  const inViewDep = startOnInView ? mountEl : null;

  // Scroll saltou esta secção: mostrar texto completo (alinha com SectionReveal jumpedPast)
  useLayoutEffect(() => {
    if (!startOnInView || !mountEl || reducedMotion) return;
    const el = mountEl;
    const checkJumped = () => {
      const r = el.getBoundingClientRect();
      if (r.bottom <= 0) setVisibleCount(characters.length);
    };
    checkJumped();
    const t = window.setTimeout(checkJumped, 180);
    window.addEventListener('scroll', checkJumped, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', checkJumped);
    };
  }, [startOnInView, mountEl, reducedMotion, characters.length]);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(characters.length);
      return;
    }

    const tickMs = Math.max(16, charIntervalMs);

    let timeoutId: ReturnType<typeof window.setTimeout> | undefined;
    let intervalId: ReturnType<typeof window.setInterval> | undefined;

    const startTyping = () => {
      setVisibleCount(0);
      timeoutId = window.setTimeout(() => {
        intervalId = window.setInterval(() => {
          setVisibleCount((previous) => {
            if (previous >= characters.length) {
              if (intervalId !== undefined) window.clearInterval(intervalId);
              return previous;
            }
            return previous + 1;
          });
        }, tickMs);
      }, startDelayMs);
    };

    const clearTimers = () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };

    if (startOnInView) {
      if (!mountEl) return;

      let started = false;
      const io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry || started) return;
          const r = entry.boundingClientRect;
          const vh = window.innerHeight;
          const bandTop = vh * 0.12;
          const bandBottom = vh * 0.88;
          const overlapsBand = r.bottom > bandTop && r.top < bandBottom;
          const inFocusBand =
            entry.isIntersecting && overlapsBand && entry.intersectionRatio >= 0.1;

          if (inFocusBand) {
            started = true;
            io.disconnect();
            startTyping();
          }
        },
        {
          threshold: [0, 0.08, 0.12, 0.18, 0.25, 0.35, 0.5],
          rootMargin: '-12% 0px -18% 0px',
        }
      );

      io.observe(mountEl);
      return () => {
        io.disconnect();
        clearTimers();
      };
    }

    startTyping();
    return clearTimers;
  }, [
    characters.length,
    charIntervalMs,
    reducedMotion,
    startDelayMs,
    startOnInView,
    inViewDep,
  ]);

  const isTyping = visibleCount < characters.length;

  const Tag = as;

  return (
    <Tag ref={setHeadlineRef} className={`${className} whitespace-pre-wrap`}>
      {characters.slice(0, visibleCount).map((character, index) => (
        <span key={`${character.value}-${index}`} className={character.className}>
          {character.value}
        </span>
      ))}
      {isTyping ? <span className="hero-cursor">|</span> : null}
    </Tag>
  );
};

export default TypewriterHeadline;
