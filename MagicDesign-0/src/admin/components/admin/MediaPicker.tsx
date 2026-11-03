import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlayIcon, XIcon } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { collectLibrary } from '../../utils/media';

type MediaPickerProps = {open: boolean;kind: 'image' | 'video';onClose: () => void;onSelect: (src: string) => void;};

export function MediaPicker({ open, kind, onClose, onSelect }: MediaPickerProps) {
  const { content, media } = useContent();
  const items = useMemo(() => collectLibrary(content, media).filter((m) => m.kind === kind), [content, media, kind]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-panel/60 p-4 backdrop-blur-sm">
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Choose from library"
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[80vh] w-full max-w-[860px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div>
                <p className="text-[16px] font-bold text-ink">Choose {kind === 'image' ? 'an image' : 'a video'}</p>
                <p className="text-xs text-muted">{items.length} available in your library</p>
              </div>
              <button onClick={onClose} aria-label="Close" className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-ink">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              {items.length === 0 ?
            <p className="py-16 text-center text-sm text-muted">No {kind}s yet. Upload one from the field or the Media library.</p> :

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {items.map((m) =>
              <li key={m.src}>
                      <button
                  onClick={() => onSelect(m.src)}
                  className="group block w-full overflow-hidden rounded-xl border border-line text-left transition-[border-color,box-shadow] duration-150 hover:border-brand hover:ring-4 hover:ring-brand/10">
                  
                        <span className="relative block aspect-[4/3] bg-ink">
                          {m.kind === 'image' ?
                    <img src={m.src} alt="" className="h-full w-full object-cover" /> :

                    <>
                              <video src={m.src} muted preload="metadata" className="h-full w-full object-cover" />
                              <PlayIcon className="absolute left-2 top-2 h-4 w-4 fill-white text-white" />
                            </>
                    }
                        </span>
                        <span className="block truncate px-2.5 py-2 text-xs text-ink">{m.name}</span>
                      </button>
                    </li>
              )}
                </ul>
            }
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}