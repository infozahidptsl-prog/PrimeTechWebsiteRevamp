import React, { useRef, useState } from 'react';
import { FolderOpenIcon, ImageIcon, LinkIcon, Loader2Icon, Trash2Icon, UploadCloudIcon, VideoIcon } from 'lucide-react';
import { toast } from 'sonner';
import { MediaPicker } from './MediaPicker';
import { useContent } from '../../contexts/ContentContext';
import { MAX_IMAGE_BYTES, MAX_VIDEO_BYTES, fileToDataUrl, formatBytes } from '../../utils/files';

type MediaFieldProps = {kind: 'image' | 'video';value: string;onChange: (v: string) => void;};

export function MediaField({ kind, value, onChange }: MediaFieldProps) {
  const { addMedia } = useContent();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [picker, setPicker] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [url, setUrl] = useState('');

  const handleFile = async (file?: File) => {
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    if (kind === 'image' && !isImage || kind === 'video' && !isVideo) {
      toast.error(`Please choose ${kind === 'image' ? 'an image' : 'a video'} file`);
      return;
    }
    const max = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
    if (file.size > max) {
      toast.error(`File is too large (${formatBytes(file.size)}). Max ${formatBytes(max)} — use a URL instead.`);
      return;
    }
    setBusy(true);
    try {
      const src = await fileToDataUrl(file);
      addMedia({ name: file.name, kind, src, size: file.size });
      onChange(src);
      toast.success(`${file.name} uploaded`);
    } catch {
      toast.error('Upload failed');
    } finally {
      setBusy(false);
    }
  };

  const Icon = kind === 'image' ? ImageIcon : VideoIcon;

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        className={`relative overflow-hidden rounded-xl border bg-canvas transition-colors duration-150 ${drag ? 'border-brand bg-brand/5' : 'border-line'} ${value ? '' : 'border-dashed'}`}>
        
        {value ?
        <div className="group relative aspect-[16/9] bg-ink">
            {kind === 'image' ?
          <img src={value} alt="" className="h-full w-full object-cover" /> :

          <video src={value} controls muted playsInline className="h-full w-full object-cover" />
          }
            <div className="absolute right-2 top-2 flex gap-1.5">
              <button type="button" onClick={() => inputRef.current?.click()} className="rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-ink shadow-sm hover:bg-white">
                Replace
              </button>
              <button type="button" onClick={() => onChange('')} aria-label="Remove media" className="rounded-lg bg-white/95 p-1.5 text-red-600 shadow-sm hover:bg-white">
                <Trash2Icon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div> :

        <button type="button" onClick={() => inputRef.current?.click()} className="flex w-full flex-col items-center justify-center gap-2 px-4 py-8 text-center">
            {busy ?
          <Loader2Icon className="h-7 w-7 animate-spin text-brand" /> :

          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-sm">
                <UploadCloudIcon className="h-5 w-5" />
              </span>
          }
            <span className="text-[13px] font-semibold text-ink">{busy ? 'Uploading…' : `Drop ${kind === 'image' ? 'an image' : 'a video'} here or click to upload`}</span>
            <span className="text-xs text-muted">
              {kind === 'image' ? 'JPG, PNG, WEBP, GIF' : 'MP4, WEBM'} · up to {formatBytes(kind === 'image' ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES)}
            </span>
          </button>
        }
        <input ref={inputRef} type="file" accept={kind === 'image' ? 'image/*' : 'video/*'} className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <button type="button" onClick={() => setPicker(true)} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 text-xs font-semibold text-ink hover:bg-canvas">
          <FolderOpenIcon className="h-3.5 w-3.5" /> Library
        </button>
        <button
          type="button"
          onClick={() => {
            setUrl(value.startsWith('data:') ? '' : value);
            setUrlMode((v) => !v);
          }}
          className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold hover:bg-canvas ${urlMode ? 'border-brand text-brand' : 'border-line bg-white text-ink'}`}>
          
          <LinkIcon className="h-3.5 w-3.5" /> Use URL
        </button>
        {!value &&
        <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted">
            <Icon className="h-3.5 w-3.5" /> No {kind} set
          </span>
        }
      </div>

      {urlMode &&
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChange(url.trim());
          setUrlMode(false);
        }}
        className="mt-2 flex gap-2">
        
          <input
          autoFocus
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={kind === 'image' ? 'https://…/photo.jpg' : 'https://…/clip.mp4'}
          className="h-9 flex-1 rounded-lg border border-line bg-white px-3 text-[13px] outline-none focus:border-brand" />
        
          <button type="submit" className="h-9 rounded-lg bg-brand px-3 text-xs font-semibold text-white">
            Apply
          </button>
        </form>
      }

      <MediaPicker
        open={picker}
        kind={kind}
        onClose={() => setPicker(false)}
        onSelect={(src) => {
          onChange(src);
          setPicker(false);
        }} />
      
    </div>);

}