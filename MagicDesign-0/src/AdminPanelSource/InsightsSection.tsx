import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export function InsightsSection() {
  const { insights, sections } = useContent().content;
  const [featured, ...rest] = insights;
  if (!featured) return null;
  return (
    <section id="insights" className="scroll-mt-24 px-5 pb-24 md:px-14 md:pb-32 lg:pl-[18.75vw]">
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-serif text-[40px] font-light leading-[1.1] text-ink md:text-[52px]">{sections.insightsHeading}</h2>
        <a href="#insights" className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-soft px-4 text-[15px] font-bold text-ink hover:bg-line">
          All insights <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </div>
      <div className="mt-14 grid gap-10 xl:grid-cols-12">
        <a href="#insights" className="group relative block min-h-[420px] overflow-hidden rounded-[6px] bg-ink xl:col-span-7">
          {featured.image &&
          <img src={featured.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
          }
          <div className="relative flex h-full min-h-[420px] flex-col justify-end p-8 text-white md:p-10">
            <p className="text-sm text-white/80">
              {featured.type} · {featured.date} · {featured.read}
            </p>
            <h3 className="mt-4 max-w-[620px] text-[26px] font-light leading-tight md:text-[34px]">{featured.title}</h3>
          </div>
        </a>
        <ul className="xl:col-span-5">
          {rest.map((post) =>
          <li key={post.id} className="border-b border-line first:border-t">
              <a href="#insights" className="group flex items-start gap-6 py-7">
                <span className="h-24 w-32 shrink-0 overflow-hidden rounded-[4px] bg-soft">
                  {post.image && <img src={post.image} alt="" className="h-full w-full object-cover" />}
                </span>
                <span className="flex-1">
                  <span className="block text-sm text-muted">
                    {post.type} · {post.date}
                  </span>
                  <span className="mt-2 block text-[19px] leading-snug text-ink transition-colors duration-150 group-hover:text-brand">{post.title}</span>
                </span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>);

}