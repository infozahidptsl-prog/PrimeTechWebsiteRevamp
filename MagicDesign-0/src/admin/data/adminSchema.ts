import {
  BarChart3Icon,
  BriefcaseIcon,
  CompassIcon,
  FactoryIcon,
  GalleryHorizontalEndIcon,
  LayersIcon,
  type LucideIcon,
  MenuSquareIcon,
  NewspaperIcon,
  PanelBottomIcon,
  ShieldCheckIcon } from
'lucide-react';
import type { CollectionKey } from '../types/content';
import { uid } from '../utils/files';

export type FieldType = 'text' | 'textarea' | 'image' | 'video' | 'list' | 'select' | 'color' | 'toggle';

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
  options?: {value: string;label: string;}[];
  rows?: number;
  full?: boolean;
  required?: boolean;
};

export type CollectionDef = {
  key: CollectionKey;
  path: string;
  title: string;
  description: string;
  icon: LucideIcon;
  itemLabel: string;
  titleKey: string;
  subtitleKey?: string;
  mediaKey?: string;
  videoKey?: string;
  colorKey?: string;
  fields: FieldDef[];
  template: () => Record<string, unknown>;
};

const iconOptions = [
'fintech', 'pharma', 'energy', 'healthcare', 'insurance', 'biotech', 'government',
'logistics', 'hospitality', 'automotive', 'retail', 'agriculture', 'media'].
map((v) => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }));

