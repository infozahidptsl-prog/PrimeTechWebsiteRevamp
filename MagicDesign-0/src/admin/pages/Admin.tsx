import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminLogin } from '../components/admin/AdminLogin';
import { CollectionEditor } from '../components/admin/CollectionEditor';
import { collections } from '../data/adminSchema';
import { useContent } from '../contexts/ContentContext';
import { Dashboard } from './admin/Dashboard';
import { TextsPage } from './admin/TextsPage';
import { MediaLibrary } from './admin/MediaLibrary';
import { Inbox } from './admin/Inbox';
import { SettingsPage } from './admin/SettingsPage';

const AUTH_KEY = 'novium-admin-auth';

export function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1');
  const [menuOpen, setMenuOpen] = useState(false);
  const { ready } = useContent();
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  if (!authed) {
    return (
      <AdminLogin
        onSuccess={() => {
          sessionStorage.setItem(AUTH_KEY, '1');
          setAuthed(true);
        }} />);


  }

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  return (
    <div className="min-h-screen w-full bg-canvas font-sans">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[268px] lg:block">
        <AdminSidebar onLogout={logout} />
      </aside>

      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur lg:hidden">
        <button onClick={() => setMenuOpen(true)} aria-label="Open navigation" className="rounded-lg p-2 text-ink hover:bg-canvas">
          <MenuIcon className="h-5 w-5" />
        </button>
        <span className="text-sm font-bold text-ink">Content studio</span>
        <span className="w-9" />
      </div>

      <AnimatePresence>
        {menuOpen &&
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 bg-panel/50 lg:hidden" />
            <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden">
            
              <AdminSidebar onNavigate={() => setMenuOpen(false)} onLogout={logout} />
              <button onClick={() => setMenuOpen(false)} aria-label="Close navigation" className="absolute right-3 top-5 rounded-lg p-1.5 text-white/60 hover:text-white">
                <XIcon className="h-5 w-5" />
              </button>
            </motion.aside>
          </>
        }
      </AnimatePresence>

      <main className="lg:pl-[268px]">
        <div className="mx-auto max-w-[1180px] px-4 py-8 md:px-8 md:py-10">
          {!ready ?
          <div className="space-y-3">
              <div className="h-10 w-64 animate-pulse rounded-xl bg-line/70" />
              <div className="h-24 animate-pulse rounded-2xl bg-line/50" />
              <div className="h-24 animate-pulse rounded-2xl bg-line/50" />
            </div> :

          <Routes>
              <Route index element={<Dashboard />} />
              <Route path="texts" element={<TextsPage />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path=":section" element={<CollectionRoute />} />
            </Routes>
          }
        </div>
      </main>
    </div>);

}

function CollectionRoute() {
  const { section } = useParams();
  const def = collections.find((c) => c.path === section);
  if (!def) return <Navigate to="/admin" replace />;
  return <CollectionEditor key={def.key} def={def} />;
}