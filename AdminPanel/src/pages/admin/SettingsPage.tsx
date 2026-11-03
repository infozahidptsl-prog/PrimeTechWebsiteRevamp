import React, { useRef, useState } from 'react';
import { DownloadIcon, RotateCcwIcon, SettingsIcon, UploadIcon } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '../../components/admin/PageHeader';
import { ObjectForm } from '../../components/admin/ObjectForm';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { settingsFields, type FieldDef } from '../../data/adminSchema';
import { useContent } from '../../contexts/ContentContext';
import { downloadFile } from '../../utils/files';
import type { SiteContent, SiteSettings } from '../../types/content';

const countryField: FieldDef[] = [{ key: 'countries', label: 'Countries in the contact form', type: 'list', full: true }];

export function SettingsPage() {
  const { content, updateSettings, setCountries, resetContent, importContent } = useContent();
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onImport = async (file?: File) => {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text()) as SiteContent;
      if (!data.heroSlides || !data.settings) throw new Error('invalid');
      importContent(data);
      toast.success('Content imported');
    } catch {
      toast.error('That file is not a valid content export');
    }
  };

  return (
    <div>
      <PageHeader icon={SettingsIcon} title="Settings" description="Brand, contact details, menu panels and data tools." />
      <div className="mt-8 space-y-6">
        <ObjectForm<SiteSettings>
          title="Brand & site"
          fields={settingsFields}
          value={content.settings}
          onSave={(v) => {
            updateSettings(v);
            toast.success('Settings saved');
          }} />
        

        <ObjectForm<{countries: string[];}>
          title="Contact form"
          description="Options shown in the Country dropdown."
          fields={countryField}
          value={{ countries: content.countries }}
          onSave={(v) => {
            setCountries(v.countries);
            toast.success('Countries saved');
          }} />
        

        <section className="rounded-2xl border border-line bg-white">
          <header className="border-b border-line px-6 py-5">
            <h2 className="text-[16px] font-bold text-ink">Backup & restore</h2>
            <p className="mt-0.5 text-[13px] text-muted">Content is saved automatically in this browser. Export a backup to move it elsewhere.</p>
          </header>
          <div className="flex flex-wrap gap-2 p-6">
            <button
              onClick={() => downloadFile(`site-content-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(content, null, 2), 'application/json')}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-ink px-4 text-sm font-semibold text-white hover:bg-brand">
              
              <DownloadIcon className="h-4 w-4" /> Export content
            </button>
            <button onClick={() => fileRef.current?.click()} className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line bg-white px-4 text-sm font-semibold text-ink hover:bg-canvas">
              <UploadIcon className="h-4 w-4" /> Import content
            </button>
            <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => onImport(e.target.files?.[0])} />
            <button onClick={() => setConfirmReset(true)} className="inline-flex h-10 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-red-600 hover:bg-red-50 sm:ml-auto">
              <RotateCcwIcon className="h-4 w-4" /> Reset to defaults
            </button>
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset all content?"
        message="Every slide, story, text and setting returns to the original version. Export a backup first if you might need it."
        confirmLabel="Reset content"
        onConfirm={() => {
          resetContent();
          setConfirmReset(false);
          toast.success('Content reset to defaults');
        }}
        onCancel={() => setConfirmReset(false)} />
      
    </div>);

}