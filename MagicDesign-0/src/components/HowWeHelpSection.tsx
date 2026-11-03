import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { helpAreas } from '../data/site';

export function HowWeHelpSection() {
  return (
    <section
      id="services"
      aria-labelledby="how-we-help-title"
      className="scroll-mt-24 px-5 pt-20 md:px-14 md:pt-28 lg:pl-[18.75vw]"
    >
      <h2
        id="how-we-help-title"
        className="text-[32px] font-light leading-[1.2] text-ink md:text-[42px] xl:text-[48px]"
      >
        How we help your
        <br />
        business move forward
      </h2>

      {/* Sticky Stacking Card Container matching live eleks.com (.service__list & .service__item) */}
      <div className="relative mt-12 flex flex-col gap-12 xl:mt-16 xl:gap-[104px] xl:pb-16">
        {helpAreas.map((area, index) => (
          <div
            key={area.id}
            style={{
              zIndex: index + 10
            }}
            className="grid gap-8 rounded-[8px] bg-white p-5 shadow-[0_0_2px_0_rgba(2,16,44,0.08),0_16px_90px_0_rgba(2,16,44,0.12)] md:p-6 xl:sticky xl:top-[124px] xl:grid-cols-[1.1fr_1fr] xl:gap-8 xl:p-8"
          >
            {/* Left Content Column (.service__block) */}
            <div className="flex h-full flex-col xl:py-4 xl:pl-4">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-[#c2d4ff] bg-[#c2d4ff] xl:hidden">
                  <img
                    src={area.icon}
                    alt={area.title}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <h3 className="text-[30px] font-light leading-[1.15] text-ink md:text-[38px] xl:mb-4 xl:text-[44px]">
                  {area.title}
                </h3>
              </div>

              <p className="mb-6 text-[15px] leading-[1.6] text-[#373737] md:mb-8 md:text-[16px]">
                {area.body}
              </p>

              <div className="mb-4 text-[17px] font-bold text-ink md:text-[18px]">
                {area.subtitle}
              </div>

              {/* 2x2 Grid with Left Borders & Pill Numbers (.service__sublist) */}
              <ul className="mb-8 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6">
                {area.outcomes.map((outcome, i) => (
                  <li
                    key={outcome}
                    className="border-l border-[#c7c7d6] py-2 pl-4 pr-3 pt-3"
                  >
                    <span className="mb-2 inline-block rounded-[24px] bg-[#e9edf3] px-2.5 py-1 text-[12px] font-medium leading-[16px] text-ink">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-h-[48px] text-[15px] font-bold leading-[1.45] text-ink md:text-[16px]">
                      {outcome}
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={area.href}
                className="mt-auto inline-flex h-11 items-center gap-2 self-start rounded-full bg-[#e9edf3] px-5 text-[14px] font-bold text-ink transition-colors duration-200 hover:bg-[#dce2ec]"
              >
                <span>{area.cta}</span>
                <ArrowUpRightIcon className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>

            {/* Right Image Column (.service__image-wrap) */}
            <div className="hidden overflow-hidden rounded-[8px] xl:mt-[64px] xl:block">
              <img
                src={area.image}
                alt={area.title}
                className="h-full w-full rounded-[8px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
