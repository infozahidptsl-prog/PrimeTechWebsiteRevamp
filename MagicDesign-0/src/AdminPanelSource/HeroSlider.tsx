import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, AwardIcon, PlusIcon } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import type { HeroSlide } from '../types/content';
import { MediaView } from './MediaView';

const DURATION = 9000;
const TICK = 100;

type HeroSliderProps = {onContact: () => void;};

export function HeroSlider({ onContact }: HeroSliderProps) {
  const { heroSlides } = useContent().content;
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  useEffect(() => {
    if (active >= count) setActive(0);
  }, [active, count]);

  const select = (i: number) => {
    if (!count) return;
    setActive((i % count + count) % count);
    setProgress(0);
  };

  useEffect(() => {
    if (paused || count < 2) return;
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

  if (!count) return null;

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative px-5 pt-6 md:px-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      
      <div className="flex h-[680px] gap-4 md:h-[calc(100vh-112px)] md:min-h-[640px] md:max-h-[1000px]">
        {heroSlides.map((slide, i) =>
        <Panel
          key={slide.id}
          slide={slide}
          active={i === active}
          progress={progress / DURATION}
          onSelect={() => select(i)}
          onPrev={() => select(active - 1)}
          onNext={() => select(active + 1)} />

        )}
      </div>

      <div className="mt-4 flex justify-center gap-2 md:hidden">
        {heroSlides.map((s, i) =>
        <button
          key={s.id}
          aria-label={`Go to ${s.label}`}
          onClick={() => select(i)}
          className={`h-2 rounded-full transition-[width,background-color] duration-200 ${i === active ? 'w-6 bg-ink' : 'w-2 bg-line'}`} />

        )}
      </div>

      <ConsultCard onContact={onContact} />
    </section>);

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
  const hoverTimer = useRef<number>();
  const onEnter = () => {
    if (active || !window.matchMedia('(hover: hover) and (min-width: 768px)').matches) return;
    hoverTimer.current = window.setTimeout(onSelect, 140);
  };
  const onLeave = () => window.clearTimeout(hoverTimer.current);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      role="group"
      aria-roledescription="slide"
      aria-label={slide.label}
      className={`relative overflow-hidden rounded-[6px] transition-[flex-grow,flex-basis] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
      active ? 'flex-[1_1_0%]' : 'hidden md:block md:flex-[0_0_72px] xl:flex-[0_0_136px]'}`
      }
      style={{ backgroundColor: slide.tint }}>
      
      <MediaView
        image={slide.image}
        video={slide.video}
        playVideo={active}
        className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-300 ease-out ${active ? '' : 'scale-125 blur-xl'}`} />
      
      <div className="absolute inset-0" style={{ backgroundColor: active ? 'rgba(6,12,24,0.38)' : 'rgba(6,12,24,0.25)' }} />

      {!active &&
      <button
        type="button"
        onClick={onSelect}
        aria-label={`Open ${slide.label}`}
        className="group absolute inset-0 flex flex-col items-center justify-between pb-12 pt-[74px] text-white">
        
          <span className="flex flex-col items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full border border-white" />
            <span className="rotate-180 whitespace-nowrap text-[15px] [writing-mode:vertical-rl]">{slide.label}</span>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white transition-colors duration-150 group-hover:bg-white group-hover:text-ink">
            <PlusIcon className="h-5 w-5" strokeWidth={1.5} />
          </span>
        </button>
      }

      <AnimatePresence mode="wait">
        {active &&
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
          className="relative flex h-full flex-col px-6 pb-8 pt-[70px] text-white md:px-12 md:pb-12 xl:px-[152px]">
          
            <div className="absolute right-6 top-[68px] flex items-center gap-4 text-[15px] md:right-12">
              {slide.label}
              <span className="h-2.5 w-2.5 rounded-full border border-white" />
            </div>

            <h1 className="mt-14 max-w-[780px] font-serif text-[40px] font-light leading-[1.02] md:mt-20 md:text-[56px] xl:text-[72px]">
              {slide.title}
            </h1>
            <div className="mt-10 max-w-[480px] md:ml-[152px]">
              <p className="text-[15px] leading-[1.6] text-white/95">{slide.body}</p>
              {slide.cta &&
            <a
              href="#services"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[15px] font-bold text-ink transition-colors duration-150 hover:bg-soft">
              
                  {slide.cta} <ArrowUpRightIcon className="h-4 w-4" />
                </a>
            }
            </div>

            <div className="mt-auto md:ml-[152px]">
              <div className="relative h-px max-w-[744px] bg-white/30">
                <span className="absolute left-0 top-0 h-px bg-white" style={{ width: `${Math.max(progress * 100, 4)}%` }} />
              </div>
              <div className="mt-4 flex items-end justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <p className="text-[19px] font-bold">{slide.subLabel}</p>
                  <SlideItems slide={slide} />
                </div>
                <div className="flex shrink-0 gap-4">
                  <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={onPrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white transition-colors duration-150 hover:bg-white hover:text-ink">
                  
                    <ArrowLeftIcon className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                  <button
                  type="button"
                  aria-label="Next slide"
                  onClick={onNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white transition-colors duration-150 hover:bg-white hover:text-ink">
                  
                    <ArrowRightIcon className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}

function SlideItems({ slide }: {slide: HeroSlide;}) {
  if (slide.kind === 'links') {
    return (
      <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 lg:mt-10 lg:grid-cols-3">
        {slide.items.map((it) =>
        <li key={it}>
            <a href="#services" className="text-[15px] font-bold hover:underline md:text-[19px]">
              {it}
            </a>
          </li>
        )}
      </ul>);

  }
  if (slide.kind === 'logos') {
    const looks = ['font-serif text-[15px] uppercase tracking-[0.2em]', 'text-[22px] font-bold tracking-wide', 'text-[18px] font-light tracking-[0.15em]', 'font-serif text-[20px]'];
    return (
      <ul className="mt-6 flex flex-wrap items-center gap-x-14 gap-y-4 lg:mt-10">
        {slide.items.map((it, i) =>
        <li key={it} className={`${looks[i % looks.length]} whitespace-nowrap opacity-95`}>
            {it}
          </li>
        )}
      </ul>);

  }
  return (
    <ul className="mt-6 flex flex-wrap gap-8">
      {slide.items.map((it) =>
      <li key={it} title={it} className="flex flex-col items-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white">
            <AwardIcon className="h-7 w-7" strokeWidth={1.5} aria-hidden />
          </span>
          <span className="sr-only">{it}</span>
        </li>
      )}
    </ul>);

}

function ConsultCard({ onContact }: {onContact: () => void;}) {
  const { settings } = useContent().content;
  return (
    <div className="mt-4 flex gap-4 rounded-[6px] bg-white p-2.5 shadow-[0_12px_40px_-12px_rgba(22,24,31,0.35)] md:mt-6 xl:absolute xl:right-[95px] xl:top-[38%] xl:z-10 xl:mt-0 xl:w-[468px]">
      <div className="h-[120px] w-[150px] shrink-0 overflow-hidden rounded-[4px] bg-soft sm:h-[152px] sm:w-[203px]">
        {settings.consultImage && <img src={settings.consultImage} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="flex flex-col py-3 pr-2">
        <p className="text-[17px] leading-snug text-ink sm:text-[19px]">{settings.consultTitle}</p>
        <button onClick={onContact} className="mt-auto inline-flex items-center gap-1.5 self-start text-[15px] font-bold text-ink hover:text-brand">
          Book now <ArrowUpRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>);

}