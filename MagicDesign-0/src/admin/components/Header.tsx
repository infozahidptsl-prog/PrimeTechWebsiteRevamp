import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon, ChevronDownIcon, MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import { Logo } from './Logo';
import { IndustryIcon } from './IndustryIcon';
import { languages } from '../data/site';
import { useContent } from '../contexts/ContentContext';

type HeaderProps = {
  onSearch: () => void;
  onContact: () => void;
};

const ease = [0.23, 1, 0.32, 1] as const;

export function Header({ onSearch, onContact }: HeaderProps) {
  const { navItems, industries, serviceGroups, settings } = useContent().content;
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [lang, setLang] = useState('EN');
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const closeTimer = useRef<number>();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setLangOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setLangOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const enter = (menu: string | null) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <>
      <AnimatePresence>
        {openMenu &&
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-[88px] z-30 hidden bg-[#3a3b44]/70 lg:block"
          onClick={() => setOpenMenu(null)} />

        }
      </AnimatePresence>

      <header ref={ref} className="sticky top-0 z-40 bg-white">
        <div className="px-5 md:px-14">
          <div className="flex h-[88px] items-center justify-between border-b border-line">
            <div className="flex items-center gap-12 xl:gap-[220px]">
              <Logo />
              <nav aria-label="Main" className="hidden lg:block">
                <ul className="flex items-center gap-7 xl:gap-12">
                  {navItems.map((item) =>
                  <li
                    key={item.label}
                    onMouseEnter={() => enter(item.menu)}
                    onMouseLeave={leave}
                    className="relative">
                    
                      {item.menu ?
                    <button
                      type="button"
                      aria-expanded={openMenu === item.menu}
                      onClick={() => setOpenMenu(openMenu === item.menu ? null : item.menu)}
                      className="flex h-[88px] items-center whitespace-nowrap text-[15px] text-ink transition-colors duration-150 hover:text-brand">
                      
                          {item.label}
                        </button> :

                    <a
                      href={item.href}
                      className="flex h-[88px] items-center whitespace-nowrap text-[15px] text-ink transition-colors duration-150 hover:text-brand">
                      
                          {item.label}
                        </a>
                    }
                      {item.menu && openMenu === item.menu &&
                    <span className="absolute bottom-5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand" />
                    }
                    </li>
                  )}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-3 md:gap-5">
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  onClick={() => setLangOpen((v) => !v)}
                  className="flex items-center gap-1 px-2 text-[15px] text-ink hover:text-brand">
                  
                  {lang}
                </button>
                <AnimatePresence>
                  {langOpen &&
                  <motion.ul
                    role="listbox"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease }}
                    className="absolute right-0 top-9 w-24 rounded-xl border border-line bg-white py-1.5 shadow-lg">
                    
                      {languages.map((l) =>
                    <li key={l}>
                          <button
                        role="option"
                        aria-selected={l === lang}
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-1.5 text-left text-sm hover:bg-soft ${l === lang ? 'font-semibold text-brand' : 'text-ink'}`}>
                        
                            {l}
                          </button>
                        </li>
                    )}
                    </motion.ul>
                  }
                </AnimatePresence>
              </div>
              <button
                type="button"
                onClick={onContact}
                className="hidden h-14 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-6 text-[15px] font-bold text-white transition-colors duration-150 hover:bg-brand sm:flex">
                
                Contact us <ArrowUpRightIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Search"
                onClick={onSearch}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-soft text-ink transition-colors duration-150 hover:bg-line sm:h-14 sm:w-[72px]">
                
                <SearchIcon className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white lg:hidden">
                
                {mobileOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openMenu &&
          <motion.div
            onMouseEnter={() => enter(openMenu)}
            onMouseLeave={leave}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
            className="absolute inset-x-14 top-[88px] hidden overflow-hidden rounded-b-[6px] lg:grid lg:grid-cols-2 xl:inset-x-[208px]">
            
              <div className="bg-[#1f1e2b] px-7 py-7 text-white">
                {openMenu === 'industries' ?
              <ul className="grid grid-cols-2 gap-x-8 gap-y-10">
                    {industries.map((ind) =>
                <li key={ind.id}>
                        <a href="#industries" onClick={() => setOpenMenu(null)} className="group flex items-center gap-6">
                          <IndustryIcon id={ind.icon} />
                          <span className="text-[19px] font-bold transition-colors duration-150 group-hover:text-[#a9b6ff]">{ind.name}</span>
                        </a>
                      </li>
                )}
                  </ul> :

              <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-2">
                    {serviceGroups.map((g) =>
                <div key={g.title}>
                        <p className="text-[19px] font-bold">{g.title}</p>
                        <ul className="mt-4 space-y-3">
                          {g.links.map((l) =>
                    <li key={l}>
                              <a href="#services" onClick={() => setOpenMenu(null)} className="text-[15px] text-white/75 transition-colors duration-150 hover:text-white">
                                {l}
                              </a>
                            </li>
                    )}
                        </ul>
                      </div>
                )}
                  </div>
              }
              </div>
              <div className="flex flex-col bg-white p-3">
                <div className="px-3 pb-14 pt-6">
                  <p className="text-[30px] font-light leading-tight text-ink xl:text-[32px]">
                    {openMenu === 'industries' ? settings.industriesMenuTitle : settings.servicesMenuTitle}
                  </p>
                  <p className="mt-6 max-w-[330px] text-[13px] leading-snug text-muted">
                    {openMenu === 'industries' ? settings.industriesMenuText : settings.servicesMenuText}
                  </p>
                </div>
                <div className="min-h-[260px] flex-1 overflow-hidden rounded-[6px] bg-soft">
                  {(openMenu === 'industries' ? settings.industriesMenuImage : settings.servicesMenuImage) &&
                <img src={openMenu === 'industries' ? settings.industriesMenuImage : settings.servicesMenuImage} alt="" className="h-full w-full object-cover" />
                }
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen &&
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
            className="absolute inset-x-0 top-[88px] h-[calc(100dvh-88px)] overflow-y-auto bg-white px-5 pb-10 md:px-14 lg:hidden">
            
              <ul className="divide-y divide-line">
                {navItems.map((item) =>
              <li key={item.label}>
                    {item.menu ?
                <>
                        <button
                    aria-expanded={mobileSub === item.menu}
                    onClick={() => setMobileSub(mobileSub === item.menu ? null : item.menu)}
                    className="flex w-full items-center justify-between py-5 text-[22px] text-ink">
                    
                          {item.label}
                          <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${mobileSub === item.menu ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileSub === item.menu &&
                  <ul className="grid grid-cols-1 gap-3 pb-5 sm:grid-cols-2">
                            {(item.menu === 'industries' ? industries.map((i) => i.name) : serviceGroups.flatMap((g) => g.links)).map((l) =>
                    <li key={l}>
                                <a href={item.href} onClick={() => setMobileOpen(false)} className="text-[15px] text-muted">
                                  {l}
                                </a>
                              </li>
                    )}
                          </ul>
                  }
                      </> :

                <a href={item.href} onClick={() => setMobileOpen(false)} className="block py-5 text-[22px] text-ink">
                        {item.label}
                      </a>
                }
                  </li>
              )}
              </ul>
              <div className="mt-6 flex gap-2">
                {languages.map((l) =>
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-4 py-2 text-sm ${l === lang ? 'bg-ink text-white' : 'bg-soft text-ink'}`}>
                
                    {l}
                  </button>
              )}
              </div>
              <button
              onClick={() => {
                setMobileOpen(false);
                onContact();
              }}
              className="mt-8 flex w-full items-center justify-center gap-1.5 rounded-full bg-ink py-4 font-bold text-white">
              
                Contact us <ArrowUpRightIcon className="h-4 w-4" />
              </button>
            </motion.nav>
          }
        </AnimatePresence>
      </header>
    </>);

}