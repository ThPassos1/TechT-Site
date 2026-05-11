import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

export type MediaCaseItem = {
  type: 'video' | 'image';
  title: string;
  src: string;
  poster?: string;
  description?: string;
  /** Vídeo exibido no modal (capa = `src` ou `poster`) */
  videoSrc?: string;
  caseHref?: string;
};

type MediaCaseRailProps = {
  items: MediaCaseItem[];
  variant?: 'featured' | 'gallery';
  labels: {
    watchVideo: string;
    viewCase: string;
    prev: string;
    next: string;
    close: string;
  };
};

const resolveVideoUrl = (item: MediaCaseItem): string | undefined =>
  item.videoSrc ?? (item.type === 'video' ? item.src : undefined);

type MediaCaseCardProps = {
  item: MediaCaseItem;
  cardMin: string;
  aspect: string;
  isFeatured: boolean;
  reducedMotion: boolean;
  labels: MediaCaseRailProps['labels'];
  onOpenVideo: (item: MediaCaseItem) => void;
};

const MediaCaseCard: React.FC<MediaCaseCardProps> = ({
  item,
  cardMin,
  aspect,
  isFeatured,
  reducedMotion,
  labels,
  onOpenVideo,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const hasEnteredRef = useRef(false);

  const videoUrl = resolveVideoUrl(item);
  const showVideoCta = Boolean(videoUrl);

  const stopFollow = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const btn = ctaRef.current;
    if (!btn || reducedMotion) {
      stopFollow();
      return;
    }
    const cur = currentRef.current;
    const tgt = targetRef.current;
    const k = 0.22;
    cur.x += (tgt.x - cur.x) * k;
    cur.y += (tgt.y - cur.y) * k;
    btn.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;

    if (Math.hypot(tgt.x - cur.x, tgt.y - cur.y) > 0.35) {
      rafRef.current = window.requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, [reducedMotion, stopFollow]);

  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showVideoCta || reducedMotion) return;
    const card = cardRef.current;
    const btn = ctaRef.current;
    if (!card || !btn) return;

    const rect = card.getBoundingClientRect();
    const margin = Math.max(40, Math.min(72, rect.width * 0.18, rect.height * 0.18));
    const x = Math.max(margin, Math.min(rect.width - margin, e.clientX - rect.left));
    const y = Math.max(margin, Math.min(rect.height - margin, e.clientY - rect.top));
    targetRef.current = { x, y };

    if (!hasEnteredRef.current) {
      hasEnteredRef.current = true;
      currentRef.current = { x, y };
      btn.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    }

    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(tick);
    }
  };

  const onCardMouseLeave = () => {
    hasEnteredRef.current = false;
    stopFollow();
    if (ctaRef.current && !reducedMotion) {
      ctaRef.current.style.transform = '';
    }
  };

  useEffect(() => () => stopFollow(), [stopFollow]);

  return (
    <article
      data-case-card
      className={`${cardMin} shrink-0 snap-start flex flex-col`}
    >
      <div
        ref={cardRef}
        onMouseMove={onCardMouseMove}
        onMouseLeave={onCardMouseLeave}
        className={`relative w-full ${aspect} rounded-[28px] overflow-hidden border border-white/12 bg-[#141416] shadow-[0_24px_60px_rgba(0,0,0,0.45)] group/card`}
      >
        <img
          src={item.type === 'video' && item.poster ? item.poster : item.src}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-[1.03]"
          loading="lazy"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-300 ${
            reducedMotion ? 'opacity-100' : 'opacity-90 md:opacity-70 group-hover/card:opacity-100'
          }`}
        />

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end pointer-events-none">
          <p
            className={`text-white font-bold leading-tight drop-shadow-lg ${
              isFeatured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
            }`}
          >
            {item.title}
          </p>
        </div>

        {showVideoCta ? (
          <>
            <button
              ref={ctaRef}
              type="button"
              onClick={() => onOpenVideo(item)}
              className={`z-10 pointer-events-auto flex items-center gap-2 rounded-full bg-white text-black font-semibold text-sm pl-3 pr-4 py-2.5 shadow-lg hover:scale-[1.02] active:scale-[0.98] will-change-transform ${
                reducedMotion
                  ? 'absolute left-4 top-1/2 -translate-y-1/2 opacity-100'
                  : 'absolute left-0 top-0 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100'
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
                <Play className="w-4 h-4 fill-current" />
              </span>
              {labels.watchVideo}
            </button>

            <button
              type="button"
              onClick={() => onOpenVideo(item)}
              aria-label={labels.watchVideo}
              className="absolute bottom-4 right-4 z-10 pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white border border-white/25 backdrop-blur-sm transition-transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
            </button>
          </>
        ) : null}
      </div>

      <div className="mt-5 text-left px-0.5 min-h-[108px]">
        <h4 className="text-base md:text-lg font-bold text-white">{item.title}</h4>
        {item.description ? (
          <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-3">{item.description}</p>
        ) : null}
        {item.caseHref ? (
          <a
            href={item.caseHref}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[#00D2FF] transition-colors"
          >
            {labels.viewCase}
            <span aria-hidden>›</span>
          </a>
        ) : (
          showVideoCta && (
            <button
              type="button"
              onClick={() => onOpenVideo(item)}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[#00D2FF] transition-colors"
            >
              {labels.viewCase}
              <span aria-hidden>›</span>
            </button>
          )
        )}
      </div>
    </article>
  );
};

