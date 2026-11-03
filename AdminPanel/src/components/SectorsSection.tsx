import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon, CheckIcon } from 'lucide-react';
import { IndustryIcon } from './IndustryIcon';
import { useContent } from '../contexts/ContentContext';

export function SectorsSection() {
  const { industries, sections } = useContent().content;
  const [active, setActive] = useState(0);
  const ind = industries[Math.min(active, industries.length - 1)];
  if (!ind) return null;

  return (
    <section id="industries" className="scroll-mt-24 px-5 pb-24 md:px-14 md:pb-32">
      <h2 className="max-w-[760px] font-serif text-[40px] font-light leading-[1.1] text-ink md:text-[52px] lg:ml-[calc(18.75vw-56px)]">
        {sections.sectorsHeading}
      </h2>

      <div className="mt-14 grid overflow-hidden rounded-[6px] lg:grid-cols-2">
        <ul className="grid content-start gap-x-6 gap-y-4 bg-[#1f1e2b] p-6 text-white sm:grid-cols-2 md:p-7">
          {industries.map((x, i) =>
          <li key={x.id}>
              <button
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={ind.id === x.id}
              className={`flex w-full items-center gap-6 rounded-[6px] p-2 text-left transition-colors duration-150 ${ind.id === x.id ? 'bg-white/10' : 'hover:bg-white/5'}`}>
              
                <IndustryIcon id={x.icon} />
                <span className="text-[18px] font-bold">{x.name}</span>
              </button>
            </li>
          )}
        </ul>

        <div className="relative min-h-[480px] bg-white p-3 lg:border lg:border-l-0 lg:border-line">
          <AnimatePresence mode="wait">
            <motion.div
              key={ind.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col">
              
              <div className="px-3 pb-8 pt-6">
                <p className="text-[32px] font-light leading-tight text-ink">{ind.name}</p>
                <ul className="mt-6 space-y-3">
                  {ind.benefits.map((b, i) =>
                  <li key={`${b}-${i}`} className="flex items-start gap-3 text-[17px] text-ink">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand" /> {b}
                    </li>
                  )}
                </ul>
                <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-ink hover:text-brand">
                  Explore {ind.name.toLowerCase()} solutions <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              </div>
              <div className="min-h-[260px] flex-1 overflow-hidden rounded-[6px] bg-soft">
                {ind.image && <img src={ind.image} alt="" className="h-full w-full object-cover" />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>);

}