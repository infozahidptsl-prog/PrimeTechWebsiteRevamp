import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CopyIcon, ImagesIcon, Loader2Icon, PlayIcon, Trash2Icon, UploadCloudIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '../../components/admin/PageHeader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useContent } from '../../contexts/ContentContext';
import { collectLibrary, type LibraryItem } from '../../utils/media';
import { MAX_IMAGE_BYTES, MAX_VIDEO_BYTES, fileToDataUrl, formatBytes } from '../../utils/files';

type Filter = 'all' | 'image' | 'video';

export function MediaLibrary() {
  const { content, media, addMedia, removeMedia } = useContent();
  const [filter, setFilter] = useState<Filter>('all');
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(0);
  const [preview, setPreview] = useState<LibraryItem | null>(null);
  const [toDelete, setToDelete] = useState<LibraryItem | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const library = useMemo(() => collectLibrary(content, media), [content, media]);
  const shown = filter === 'all' ? library : library.filter((m) => m.kind === filter);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    const list = Array.from(files);
    setBusy(list.length);
    for (const file of list) {
      const kind = file.type.startsWith('video/') ? 'video' : file.type.startsWith('image/') ? 'image' : null;
      if (!kind) {
        toast.error(`${file.name}: unsupported file type`);
      } else if (file.size > (kind === 'video' ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES)) {
        toast.error(`${file.name} is too large`);
      } else {
        try {
          const src = await fileToDataUrl(file);
          addMedia({ name: file.name, kind, src, size: file.size });
        } catch {
          toast.error(`${file.name} failed to upload`);
        }
      }
      setBusy((b) => b - 1);
    }
    toast.success(`${list.length} file${list.length > 1 ? 's' : ''} processed`);
  };

  const copy = async (src: string) => {
    try {
      await navigator.clipboard.writeText(src);
      toast.success('Link copied');
    } catch {
      toast.error('Could not copy');
    }
  };

  const counts = { all: library.length, image: library.filter((m) => m.kind === 'image').length, video: library.filter((m) => m.kind === 'video').length };

  return (
    <div>
      <PageHeader
        icon={ImagesIcon}
        title="Media library"
        description="Every image and video used on the site, plus anything you upload. Pick from here inside any media field."
        actions={
        <button onClick={() => inputRef.current?.click()} className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-[#1733b3]">
            <UploadCloudIcon className="h-4 w-4" /> Upload files
          </button>
        } />
      
      <input ref={inputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={(e) => upload(e.target.files)} />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          upload(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className={`mt-8 flex cursor-pointer items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-8 transition-colors duration-150 ${drag ? 'border-brand bg-brand/5' : 'border-line bg-white hover:border-brand/50'}`}>
        
        {busy > 0 ? <Loader2Icon className="h-6 w-6 animate-spin text-brand" /> : <UploadCloudIcon className="h-6 w-6 text-brand" />}
        <div>
          <p className="text-[14px] font-semibold text-ink">{busy > 0 ? `Uploading ${busy} file${busy > 1 ? 's' : ''}…` : 'Drag & drop images or videos here'}</p>
          <p className="text-xs text-muted">
            Images up to {formatBytes(MAX_IMAGE_BYTES)}, videos up to {formatBytes(MAX_VIDEO_BYTES)} · stored in this browser
          </p>
        </div>
      </div>

      <div role="tablist" className="mt-8 inline-flex rounded-xl bg-white p-1 ring-1 ring-line">
        {(['all', 'image', 'video'] as Filter[]).map((f) =>
        <button
          key={f}
          role="tab"
          aria-selected={filter === f}
          onClick={() => setFilter(f)}
          className={`h-8 rounded-lg px-3.5 text-[13px] font-semibold transition-colors duration-150 ${filter === f ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}>
          
            {f === 'all' ? 'All' : f === 'image' ? 'Images' : 'Videos'} <span className="ml-1 opacity-60">{counts[f]}</span>
          </button>
        )}
      </div>

      {shown.length === 0 ?
      <p className="mt-10 text-center text-sm text-muted">Nothing here yet.</p> :

      <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {shown.map((m) =>
        <li key={m.src} className="group overflow-hidden rounded-2xl border border-line bg-white">
              <button onClick={() => setPreview(m)} className="relative block aspect-[4/3] w-full bg-ink">
                {m.kind === 'image' ?
            <img src={m.src} alt="" className="h-full w-full object-cover" /> :

            <>
                    <video src={m.src} muted preload="metadata" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
                        <PlayIcon className="ml-0.5 h-4 w-4 fill-ink text-ink" />
                      </span>
                    </span>
                  </>
            }
              </button>
              <div className="p-3">
                <p className="truncate text-[13px] font-semibold text-ink">{m.name}</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className={`truncate text-xs ${m.usedIn.length ? 'text-emerald-700' : 'text-muted'}`}>
                    {m.usedIn.length ? `Used in ${m.usedIn.length} place${m.usedIn.length > 1 ? 's' : ''}` : 'Not used'}
                    {m.size ? ` · ${formatBytes(m.size)}` : ''}
                  </span>
                  <span className="flex shrink-0">
                    <button onClick={() => copy(m.src)} aria-label="Copy link" title="Copy link" className="rounded-md p-1.5 text-muted hover:bg-canvas hover:text-ink">
                      <CopyIcon className="h-3.5 w-3.5" />
                    </button>
                    {m.uploadedId &&
                <button onClick={() => setToDelete(m)} aria-label="Delete" title="Delete" className="rounded-md p-1.5 text-muted hover:bg-red-50 hover:text-red-600">
                        <Trash2Icon className="h-3.5 w-3.5" />
                      </button>
                }
                  </span>
                </div>
              </div>
            </li>
        )}
        </ul>
      }

      <AnimatePresence>
        {preview &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-panel/80 p-4 backdrop-blur-sm">
          
            <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[960px] overflow-hidden rounded-2xl bg-white">
            
              <div className="bg-ink">
                {preview.kind === 'image' ?
              <img src={preview.src} alt="" className="max-h-[65vh] w-full object-contain" /> :

              <video src={preview.src} controls autoPlay className="max-h-[65vh] w-full" />
              }
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{preview.name}</p>
                  <p className="mt-1 text-xs text-muted">{preview.usedIn.length ? preview.usedIn.join(' · ') : 'Not used on the site yet'}</p>
                </div>
                <button onClick={() => setPreview(null)} aria-label="Close" className="rounded-lg p-2 text-muted hover:bg-canvas">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete this file?"
        message={toDelete?.usedIn.length ? `It's still used in ${toDelete.usedIn.length} place(s). Those spots will keep working until you replace them, but it will leave the library.` : 'It will be removed from your library.'}
        onConfirm={() => {
          if (toDelete?.uploadedId) removeMedia(toDelete.uploadedId);
          setToDelete(null);
          toast.success('File deleted');
        }}
        onCancel={() => setToDelete(null)} />
      
    </div>);

}