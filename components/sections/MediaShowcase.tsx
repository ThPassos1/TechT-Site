import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import Container from '../ui/Container';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import WhatsAppCTA from '../ui/WhatsAppCTA';
import TypewriterHeadline from '../effects/TypewriterHeadline';

type MediaSize = 'featured' | 'wide' | 'vertical';

type MediaItem = {
  id: string;
  title: string;
  category: string;
  size: MediaSize;
  poster: string;
  videoSrc?: string;
};

type Category = { id: string; label: string };

type MediaShowcaseData = {
  eyebrow: string;
  titleStart: string;
  titleHighlight: string;
  subtitle: string;
  watchLabel: string;
  closeLabel: string;
  emptyLabel: string;
  categories: readonly Category[];
  items: readonly MediaItem[];
};

const easeOut = [0.22, 0.61, 0.36, 1] as const;
const easeInOutQuint = [0.83, 0, 0.17, 1] as const;

const sizeAspect: Record<MediaSize, string> = {
  featured: 'aspect-video',
  wide: 'aspect-video',
  vertical: 'aspect-[9/16]',
};

const sizeCols: Record<MediaSize, string> = {
  featured: 'col-span-12',
  wide: 'col-span-12 md:col-span-6 lg:col-span-4',
  vertical: 'col-span-6 md:col-span-4 lg:col-span-3',
};

const MediaShowcase: React.FC = () => {
  const config = useSiteConfig();
  const offerings = config.offerings as unknown as {
    mediaShowcase?: MediaShowcaseData;
    mediaCta?: { label: string; waMessage: string };
  };
  const data = offerings.mediaShowcase;
  const mediaCta = offerings.mediaCta;
  const reducedMotion = !!useReducedMotion();
  const [selected, setSelected] = useState<string>('all');
  const [modal, setModal] = useState<MediaItem | null>(null);

  const categoryLabel = useMemo(() => {
    const map = new Map<string, string>();
    data?.categories.forEach((c) => map.set(c.id, c.label));
    return map;
  }, [data?.categories]);

  const filtered = useMemo(() => {
    if (!data) return [] as readonly MediaItem[];
    if (selected === 'all') return data.items;
    return data.items.filter((item) => item.category === selected);
  }, [data, selected]);

  const handleClose = useCallback(() => setModal(null), []);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [modal, handleClose]);

  if (!data) return null;

  return (
    <section
      id="portfolio"
      className="relative py-24 md:py-32 overflow-hidden bg-[#040406] border-y border-white/5 scroll-mt-24"
    >
      <Backdrop />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="max-w-3xl mb-12 md:mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-7">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#00D2FF]/70" />
            <span className="text-[0.7rem] font-semibold text-[#00D2FF] uppercase tracking-[0.34em]">
              {data.eyebrow}
            </span>
          </div>
          <TypewriterHeadline
            as="h2"
            startOnInView
            startDelayMs={reducedMotion ? 0 : 320}
            charIntervalMs={reducedMotion ? 0 : 70}
            className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.05] tracking-[-0.02em] mb-7"
            segments={[
              { text: data.titleStart },
              {
                text: data.titleHighlight,
                className:
                  'bg-gradient-to-r from-white via-[#7be8ff] to-[#9D50BB] bg-clip-text text-transparent',
              },
            ]}
          />
          <p className="text-gray-400 text-lg md:text-xl leading-[1.6] max-w-2xl">
            {data.subtitle}
          </p>
        </motion.div>

        <CategoryPills
          categories={data.categories}
          selected={selected}
          onSelect={setSelected}
          reducedMotion={reducedMotion}
        />

        <div className="mt-10 md:mt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="grid grid-cols-12 gap-4 md:gap-5"
            >
              {filtered.length === 0 ? (
                <div className="col-span-12 py-16 text-center text-sm text-gray-500">
                  {data.emptyLabel}
                </div>
              ) : selected === 'all' ? (
                filtered.map((item, idx) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    index={idx}
                    aspectClass={sizeAspect[item.size]}
                    colClass={sizeCols[item.size]}
                    categoryLabel={categoryLabel.get(item.category) ?? ''}
                    watchLabel={data.watchLabel}
                    onOpen={setModal}
                    reducedMotion={reducedMotion}
                  />
                ))
              ) : (
                filtered.map((item, idx) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    index={idx}
                    aspectClass={sizeAspect[item.size]}
                    colClass={sizeCols[item.size]}
                    categoryLabel={categoryLabel.get(item.category) ?? ''}
                    watchLabel={data.watchLabel}
                    onOpen={setModal}
                    reducedMotion={reducedMotion}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {mediaCta ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="mt-14 md:mt-16 flex justify-center"
          >
            <WhatsAppCTA
              label={mediaCta.label}
              message={mediaCta.waMessage}
              trackLabel="media-showcase-cta"
              size="lg"
            />
          </motion.div>
        ) : null}
      </Container>

      {typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              {modal ? (
                <motion.div
                  key="media-showcase-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-label={modal.title}
                  className="fixed inset-0 z-[50000] flex min-h-[100dvh] items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto overscroll-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onClick={handleClose}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 12 }}
                    transition={{ duration: 0.28, ease: easeInOutQuint }}
                    className="relative my-auto w-full max-w-5xl max-h-[min(92dvh,92vh)] rounded-3xl overflow-hidden border border-white/10 bg-[#08080a] shadow-[0_50px_120px_rgba(0,0,0,0.65)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      aria-label={data.closeLabel}
                      onClick={handleClose}
                      className="absolute top-3 right-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white border border-white/15 backdrop-blur hover:bg-black/80 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="absolute top-3 left-4 z-20 flex items-center gap-2 max-w-[70%]">
                      <span className="px-2 py-0.5 rounded-full text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/90 bg-white/[0.08] border border-white/15 backdrop-blur">
                        {categoryLabel.get(modal.category) ?? ''}
                      </span>
                      <p className="text-sm font-semibold text-white drop-shadow truncate">
                        {modal.title}
                      </p>
                    </div>
                    <video
                      key={modal.videoSrc}
                      className="w-full h-auto max-h-[min(calc(92dvh-56px),calc(92vh-56px))] bg-black object-contain"
                      src={modal.videoSrc}
                      poster={modal.poster}
                      controls
                      playsInline
                      autoPlay
                      loop
                      preload="metadata"
                    />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </section>
  );
};

type CategoryPillsProps = {
  categories: readonly Category[];
  selected: string;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
};

const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selected,
  onSelect,
  reducedMotion,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
    className="flex flex-wrap gap-2"
  >
    {categories.map((cat) => {
      const isActive = cat.id === selected;
      return (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect(cat.id)}
          className={`relative px-4 py-2 rounded-full text-[0.78rem] font-medium tracking-[-0.005em] transition-all duration-300 border ${
            isActive
              ? 'text-black bg-white border-white shadow-[0_8px_24px_rgba(255,255,255,0.18)]'
              : 'text-gray-300 bg-white/[0.03] border-white/10 hover:text-white hover:border-white/25 hover:bg-white/[0.06]'
          } ${reducedMotion ? '' : 'will-change-transform'}`}
          aria-pressed={isActive}
        >
          <span className="relative z-10">{cat.label}</span>
        </button>
      );
    })}
  </motion.div>
);

