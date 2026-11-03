import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, XIcon } from 'lucide-react';
import type { CollectionDef } from '../../data/adminSchema';
import { FieldRenderer } from './FormFields';

export type Item = Record<string, unknown> & {id: string;};

type ItemDrawerProps = {
  def: CollectionDef;
  item: Item | null;
  isNew: boolean;
  onSave: (item: Item) => void;
  onClose: () => void;
};

export function ItemDrawer({ def, item, isNew, onSave, onClose }: ItemDrawerProps) {
  const [draft, setDraft] = useState<Item | null>(item);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setDraft(item);
    setErrors({});
  }, [item]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(item);

  const requestClose = () => {
    if (dirty && !window.confirm('Discard unsaved changes?')) return;
    onClose();
  };

  const save = () => {
    if (!draft) return;
    const next: Record<string, string> = {};
    def.fields.forEach((f) => {
      if (f.required && !String(draft[f.key] ?? '').trim()) next[f.key] = `${f.label} is required`;
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    onSave(draft);
  };

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        save();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <AnimatePresence>
      {item && draft &&
      <>
          <motion.div
          key="scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={requestClose}
          className="fixed inset-0 z-[60] bg-panel/50 backdrop-blur-[2px]" />
        
          <motion.aside
          key="drawer"
          role="dialog"
          aria-modal="true"
          aria-label={`${isNew ? 'New' : 'Edit'} ${def.itemLabel}`}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-[640px] flex-col bg-canvas shadow-2xl">
          
            <header className="flex items-center justify-between gap-4 border-b border-line bg-white px-6 py-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">{def.title}</p>
                <h2 className="truncate text-[18px] font-bold text-ink">
                  {isNew ? `New ${def.itemLabel}` : String(draft[def.titleKey] || `Untitled ${def.itemLabel}`)}
                </h2>
              </div>
              <button onClick={requestClose} aria-label="Close" className="rounded-xl p-2 text-muted hover:bg-canvas hover:text-ink">
                <XIcon className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {def.fields.map((f) =>
              <FieldRenderer
                key={f.key}
                field={f}
                value={draft[f.key]}
                error={errors[f.key]}
                onChange={(v) => {
                  setDraft((d) => d ? { ...d, [f.key]: v } : d);
                  if (errors[f.key]) setErrors((e) => ({ ...e, [f.key]: '' }));
                }} />

              )}
              </div>
            </div>

            <footer className="flex items-center justify-between gap-3 border-t border-line bg-white px-6 py-4">
              <span className="text-xs text-muted">
                {dirty ? 'Unsaved changes' : 'No changes yet'} · <kbd className="rounded border border-line px-1 font-sans">Ctrl</kbd>+<kbd className="rounded border border-line px-1 font-sans">S</kbd> to save
              </span>
              <div className="flex gap-2">
                <button onClick={requestClose} className="h-10 rounded-xl px-4 text-sm font-semibold text-ink hover:bg-canvas">
                  Cancel
                </button>
                <button
                onClick={save}
                disabled={!dirty && !isNew}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-brand px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1733b3] disabled:opacity-40">
                
                  <CheckIcon className="h-4 w-4" /> {isNew ? `Add ${def.itemLabel}` : 'Save changes'}
                </button>
              </div>
            </footer>
          </motion.aside>
        </>
      }
    </AnimatePresence>);

}