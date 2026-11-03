import React, { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { DownloadIcon, InboxIcon, MailIcon, PhoneIcon, Trash2Icon, MapPinIcon } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '../../components/admin/PageHeader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useContent } from '../../contexts/ContentContext';
import { downloadFile } from '../../utils/files';

export function Inbox() {
  const { submissions, setSubmissions } = useContent();
  const [selectedId, setSelectedId] = useState<string | null>(submissions[0]?.id ?? null);
  const [confirm, setConfirm] = useState(false);
  const selected = submissions.find((s) => s.id === selectedId) ?? null;

  const open = (id: string) => {
    setSelectedId(id);
    setSubmissions(submissions.map((s) => s.id === id ? { ...s, read: true } : s));
  };

  const exportCsv = () => {
    const rows = [['Date', 'Email', 'Phone', 'Country', 'Message'], ...submissions.map((s) => [new Date(s.createdAt).toISOString(), s.email, s.phone, s.country, s.message])];
    downloadFile('enquiries.csv', rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n'), 'text/csv');
  };

  return (
    <div>
      <PageHeader
        icon={InboxIcon}
        title="Inbox"
        description="Enquiries submitted through the contact form on your site."
        actions={
        submissions.length > 0 &&
        <>
              <button onClick={() => setSubmissions(submissions.map((s) => ({ ...s, read: true })))} className="h-10 rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-ink hover:bg-canvas">
                Mark all read
              </button>
              <button onClick={exportCsv} className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-ink px-4 text-sm font-semibold text-white hover:bg-brand">
                <DownloadIcon className="h-4 w-4" /> Export CSV
              </button>
            </>

        } />
      

      {submissions.length === 0 ?
      <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line bg-white px-6 py-20 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-canvas text-brand">
            <InboxIcon className="h-5 w-5" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">Your inbox is empty</p>
          <p className="mt-1 max-w-[340px] text-sm text-muted">When visitors send the contact form on the website, their messages land here.</p>
        </div> :

      <div className="mt-8 grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-[360px_1fr]">
          <ul className="max-h-[640px] divide-y divide-line overflow-y-auto border-b border-line lg:border-b-0 lg:border-r">
            {submissions.map((s) =>
          <li key={s.id}>
                <button onClick={() => open(s.id)} className={`flex w-full items-start gap-3 px-5 py-4 text-left transition-colors duration-150 ${selectedId === s.id ? 'bg-brand/[0.06]' : 'hover:bg-canvas'}`}>
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${s.read ? 'bg-transparent' : 'bg-brand'}`} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className={`truncate text-sm ${s.read ? 'text-ink' : 'font-bold text-ink'}`}>{s.email}</span>
                      <span className="shrink-0 text-[11px] text-muted">{formatDistanceToNow(s.createdAt)}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-[13px] text-muted">{s.message || 'No message'}</span>
                  </span>
                </button>
              </li>
          )}
          </ul>

          {selected ?
        <article className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-muted">{format(selected.createdAt, "EEEE, d MMM yyyy 'at' HH:mm")}</p>
                  <h2 className="mt-1 text-[22px] font-bold text-ink">{selected.email}</h2>
                </div>
                <button onClick={() => setConfirm(true)} aria-label="Delete enquiry" className="rounded-xl p-2 text-muted hover:bg-red-50 hover:text-red-600">
                  <Trash2Icon className="h-4 w-4" />
                </button>
              </div>
              <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
            { icon: MailIcon, label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
            { icon: PhoneIcon, label: 'Phone', value: selected.phone, href: `tel:${selected.phone}` },
            { icon: MapPinIcon, label: 'Country', value: selected.country }].
            map((d) =>
            <div key={d.label} className="rounded-xl bg-canvas px-4 py-3">
                    <dt className="flex items-center gap-1.5 text-xs text-muted">
                      <d.icon className="h-3.5 w-3.5" /> {d.label}
                    </dt>
                    <dd className="mt-1 truncate text-sm font-semibold text-ink">{d.href ? <a href={d.href} className="hover:text-brand">{d.value}</a> : d.value}</dd>
                  </div>
            )}
              </dl>
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Message</p>
                <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-ink">{selected.message || '—'}</p>
              </div>
              <a href={`mailto:${selected.email}`} className="mt-8 inline-flex h-10 items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-[#1733b3]">
                <MailIcon className="h-4 w-4" /> Reply by email
              </a>
            </article> :

        <p className="p-8 text-sm text-muted">Select an enquiry to read it.</p>
        }
        </div>
      }

      <ConfirmDialog
        open={confirm}
        title="Delete this enquiry?"
        message="This permanently removes the message from your inbox."
        onConfirm={() => {
          setSubmissions(submissions.filter((s) => s.id !== selectedId));
          setSelectedId(null);
          setConfirm(false);
          toast.success('Enquiry deleted');
        }}
        onCancel={() => setConfirm(false)} />
      
    </div>);

}