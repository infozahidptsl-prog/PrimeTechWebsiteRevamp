import React, { useCallback, useState } from 'react';
import { Header } from '../components/Header';
import { HeroSlider } from '../components/HeroSlider';
import { HowWeHelpSection } from '../components/HowWeHelpSection';
import { TrustSection } from '../components/TrustSection';
import { CasesSection } from '../components/CasesSection';
import { PartnershipSection } from '../components/PartnershipSection';
import { SectorsSection } from '../components/SectorsSection';
import { InsightsSection } from '../components/InsightsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { SearchOverlay } from '../components/SearchOverlay';
import { AiGuide } from '../components/AiGuide';
import { ScrollTopButton } from '../components/ScrollTopButton';
import { useContent } from '../contexts/ContentContext';

export function Site() {
  const { settings } = useContent().content;
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const goContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <Header onSearch={() => setSearchOpen(true)} onContact={goContact} />
      <main>
        <HeroSlider onContact={goContact} />
        <HowWeHelpSection />
        <TrustSection />
        <CasesSection />
        <PartnershipSection />
        <SectorsSection />
        <InsightsSection />
        <ContactSection />
      </main>
      <Footer />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
      {settings.aiGuideEnabled && <AiGuide />}
      <ScrollTopButton />
    </div>);

}