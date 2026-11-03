import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ContentProvider } from './admin/contexts/ContentContext';
import { Admin } from './admin/pages/Admin';

import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { HowWeHelpSection } from './components/HowWeHelpSection';
import { TrustSection } from './components/TrustSection';
import { CasesSection } from './components/CasesSection';
import { PartnershipSection } from './components/PartnershipSection';
import { SectorsSection } from './components/SectorsSection';
import { InsightsSection } from './components/InsightsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SearchOverlay } from './components/SearchOverlay';
import { AiGuide } from './components/AiGuide';
import { ScrollTopButton } from './components/ScrollTopButton';
import { AiAdvisorPage } from './components/AiAdvisorPage';
import { IndustryDetailPage } from './components/IndustryDetailPage';

function MainWebsite() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [view, setView] = useState<'home' | 'advisor' | 'industry'>('home');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('fintech');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#advisor') {
        setView('advisor');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#industry/')) {
        const ind = hash.replace('#industry/', '');
        setSelectedIndustry(ind);
        setView('industry');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setView('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const goContact = () => {
    if (view !== 'home') {
      window.location.hash = '#contact';
      setView('home');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <Header onSearch={() => setSearchOpen(true)} onContact={goContact} />
      <main>
        {view === 'advisor' ? (
          <AiAdvisorPage />
        ) : view === 'industry' ? (
          <IndustryDetailPage industryId={selectedIndustry} onContact={goContact} />
        ) : (
          <>
            <HeroSlider onContact={goContact} />
            <HowWeHelpSection />
            <TrustSection />
            <CasesSection />
            <PartnershipSection />
            <SectorsSection />
            <InsightsSection />
            <ContactSection />
          </>
        )}
      </main>
      <Footer />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
      <AiGuide />
      <ScrollTopButton />
    </div>
  );
}

export function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<MainWebsite />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" closeButton toastOptions={{ style: { fontFamily: 'Figtree, sans-serif' } }} />
    </ContentProvider>
  );
}
