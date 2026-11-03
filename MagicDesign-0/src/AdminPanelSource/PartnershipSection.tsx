import React from 'react';
import { useContent } from '../contexts/ContentContext';

export function PartnershipSection() {
  const { partnershipStats, sections } = useContent().content;
  return (
    <section aria-labelledby="partner-title" className="px-5 py-24 md:px-14 md:py-32 lg:pl-[18.75vw]">
      <h2 id="partner-title" className="max-w-[720px] font-serif text-[40px] font-light leading-[1.1] text-ink md:text-[52px]">
        {sections.partnershipHeading}
      </h2>
      <dl className="mt-16 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
        {partnershipStats.map((s) =>
        <div key={s.id} className="border-l border-line pl-8">
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-serif text-[64px] font-light leading-none text-brand md:text-[80px]">{s.value}</dd>
            <dd className="mt-5 max-w-[240px] text-[17px] leading-snug text-ink">{s.label}</dd>
          </div>
        )}
      </dl>
    </section>);

}