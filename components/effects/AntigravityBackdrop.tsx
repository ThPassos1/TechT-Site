import React, { useEffect, useRef } from 'react';

/**
 * Fundo inspirado em campos radiais / plexus:
 * partículas em disco ao centro, linhas tracejadas entre vizinhos, rotação lenta.
 * O cursor empurra suavemente as partículas próximas (repulsão amortecida).
 */

interface AntigravityBackdropProps {
  className?: string;
}

type Particle = {
  baseR: number;
  angle0: number;
  spin: number;
  phase: number;
  hueIdx: number;
  dotR: number;
  layer: number;
};

const PALETTE: [number, number, number][] = [
  [0, 210, 255],
  [157, 80, 187],
  [66, 165, 245],
  [120, 210, 140],
  [255, 196, 90],
  [255, 120, 140],
];

const AntigravityBackdrop: React.FC<AntigravityBackdropProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    const particleCount = reducedMotion ? 96 : isMobile ? 220 : 380;
    const linkDist = isMobile ? 52 : 64;
    const cellSize = Math.max(48, linkDist * 0.85);

    let particles: Particle[] = [];
    let velX: number[] = [];
    let velY: number[] = [];
    let cx = 0;
    let cy = 0;
    let maxR = 1;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let t0 = performance.now();

    const mouse = { x: 0, y: 0, active: false };

    const initParticles = () => {
      particles = [];
      velX = [];
      velY = [];
      cx = width / 2;
      cy = height / 2;
      maxR = Math.min(width, height) * 0.62;

      for (let i = 0; i < particleCount; i += 1) {
        const disk = Math.random() < 0.72;
        let baseR: number;
        let angle0: number;

        if (disk) {
          baseR = maxR * Math.sqrt(Math.random()) * (0.55 + Math.random() * 0.48);
          angle0 = Math.random() * Math.PI * 2;
        } else {
          baseR = maxR * (0.35 + Math.random() * 0.72);
          angle0 = (Math.PI * 2 * i) / particleCount + Math.random() * 0.4;
        }

        particles.push({
          baseR,
          angle0,
          spin: reducedMotion ? 0 : 0.018 + Math.random() * 0.035,
          phase: Math.random() * Math.PI * 2,
          hueIdx: i % PALETTE.length,
          dotR: 0.55 + Math.random() * 1.35,
          layer: Math.random(),
        });
        velX.push(0);
        velY.push(0);
      }
    };

    const bucketKey = (gx: number, gy: number) => `${gx},${gy}`;

    const influenceRadius = isMobile ? 195 : 285;
    const pushStrength = isMobile ? 2.45 : 4.1;
    const velDamping = 0.925;

    const drawFrame = (now: number) => {
      const elapsed = (now - t0) * 0.001;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      const positions: { x: number; y: number; hueIdx: number; dotR: number; layer: number }[] =
        new Array(particles.length);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const spiral = (p.baseR / maxR) * 0.85;
        const wobble = 0.028 * Math.sin(elapsed * 0.55 + p.phase);
        const r = p.baseR * (1 + wobble);
        const ang =
          p.angle0 +
          elapsed * p.spin * (1.15 - spiral * 0.35) +
          spiral * 0.45 * Math.sin(elapsed * 0.22 + p.phase);

        let x = cx + Math.cos(ang) * r;
        let y = cy + Math.sin(ang) * r;

        if (!reducedMotion && mouse.active) {
          const mdx = x - mouse.x;
          const mdy = y - mouse.y;
          const md = Math.hypot(mdx, mdy);
          if (md > 0.4 && md < influenceRadius) {
            const falloff = (1 - md / influenceRadius) ** 1.35;
            const impulse = pushStrength * falloff;
            velX[i] += (mdx / md) * impulse;
            velY[i] += (mdy / md) * impulse;
          }
        }

        velX[i] *= velDamping;
        velY[i] *= velDamping;
        x += velX[i];
        y += velY[i];

        positions[i] = { x, y, hueIdx: p.hueIdx, dotR: p.dotR, layer: p.layer };
      }

      const linkDistSq = linkDist * linkDist;
      const buckets = new Map<string, number[]>();

      for (let i = 0; i < positions.length; i += 1) {
        const gx = Math.floor(positions[i].x / cellSize);
        const gy = Math.floor(positions[i].y / cellSize);
        const key = bucketKey(gx, gy);
        if (!buckets.has(key)) buckets.set(key, []);
        buckets.get(key)!.push(i);
      }

      ctx.setLineDash(reducedMotion ? [] : [3.5, 7]);
      ctx.lineCap = 'round';

      for (let i = 0; i < positions.length; i += 1) {
        const ax = positions[i].x;
        const ay = positions[i].y;
        const gx = Math.floor(ax / cellSize);
        const gy = Math.floor(ay / cellSize);

        for (let ox = -1; ox <= 1; ox += 1) {
          for (let oy = -1; oy <= 1; oy += 1) {
            const list = buckets.get(bucketKey(gx + ox, gy + oy));
            if (!list) continue;
            for (const j of list) {
              if (j <= i) continue;
              const bx = positions[j].x;
              const by = positions[j].y;
              const dx = ax - bx;
              const dy = ay - by;
              const d2 = dx * dx + dy * dy;
              if (d2 >= linkDistSq) continue;

              const dist = Math.sqrt(d2);
              const fade = 1 - dist / linkDist;
              const midHue = (positions[i].hueIdx + positions[j].hueIdx) >> 1;
              const [cr, cg, cb] = PALETTE[midHue % PALETTE.length];
              const edgeFade =
                1 -
                Math.min(
                  1,
                  (Math.hypot(ax - cx, ay - cy) + Math.hypot(bx - cx, by - cy)) / (2 * maxR),
                ) *
                  0.35;

              ctx.strokeStyle = `rgba(${cr},${cg},${cb},${fade * 0.14 * edgeFade})`;
              ctx.lineWidth = 0.85;
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.stroke();
            }
          }
        }
      }

      ctx.setLineDash([]);

      for (let i = 0; i < positions.length; i += 1) {
        const { x, y, hueIdx, dotR, layer } = positions[i];
        const [cr, cg, cb] = PALETTE[hueIdx];
        const edge = Math.hypot(x - cx, y - cy) / maxR;
        const alpha = (0.22 + layer * 0.55) * (1 - edge * 0.25);

        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(x, y, dotR * 2.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, dotR, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        raf = window.requestAnimationFrame(drawFrame);
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect() ?? canvas.getBoundingClientRect();
      width = Math.max(320, rect.width || window.innerWidth);
      height = Math.max(400, rect.height || window.innerHeight * 0.85);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      if (reducedMotion) {
        drawFrame(performance.now());
      }
    };

    resize();
    if (!reducedMotion) {
      t0 = performance.now();
      raf = window.requestAnimationFrame(drawFrame);
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      mouse.active = inside;
      if (inside) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };

    const onPointerLeaveWindow = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeaveWindow);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeaveWindow);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
};

export default AntigravityBackdrop;
