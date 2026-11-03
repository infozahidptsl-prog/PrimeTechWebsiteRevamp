import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { MediaView } from './MediaView';
import { useContent } from '../contexts/ContentContext';

export function HowWeHelpSection() {
  const { helpAreas, sections } = useContent().content;
  const [active, setActive] = useState(helpAreas[0]?.id ?? '');
  const area = helpAreas.find((a) => a.id === active) ?? helpAreas[0];
  if (!area) return null;

  return (
    <section id="services" className="scroll-mt-24 px-5 pt-24 md:px-14 md:pt-32 lg:pl-[18.75vw]">
      <h2 className="whitespace-pre-line text-[30px] font-light leading-[1.3] text-ink md:text-[34px]">{sections.helpHeading}</h2>

      <div role="tablist" aria-label="Service areas" className="mt-12 flex gap-8 overflow-x-auto border-b border-line">
        {helpAreas.map((a) =>
        <button
          key={a.id}
          role="tab"
          aria-selected={area.id === a.id}
          onClick={() => setActive(a.id)}
          onMouseEnter={() => setActive(a.id)}
          className={`relative whitespace-nowrap pb-4 text-[19px] transition-colors duration-150 ${area.id === a.id ? 'font-bold text-ink' : 'text-muted hover:text-ink'}`}>
          
            {a.title}
            {area.id === a.id && <motion.span layoutId="help-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={area.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="grid gap-12 py-12 xl:grid-cols-12">
          
          <div className="xl:col-span-5">
            <h3 className="font-serif text-[40px] font-light leading-[1.05] text-ink md:text-[56px]">{area.title}</h3>
            <p className="mt-8 max-w-[460px] text-[16px] leading-relaxed text-ink/80">{area.body}</p>
            <a href="#contact" className="mt-8 inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[15px] font-bold text-white transition-colors duration-150 hover:bg-brand">
              Discuss your project <ArrowUpRightIcon className="h-4 w-4" />
            </a>
            <div className="mt-10 aspect-[16/10] max-w-[520px] overflow-hidden rounded-[6px]">
              <MediaView image={area.image} video={area.video} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="xl:col-span-6 xl:col-start-7">
            <p className="text-[19px] font-bold text-ink">{sections.helpOutcomesLabel}</p>
            <ol className="mt-6">
              {area.outcomes.map((o, i) =>
              <li key={`${o}-${i}`} className="grid grid-cols-[64px_1fr] items-baseline gap-4 border-t border-line py-7 last:border-b md:grid-cols-[96px_1fr]">
                  <span className="text-[40px] font-light leading-none text-[#8a8d99] md:text-[48px]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[20px] leading-snug text-ink md:text-[24px]">{o}</span>
                </li>
              )}
            </ol>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>);

}