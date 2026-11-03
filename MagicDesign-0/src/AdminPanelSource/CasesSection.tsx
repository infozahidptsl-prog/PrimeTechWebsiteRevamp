import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon, PlayIcon, PlusIcon, XIcon } from 'lucide-react';
import { ClientLogo } from './ClientLogo';
import { useContent } from '../contexts/ContentContext';

export function CasesSection() {
  const { caseStudies, sections } = useContent().content;
  const [active, setActive] = useState(1);
  const [video, setVideo] = useState<string | null>(null);
  const current = caseStudies.find((c) => c.id === video);
  const activeIndex = Math.min(active, caseStudies.length - 1);

  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setVideo(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [video]);

  if (!caseStudies.length) return null;

  return (
    <section id="clients" className="scroll-mt-24 px-5 py-20 md:px-14 md:py-28 lg:pl-[18.75vw]">
      <p className="text-[19px] text-ink">{sections.casesLabel}</p>
      <h2 className="mt-12 font-serif text-[40px] font-light leading-[1.1] text-ink md:text-[52px]">{sections.casesHeading}</h2>

      <ul className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:gap-4">
        {caseStudies.map((c, i) => {
          const isActive = i === activeIndex;
          return (
            <li
              key={c.id}
              onMouseEnter={() => setActive(i)}
              className={`flex min-w-0 flex-col transition-[flex-grow] duration-300 ease-out ${isActive ? 'md:flex-[3_1_0%]' : 'md:flex-[1_1_0%]'}`}>
              
              <div className="relative h-[300px] overflow-hidden rounded-[6px] bg-ink md:h-[418px]">
                {c.image &&
                <img
                  src={c.image}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-300 ease-out ${isActive ? '' : 'md:scale-110 md:blur-xl'}`} />

                }
                <div className={`absolute inset-0 ${isActive ? 'bg-ink/20' : 'bg-ink/20 md:bg-transparent'}`} />

                {c.videoUrl &&
                <button
                  onClick={() => setVideo(c.id)}
                  className={`absolute left-4 top-4 inline-flex h-10 items-center gap-2.5 rounded-full bg-ink/70 px-4 text-[15px] text-white backdrop-blur-sm transition-opacity duration-200 hover:bg-ink ${
                  isActive ? 'opacity-100' : 'md:pointer-events-none md:opacity-0'}`
                  }>
                  
                    <PlayIcon className="h-4 w-4 fill-white" /> Watch the video
                  </button>
                }

                <a
                  href="#contact"
                  className={`absolute inset-x-0 bottom-0 p-6 text-[24px] font-light leading-tight text-white transition-opacity duration-200 md:p-10 md:text-[30px] ${
                  isActive ? 'opacity-100' : 'md:pointer-events-none md:opacity-0'}`
                  }>
                  
                  {c.title}
                </a>

                {!isActive &&
                <button
                  onClick={() => setActive(i)}
                  aria-label={`Show ${c.client} story`}
                  className="absolute bottom-[56px] left-1/2 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white text-white md:flex">
                  
                    <PlusIcon className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                }
              </div>
              <div className="mt-8 flex min-h-[48px] items-center gap-8">
                <ClientLogo name={c.client} style={c.logoStyle} />
                {isActive && c.desc && <p className="hidden max-w-[380px] text-[19px] leading-snug text-ink lg:block">{c.desc}</p>}
              </div>
            </li>);

        })}
      </ul>

      <a href="#contact" className="mt-14 inline-flex h-10 items-center gap-2 rounded-full bg-soft px-4 text-[15px] font-bold text-ink transition-colors duration-150 hover:bg-line">
        View all case studies <ArrowUpRightIcon className="h-4 w-4" />
      </a>

      <AnimatePresence>
        {current &&
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-5">
          
            <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1000px] overflow-hidden rounded-[6px] bg-black">
            
              <video src={current.videoUrl} poster={current.image || undefined} controls autoPlay playsInline className="aspect-video w-full bg-black" />
              <p className="p-6 text-[20px] text-white">{current.title}</p>
              <button
              onClick={() => setVideo(null)}
              aria-label="Close video"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink">
              
                <XIcon className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}