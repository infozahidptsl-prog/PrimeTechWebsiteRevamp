import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangleIcon } from 'lucide-react';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onCancel}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-panel/60 p-4 backdrop-blur-sm">
        
          <motion.div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl">
          
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertTriangleIcon className="h-5 w-5" />
            </span>
            <h2 id="confirm-title" className="mt-4 text-[17px] font-bold text-ink">
              {title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{message}</p>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={onCancel} className="h-10 rounded-xl px-4 text-sm font-semibold text-ink hover:bg-canvas">
                Cancel
              </button>
              <button autoFocus onClick={onConfirm} className="h-10 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700">
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}