export const collections: CollectionDef[] = [
{
  key: 'heroSlides',
  path: 'slider',
  title: 'Hero slider',
  description: 'Full-screen panels at the top of the homepage. Drag to reorder — the first slide opens by default.',
  icon: GalleryHorizontalEndIcon,
  itemLabel: 'slide',
  titleKey: 'title',
  subtitleKey: 'label',
  mediaKey: 'image',
  videoKey: 'video',
  fields: [
  { key: 'label', label: 'Panel label', type: 'text', placeholder: 'e.g. Fintech', required: true, help: 'Shown vertically on the collapsed panel' },
  { key: 'tint', label: 'Fallback colour', type: 'color', help: 'Visible while media loads' },
  { key: 'title', label: 'Headline', type: 'textarea', rows: 2, full: true, required: true },
  { key: 'body', label: 'Description', type: 'textarea', rows: 3, full: true },
  { key: 'cta', label: 'Button text', type: 'text', placeholder: 'Leave empty to hide' },
  { key: 'subLabel', label: 'Bottom block title', type: 'text', placeholder: 'Services, Clients…' },
  {
    key: 'kind',
    label: 'Bottom block style',
    type: 'select',
    options: [
    { value: 'links', label: 'Service links' },
    { value: 'logos', label: 'Client names' },
    { value: 'awards', label: 'Award badges' }]

  },
  { key: 'items', label: 'Bottom block items', type: 'list', full: true, placeholder: 'Add item and press Enter' },
  { key: 'image', label: 'Background image', type: 'image', full: true },
  { key: 'video', label: 'Background video (optional)', type: 'video', full: true, help: 'Plays muted on loop when the slide is open. The image is used as poster.' }],

  template: () => ({ id: uid(), label: 'New slide', title: 'A bold new headline', body: '', cta: '', subLabel: 'Services', kind: 'links', items: [], image: '', video: '', tint: '#0b1424' })
},
{
  key: 'helpAreas',
  path: 'services',
  title: 'How we help',
  description: 'Service areas shown as tabs, each with a numbered list of outcomes.',
  icon: LayersIcon,
  itemLabel: 'service area',
  titleKey: 'title',
  subtitleKey: 'body',
  mediaKey: 'image',
  videoKey: 'video',
  fields: [
  { key: 'title', label: 'Tab title', type: 'text', required: true, full: true },
  { key: 'body', label: 'Description', type: 'textarea', rows: 4, full: true },
  { key: 'outcomes', label: 'Outcomes (numbered automatically)', type: 'list', full: true },
  { key: 'image', label: 'Image', type: 'image', full: true },
  { key: 'video', label: 'Video (optional)', type: 'video', full: true }],

  template: () => ({ id: uid(), title: 'New service area', body: '', outcomes: [], image: '', video: '' })
},
{
  key: 'trustPoints',
  path: 'why-us',
  title: 'Why choose us',
  description: 'Numbered reasons to work with you. Numbers update automatically when you reorder.',
  icon: ShieldCheckIcon,
  itemLabel: 'reason',
  titleKey: 'title',
  subtitleKey: 'body',
  fields: [
  { key: 'title', label: 'Title', type: 'text', required: true, full: true },
  { key: 'body', label: 'Description', type: 'textarea', rows: 4, full: true }],

  template: () => ({ id: uid(), title: 'New reason', body: '' })
},
{
  key: 'caseStudies',
  path: 'stories',
  title: 'Success stories',
  description: 'Client cards that expand on hover. Add a video URL to show the “Watch the video” button.',
  icon: BriefcaseIcon,
  itemLabel: 'story',
  titleKey: 'title',
  subtitleKey: 'client',
  mediaKey: 'image',
  videoKey: 'videoUrl',
  fields: [
  { key: 'client', label: 'Client name', type: 'text', required: true },
  {
    key: 'logoStyle',
    label: 'Logo lettering',
    type: 'select',
    options: [
    { value: 'heavy', label: 'Heavy caps' },
    { value: 'round', label: 'Rounded' },
    { value: 'serif', label: 'Serif' },
    { value: 'script', label: 'Italic script' }]

  },
  { key: 'title', label: 'Result headline', type: 'textarea', rows: 2, full: true, required: true },
  { key: 'desc', label: 'Short description', type: 'text', full: true },
  { key: 'image', label: 'Cover image', type: 'image', full: true },
  { key: 'videoUrl', label: 'Story video', type: 'video', full: true }],

  template: () => ({ id: uid(), client: 'New client', logoStyle: 'heavy', title: 'A measurable result', desc: '', image: '', videoUrl: '' })
},
{
  key: 'partnershipStats',
  path: 'stats',
  title: 'Key numbers',
  description: 'Large figures in the partnerships section.',
  icon: BarChart3Icon,
  itemLabel: 'number',
  titleKey: 'value',
  subtitleKey: 'label',
  fields: [
  { key: 'value', label: 'Figure', type: 'text', placeholder: '1,200+', required: true },
  { key: 'label', label: 'Caption', type: 'text', placeholder: 'projects delivered' }],

  template: () => ({ id: uid(), value: '100+', label: 'new metric' })
},
{
  key: 'industries',
  path: 'sectors',
  title: 'Sectors',
  description: 'Industries listed in the sectors section and the Industries menu.',
  icon: FactoryIcon,
  itemLabel: 'sector',
  titleKey: 'name',
  subtitleKey: 'icon',
  mediaKey: 'image',
  fields: [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'icon', label: 'Icon', type: 'select', options: iconOptions },
  { key: 'benefits', label: 'Benefits', type: 'list', full: true },
  { key: 'image', label: 'Image', type: 'image', full: true }],

  template: () => ({ id: uid(), name: 'New sector', icon: 'fintech', benefits: [], image: '' })
},
{
  key: 'insights',
  path: 'insights',
  title: 'Insights',
  description: 'Articles, reports and webinars. The first item is featured large.',
  icon: NewspaperIcon,
  itemLabel: 'insight',
  titleKey: 'title',
  subtitleKey: 'type',
  mediaKey: 'image',
  fields: [
  { key: 'title', label: 'Title', type: 'textarea', rows: 2, full: true, required: true },
  { key: 'type', label: 'Type', type: 'select', options: ['Article', 'Report', 'Webinar', 'News', 'Case study'].map((v) => ({ value: v, label: v })) },
  { key: 'date', label: 'Date', type: 'text', placeholder: 'Oct 14, 2026' },
  { key: 'read', label: 'Reading time', type: 'text', placeholder: '6 min read' },
  { key: 'image', label: 'Image', type: 'image', full: true }],

  template: () => ({ id: uid(), title: 'New insight', type: 'Article', date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), read: '5 min read', image: '' })
},
{
  key: 'navItems',
  path: 'menu',
  title: 'Main menu',
  description: 'Links in the top navigation bar.',
  icon: MenuSquareIcon,
  itemLabel: 'menu link',
  titleKey: 'label',
  subtitleKey: 'href',
  fields: [
  { key: 'label', label: 'Label', type: 'text', required: true },
  { key: 'href', label: 'Link', type: 'text', placeholder: '#section or https://…' },
  {
    key: 'menu',
    label: 'Dropdown',
    type: 'select',
    options: [
    { value: '', label: 'None' },
    { value: 'services', label: 'Services mega menu' },
    { value: 'industries', label: 'Industries mega menu' }]

  }],

  template: () => ({ id: uid(), label: 'New link', href: '#', menu: '' })
},
{
  key: 'serviceGroups',
  path: 'services-menu',
  title: 'Services menu',
  description: 'Columns inside the Services dropdown.',
  icon: CompassIcon,
  itemLabel: 'column',
  titleKey: 'title',
  fields: [
  { key: 'title', label: 'Column title', type: 'text', required: true, full: true },
  { key: 'links', label: 'Links', type: 'list', full: true }],

  template: () => ({ id: uid(), title: 'New column', links: [] })
},
{
  key: 'footerColumns',
  path: 'footer',
  title: 'Footer',
  description: 'Link columns at the bottom of every page.',
  icon: PanelBottomIcon,
  itemLabel: 'column',
  titleKey: 'title',
  fields: [
  { key: 'title', label: 'Column title', type: 'text', required: true, full: true },
  { key: 'links', label: 'Links', type: 'list', full: true }],

  template: () => ({ id: uid(), title: 'New column', links: [] })
}];


