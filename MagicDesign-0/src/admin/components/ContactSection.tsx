import React, { useState } from 'react';
import { CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

type FormState = {email: string;phone: string;country: string;message: string;consent: boolean;};
type Errors = Partial<Record<keyof FormState, string>>;

const empty: FormState = { email: '', phone: '', country: '', message: '', consent: false };

export function ContactSection() {
  const { content, addSubmission } = useContent();
  const { countries, sections, settings } = content;
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const update = <K extends keyof FormState,>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('sending');
    setTimeout(() => {
      addSubmission({ email: form.email, phone: form.phone, country: form.country, message: form.message });
      setStatus('sent');
    }, 900);
  };

  return (
    <section id="contact" className="scroll-mt-24 px-5 pb-24 md:px-14 md:pb-32">
      <div className="grid overflow-hidden rounded-[6px] bg-[#1f1e2b] text-white lg:grid-cols-2">
        <div className="relative hidden min-h-[560px] lg:block">
          {settings.consultImage && <img src={settings.consultImage} alt="" className="absolute inset-0 h-full w-full object-cover" />}
        </div>
        <div className="px-6 py-12 md:px-14 md:py-16">
          <h2 className="max-w-[520px] font-serif text-[36px] font-light leading-[1.1] md:text-[48px]">{sections.contactHeading}</h2>

          {status === 'sent' ?
          <div role="status" className="mt-10">
              <CheckCircle2Icon className="h-10 w-10 text-[#a9b6ff]" />
              <p className="mt-5 text-[22px]">Thank you — your request is in.</p>
              <p className="mt-2 text-white/70">We'll reply to {form.email} within two business days.</p>
              <button
              onClick={() => {
                setForm(empty);
                setStatus('idle');
              }}
              className="mt-8 h-10 rounded-full bg-white px-5 text-[15px] font-bold text-ink hover:bg-soft">
              
                Send another request
              </button>
            </div> :

          <form onSubmit={submit} noValidate className="mt-10 grid gap-7 sm:grid-cols-2">
              <Field label="Email*" hint="So we can reply to your request" error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls(errors.email)} autoComplete="email" />
              </Field>
              <Field label="Phone number*" hint="So we can call you back" error={errors.phone}>
                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputCls(errors.phone)} autoComplete="tel" />
              </Field>
              <Field label="Country*" hint="To route you to the right team" error={errors.country}>
                <select value={form.country} onChange={(e) => update('country', e.target.value)} className={`${inputCls(errors.country)} [&>option]:text-ink`}>
                  <option value="">Select country</option>
                  {countries.map((c) =>
                <option key={c} value={c}>{c}</option>
                )}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Tell us about your project" error={errors.message}>
                  <textarea rows={3} value={form.message} onChange={(e) => update('message', e.target.value)} className={`${inputCls()} resize-none`} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm text-white/70">
                  <input type="checkbox" checked={form.consent} onChange={(e) => update('consent', e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#a9b6ff]" />
                  I agree to the processing of my personal data in line with the privacy policy.
                </label>
                {errors.consent && <p className="mt-2 text-sm text-red-300">{errors.consent}</p>}
              </div>
              <div className="sm:col-span-2">
                <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[15px] font-bold text-ink transition-colors duration-150 hover:bg-soft disabled:opacity-70">
                
                  {status === 'sending' && <Loader2Icon className="h-4 w-4 animate-spin" />}
                  {status === 'sending' ? 'Sending…' : 'Send request'}
                </button>
              </div>
            </form>
          }
        </div>
      </div>
    </section>);

}

function Field({ label, hint, error, children }: {label: string;hint?: string;error?: string;children: React.ReactNode;}) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <div className="mt-1">{children}</div>
      {error ? <span className="mt-1.5 block text-xs text-red-300">{error}</span> : hint && <span className="mt-1.5 block text-xs text-white/45">{hint}</span>}
    </label>);

}

function inputCls(error?: string) {
  return `w-full border-b bg-transparent py-2.5 text-[16px] text-white outline-none transition-colors duration-150 focus:border-white ${
  error ? 'border-red-400' : 'border-white/30'}`;

}

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Please enter a valid email';
  if (!/^[+\d][\d\s()-]{6,}$/.test(f.phone)) e.phone = 'Please enter a valid phone number';
  if (!f.country) e.country = 'Please select your country';
  if (!f.consent) e.consent = 'Consent is required to send the form';
  return e;
}