import React from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { CopyIcon, GripVerticalIcon, PencilIcon, PlayIcon, Trash2Icon } from 'lucide-react';
import type { CollectionDef } from '../../data/adminSchema';
import type { Item } from './ItemDrawer';

type CollectionRowProps = {
  def: CollectionDef;
  item: Item;
  index: number;
  draggable: boolean;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
};

export function CollectionRow({ def, item, index, draggable, onEdit, onDuplicate, onDelete }: CollectionRowProps) {
  const controls = useDragControls();
  const image = def.mediaKey ? String(item[def.mediaKey] ?? '') : '';
  const video = def.videoKey ? String(item[def.videoKey] ?? '') : '';
  const hasMedia = Boolean(def.mediaKey || def.videoKey);
  const subtitle = def.subtitleKey ? String(item[def.subtitleKey] ?? '') : '';
  const listKey = def.fields.find((f) => f.type === 'list')?.key;
  const listCount = listKey && Array.isArray(item[listKey]) ? (item[listKey] as unknown[]).length : null;

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      whileDrag={{ scale: 1.01, boxShadow: '0 16px 40px -12px rgba(15,17,23,0.25)' }}
      className="group relative flex items-center gap-3 rounded-2xl border border-line bg-white p-3 pr-4 transition-[border-color] duration-150 hover:border-brand/40">
      
      <button
        type="button"
        onPointerDown={(e) => draggable && controls.start(e)}
        aria-label="Drag to reorder"
        disabled={!draggable}
        className="cursor-grab touch-none rounded-lg p-1 text-muted/60 hover:bg-canvas hover:text-ink active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-30">
        
        <GripVerticalIcon className="h-4 w-4" />
      </button>

      <button type="button" onClick={onEdit} className="flex min-w-0 flex-1 items-center gap-4 text-left">
        {hasMedia ?
        <span className="relative h-14 w-[88px] shrink-0 overflow-hidden rounded-xl bg-canvas ring-1 ring-line">
            {image ?
          <img src={image} alt="" className="h-full w-full object-cover" /> :
          video ?
          <video src={video} muted preload="metadata" className="h-full w-full object-cover" /> :

          <span className="flex h-full items-center justify-center text-[10px] font-semibold uppercase text-muted">No media</span>
          }
            {video &&
          <span className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded-md bg-panel/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                <PlayIcon className="h-2.5 w-2.5 fill-white" /> Video
              </span>
          }
          </span> :

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-canvas text-sm font-bold tabular-nums text-ink ring-1 ring-line">
            {String(index + 1).padStart(2, '0')}
          </span>
        }
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-ink">{String(item[def.titleKey] || 'Untitled')}</span>
          <span className="mt-0.5 flex items-center gap-2 text-[13px] text-muted">
            {subtitle && <span className="truncate">{subtitle}</span>}
            {listCount !== null &&
            <span className="shrink-0 rounded-md bg-canvas px-1.5 py-0.5 text-[11px] font-semibold text-ink/70">{listCount} items</span>
            }
          </span>
        </span>
      </button>

      {def.colorKey && <span className="h-5 w-5 rounded-full ring-1 ring-line" style={{ backgroundColor: String(item[def.colorKey]) }} />}

      <div className="flex shrink-0 items-center gap-0.5 opacity-100 transition-opacity duration-150 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
        <button onClick={onEdit} aria-label="Edit" title="Edit" className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-ink">
          <PencilIcon className="h-4 w-4" />
        </button>
        <button onClick={onDuplicate} aria-label="Duplicate" title="Duplicate" className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-ink">
          <CopyIcon className="h-4 w-4" />
        </button>
        <button onClick={onDelete} aria-label="Delete" title="Delete" className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-600">
          <Trash2Icon className="h-4 w-4" />
        </button>
      </div>
    </Reorder.Item>);

}