export const sectionTextFields: FieldDef[] = [
{ key: 'helpHeading', label: 'How we help — heading', type: 'textarea', rows: 2, help: 'Press Enter for a line break' },
{ key: 'helpOutcomesLabel', label: 'How we help — outcomes label', type: 'text' },
{ key: 'trustHeading', label: 'Why choose us — heading', type: 'textarea', rows: 2 },
{ key: 'casesLabel', label: 'Success stories — eyebrow', type: 'text' },
{ key: 'casesHeading', label: 'Success stories — heading', type: 'text' },
{ key: 'partnershipHeading', label: 'Key numbers — heading', type: 'textarea', rows: 2 },
{ key: 'sectorsHeading', label: 'Sectors — heading', type: 'text' },
{ key: 'insightsHeading', label: 'Insights — heading', type: 'text' },
{ key: 'contactHeading', label: 'Contact — heading', type: 'textarea', rows: 2 }];


export const settingsFields: FieldDef[] = [
{ key: 'brandName', label: 'Brand name', type: 'text', help: 'Used as the logo wordmark' },
{ key: 'aiGuideEnabled', label: 'Show AI Guide button', type: 'toggle' },
{ key: 'contactEmail', label: 'Contact email', type: 'text' },
{ key: 'contactPhone', label: 'Contact phone', type: 'text' },
{ key: 'consultTitle', label: 'Consultation card text', type: 'text', full: true },
{ key: 'consultImage', label: 'Consultation card & contact image', type: 'image', full: true },
{ key: 'servicesMenuTitle', label: 'Services menu heading', type: 'text' },
{ key: 'servicesMenuText', label: 'Services menu text', type: 'text' },
{ key: 'servicesMenuImage', label: 'Services menu image', type: 'image', full: true },
{ key: 'industriesMenuTitle', label: 'Industries menu heading', type: 'text' },
{ key: 'industriesMenuText', label: 'Industries menu text', type: 'text' },
{ key: 'industriesMenuImage', label: 'Industries menu image', type: 'image', full: true }];