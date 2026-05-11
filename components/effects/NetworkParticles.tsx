import React, { useEffect, useRef } from 'react';

interface NetworkParticlesProps {
  className?: string;
}

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
};

const NetworkParticles: React.FC<NetworkParticlesProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const dotCount = reducedMotion ? 18 : isMobile ? 34 : 78;
    const linkDistance = isMobile ? 150 : 210;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const dots: Dot[] = [];
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || Math.max(420, window.innerHeight * 0.8);
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const initDots = () => {
      dots.length = 0;
      for (let i = 0; i < dotCount; i += 1) {
        dots.push({
          x: Math.random() * canvas.clientWidth,
          y: Math.random() * canvas.clientHeight,
          vx: (Math.random() - 0.5) * (reducedMotion ? 0.08 : 0.18),
          vy: (Math.random() - 0.5) * (reducedMotion ? 0.08 : 0.18),
          baseVx: (Math.random() - 0.5) * (reducedMotion ? 0.08 : 0.18),
          baseVy: (Math.random() - 0.5) * (reducedMotion ? 0.08 : 0.18),
          size: Math.random() * 1.9 + 1.1,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      const interactionRadius = isMobile ? 0 : 260;

      for (const dot of dots) {
        dot.vx += (dot.baseVx - dot.vx) * 0.02;
        dot.vy += (dot.baseVy - dot.vy) * 0.02;

        if (mouse.active && interactionRadius > 0) {
          const dx = mouse.x - dot.x;
          const dy = mouse.y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < interactionRadius && distance > 1) {
            const intensity = (1 - distance / interactionRadius) * 0.09;
            dot.vx += (dx / distance) * intensity;
            dot.vy += (dy / distance) * intensity;
          }
        }

        dot.vx = Math.max(-0.9, Math.min(0.9, dot.vx));
        dot.vy = Math.max(-0.9, Math.min(0.9, dot.vy));
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x <= 0 || dot.x >= canvas.clientWidth) dot.vx *= -1;
        if (dot.y <= 0 || dot.y >= canvas.clientHeight) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(184, 240, 255, 0.92)';
        ctx.fill();
      }

      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < linkDistance) {
            const alpha = (1 - distance / linkDistance) * 0.42;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(147, 212, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (mouse.active && !isMobile) {
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        cursorGlow.addColorStop(0, 'rgba(109, 224, 255, 0.42)');
        cursorGlow.addColorStop(1, 'rgba(109, 224, 255, 0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fillStyle = cursorGlow;
        ctx.fill();

        for (const dot of dots) {
          const dx = mouse.x - dot.x;
          const dy = mouse.y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < linkDistance * 0.9) {
            const alpha = (1 - distance / (linkDistance * 0.9)) * 0.34;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(175, 135, 255, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 5.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(186, 245, 255, 0.98)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 17, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(173, 131, 255, 0.88)';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      raf = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active =
        mouse.x >= 0 &&
        mouse.y >= 0 &&
        mouse.x <= canvas.clientWidth &&
        mouse.y <= canvas.clientHeight;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    initDots();
    tick();
    window.setTimeout(resize, 120);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
};

export default NetworkParticles;
