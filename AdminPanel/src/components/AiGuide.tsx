import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SendIcon, SparklesIcon, XIcon } from 'lucide-react';
import { aiGuideAnswers } from '../data/site';

type Msg = {from: 'bot' | 'user';text: string;};

const suggestions = ['What AI services do you offer?', 'Help with a cloud migration', 'How is pricing set?'];

export function AiGuide() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
  { from: 'bot', text: "Hi! I'm the AI Guide. Ask me about our services, industries or how we work." }]
  );
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [msgs, typing]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    setMsgs((m) => [...m, { from: 'user', text: t }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: 'bot', text: reply(t) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      <AnimatePresence>
        {open &&
        <motion.div
          role="dialog"
          aria-label="AI Guide"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-20 left-1/2 z-50 flex h-[480px] w-[calc(100%-32px)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
          style={{ x: '-50%' }}>
          
            <div className="flex items-center justify-between bg-guide px-5 py-4 text-white">
              <span className="flex items-center gap-2 font-semibold">
                <SparklesIcon className="h-4 w-4" /> AI Guide
              </span>
              <button aria-label="Close AI Guide" onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-white/15">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-5" aria-live="polite">
              {msgs.map((m, i) =>
            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : ''}`}>
                  <p className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.from === 'user' ? 'bg-ink text-white' : 'bg-soft text-ink'}`}>
                    {m.text}
                  </p>
                </div>
            )}
              {typing && <p className="text-sm text-muted">AI Guide is typing…</p>}
              {msgs.length === 1 &&
            <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) =>
              <button key={s} onClick={() => send(s)} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink hover:border-guide hover:text-guide">
                      {s}
                    </button>
              )}
                </div>
            }
              <div ref={endRef} />
            </div>
            <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-line p-3">
            
              <label htmlFor="guide-input" className="sr-only">Message</label>
              <input
              id="guide-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 rounded-full bg-soft px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-guide/40" />
            
              <button type="submit" aria-label="Send" disabled={!input.trim()} className="flex h-10 w-10 items-center justify-center rounded-full bg-guide text-white disabled:opacity-50">
                <SendIcon className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        }
      </AnimatePresence>

      <button
        type="button"
        id="advisor"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-0 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-t-md bg-guide px-6 py-3 text-[15px] font-medium text-white transition-colors duration-150 hover:bg-brand">
        
        AI Guide <SparklesIcon className="h-4 w-4" />
      </button>
    </>);

}

function reply(text: string) {
  const lower = text.toLowerCase();
  const hit = aiGuideAnswers.find((a) => a.keywords.some((k) => lower.includes(k)));
  return hit ?
  hit.answer :
  "Good question. The quickest way to get a detailed answer is to share your needs in the contact form — a consultant will follow up within two business days.";
}