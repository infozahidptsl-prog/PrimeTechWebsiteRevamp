import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle2Icon, ExternalLinkIcon, ImagesIcon, InboxIcon, LayoutDashboardIcon, Loader2Icon, LogOutIcon, SettingsIcon, TypeIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { collections } from '../../data/adminSchema';
import { useContent } from '../../contexts/ContentContext';

type AdminSidebarProps = {onNavigate?: () => void;onLogout: () => void;};

const homepage = ['slider', 'services', 'why-us', 'stories', 'stats', 'sectors', 'insights'];
const navigation = ['menu', 'services-menu', 'footer'];

export function AdminSidebar({ onNavigate, onLogout }: AdminSidebarProps) {
  const { content, submissions, saving, lastSaved } = useContent();
  const unread = submissions.filter((s) => !s.read).length;

  const link = (to: string, label: string, Icon: React.ElementType, badge?: number, end?: boolean) =>
  <NavLink
    key={to}
    to={to}
    end={end}
    onClick={onNavigate}
    className={({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] transition-colors duration-150 ${
    isActive ? 'bg-white text-ink shadow-sm' : 'text-white/65 hover:bg-white/[0.06] hover:text-white'}`

    }>
    
      {({ isActive }) =>
    <>
          <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-brand' : ''}`} strokeWidth={1.75} />
          <span className="flex-1 truncate font-medium">{label}</span>
          {badge ? <span className="rounded-full bg-brand px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">{badge}</span> : null}
        </>
    }
    </NavLink>;


  const group = (title: string, paths: string[]) =>
  <div className="mt-7">
      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">{title}</p>
      <div className="space-y-0.5">
        {paths.map((p) => {
        const c = collections.find((x) => x.path === p);
        return c ? link(`/admin/${c.path}`, c.title, c.icon) : null;
      })}
      </div>
    </div>;


  return (
    <div className="flex h-full flex-col bg-panel px-3 py-5 text-white">
      <div className="flex items-center gap-2.5 px-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-[17px] font-bold">{content.settings.brandName.charAt(0).toUpperCase()}</span>
        <div className="leading-tight">
          <p className="text-[15px] font-bold">{content.settings.brandName}</p>
          <p className="text-[11px] text-white/45">Content studio</p>
        </div>
      </div>

      <nav aria-label="Admin" className="mt-6 flex-1 overflow-y-auto">
        <div className="space-y-0.5">
          {link('/admin', 'Dashboard', LayoutDashboardIcon, undefined, true)}
          {link('/admin/inbox', 'Inbox', InboxIcon, unread)}
        </div>
        {group('Homepage', homepage)}
        {group('Navigation', navigation)}
        <div className="mt-7">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">Site</p>
          <div className="space-y-0.5">
            {link('/admin/texts', 'Page texts', TypeIcon)}
            {link('/admin/media', 'Media library', ImagesIcon)}
            {link('/admin/settings', 'Settings', SettingsIcon)}
          </div>
        </div>
      </nav>

      <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
        <div className="flex items-center gap-2 px-3 text-[12px] text-white/55" aria-live="polite">
          {saving ?
          <>
              <Loader2Icon className="h-3.5 w-3.5 animate-spin" /> Saving…
            </> :

          <>
              <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-400" />
              {lastSaved ? `Saved ${formatDistanceToNow(lastSaved, { addSuffix: true })}` : 'All changes saved'}
            </>
          }
        </div>
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] font-medium text-white/65 hover:bg-white/[0.06] hover:text-white">
          <ExternalLinkIcon className="h-[18px] w-[18px]" strokeWidth={1.75} /> View live site
        </a>
        <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[14px] font-medium text-white/65 hover:bg-white/[0.06] hover:text-white">
          <LogOutIcon className="h-[18px] w-[18px]" strokeWidth={1.75} /> Sign out
        </button>
      </div>
    </div>);

}