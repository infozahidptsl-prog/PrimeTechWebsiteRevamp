import React, { useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react';
import { industries } from '../data/site';

export function SectorsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const scrollByCards = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section
      id="industries"
      aria-labelledby="industries-title"
      className="scroll-mt-24 bg-[#f8f8f9] py-20 md:py-28"
    >
      <div className="px-5 md:px-14 lg:pl-[18.75vw]">
        {/* Header Row with Title & Slider Arrows */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[16px] font-medium text-ink">Industries</div>
            <h2
              id="industries-title"
              className="mt-8 text-[32px] font-light leading-[1.2] text-ink md:text-[42px] xl:text-[48px]"
            >
              Game-changing solutions
              <br />
              tailored for every sector
            </h2>
          </div>

          <div className="flex items-center gap-3 pb-2">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={!canPrev}
              aria-label="Previous industries"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/80 text-ink transition-all hover:bg-ink hover:text-white disabled:cursor-default disabled:opacity-25"
            >
              <ArrowLeftIcon className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={!canNext}
              aria-label="Next industries"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/80 text-ink transition-all hover:bg-ink hover:text-white disabled:cursor-default disabled:opacity-25"
            >
              <ArrowRightIcon className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Horizontal Tall-Card Carousel (.industry__list & .industry__item) */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="no-scrollbar mt-12 flex overflow-x-auto border-l border-[#c7c7d6] pb-2 md:mt-16"
        >
          {industries.map((ind) => (
            <a
              key={ind.id}
              href={`#industry/${ind.id}`}
              className="industry-card group relative flex h-[400px] w-[264px] shrink-0 flex-col overflow-hidden border-r border-[#c7c7d6] px-4 pt-4 transition-colors duration-300 hover:border-transparent xl:h-[440px] xl:w-[276px]"
            >
              {/* Background Image & Dark Mask with clip-path transition */}
              <img
                src={ind.image}
                alt={ind.name}
                className="industry-card__media absolute inset-0 h-full w-full object-cover"
              />
              <div className="industry-card__mask absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100" />

              {/* Foreground Card Content */}
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-3 flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-[8px] border border-[#c2d4ff] bg-[#c2d4ff] transition-colors duration-300 group-hover:border-white group-hover:bg-transparent">
                  <img
                    src={ind.icon}
                    alt={ind.name}
                    className="h-[56px] w-[56px] object-contain transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert"
                  />
                </div>

                <h3 className="mb-5 text-[24px] font-light leading-tight text-ink transition-colors duration-300 group-hover:text-white xl:text-[26px]">
                  {ind.name}
                </h3>

                <div className="space-y-3">
                  {ind.benefits.map((b) => (
                    <div
                      key={b}
                      className="max-w-[216px] text-[14px] leading-[1.45] text-[#54575e] transition-colors duration-300 group-hover:text-white/95 xl:text-[15px]"
                    >
                      {b}
                    </div>
                  ))}
                </div>

                <span className="mt-auto mb-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span>View industry</span>
                  <ArrowUpRightIcon className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
