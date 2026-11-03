import type { MediaAsset, SiteContent } from '../types/content';
import { isVideoSrc } from './files';

export type LibraryItem = {
  src: string;
  kind: 'image' | 'video';
  name: string;
  size: number;
  uploadedId?: string;
  usedIn: string[];
};

export function collectLibrary(content: SiteContent, uploaded: MediaAsset[]): LibraryItem[] {
  const map = new Map<string, LibraryItem>();
  const add = (src: string, where: string, name?: string) => {
    if (!src) return;
    const existing = map.get(src);
    if (existing) {
      existing.usedIn.push(where);
      return;
    }
    map.set(src, { src, kind: isVideoSrc(src) ? 'video' : 'image', name: name ?? fileName(src), size: 0, usedIn: [where] });
  };

  content.heroSlides.forEach((s) => {
    add(s.image, `Slider · ${s.label}`);
    add(s.video, `Slider · ${s.label}`);
  });
  content.helpAreas.forEach((a) => {
    add(a.image, `How we help · ${a.title}`);
    add(a.video, `How we help · ${a.title}`);
  });
  content.caseStudies.forEach((c) => {
    add(c.image, `Stories · ${c.client}`);
    add(c.videoUrl, `Stories · ${c.client}`);
  });
  content.industries.forEach((i) => add(i.image, `Sectors · ${i.name}`));
  content.insights.forEach((i) => add(i.image, `Insights · ${i.type}`));
  add(content.settings.consultImage, 'Consultation card');
  add(content.settings.servicesMenuImage, 'Services menu');
  add(content.settings.industriesMenuImage, 'Industries menu');

  uploaded.forEach((u) => {
    const existing = map.get(u.src);
    if (existing) {
      existing.uploadedId = u.id;
      existing.name = u.name;
      existing.size = u.size;
    } else {
      map.set(u.src, { src: u.src, kind: u.kind, name: u.name, size: u.size, uploadedId: u.id, usedIn: [] });
    }
  });

  return Array.from(map.values());
}

function fileName(src: string) {
  if (src.startsWith('data:')) return 'Uploaded file';
  const last = src.split('?')[0].split('/').pop() ?? 'file';
  return last.length > 28 ? `${last.slice(0, 12)}…${last.slice(-10)}` : last;
}