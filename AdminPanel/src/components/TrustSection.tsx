import React from 'react';
import { useContent } from '../contexts/ContentContext';

export function TrustSection() {
  const { trustPoints, sections } = useContent().content;
  return (
    <section id="about" className="scroll-mt-24 px-5 py-24 md:px-14 md:py-32 lg:pl-[18.75vw]">
      <h2 className="max-w-[760px] font-serif text-[40px] font-light leading-[1.1] text-ink md:text-[52px]">{sections.trustHeading}</h2>
      <ol className="mt-16 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
        {trustPoints.map((v, i) =>
        <li key={v.id} className="flex flex-col border-l border-line pl-8">
            <span className="block text-[64px] font-light leading-none text-[#8a8d99] md:text-[72px]">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-8 min-h-[56px] text-[20px] font-bold leading-snug text-ink">{v.title}</h3>
            <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-muted">{v.body}</p>
          </li>
        )}
      </ol>
    </section>);

}