type MediaCardProps = {
  item: MediaItem;
  index: number;
  aspectClass: string;
  colClass: string;
  categoryLabel: string;
  watchLabel: string;
  onOpen: (item: MediaItem) => void;
  reducedMotion: boolean;
};

const MediaCard: React.FC<MediaCardProps> = ({
  item,
  index,
  aspectClass,
  colClass,
  categoryLabel,
  watchLabel,
  onOpen,
  reducedMotion,
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const isFeatured = item.size === 'featured';
  const [videoRequested, setVideoRequested] = useState(false);
  const shouldRenderVideo = !!item.videoSrc && (isFeatured || videoRequested);

  useEffect(() => {
    if (!isFeatured || reducedMotion) return;
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(card);
    return () => obs.disconnect();
  }, [isFeatured, reducedMotion]);

  const onEnter = () => {
    if (!isFeatured) setVideoRequested(true);
    setHovering(true);
    if (reducedMotion) return;
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  };

  const onLeave = () => {
    setHovering(false);
    if (reducedMotion || isFeatured) return;
    const v = videoRef.current;
    if (v) v.pause();
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(item)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: Math.min(index, 8) * 0.06,
        ease: easeOut,
      }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      aria-label={`${categoryLabel}: ${item.title}`}
      className={`group relative block w-full text-left rounded-[26px] overflow-hidden bg-[#08080a] border border-white/[0.06] hover:border-white/20 transition-colors duration-300 ${aspectClass} ${colClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040406]`}
    >
      <img
        src={item.poster}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out ${
          reducedMotion
            ? ''
            : `${hovering || (isFeatured && videoReady) ? 'scale-[1.04]' : 'scale-100'}`
        }`}
      />

      {item.videoSrc ? (
        <video
          ref={videoRef}
          src={shouldRenderVideo ? item.videoSrc : undefined}
          muted
          loop
          playsInline
          autoPlay={isFeatured}
          preload={isFeatured ? 'metadata' : 'none'}
          poster={item.poster}
          onLoadedData={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${
            (isFeatured || hovering) && videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{
          background:
            'radial-gradient(60% 40% at 30% 0%, rgba(0,210,255,0.20), transparent 70%)',
        }}
      />

      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-full text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/90 bg-white/[0.07] border border-white/15 backdrop-blur-md">
          {categoryLabel}
        </span>
      </div>

      <span
        aria-hidden
        className={`absolute top-4 right-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md text-white transition-all duration-400 ${
          hovering
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
        }`}
      >
        <Play className="w-4 h-4 fill-current ml-[1px]" />
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
        <h3
          className={`text-white font-bold leading-tight tracking-[-0.01em] drop-shadow ${
            isFeatured
              ? 'text-2xl md:text-3xl lg:text-[2rem] max-w-2xl'
              : 'text-[1rem] md:text-[1.05rem]'
          }`}
        >
          {item.title}
        </h3>
        {isFeatured ? (
          <div className="mt-3 inline-flex items-center gap-2 text-[0.78rem] font-medium text-white/85">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/12 border border-white/20">
              <Play className="w-3 h-3 fill-current ml-[1px]" />
            </span>
            {watchLabel}
          </div>
        ) : null}
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/[0.04]"
      />
    </motion.button>
  );
};

const Backdrop: React.FC = () => (
  <>
    <div className="absolute top-1/4 -left-32 w-[640px] h-[640px] bg-[#00D2FF]/[0.04] blur-[180px] rounded-full pointer-events-none" />
    <div className="absolute bottom-0 -right-32 w-[520px] h-[520px] bg-[#9D50BB]/[0.05] blur-[160px] rounded-full pointer-events-none" />
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.022] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        maskImage:
          'radial-gradient(ellipse at 50% 30%, black 25%, transparent 70%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at 50% 30%, black 25%, transparent 70%)',
      }}
    />
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-px pointer-events-none"
      style={{
        background:
          'linear-gradient(to right, transparent, rgba(0,210,255,0.22), rgba(157,80,187,0.22), transparent)',
      }}
    />
  </>
);

export default MediaShowcase;
