import React, { useState } from 'react';
import { Reorder } from 'framer-motion';
import { ExternalLinkIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import type { CollectionDef } from '../../data/adminSchema';
import type { SiteContent } from '../../types/content';
import { useContent } from '../../contexts/ContentContext';
import { uid } from '../../utils/files';
import { CollectionRow } from './CollectionRow';
import { ConfirmDialog } from './ConfirmDialog';
import { ItemDrawer, type Item } from './ItemDrawer';
import { PageHeader } from './PageHeader';

export function CollectionEditor({ def }: {def: CollectionDef;}) {
  const { content, updateCollection } = useContent();
  const items = content[def.key] as unknown as Item[];
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Item | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toDelete, setToDelete] = useState<Item | null>(null);

  const commit = (next: Item[]) => updateCollection(def.key, next as unknown as SiteContent[typeof def.key]);
  const q = query.trim().toLowerCase();
  const filtered = q ? items.filter((i) => JSON.stringify(i).toLowerCase().includes(q)) : items;

  const openNew = () => {
    setIsNew(true);
    setEditing(def.template() as Item);
  };

  const save = (item: Item) => {
    if (isNew) {
      commit([...items, item]);
      toast.success(`${cap(def.itemLabel)} added`);
    } else {
      commit(items.map((i) => i.id === item.id ? item : i));
      toast.success('Changes saved');
    }
    setEditing(null);
  };

  const duplicate = (item: Item, index: number) => {
    const copy = { ...item, id: uid(), [def.titleKey]: `${String(item[def.titleKey] ?? '')} (copy)` };
    const next = [...items];
    next.splice(index + 1, 0, copy);
    commit(next);
    toast.success(`${cap(def.itemLabel)} duplicated`);
  };

  const remove = () => {
    if (!toDelete) return;
    const prev = items;
    commit(items.filter((i) => i.id !== toDelete.id));
    toast(`${cap(def.itemLabel)} deleted`, { action: { label: 'Undo', onClick: () => commit(prev) } });
    setToDelete(null);
  };

  return (
    <div>
      <PageHeader
        icon={def.icon}
        title={def.title}
        description={def.description}
        actions={
        <>
            <Link to="/" target="_blank" className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-ink hover:bg-canvas">
              <ExternalLinkIcon className="h-4 w-4" /> Preview
            </Link>
            <button onClick={openNew} className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold text-white shadow-sm shadow-brand/30 transition-colors duration-150 hover:bg-[#1733b3]">
              <PlusIcon className="h-4 w-4" /> Add {def.itemLabel}
            </button>
          </>
        } />
      

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-[320px]">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${def.title.toLowerCase()}…`}
            className="h-10 w-full rounded-xl border border-line bg-white pl-10 pr-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
          
        </div>
        <p className="text-[13px] text-muted">
          {items.length} {items.length === 1 ? def.itemLabel : `${def.itemLabel}s`}
          {q ? ` · ${filtered.length} match` : ' · drag the handle to reorder'}
        </p>
      </div>

      {filtered.length === 0 ?
      <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-canvas text-brand">
            <def.icon className="h-5 w-5" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">{q ? 'Nothing matches your search' : `No ${def.itemLabel}s yet`}</p>
          <p className="mt-1 text-sm text-muted">{q ? 'Try a different keyword.' : `Add your first ${def.itemLabel} to show it on the site.`}</p>
          {!q &&
        <button onClick={openNew} className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-xl bg-ink px-4 text-sm font-semibold text-white">
              <PlusIcon className="h-4 w-4" /> Add {def.itemLabel}
            </button>
        }
        </div> :

      <Reorder.Group axis="y" values={filtered} onReorder={(next) => !q && commit(next)} className="mt-5 space-y-2.5">
          {filtered.map((item, i) =>
        <CollectionRow
          key={item.id}
          def={def}
          item={item}
          index={i}
          draggable={!q}
          onEdit={() => {
            setIsNew(false);
            setEditing(item);
          }}
          onDuplicate={() => duplicate(item, items.indexOf(item))}
          onDelete={() => setToDelete(item)} />

        )}
        </Reorder.Group>
      }

      <ItemDrawer def={def} item={editing} isNew={isNew} onSave={save} onClose={() => setEditing(null)} />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title={`Delete this ${def.itemLabel}?`}
        message={`“${String(toDelete?.[def.titleKey] ?? '')}” will be removed from the site. You can undo right after.`}
        onConfirm={remove}
        onCancel={() => setToDelete(null)} />
      
    </div>);

}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}