import React from 'react';
import { companyAwards, partnershipStats } from '../data/site';

export function PartnershipSection() {
  return (
    <section
      aria-labelledby="partner-title"
      className="bg-[#1e1d28] pt-20 text-white md:pt-28"
    >
      <div className="px-5 md:px-14 lg:pl-[18.75vw]">
        <div className="grid gap-12 pb-8 md:grid-cols-[1fr_1.2fr] xl:grid-cols-2 xl:gap-[120px] xl:pr-[100px]">
          {/* Left Content Column */}
          <div className="flex flex-col items-start">
            <div className="text-[16px] font-medium text-white">Company highlights</div>
            <h2
              id="partner-title"
              className="mt-8 max-w-[420px] text-[32px] font-light leading-[1.2] text-white md:text-[42px] xl:text-[48px]"
            >
              We build lasting partnerships with our clients
            </h2>
          </div>

          {/* Right 2x2 Counter Grid (.counter) */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:border-t md:border-[#54575e] md:pt-12 xl:gap-y-14 xl:pt-14">
            {partnershipStats.map((s) => (
              <div key={s.label}>
                <div className="mb-2 text-[40px] font-light leading-none text-white md:text-[56px] xl:text-[72px]">
                  {s.value}
                </div>
                <div className="max-w-[220px] text-[14px] leading-[1.5] text-white/90 xl:text-[15px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Infinite Awards Strip (.section__awards) */}
      <div className="overflow-hidden py-12 md:py-16">
        <div className="flex w-max animate-[awardsMarquee_600s_linear_infinite] hover:[animation-play-state:paused] items-center gap-12 px-8 md:gap-20">
          {[...companyAwards, ...companyAwards].map((award, idx) => (
            <div key={`${award.name}-${idx}`} className="flex shrink-0 items-center justify-center">
              <img
                src={award.src}
                alt={award.name}
                className="h-[44px] w-[108px] object-contain opacity-90 transition-opacity hover:opacity-100 md:h-[56px] md:w-[144px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
