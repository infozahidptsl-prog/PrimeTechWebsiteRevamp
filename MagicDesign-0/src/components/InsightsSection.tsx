import React from 'react';
import { ArrowUpRightIcon, HeadphonesIcon } from 'lucide-react';
import { insights } from '../data/site';

export function InsightsSection() {
  return (
    <section
      id="insights"
      aria-labelledby="insights-title"
      className="scroll-mt-24 px-5 py-20 md:px-14 md:py-28 lg:pl-[18.75vw]"
    >
      <div className="text-[16px] font-medium text-ink">Latest updates</div>
      <h2
        id="insights-title"
        className="mt-8 text-[32px] font-light leading-[1.2] text-ink md:text-[42px] xl:text-[48px]"
      >
        Our expert insights
      </h2>

      {/* 2x2 Grid of Expert Insights (.news) */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-x-4 md:gap-y-6">
        {insights.map((post) => (
          <a
            key={post.id}
            href="#contact"
            className="news-card group relative block h-[320px] overflow-hidden rounded-[8px] bg-white xl:h-[360px]"
          >
            {/* Image Wrap with bottom inset clip-path that expands to full card on hover */}
            <div className="news-card__image-wrap relative h-full w-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
              <div className="news-card__mask absolute inset-0 bg-black/65 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

              {/* Top-Right Badges (.news__labels) */}
              <div className="absolute right-4 top-4 flex items-center gap-2">
                {post.hasAudio && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white bg-black/20 px-2.5 py-0.5 text-[13px] font-medium text-white backdrop-blur-sm">
                    <HeadphonesIcon className="h-3.5 w-3.5" />
                    <span>Audio</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-0.5 text-[13px] font-medium text-ink">
                  <span>{post.type}</span>
                  <span className="h-2.5 w-2.5 rounded-full border border-ink" />
                </span>
              </div>
            </div>

            {/* Bottom Info Block (.news__info) */}
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-1 gap-2 p-4 text-ink transition-colors duration-200 group-hover:text-white xl:grid-cols-[1fr_1.3fr] xl:items-end xl:gap-x-4">
              <div className="line-clamp-2 min-h-[44px] max-w-[520px] text-[17px] font-bold leading-[1.35] xl:col-span-2 xl:text-[18px]">
                {post.title}
              </div>

              {/* View article link */}
              <div className="mt-1 inline-flex items-center gap-1.5 text-[14px] font-bold">
                <span>View article</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </div>

              {/* Author Avatar + Name + Position */}
              <div className="hidden items-center gap-3 xl:flex">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-bold leading-tight">
                    {post.author}
                  </div>
                  <div className="truncate text-[12px] opacity-80">
                    {post.position}
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="mt-10 inline-flex h-11 items-center gap-2 rounded-full bg-[#e9edf3] px-5 text-[14px] font-bold text-ink transition-colors duration-150 hover:bg-[#dce2ec]"
      >
        <span>Discover more insights</span>
        <ArrowUpRightIcon className="h-4 w-4" />
      </a>
    </section>
  );
}
