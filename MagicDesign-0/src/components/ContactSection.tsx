import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  Loader2Icon,
  PaperclipIcon
} from 'lucide-react';
import { countries, testimonials } from '../data/site';

type FormState = {
  name: string;
  email: string;
  phone: string;
  country: string;
  company: string;
  message: string;
  attachmentName: string;
  newsletter: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

const empty: FormState = {
  name: '',
  email: '',
  phone: '',
  country: '',
  company: '',
  message: '',
  attachmentName: '',
  newsletter: false
};

const TESTIMONIAL_DURATION = 10000;
const TICK = 100;

export function ContactSection() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [tIndex, setTIndex] = useState(0);
  const [tProgress, setTProgress] = useState(0);

  const count = testimonials.length;
  const activeTestimonial = testimonials[tIndex];

  useEffect(() => {
    const t = window.setInterval(() => {
      setTProgress((p) => {
        if (p + TICK >= TESTIMONIAL_DURATION) {
          setTIndex((idx) => (idx + 1) % count);
          return 0;
        }
        return p + TICK;
      });
    }, TICK);
    return () => window.clearInterval(t);
  }, [count]);

  const selectTestimonial = (next: number) => {
    setTIndex(((next % count) + count) % count);
    setTProgress(0);
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 900);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 overflow-hidden bg-[#1e1d28] py-20 text-white md:py-28"
    >
      <div className="px-5 md:px-14 lg:pl-[18.75vw]">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] xl:gap-20">
          {/* Left Column: Contact Form (.col-form) */}
          <div className="relative z-10">
            <h2
              id="contact-title"
              className="mb-10 max-w-[600px] text-[32px] font-light leading-[1.2] text-white md:text-[42px] xl:text-[48px]"
            >
              Get in touch to discuss your software vision with industry experts
            </h2>

            {status === 'sent' ? (
              <div role="status" className="mt-10 rounded-[8px] bg-white/5 p-8">
                <CheckCircle2Icon className="h-10 w-10 text-[#6ab8ee]" />
                <p className="mt-5 text-[22px]">Thank you — your request is in.</p>
                <p className="mt-2 text-white/70">
                  We'll reply to {form.email} within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(empty);
                    setStatus('idle');
                  }}
                  className="mt-8 h-11 rounded-full bg-white px-6 text-[14px] font-bold text-ink hover:bg-soft"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-6">
                <Field
                  label="Full name*"
                  hint="We need your name to know how to address you"
                  error={errors.name}
                >
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={inputCls(errors.name)}
                    autoComplete="name"
                  />
                </Field>

                <Field
                  label="Email*"
                  hint="We need your email to respond to your request"
                  error={errors.email}
                >
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={inputCls(errors.email)}
                    autoComplete="email"
                  />
                </Field>

                <Field
                  label="Phone number*"
                  hint="We need your phone number to reach you with response to your request"
                  error={errors.phone}
                >
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className={inputCls(errors.phone)}
                    autoComplete="tel"
                  />
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Country*"
                    hint="We need your country of business to know from what office to contact you"
                    error={errors.country}
                  >
                    <select
                      value={form.country}
                      onChange={(e) => update('country', e.target.value)}
                      className={`${inputCls(errors.country)} [&>option]:text-ink`}
                    >
                      <option value="">Select country</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="Company*"
                    hint="We need your company name to know your background"
                    error={errors.company}
                  >
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update('company', e.target.value)}
                      className={inputCls(errors.company)}
                      autoComplete="organization"
                    />
                  </Field>
                </div>

                <Field label="Message*" error={errors.message}>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className={`${inputCls(errors.message)} resize-none`}
                  />
                </Field>

                {/* Attachment Upload Row (.formrow__attach) */}
                <div>
                  <label className="group inline-flex cursor-pointer flex-wrap items-center gap-2 text-[14px] text-white/90 hover:text-white">
                    <input
                      type="file"
                      className="sr-only"
                      onChange={(e) =>
                        update('attachmentName', e.target.files?.[0]?.name || '')
                      }
                    />
                    <PaperclipIcon className="h-4 w-4 text-white/80" />
                    <span className="font-bold underline underline-offset-4">
                      {form.attachmentName || 'Add an attachment'}
                    </span>
                    <span className="text-[12px] text-white/50">
                      (jpg, gif, png, pdf, doc, docx, xls, xlsx, ppt, pptx)
                    </span>
                  </label>
                </div>

                {/* Newsletter Checkbox */}
                <div className="pt-1">
                  <label className="flex cursor-pointer items-start gap-3 text-[14px] text-white/85">
                    <input
                      type="checkbox"
                      checked={form.newsletter}
                      onChange={(e) => update('newsletter', e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-[#0045e6]"
                    />
                    <span>I want to receive news and updates once in a while</span>
                  </label>
                </div>

                {/* Privacy Policy Info */}
                <p className="text-[13px] leading-relaxed text-white/60">
                  We will add your info to our CRM for contacting you regarding your request. For
                  more info please consult our{' '}
                  <a href="#contact" className="text-white underline hover:text-[#6ab8ee]">
                    privacy policy
                  </a>
                </p>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-[15px] font-bold text-ink transition-colors duration-150 hover:bg-soft disabled:opacity-70"
                  >
                    {status === 'sending' && <Loader2Icon className="h-4 w-4 animate-spin" />}
                    {status === 'sending' ? 'Sending…' : 'Contact us'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Overlapping Light Testimonial Card (.col-testimonial) */}
          <div className="hidden flex-col justify-between rounded-[8px] bg-[#f8f8f9] px-8 py-20 text-ink lg:-my-28 lg:flex xl:-my-36 xl:px-10 xl:py-36">
            <div>
              <div className="text-[18px] font-bold text-ink">What our customers say</div>

              <div className="mt-8 min-h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <p className="text-[16px] leading-[1.65] text-[#373737] xl:text-[17px]">
                      “{activeTestimonial.quote}”
                    </p>

                    <div className="mt-8 flex items-center gap-4">
                      <img
                        src={activeTestimonial.photo}
                        alt={activeTestimonial.author}
                        className="h-14 w-14 shrink-0 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-[16px] font-bold text-ink">
                          {activeTestimonial.author}
                        </div>
                        <div className="text-[14px] text-[#54575e]">
                          {activeTestimonial.position}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Progress Line & Arrows (.testimonial-new__info) */}
            <div className="mt-10">
              <div className="relative h-px w-full bg-[#c7c7d6]">
                <span
                  className="absolute left-0 top-0 h-px bg-ink transition-[width] duration-100 ease-linear"
                  style={{ width: `${Math.max((tProgress / TESTIMONIAL_DURATION) * 100, 4)}%` }}
                />
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => selectTestimonial(tIndex - 1)}
                  aria-label="Previous testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/80 text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  <ArrowLeftIcon className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => selectTestimonial(tIndex + 1)}
                  aria-label="Next testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/80 text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  <ArrowRightIcon className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  children
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="text-[14px] text-white/75">{label}</span>
      <div className="mt-1">{children}</div>
      {error ? (
        <span className="mt-1.5 block text-xs text-red-300">{error}</span>
      ) : (
        hint && (
          <span className="mt-1 block text-xs text-white/45 opacity-80 transition-opacity group-focus-within:opacity-100">
            {hint}
          </span>
        )
      )}
    </label>
  );
}

function inputCls(error?: string) {
  return `w-full border-b bg-transparent py-2 text-[15px] text-white outline-none transition-colors duration-150 focus:border-white ${
    error ? 'border-red-400' : 'border-white/30'
  }`;
}

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please enter your name';
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Please enter a valid email';
  if (!/^[+\d][\d\s()-]{6,}$/.test(f.phone)) e.phone = 'Please enter a valid phone number';
  if (!f.country) e.country = 'Please select your country';
  if (!f.company.trim()) e.company = 'Please enter your company name';
  if (!f.message.trim()) e.message = 'Please enter a message';
  return e;
}
