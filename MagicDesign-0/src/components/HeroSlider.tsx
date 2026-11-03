import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, PlusIcon } from 'lucide-react';
import { heroSlides, images, type HeroSlide } from '../data/site';

const DURATION = 6000;
const TICK = 50;

type HeroSliderProps = { onContact: () => void };

export function HeroSlider({ onContact }: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  const select = (i: number) => {
    setActive(((i % count) + count) % count);
    setProgress(0);
  };

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setProgress((p) => {
        if (p + TICK >= DURATION) {
          setActive((a) => (a + 1) % count);
          return 0;
        }
        return p + TICK;
      });
    }, TICK);
    return () => window.clearInterval(t);
  }, [paused, count]);

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative px-5 pt-6 md:px-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <div className="flex h-[600px] gap-4 md:h-[calc(100vh-148px)] md:min-h-[560px] md:max-h-[760px]">
          {heroSlides.map((slide, i) => (
            <Panel
              key={slide.id}
              slide={slide}
              active={i === active}
              progress={progress / DURATION}
              onSelect={() => select(i)}
              onPrev={() => select(active - 1)}
              onNext={() => select(active + 1)}
            />
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2 md:hidden">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to ${s.label}`}
              onClick={() => select(i)}
              className={`h-2 rounded-full transition-[width,background-color] duration-200 ${i === active ? 'w-6 bg-ink' : 'w-2 bg-line'
                }`}
            />
          ))}
        </div>

        <ConsultCard onContact={onContact} />
      </div>
    </section>
  );
}

type PanelProps = {
  slide: HeroSlide;
  active: boolean;
  progress: number;
  onSelect: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function Panel({ slide, active, progress, onSelect, onPrev, onNext }: PanelProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={slide.label}
      onClick={!active ? onSelect : undefined}
      className={`relative overflow-hidden rounded-[8px] transition-[flex-grow,flex-basis] duration-300 ease-[cubic-bezier(0.4,0.2,0.4,1)] ${active
          ? 'flex-[1_1_0%]'
          : 'hidden cursor-pointer md:block md:flex-[0_0_68px] lg:flex-[0_0_84px] xl:flex-[0_0_96px] hover:md:flex-[0_0_88px] hover:lg:flex-[0_0_108px] hover:xl:flex-[0_0_124px]'
        }`}
      style={{ backgroundColor: slide.tint }}
    >
      <img
        src={slide.image}
        alt={slide.label}
        className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-500 ease-[cubic-bezier(0.4,0.2,0.4,1)] ${active ? 'scale-100 blur-0' : 'scale-125 blur-[28px]'
          }`}
      />
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{ backgroundColor: active ? 'rgba(6,12,24,0.24)' : 'rgba(6,12,24,0.18)' }}
      />

      {!active && (
        <div
          className="group absolute inset-0 flex flex-col items-center justify-between pb-8 pt-12 text-white pointer-events-none"
        >
          <span className="flex flex-col items-center gap-3 transition-transform duration-300 ease-[cubic-bezier(0.4,0.2,0.4,1)] group-hover:-translate-y-1">
            <span className="h-2.5 w-2.5 rounded-full border border-white" />
            <span className="rotate-180 whitespace-nowrap text-[14px] tracking-wide [writing-mode:vertical-rl]">
              {slide.label}
            </span>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 transition-all duration-200 ease-[cubic-bezier(0.4,0.2,0.4,1)] group-hover:scale-105 group-hover:bg-white group-hover:text-ink">
            <PlusIcon className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0.2, 0.4, 1] }}
            className="relative flex h-full flex-col px-6 pb-8 pt-10 text-white md:px-12 md:pb-8 xl:px-[104px]"
          >
            <div className="absolute right-6 top-10 flex items-center gap-3 text-[14px] font-medium md:right-10">
              <span>{slide.label}</span>
              <span className="h-2.5 w-2.5 rounded-full border border-white" />
            </div>

            <h1 className="mt-10 max-w-[740px] font-serif text-[36px] font-light leading-[1.06] md:mt-14 md:text-[52px] xl:text-[64px]">
              {slide.title}
            </h1>
            <div className="mt-6 max-w-[490px] md:ml-[72px]">
              <p className="text-[14px] leading-[1.6] text-white/95 md:text-[15px]">{slide.body}</p>
              {slide.cta && (
                <a
                  href={slide.ctaHref || '#services'}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-bold text-ink transition-colors duration-150 hover:bg-soft"
                >
                  {slide.cta} <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="mt-auto md:ml-[72px]">
              <div className="relative h-px max-w-[340px] bg-white/30">
                <span
                  className="absolute left-0 top-0 h-px bg-white transition-[width] duration-100 ease-linear"
                  style={{ width: `${Math.max(progress * 100, 3)}%` }}
                />
              </div>
              <div className="mt-4 flex items-end justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-bold text-white">{slide.subLabel}</p>
                  <SlideItems slide={slide} />
                </div>
                <div className="flex shrink-0 gap-3">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={onPrev}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 transition-colors duration-150 hover:bg-white hover:text-ink"
                  >
                    <ArrowLeftIcon className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={onNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 transition-colors duration-150 hover:bg-white hover:text-ink"
                  >
                    <ArrowRightIcon className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SlideItems({ slide }: { slide: HeroSlide }) {
  if (slide.kind === 'links') {
    return (
      <ul className="mt-4 grid max-w-[546px] grid-cols-2 gap-x-6 gap-y-2.5 lg:mt-5 lg:grid-cols-3">
        {slide.items.map((it) => (
          <li key={it}>
            <a
              href="#services"
              className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-white transition-all hover:translate-x-1 md:text-[15px]"
            >
              <span>{it}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  if (slide.logoItems && slide.logoItems.length > 0) {
    return (
      <div className="mt-4 flex flex-wrap items-center gap-7 lg:mt-5">
        {slide.logoItems.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            className="h-[52px] w-auto object-contain md:h-[60px]"
          />
        ))}
      </div>
    );
  }

  return null;
}

function ConsultCard({ onContact }: { onContact: () => void }) {
  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        onContact();
      }}
      className="group mt-4 flex gap-4 rounded-[12px] bg-white p-2.5 shadow-[0_16px_44px_-10px_rgba(22,24,31,0.38)] transition-transform duration-200 md:mt-6 xl:absolute xl:right-[220px] xl:top-1/2 xl:z-20 xl:mt-0 xl:w-[396px] xl:-translate-y-1/2"
    >
      <div className="h-[112px] w-[148px] shrink-0 overflow-hidden rounded-[8px] sm:h-[124px] sm:w-[172px]">
        <img
          src={images.consult}
          alt="Receive a complimentary consultation"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between py-2 pr-3">
        <p className="text-[15px] font-medium leading-[1.35] text-ink sm:text-[16px]">
          Receive a complimentary consultation
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 self-start text-[14px] font-bold text-ink transition-colors group-hover:text-brand">
          Book now <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}
