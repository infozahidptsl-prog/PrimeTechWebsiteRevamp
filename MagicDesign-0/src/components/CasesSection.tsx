import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon, PlayIcon, PlusIcon, XIcon } from 'lucide-react';
import { caseStudies } from '../data/site';

export function CasesSection() {
  const [active, setActive] = useState(0);
  const [video, setVideo] = useState<string | null>(null);
  const current = caseStudies.find((c) => c.id === video);

  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setVideo(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [video]);

  return (
    <section
      id="clients"
      aria-labelledby="cases-title"
      className="scroll-mt-24 px-5 py-20 md:px-14 md:py-28 lg:pl-[18.75vw]"
    >
      <div className="text-[16px] font-medium text-ink">Clients</div>
      <h2
        id="cases-title"
        className="mt-8 text-[32px] font-light leading-[1.2] text-ink md:text-[42px] xl:text-[48px]"
      >
        Our customers success stories
      </h2>

      <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:gap-4">
        {caseStudies.map((c, i) => {
          const isActive = i === active;
          return (
            <div
              key={c.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`flex min-w-0 flex-col transition-[flex-grow,flex-basis] duration-300 ease-[cubic-bezier(0.4,0.2,0.4,1)] ${
                isActive ? 'md:flex-1' : 'cursor-pointer md:flex-[0_0_96px] lg:flex-[0_0_136px] xl:flex-[0_0_164px]'
              }`}
            >
              {/* Video / Poster Wrap */}
              <div className="relative h-[300px] overflow-hidden rounded-[8px] bg-ink md:h-[420px]">
                <img
                  src={c.image}
                  alt={c.client}
                  className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-500 ease-[cubic-bezier(0.4,0.2,0.4,1)] ${
                    isActive ? 'scale-100 blur-0' : 'md:scale-110 md:blur-[22px]'
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.4,0.2,0.4,1)] ${
                    isActive
                      ? 'bg-gradient-to-t from-black/70 via-black/20 to-black/15'
                      : 'bg-black/25'
                  }`}
                />

                {/* Top-left Watch the video button */}
                {c.video && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setVideo(c.id);
                    }}
                    className={`absolute left-5 top-5 inline-flex h-10 items-center gap-2.5 rounded-full bg-black/55 px-4 text-[14px] font-medium text-white backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.4,0.2,0.4,1)] hover:bg-black/80 ${
                      isActive ? 'opacity-100' : 'md:pointer-events-none md:opacity-0'
                    }`}
                  >
                    <PlayIcon className="h-3.5 w-3.5 fill-white" />
                    <span>Watch the video</span>
                  </button>
                )}

                {/* Bottom Highlight Title inside video wrap */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 text-[22px] font-light leading-[1.25] text-white transition-all duration-500 ease-[cubic-bezier(0.4,0.2,0.4,1)] md:p-8 md:text-[28px] ${
                    isActive
                      ? 'translate-y-0 opacity-100'
                      : 'md:pointer-events-none md:translate-y-3 md:opacity-0'
                  }`}
                >
                  {c.title}
                </div>

                {/* Plus icon on collapsed strip */}
                {!isActive && (
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show ${c.client} story`}
                    className="absolute bottom-8 left-1/2 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/80 text-white transition-all duration-300 ease-[cubic-bezier(0.4,0.2,0.4,1)] hover:scale-105 hover:bg-white hover:text-ink md:flex"
                  >
                    <PlusIcon className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                )}
              </div>

              {/* Bottom Row (.customers-stories__row): Logo + Description + View case study */}
              <div className="mt-5 flex min-h-[56px] flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex h-[48px] shrink-0 items-center">
                    <img
                      src={c.logoSrc}
                      alt={c.client}
                      width={c.logoWidth}
                      height={c.logoHeight}
                      className="max-h-[44px] w-auto object-contain"
                    />
                  </div>
                  {isActive && (
                    <div className="hidden max-w-[360px] text-[15px] font-bold leading-[1.4] text-ink lg:block">
                      {c.desc}
                    </div>
                  )}
                </div>

                {isActive && c.hasCaseLink && (
                  <a
                    href={c.caseUrl}
                    className="inline-flex items-center gap-1.5 text-[14px] font-bold text-ink transition-colors hover:text-brand"
                  >
                    <span>View case study</span>
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <a
        href="#contact"
        className="mt-12 inline-flex h-11 items-center gap-2 rounded-full bg-[#e9edf3] px-5 text-[14px] font-bold text-ink transition-colors duration-150 hover:bg-[#dce2ec]"
      >
        <span>View all case studies</span>
        <ArrowUpRightIcon className="h-4 w-4" />
      </a>

      {/* Video Lightbox Popup */}
      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setVideo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-5"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[960px] overflow-hidden rounded-[8px] bg-black shadow-2xl"
            >
              <div className="relative aspect-video">
                <iframe
                  src={`${current.videoUrl}?autoplay=1`}
                  title={current.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
              <button
                type="button"
                onClick={() => setVideo(null)}
                aria-label="Close video"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-md hover:bg-soft"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
