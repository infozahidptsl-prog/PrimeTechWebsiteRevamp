import React, { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, XIcon } from 'lucide-react';
import type { FieldDef } from '../../data/adminSchema';
import { MediaField } from './MediaField';

export const inputBase =
'w-full rounded-xl border border-line bg-white px-3.5 text-[14px] text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/10';

type FieldProps = {field: FieldDef;value: unknown;onChange: (v: unknown) => void;error?: string;};

export function FieldRenderer({ field, value, onChange, error }: FieldProps) {
  const id = `f-${field.key}`;
  return (
    <div className={field.full ? 'sm:col-span-2' : ''}>
      {field.type !== 'toggle' &&
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-3 text-[13px] font-semibold text-ink">
          <span>
            {field.label}
            {field.required && <span className="text-brand"> *</span>}
          </span>
        </label>
      }
      <Control id={id} field={field} value={value} onChange={onChange} error={error} />
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : field.help && <p className="mt-1.5 text-xs text-muted">{field.help}</p>}
    </div>);

}

function Control({ id, field, value, onChange, error }: FieldProps & {id: string;}) {
  const errCls = error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : '';
  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          id={id}
          rows={field.rows ?? 3}
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} resize-y py-2.5 leading-relaxed ${errCls}`} />);


    case 'select':
      return (
        <select id={id} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} className={`${inputBase} h-11 cursor-pointer`}>
          {field.options?.map((o) =>
          <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )}
        </select>);

    case 'color':
      return (
        <div className="flex h-11 items-center gap-2 rounded-xl border border-line bg-white pl-1.5 pr-3.5 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
          <input type="color" value={String(value || '#000000')} onChange={(e) => onChange(e.target.value)} className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent p-0" aria-label={field.label} />
          <input id={id} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent font-mono text-[13px] uppercase outline-none" />
        </div>);

    case 'toggle':
      return <Toggle id={id} label={field.label} help={field.help} checked={Boolean(value)} onChange={onChange} />;
    case 'list':
      return <ListInput id={id} value={Array.isArray(value) ? value as string[] : []} onChange={onChange} placeholder={field.placeholder} />;
    case 'image':
    case 'video':
      return <MediaField kind={field.type} value={String(value ?? '')} onChange={(v) => onChange(v)} />;
    default:
      return (
        <input
          id={id}
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} h-11 ${errCls}`} />);


  }
}

function Toggle({ id, label, help, checked, onChange }: {id: string;label: string;help?: string;checked: boolean;onChange: (v: boolean) => void;}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-4 py-3">
      <span>
        <label htmlFor={id} className="block text-[13px] font-semibold text-ink">
          {label}
        </label>
        {help && <span className="text-xs text-muted">{help}</span>}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 ${checked ? 'bg-brand' : 'bg-line'}`}>
        
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-150 ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
      </button>
    </div>);

}

function ListInput({ id, value, onChange, placeholder }: {id: string;value: string[];onChange: (v: string[]) => void;placeholder?: string;}) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const t = draft.trim();
    if (!t) return;
    onChange([...value, t]);
    setDraft('');
  };
  const move = (i: number, dir: number) => {
    const next = [...value];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="rounded-xl border border-line bg-white p-2">
      {value.length > 0 &&
      <ul className="mb-2 space-y-1.5">
          {value.map((item, i) =>
        <li key={i} className="group flex items-center gap-1.5 rounded-lg bg-canvas pl-3 pr-1">
              <span className="w-5 shrink-0 text-xs tabular-nums text-muted">{i + 1}</span>
              <input
            value={item}
            onChange={(e) => onChange(value.map((v, k) => k === i ? e.target.value : v))}
            className="h-9 flex-1 bg-transparent text-[14px] outline-none"
            aria-label={`Item ${i + 1}`} />
          
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="rounded-md p-1.5 text-muted hover:bg-white hover:text-ink disabled:opacity-30">
                <ArrowUpIcon className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down" className="rounded-md p-1.5 text-muted hover:bg-white hover:text-ink disabled:opacity-30">
                <ArrowDownIcon className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={() => onChange(value.filter((_, k) => k !== i))} aria-label="Remove" className="rounded-md p-1.5 text-muted hover:bg-red-50 hover:text-red-600">
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </li>
        )}
        </ul>
      }
      <div className="flex items-center gap-2">
        <input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder ?? 'Type and press Enter'}
          className="h-9 flex-1 bg-transparent px-2 text-[14px] outline-none placeholder:text-muted/60" />
        
        <button type="button" onClick={add} disabled={!draft.trim()} className="inline-flex h-8 items-center gap-1 rounded-lg bg-ink px-2.5 text-xs font-semibold text-white disabled:opacity-30">
          <PlusIcon className="h-3.5 w-3.5" /> Add
        </button>
      </div>
    </div>);

}