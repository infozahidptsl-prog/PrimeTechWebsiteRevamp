import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FieldDef } from '../../data/adminSchema';
import { FieldRenderer } from './FormFields';

type ObjectFormProps<T extends Record<string, unknown>> = {
  title: string;
  description?: string;
  fields: FieldDef[];
  value: T;
  onSave: (v: T) => void;
};

export function ObjectForm<T extends Record<string, unknown>>({ title, description, fields, value, onSave }: ObjectFormProps<T>) {
  const [draft, setDraft] = useState<T>(value);
  useEffect(() => setDraft(value), [value]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(value);

  return (
    <section className="rounded-2xl border border-line bg-white">
      <header className="border-b border-line px-6 py-5">
        <h2 className="text-[16px] font-bold text-ink">{title}</h2>
        {description && <p className="mt-0.5 text-[13px] text-muted">{description}</p>}
      </header>
      <div className="grid gap-5 p-6 sm:grid-cols-2">
        {fields.map((f) =>
        <FieldRenderer key={f.key} field={f} value={draft[f.key]} onChange={(v) => setDraft((d) => ({ ...d, [f.key]: v }))} />
        )}
      </div>
      <AnimatePresence>
        {dirty &&
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="sticky bottom-4 z-10 mx-4 mb-4 flex items-center justify-between gap-3 rounded-2xl bg-panel px-5 py-3 text-white shadow-xl">
          
            <span className="text-sm">You have unsaved changes</span>
            <div className="flex gap-2">
              <button onClick={() => setDraft(value)} className="h-9 rounded-xl px-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white">
                Discard
              </button>
              <button onClick={() => onSave(draft)} className="h-9 rounded-xl bg-white px-4 text-sm font-semibold text-ink hover:bg-soft">
                Save changes
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}