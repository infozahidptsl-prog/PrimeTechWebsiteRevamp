import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '../../data/site';
import { useContent } from '../../contexts/ContentContext';

export const ADMIN_PASSWORD = 'admin123';

export function AdminLogin({ onSuccess }: {onSuccess: () => void;}) {
  const { brandName } = useContent().content.settings;
  const [email, setEmail] = useState('admin@novium.example');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) return setError('Enter a valid email');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (password === ADMIN_PASSWORD) onSuccess();else
      setError('Incorrect password. Try admin123');
    }, 500);
  };

  return (
    <div className="grid min-h-screen w-full bg-white lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-panel lg:block">
        <img src={images.overview} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-panel/40" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <p className="text-[28px] font-bold">{brandName}</p>
          <div>
            <p className="max-w-[460px] font-serif text-[48px] font-light leading-[1.05]">Every word, image and video on your site — in one place.</p>
            <p className="mt-5 max-w-[400px] text-[15px] text-white/75">Edit the slider, stories, sectors and more. Changes go live instantly.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          onSubmit={submit}
          className="w-full max-w-[380px]">
          
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <LockIcon className="h-5 w-5" />
          </span>
          <h1 className="mt-6 text-[28px] font-bold tracking-tight text-ink">Sign in to the studio</h1>
          <p className="mt-1.5 text-sm text-muted">
            Demo password: <code className="rounded bg-canvas px-1.5 py-0.5 font-mono text-ink">{ADMIN_PASSWORD}</code>
          </p>

          <label className="mt-8 block text-[13px] font-semibold text-ink" htmlFor="admin-email">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-xl border border-line px-4 text-[15px] outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
          
          <label className="mt-5 block text-[13px] font-semibold text-ink" htmlFor="admin-pass">
            Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="admin-pass"
              type={show ? 'text' : 'password'}
              value={password}
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
              className={`h-12 w-full rounded-xl border px-4 pr-12 text-[15px] outline-none focus:ring-4 ${error ? 'border-red-400 focus:ring-red-100' : 'border-line focus:border-brand focus:ring-brand/10'}`} />
            
            <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted hover:text-ink">
              {show ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-brand disabled:opacity-60">
            
            {loading ? 'Signing in…' : 'Sign in'} <ArrowRightIcon className="h-4 w-4" />
          </button>
          <Link to="/" className="mt-6 block text-center text-sm text-muted hover:text-ink">
            ← Back to website
          </Link>
        </motion.form>
      </div>
    </div>);

}