export const MediaCaseRail: React.FC<MediaCaseRailProps> = ({
  items,
  variant = 'featured',
  labels,
}) => {
  const reducedMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
    lastX: 0,
    lastTs: 0,
    velocity: 0,
  });
  const snapRestoreRef = useRef<number | null>(null);
  const momentumRafRef = useRef<number | null>(null);
  const [modal, setModal] = useState<{ title: string; videoUrl: string; poster?: string } | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-case-card]');
    const w = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * w * 0.92, behavior: 'smooth' });
  };

  const openVideo = (item: MediaCaseItem) => {
    const url = resolveVideoUrl(item);
    if (!url) return;
    setModal({ title: item.title, videoUrl: url, poster: item.poster ?? item.src });
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null);
    },
    [setModal]
  );

  useEffect(() => {
    if (!modal) return;
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [modal, onKeyDown]);

  useEffect(() => {
    return () => {
      if (snapRestoreRef.current !== null) window.clearTimeout(snapRestoreRef.current);
      if (momentumRafRef.current !== null) window.cancelAnimationFrame(momentumRafRef.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const target = e.target as HTMLElement;
    if (target.closest('button, a, video')) return;

    const el = scrollerRef.current;
    if (!el) return;

    dragStateRef.current.active = true;
    dragStateRef.current.startX = e.clientX;
    dragStateRef.current.startScrollLeft = el.scrollLeft;
    dragStateRef.current.moved = false;
    dragStateRef.current.lastX = e.clientX;
    dragStateRef.current.lastTs = performance.now();
    dragStateRef.current.velocity = 0;

    if (snapRestoreRef.current !== null) window.clearTimeout(snapRestoreRef.current);
    if (momentumRafRef.current !== null) {
      window.cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
    el.style.scrollSnapType = 'none';
    el.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    const el = scrollerRef.current;
    if (!state.active || !el) return;

    const delta = e.clientX - state.startX;
    if (Math.abs(delta) > 4) state.moved = true;
    el.scrollLeft = state.startScrollLeft - delta * 1.08;

    const now = performance.now();
    const dt = Math.max(1, now - state.lastTs);
    const dx = e.clientX - state.lastX;
    state.velocity = dx / dt; // px/ms (positivo para direita)
    state.lastX = e.clientX;
    state.lastTs = now;
  };

  const stopPointerDrag = (pointerId?: number) => {
    const state = dragStateRef.current;
    const el = scrollerRef.current;
    if (!el || !state.active) return;

    state.active = false;
    if (pointerId !== undefined) {
      try {
        el.releasePointerCapture(pointerId);
      } catch {
        // ignore
      }
    }
    setIsDragging(false);

    const initialVelocity = -state.velocity * 22;
    if (Math.abs(initialVelocity) > 0.28) {
      let momentum = initialVelocity;
      let last = performance.now();

      const tick = (ts: number) => {
        const node = scrollerRef.current;
        if (!node) {
          momentumRafRef.current = null;
          return;
        }
        const dt = Math.min(34, ts - last || 16);
        last = ts;
        node.scrollLeft += momentum * dt;
        momentum *= 0.92;

        if (Math.abs(momentum) < 0.06) {
          momentumRafRef.current = null;
          return;
        }
        momentumRafRef.current = window.requestAnimationFrame(tick);
      };

      momentumRafRef.current = window.requestAnimationFrame(tick);
    }

    snapRestoreRef.current = window.setTimeout(() => {
      if (!scrollerRef.current) return;
      scrollerRef.current.style.scrollSnapType = 'x mandatory';
      snapRestoreRef.current = null;
    }, 230);
  };

  const isFeatured = variant === 'featured';
  const cardMin = isFeatured
    ? 'basis-[min(84vw,320px)] md:basis-[calc((100%-24px)/2)] lg:basis-[calc((100%-48px)/3)]'
    : 'basis-[min(72vw,260px)] md:basis-[calc((100%-48px)/3)] lg:basis-[calc((100%-72px)/4)]';
  const aspect = isFeatured ? 'aspect-[9/14]' : 'aspect-[9/13]';

  return (
    <>
      <div className="relative group/rail">
        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => stopPointerDrag(e.pointerId)}
          onPointerCancel={(e) => stopPointerDrag(e.pointerId)}
          onPointerLeave={(e) => stopPointerDrag(e.pointerId)}
          className={`flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth ${isFeatured ? 'pt-2' : ''} [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab ${isDragging ? 'cursor-grabbing select-none' : ''}`}
        >
          {items.map((item, index) => (
            <MediaCaseCard
              key={`case-${index}-${item.title}`}
              item={item}
              cardMin={cardMin}
              aspect={aspect}
              isFeatured={isFeatured}
              reducedMotion={Boolean(reducedMotion)}
              labels={labels}
              onOpenVideo={openVideo}
            />
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            aria-label={labels.prev}
            onClick={() => scrollByDir(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white hover:border-[#00D2FF]/50 hover:text-[#00D2FF] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            onClick={() => scrollByDir(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white hover:border-[#00D2FF]/50 hover:text-[#00D2FF] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              {modal ? (
                <motion.div
                  key="media-video-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-label={modal.title}
                  className="fixed inset-0 z-[50000] flex min-h-[100dvh] items-center justify-center p-3 md:p-6 bg-black/88 backdrop-blur-md overflow-y-auto overscroll-contain"
                  style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setModal(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="relative my-auto w-full max-w-4xl max-h-[min(92dvh,92vh)] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      aria-label={labels.close}
                      onClick={() => setModal(null)}
                      className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white border border-white/15 hover:bg-black/80"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <p className="absolute top-3 left-4 z-20 text-sm font-semibold text-white drop-shadow-md max-w-[70%]">
                      {modal.title}
                    </p>
                    <video
                      key={modal.videoUrl}
                      className="w-full h-auto max-h-[min(calc(92dvh-56px),calc(92vh-56px))] bg-black object-contain"
                      src={modal.videoUrl}
                      poster={modal.poster}
                      controls
                      playsInline
                      autoPlay
                      preload="metadata"
                    />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
};

export default MediaCaseRail;
