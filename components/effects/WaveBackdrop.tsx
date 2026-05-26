import React, { useEffect, useRef } from 'react';

/**
 * Wave field 3D em point-cloud (estilo "wave surface"):
 * - malha de pontos no plano (x, z), altura y vem de senos/cossenos no tempo;
 * - projeção em perspectiva (FOCAL / z) → crista da onda em profundidade;
 * - cursor levanta e brilha os pontos próximos do ponteiro;
 * - cada ponto tem núcleo + halo aditivo para look de bokeh/glow.
 */

interface WaveBackdropProps {
  className?: string;
}

const WaveBackdrop: React.FC<WaveBackdropProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    // Densidade da malha. GRID_Z controla profundidade (camadas).
    const GRID_X = isMobile ? 60 : 96;
    const GRID_Z = isMobile ? 40 : 56;
    const SPACING = isMobile ? 22 : 26;
    const WAVE_AMP = isMobile ? 75 : 100;
    const FOCAL = isMobile ? 360 : 520;
    const NEAR_Z = 80; // distância mínima da câmera
    // Y_BASE positivo desloca a "barriga" da onda para baixo da
    // linha do horizonte → mais pontos visíveis na metade inferior
    // do canvas (a onda parece descer mais antes do fade).
    const Y_BASE = 15;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let t0 = performance.now();
    let inView = true; // canvas dentro do viewport (IntersectionObserver)
    let docVisible = !document.hidden; // aba visível

    const mouse = { x: -9999, y: -9999, active: false };
    const mouseRadius = isMobile ? 160 : 240;

    // Buffers reutilizáveis por linha (evita GC em runtime)
    const sxArr = new Float32Array(GRID_X);
    const syArr = new Float32Array(GRID_X);
    const yWaveArr = new Float32Array(GRID_X);
    const scaleArr = new Float32Array(GRID_X);
    const mouseBoostArr = new Float32Array(GRID_X);

    const drawFrame = (now: number) => {
      const t = (now - t0) * 0.001;
      const cx = width / 2;
      // Horizonte um pouco mais baixo no canvas (62% a partir do topo)
      // → a onda tem mais "respiro" para descer antes do fade inferior,
      // evitando a sensação de "corte seco" no meio da página.
      const cy = height * 0.62;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // De trás para a frente para que os pontos próximos fiquem por cima
      for (let j = GRID_Z - 1; j >= 0; j -= 1) {
        const depth01 = j / (GRID_Z - 1); // 0 = perto, 1 = longe
        // Foco "central" mais nítido, frente e fundo com mais bokeh
        const focusFactor = 1 - Math.min(1, Math.abs(depth01 - 0.42) * 1.65);
        // Desvanece um pouco no horizonte
        const depthFade = Math.max(0.15, 1 - depth01 * 0.55);

        // 1) Pré-calcula posições da linha
        for (let i = 0; i < GRID_X; i += 1) {
          const x = (i - (GRID_X - 1) / 2) * SPACING;
          const z = j * SPACING + NEAR_Z;

          // Onda contínua: 3 senos cruzados que rolam no tempo
          const yWave =
            WAVE_AMP *
            (Math.sin(x * 0.0085 + t * 1.0) * 0.55 +
              Math.cos(z * 0.012 - t * 0.8) * 0.45 +
              Math.sin((x + z) * 0.006 + t * 0.5) * 0.3);
          const y = Y_BASE + yWave;

          const scale = FOCAL / z;
          let sx = cx + x * scale;
          let sy = cy + y * scale;

          let mouseBoost = 0;
          if (mouse.active) {
            const dxm = sx - mouse.x;
            const dym = sy - mouse.y;
            const md = Math.hypot(dxm, dym);
            if (md < mouseRadius) {
              const f = (1 - md / mouseRadius) ** 1.6;
              mouseBoost = f * 0.85;
              sy -= 30 * f;
            }
          }

          sxArr[i] = sx;
          syArr[i] = sy;
          yWaveArr[i] = yWave;
          scaleArr[i] = scale;
          mouseBoostArr[i] = mouseBoost;
        }

        // 2) Fita conectando os pontos (efeito "strand" da referência)
        const strandAlpha = depthFade * (focusFactor * 0.55 + 0.12) * 0.42;
        if (strandAlpha > 0.025) {
          ctx.strokeStyle = `rgba(185, 210, 255, ${strandAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(sxArr[0], syArr[0]);
          for (let i = 1; i < GRID_X; i += 1) {
            ctx.lineTo(sxArr[i], syArr[i]);
          }
          ctx.stroke();
        }

        // 3) Pontos com halo + núcleo
        for (let i = 0; i < GRID_X; i += 1) {
          const sx = sxArr[i];
          const sy = syArr[i];
          const scale = scaleArr[i];
          const yWave = yWaveArr[i];
          const mouseBoost = mouseBoostArr[i];

          const baseSize = Math.max(0.55, 1.55 * scale + 0.22);

          // Crista (yWave negativo = ponto subiu na tela): brilha mais
          const crestFactor = Math.max(0, -yWave / WAVE_AMP);
          const crestBoost = Math.min(1, crestFactor) * 0.38;

          const alpha = Math.min(
            1,
            (focusFactor * 0.75 + 0.18) * depthFade + mouseBoost + crestBoost,
          );

          // Bokeh: mais halo quando muito perto ou muito longe
          const bokeh =
            depth01 < 0.15
              ? (0.15 - depth01) * 5
              : depth01 > 0.85
                ? (depth01 - 0.85) * 5
                : 0;
          const haloSize = baseSize * (3.2 + bokeh * 3);

          // Halo azulado
          ctx.fillStyle = `rgba(130, 175, 250, ${alpha * 0.18})`;
          ctx.beginPath();
          ctx.arc(sx, sy, haloSize, 0, Math.PI * 2);
          ctx.fill();

          // Núcleo branco-azulado (mais quente perto do cursor)
          const coreR = 220 + Math.round(35 * mouseBoost);
          const coreG = 232 + Math.round(15 * mouseBoost);
          const coreB = 255;
          ctx.fillStyle = `rgba(${coreR},${coreG},${coreB},${alpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(sx, sy, baseSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Só agenda próximo frame se ainda for útil ver a onda.
      if (inView && docVisible) {
        raf = window.requestAnimationFrame(drawFrame);
      } else {
        raf = 0;
      }
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      // Frame único quando prefers-reduced-motion
      const fakeNow = performance.now();
      t0 = fakeNow;
      drawFrame(fakeNow);
      // Cancela o RAF criado dentro de drawFrame: queremos só um frame
      cancelAnimationFrame(raf);
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
      ctx.clearRect(0, 0, width, height);
      if (reducedMotion) renderStatic();
    };

    resize();
    t0 = performance.now();

    // Resume helper — só agenda RAF se ainda não houver um pendente
    const ensureLoop = () => {
      if (reducedMotion) return;
      if (raf !== 0) return;
      if (!inView || !docVisible) return;
      // Reseta a base de tempo para que a onda não "salte" depois de pausada
      t0 = performance.now();
      raf = window.requestAnimationFrame(drawFrame);
    };

    if (!reducedMotion) raf = window.requestAnimationFrame(drawFrame);

    // Pausa a animação quando o canvas sai do viewport (a onda só vive
    // no Hero; manter o RAF rodando enquanto o usuário olha outras seções
    // é desperdício e atrapalha a decodificação do vídeo na seção
    // "Operação completa").
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
          if (inView) ensureLoop();
        });
      },
      { rootMargin: '80px 0px', threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      docVisible = !document.hidden;
      if (docVisible) ensureLoop();
    };
    document.addEventListener('visibilitychange', onVisibility);

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
    const onPointerLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('mouseleave', onPointerLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('mouseleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Máscara vertical: evita "linha de corte" onde o canvas termina,
  // suavizando topo e base para se fundirem com o contexto da seção.
  const fadeMask =
    'linear-gradient(180deg, transparent 0%, #000 7%, #000 72%, rgba(0,0,0,0.55) 88%, transparent 100%)';

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
      }}
    />
  );
};

export default WaveBackdrop;
