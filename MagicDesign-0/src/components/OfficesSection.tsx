import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon, GlobeIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { officeRegions } from '../data/site';

export function OfficesSection() {
  const [activeRegion, setActiveRegion] = useState(0);
  const current = officeRegions[activeRegion];

  return (
    <section id="offices" className="scroll-mt-24 px-5 pb-24 md:px-14 md:pb-32 lg:pl-[18.75vw]">
      <div className="flex flex-col justify-between gap-6 border-t border-line pt-20 md:flex-row md:items-end">
        <div>
          <p className="flex items-center gap-2 text-[15px] font-semibold uppercase tracking-wider text-brand">
            <GlobeIcon className="h-4 w-4" /> Global footprint
          </p>
          <h2 className="mt-4 max-w-[700px] font-serif text-[40px] font-light leading-[1.1] text-ink md:text-[52px]">
            Where we work with you
          </h2>
        </div>
        <a
          href="#contact"
          className="inline-flex h-10 items-center gap-2 self-start whitespace-nowrap rounded-full bg-soft px-4 text-[15px] font-bold text-ink transition-colors duration-150 hover:bg-line md:self-auto"
        >
          Get in touch locally <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </div>

      <div role="tablist" aria-label="Office regions" className="mt-12 flex flex-wrap gap-6 border-b border-line">
        {officeRegions.map((r, i) => (
          <button
            key={r.region}
            role="tab"
            aria-selected={activeRegion === i}
            onClick={() => setActiveRegion(i)}
            className={`relative pb-4 text-[18px] transition-colors duration-150 ${
              activeRegion === i ? 'font-bold text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            {r.region}
            <span className="ml-2 rounded-full bg-soft px-2 py-0.5 text-xs font-medium text-muted">
              {r.offices.length}
            </span>
            {activeRegion === i && (
              <motion.span layoutId="office-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.region}
          role="tabpanel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {current.offices.map((office) => (
            <div
              key={office.city}
              className="group flex flex-col justify-between rounded-[6px] border border-line bg-white p-6 transition-colors duration-150 hover:border-brand/50 hover:bg-soft/40"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[22px] font-bold text-ink group-hover:text-brand">{office.city}</h3>
                    <p className="text-sm font-medium text-muted">{office.country}</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft text-ink group-hover:bg-brand group-hover:text-white">
                    <MapPinIcon className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-ink/80">{office.address}</p>
              </div>
              <a
                href={`tel:${office.phone.replace(/\s+/g, '')}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand"
              >
                <PhoneIcon className="h-3.5 w-3.5" /> {office.phone}
              </a>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

