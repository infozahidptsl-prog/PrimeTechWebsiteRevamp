import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { get, set } from 'idb-keyval';
import { toast } from 'sonner';
import { defaultContent } from '../data/site';
import type { CollectionKey, MediaAsset, SectionTexts, SiteContent, SiteSettings, Submission } from '../types/content';
import { uid } from '../utils/files';

const KEYS = { content: 'novium-content-v1', submissions: 'novium-submissions-v1', media: 'novium-media-v1' };

type ContentCtx = {
  content: SiteContent;
  ready: boolean;
  saving: boolean;
  lastSaved: number | null;
  updateCollection: <K extends CollectionKey>(key: K, items: SiteContent[K]) => void;
  updateSettings: (patch: Partial<SiteSettings>) => void;
  updateSections: (patch: Partial<SectionTexts>) => void;
  setCountries: (list: string[]) => void;
  resetContent: () => void;
  importContent: (data: SiteContent) => void;
  submissions: Submission[];
  addSubmission: (s: Omit<Submission, 'id' | 'createdAt' | 'read'>) => void;
  setSubmissions: (list: Submission[]) => void;
  media: MediaAsset[];
  addMedia: (m: Omit<MediaAsset, 'id' | 'createdAt'>) => MediaAsset;
  removeMedia: (id: string) => void;
};

const Ctx = createContext<ContentCtx | null>(null);

export function ContentProvider({ children }: {children: React.ReactNode;}) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [submissions, setSubs] = useState<Submission[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const timer = useRef<number>();

  useEffect(() => {
    Promise.all([get<SiteContent>(KEYS.content), get<Submission[]>(KEYS.submissions), get<MediaAsset[]>(KEYS.media)]).
    then(([c, s, m]) => {
      if (c) setContent(merge(c));
      if (s) setSubs(s);
      if (m) setMedia(m);
    }).
    catch(() => toast.error('Could not load saved content — showing defaults')).
    finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    setSaving(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      set(KEYS.content, content).
      then(() => setLastSaved(Date.now())).
      catch(() => toast.error('Saving failed — your browser storage may be full')).
      finally(() => setSaving(false));
    }, 400);
  }, [content, ready]);

  useEffect(() => {
    if (ready) set(KEYS.submissions, submissions).catch(() => undefined);
  }, [submissions, ready]);

  useEffect(() => {
    if (ready) set(KEYS.media, media).catch(() => toast.error('Media storage is full'));
  }, [media, ready]);

  const updateCollection = useCallback(<K extends CollectionKey,>(key: K, items: SiteContent[K]) => {
    setContent((c) => ({ ...c, [key]: items }));
  }, []);
  const updateSettings = useCallback((patch: Partial<SiteSettings>) => setContent((c) => ({ ...c, settings: { ...c.settings, ...patch } })), []);
  const updateSections = useCallback((patch: Partial<SectionTexts>) => setContent((c) => ({ ...c, sections: { ...c.sections, ...patch } })), []);
  const setCountries = useCallback((list: string[]) => setContent((c) => ({ ...c, countries: list })), []);
  const resetContent = useCallback(() => setContent(defaultContent), []);
  const importContent = useCallback((data: SiteContent) => setContent(merge(data)), []);

  const addSubmission = useCallback((s: Omit<Submission, 'id' | 'createdAt' | 'read'>) => {
    setSubs((list) => [{ ...s, id: uid(), createdAt: Date.now(), read: false }, ...list]);
  }, []);

  const addMedia = useCallback((m: Omit<MediaAsset, 'id' | 'createdAt'>) => {
    const asset = { ...m, id: uid(), createdAt: Date.now() };
    setMedia((list) => [asset, ...list]);
    return asset;
  }, []);
  const removeMedia = useCallback((id: string) => setMedia((list) => list.filter((m) => m.id !== id)), []);

  return (
    <Ctx.Provider
      value={{
        content,
        ready,
        saving,
        lastSaved,
        updateCollection,
        updateSettings,
        updateSections,
        setCountries,
        resetContent,
        importContent,
        submissions,
        addSubmission,
        setSubmissions: setSubs,
        media,
        addMedia,
        removeMedia
      }}>
      
      {children}
    </Ctx.Provider>);

}

export function useContent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useContent must be used inside ContentProvider');
  return ctx;
}

function merge(c: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...c,
    settings: { ...defaultContent.settings, ...(c.settings ?? {}) },
    sections: { ...defaultContent.sections, ...(c.sections ?? {}) }
  };
}