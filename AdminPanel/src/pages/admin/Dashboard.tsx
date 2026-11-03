import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRightIcon, ExternalLinkIcon, HardDriveIcon, ImagesIcon, InboxIcon, PlayIcon, TypeIcon } from 'lucide-react';
import { collections } from '../../data/adminSchema';
import { useContent } from '../../contexts/ContentContext';
import { collectLibrary } from '../../utils/media';
import { formatBytes } from '../../utils/files';

export function Dashboard() {
  const { content, submissions, media } = useContent();
  const [storage, setStorage] = useState<{usage: number;quota: number;} | null>(null);
  const library = collectLibrary(content, media);
  const unread = submissions.filter((s) => !s.read).length;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  useEffect(() => {
    navigator.storage?.estimate?.().then((e) => setStorage({ usage: e.usage ?? 0, quota: e.quota ?? 0 })).catch(() => undefined);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <h1 className="mt-1 text-[30px] font-bold tracking-tight text-ink md:text-[36px]">{greeting}</h1>
        </div>
        <a href="/" target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-1.5 self-start rounded-xl bg-ink px-4 text-sm font-semibold text-white hover:bg-brand md:self-auto">
          <ExternalLinkIcon className="h-4 w-4" /> Open live site
        </a>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-3">
        <section className="overflow-hidden rounded-3xl bg-panel text-white xl:col-span-2">
          <div className="flex items-center justify-between px-6 pt-6">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/45">Homepage hero</p>
              <h2 className="mt-1 text-[20px] font-bold">{content.heroSlides.length} slides live</h2>
            </div>
            <Link to="/admin/slider" className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-white px-3.5 text-sm font-semibold text-ink hover:bg-soft">
              Edit slider <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex h-[260px] gap-2 p-6">
            {content.heroSlides.map((s, i) =>
            <Link
              key={s.id}
              to="/admin/slider"
              className={`group relative overflow-hidden rounded-xl transition-[flex-grow] duration-300 ease-out ${i === 0 ? 'flex-[4]' : 'flex-1 hover:flex-[1.6]'}`}
              style={{ backgroundColor: s.tint }}>
              
                {s.image && <img src={s.image} alt="" className={`absolute inset-0 h-full w-full object-cover ${i === 0 ? '' : 'blur-[2px]'}`} />}
                <div className="absolute inset-0 bg-panel/35" />
                {s.video &&
              <span className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-ink">
                    <PlayIcon className="h-2.5 w-2.5 fill-ink" /> Video
                  </span>
              }
                {i === 0 ?
              <span className="absolute inset-x-0 bottom-0 p-5">
                    <span className="text-[12px] text-white/70">{s.label}</span>
                    <span className="mt-1 block max-w-[420px] font-serif text-[24px] font-light leading-tight">{s.title}</span>
                  </span> :

              <span className="absolute left-1/2 top-4 -translate-x-1/2 rotate-180 whitespace-nowrap text-[12px] [writing-mode:vertical-rl]">{s.label}</span>
              }
              </Link>
            )}
          </div>
        </section>

        <section className="flex flex-col rounded-3xl border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[16px] font-bold text-ink">
              <InboxIcon className="h-4 w-4 text-brand" /> Inbox
            </h2>
            {unread > 0 && <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-white">{unread} new</span>}
          </div>
          {submissions.length === 0 ?
          <p className="mt-6 flex-1 text-sm leading-relaxed text-muted">No enquiries yet. Messages sent through the site's contact form will appear here.</p> :

          <ul className="mt-4 flex-1 divide-y divide-line">
              {submissions.slice(0, 4).map((s) =>
            <li key={s.id} className="flex items-start gap-3 py-3">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${s.read ? 'bg-line' : 'bg-brand'}`} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">{s.email}</span>
                    <span className="block truncate text-xs text-muted">
                      {s.country} · {formatDistanceToNow(s.createdAt, { addSuffix: true })}
                    </span>
                  </span>
                </li>
            )}
            </ul>
          }
          <Link to="/admin/inbox" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
            Open inbox <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </section>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <section className="rounded-3xl border border-line bg-white xl:col-span-2">
          <h2 className="border-b border-line px-6 py-5 text-[16px] font-bold text-ink">Site content</h2>
          <ul className="grid sm:grid-cols-2">
            {collections.map((c) => {
              const count = (content[c.key] as unknown[]).length;
              return (
                <li key={c.key} className="border-b border-line sm:odd:border-r">
                  <Link to={`/admin/${c.path}`} className="group flex items-center gap-4 px-6 py-4 transition-colors duration-150 hover:bg-canvas">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-canvas text-ink ring-1 ring-line group-hover:bg-white group-hover:text-brand">
                      <c.icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold text-ink">{c.title}</span>
                      <span className="text-xs text-muted">
                        {count} {count === 1 ? c.itemLabel : `${c.itemLabel}s`}
                      </span>
                    </span>
                    <ArrowRightIcon className="h-4 w-4 text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </Link>
                </li>);

            })}
            <li className="border-b border-line sm:odd:border-r">
              <Link to="/admin/texts" className="group flex items-center gap-4 px-6 py-4 hover:bg-canvas">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-canvas ring-1 ring-line group-hover:text-brand">
                  <TypeIcon className="h-[18px] w-[18px]" />
                </span>
                <span className="flex-1">
                  <span className="block text-[14px] font-semibold text-ink">Page texts</span>
                  <span className="text-xs text-muted">Section headings</span>
                </span>
                <ArrowRightIcon className="h-4 w-4 text-muted" />
              </Link>
            </li>
          </ul>
        </section>

        <section className="flex flex-col rounded-3xl border border-line bg-white p-6">
          <h2 className="flex items-center gap-2 text-[16px] font-bold text-ink">
            <ImagesIcon className="h-4 w-4 text-brand" /> Media
          </h2>
          <div className="mt-4 grid grid-cols-4 gap-1.5">
            {library.filter((m) => m.kind === 'image').slice(0, 8).map((m) =>
            <img key={m.src} src={m.src} alt="" className="aspect-square w-full rounded-lg object-cover" />
            )}
          </div>
          <p className="mt-4 text-sm text-muted">
            {library.filter((m) => m.kind === 'image').length} images · {library.filter((m) => m.kind === 'video').length} videos
          </p>
          {storage && storage.quota > 0 &&
          <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <HardDriveIcon className="h-3.5 w-3.5" /> Browser storage
                </span>
                <span>
                  {formatBytes(storage.usage)} of {formatBytes(storage.quota)}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-canvas">
                <div className="h-full rounded-full bg-brand" style={{ width: `${Math.max(2, storage.usage / storage.quota * 100)}%` }} />
              </div>
            </div>
          }
          <Link to="/admin/media" className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand">
            Manage media <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>);

}