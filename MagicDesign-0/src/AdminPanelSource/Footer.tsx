import React, { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

export function Footer() {
  const { footerColumns, settings } = useContent().content;
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setState(/^\S+@\S+\.\S+$/.test(email) ? 'done' : 'error');
  };

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-20 md:px-14">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-8 text-[15px] text-white/70">Subscribe to our monthly insights digest</p>
            {state === 'done' ?
            <p role="status" className="mt-4 text-[15px]">You're subscribed. Check your inbox to confirm.</p> :

            <form onSubmit={subscribe} noValidate className="mt-4 flex max-w-[360px] border-b border-white/40 focus-within:border-white">
                <label htmlFor="newsletter" className="sr-only">Email</label>
                <input
                id="newsletter"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setState('idle');
                }}
                placeholder="Your email"
                className="flex-1 bg-transparent py-3 text-[15px] outline-none placeholder:text-white/50" />
              
                <button type="submit" aria-label="Subscribe" className="px-2">
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </form>
            }
            {state === 'error' && <p className="mt-2 text-sm text-red-300">Please enter a valid email</p>}
          </div>
          {footerColumns.map((col) =>
          <nav key={col.id} aria-label={col.title} className="lg:col-span-2 lg:col-start-auto">
              <h3 className="text-sm text-white/50">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) =>
              <li key={l}>
                    <a href="#top" className="text-[15px] text-white/90 transition-colors duration-150 hover:text-white hover:underline">{l}</a>
                  </li>
              )}
              </ul>
            </nav>
          )}
          <div className="lg:col-span-2">
            <h3 className="text-sm text-white/50">Follow</h3>
            <ul className="mt-5 space-y-3">
              {['LinkedIn', 'Facebook', 'Instagram', 'YouTube'].map((s) =>
              <li key={s}>
                  <a href="#top" className="text-[15px] text-white/90 hover:text-white hover:underline">{s}</a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-white/15 pt-8 text-sm text-white/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} <span className="capitalize">{settings.brandName}</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link to="/admin" className="hover:text-white">Admin</Link>
            <a href="#top" className="hover:text-white">Privacy policy</a>
            <a href="#top" className="hover:text-white">Cookie policy</a>
            <a href="#top" className="hover:text-white">Terms of use</a>
          </div>
        </div>
      </div>
    </footer>);

}