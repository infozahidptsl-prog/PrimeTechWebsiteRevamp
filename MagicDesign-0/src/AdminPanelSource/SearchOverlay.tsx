import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon, SearchIcon, XIcon } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import type { SiteContent } from '../types/content';

type SearchOverlayProps = {open: boolean;onClose: () => void;};

function buildIndex({ caseStudies, helpAreas, industries, insights, serviceGroups }: SiteContent) {
  return [
  ...helpAreas.map((s) => ({ id: s.id, group: 'Services', title: s.title, href: '#services' })),
  ...serviceGroups.flatMap((g) => g.links.map((l) => ({ id: l, group: g.title, title: l, href: '#services' }))),
  ...industries.map((i) => ({ id: i.id, group: 'Industries', title: i.name, href: '#industries' })),
  ...caseStudies.map((c) => ({ id: c.id, group: 'Success stories', title: c.title, href: '#clients' })),
  ...insights.map((p) => ({ id: p.id, group: 'Insights', title: p.title, href: '#insights' }))];

}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const { content } = useContent();
  const index = useMemo(() => buildIndex(content), [content]);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQ('');
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return index.filter((x) => x.title.toLowerCase().includes(term));
  }, [q, index]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-ink/40"
        onClick={onClose}>
        
          <motion.div
          initial={{ y: -16 }}
          animate={{ y: 0 }}
          exit={{ y: -16 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white">
          
            <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-8 md:px-14">
              <div className="flex items-center gap-4 border-b border-ink pb-4">
                <SearchIcon className="h-6 w-6 text-muted" />
                <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services, industries, insights…"
                className="flex-1 bg-transparent font-serif text-[28px] text-ink outline-none placeholder:text-muted/60 md:text-[36px]" />
              
                <button aria-label="Close search" onClick={onClose} className="flex h-12 w-12 items-center justify-center rounded-full bg-soft hover:bg-line">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="max-h-[50vh] overflow-y-auto pt-6">
                {!q.trim() &&
              <div className="flex flex-wrap gap-2">
                    {['AI', 'Cloud', 'Insurance', 'Data', 'Healthcare'].map((s) =>
                <button key={s} onClick={() => setQ(s)} className="rounded-full bg-soft px-4 py-2 text-sm text-ink hover:bg-line">
                        {s}
                      </button>
                )}
                  </div>
              }
                {q.trim() && results.length === 0 && <p className="text-muted">No results for “{q}”. Try a different keyword.</p>}
                <ul>
                  {results.map((r) =>
                <li key={`${r.group}-${r.id}`}>
                      <a href={r.href} onClick={onClose} className="group flex items-center justify-between gap-6 border-b border-line py-4">
                        <span>
                          <span className="block text-xs text-muted">{r.group}</span>
                          <span className="text-[17px] text-ink group-hover:text-brand">{r.title}</span>
                        </span>
                        <ArrowUpRightIcon className="h-4 w-4 shrink-0 group-hover:text-brand" />
                      </a>
                    </li>
                )}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}