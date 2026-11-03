import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon, ChevronDownIcon, MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import { Logo } from './Logo';
import { IndustryIcon } from './IndustryIcon';
import { aboutGroups, images, industries, languages, navItems } from '../data/site';
import servicesMenuData from '../data/servicesData.json';

type HeaderProps = {
  onSearch: () => void;
  onContact: () => void;
};

const ease = [0.23, 1, 0.32, 1] as const;

export function Header({ onSearch, onContact }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeServiceCat, setActiveServiceCat] = useState<string>('Engineering');
  const [lang, setLang] = useState('EN');
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const closeTimer = useRef<number>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        {openMenu && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[88px] z-30 hidden bg-[#3a3b44]/70 lg:block"
            onClick={() => setOpenMenu(null)}
          />
        )}
      </AnimatePresence>

      <header ref={ref} className="sticky top-0 z-40 bg-white">
        <div className="px-5 md:px-14">
          <div className="flex h-[88px] items-center justify-between border-b border-line">
            <div className="flex items-center gap-12 xl:gap-[220px]">
              <Logo />
              <nav aria-label="Main" className="hidden lg:block">
                <ul className="flex items-center gap-7 xl:gap-12">
                  {navItems.map((item) => (
                    <li
                      key={item.label}
                      onMouseEnter={() => enter(item.menu)}
                      onMouseLeave={leave}
                      className="relative"
                    >
                      {item.menu ? (
                        <button
                          type="button"
                          aria-expanded={openMenu === item.menu}
                          onClick={() => setOpenMenu(openMenu === item.menu ? null : item.menu)}
                          className="flex h-[88px] items-center whitespace-nowrap text-[15px] text-ink transition-colors duration-150 hover:text-brand"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <a
                          href={item.href}
                          className="flex h-[88px] items-center whitespace-nowrap text-[15px] text-ink transition-colors duration-150 hover:text-brand"
                        >
                          {item.label}
                        </a>
                      )}
                      {item.menu && openMenu === item.menu && (
                        <span className="absolute bottom-5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand" />
                      )}
                    </li>
                  ))}
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
                  className="flex items-center gap-1 px-2 text-[15px] text-ink hover:text-brand"
                >
                  {lang}
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.ul
                      role="listbox"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease }}
                      className="absolute right-0 top-9 w-24 rounded-xl border border-line bg-white py-1.5 shadow-lg"
                    >
                      {languages.map((l) => (
                        <li key={l}>
                          <button
                            role="option"
                            aria-selected={l === lang}
                            onClick={() => {
                              setLang(l);
                              setLangOpen(false);
                            }}
                            className={`w-full px-4 py-1.5 text-left text-sm hover:bg-soft ${l === lang ? 'font-semibold text-brand' : 'text-ink'
                              }`}
                          >
                            {l}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
              <button
                type="button"
                onClick={onContact}
                className={`relative hidden h-14 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full px-6 text-[15px] font-bold text-white transition-colors duration-500 sm:flex ${scrolled ? 'bg-[#6ab8ee] hover:bg-[#5aa8de]' : 'bg-ink hover:bg-brand'
                  }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-y-0 left-0 w-[1000%] ${scrolled ? 'animate-[headerBtnGradientMove_4s_cubic-bezier(0.4,0.2,0.4,1)_forwards]' : 'opacity-0'
                    }`}
                  style={{
                    backgroundImage:
                      'linear-gradient(105deg,#1e1d28 0,#9c86e4 24.38%,#5bbed1 49.55%,#0045e6 74.71%,#1e1d28 100%)',
                    opacity: scrolled ? 0.35 : 0
                  }}
                />
                <span className="relative">Contact us</span>
                <ArrowUpRightIcon className="relative h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Search"
                onClick={onSearch}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-soft text-ink transition-colors duration-150 hover:bg-line sm:h-14 sm:w-[72px]"
              >
                <SearchIcon className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white lg:hidden"
              >
                {mobileOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openMenu && (
            <motion.div
              key={openMenu}
              onMouseEnter={() => enter(openMenu)}
              onMouseLeave={leave}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease }}
              className={`absolute top-[88px] hidden overflow-hidden rounded-b-[6px] shadow-2xl lg:grid ${openMenu === 'clients'
                  ? 'inset-x-14 xl:inset-x-[208px] grid-cols-5 bg-white'
                  : openMenu === 'services'
                    ? 'inset-x-6 xl:inset-x-[120px] 2xl:inset-x-[180px] grid-cols-12 bg-white'
                    : openMenu === 'about'
                      ? 'inset-x-10 xl:inset-x-[160px] 2xl:inset-x-[200px] grid-cols-12 bg-white'
                      : openMenu === 'insights'
                        ? 'inset-x-10 xl:inset-x-[160px] 2xl:inset-x-[200px] grid-cols-12 bg-white'
                        : 'inset-x-14 xl:inset-x-[208px] grid-cols-2'
                }`}
            >
              {openMenu === 'clients' ? (
                <>
                  {/* Left Column (2fr): Our clients */}
                  <a
                    href="#clients"
                    onClick={() => setOpenMenu(null)}
                    className="group col-span-2 flex flex-col justify-between border-r border-[#c7c7d6] p-6 lg:p-7 transition-colors hover:bg-[#fafafb]"
                  >
                    <div>
                      <h3 className="text-[18px] font-bold text-ink">Our clients</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">
                        We are proud of contributing to the success of the world’s leading brands.
                      </p>
                    </div>
                    {/* The 3 logo columns with authentic top-to-bottom scroll */}
                    <div className="mt-6 flex h-[240px] w-full items-center justify-between overflow-hidden rounded-[4px] bg-[#f8f8f9] px-6 py-4">
                      <div className="eleks-clients-strip-1 h-full w-[24%]" />
                      <div className="eleks-clients-strip-2 h-full w-[24%]" />
                      <div className="eleks-clients-strip-3 h-full w-[24%]" />
                    </div>
                  </a>

                  {/* Middle Column (2fr): Case studies */}
                  <a
                    href="#clients"
                    onClick={() => setOpenMenu(null)}
                    className="group col-span-2 flex flex-col justify-between border-r border-[#c7c7d6] p-6 lg:p-7 transition-colors hover:bg-[#fafafb]"
                  >
                    <div>
                      <h3 className="text-[18px] font-bold text-ink">Case studies</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">
                        See how ELEKS has helped its clients achieve their vision of digital innovation.
                      </p>
                    </div>
                    {/* Image wrap with 2:1 aspect ratio and smooth vertical scroll animation on hover */}
                    <div className="mt-6 flex h-[240px] w-full items-center justify-center overflow-hidden rounded-[4px] bg-[#f8f8f9] p-2">
                      <img
                        src="/eleks/menu-case-studies-image.png"
                        alt="Case studies"
                        className="eleks-case-studies-img h-full w-auto max-w-full object-cover"
                      />
                    </div>
                  </a>

                  {/* Right Column (1fr): Key Stats */}
                  <div className="col-span-1 flex flex-col justify-end p-6 lg:p-7">
                    <div>
                      <div className="font-serif text-[32px] font-light leading-none text-ink lg:text-[38px]">20+</div>
                      <div className="mt-2 text-[13px] leading-snug text-muted">years of partnership with clients</div>
                    </div>
                    <div className="my-5 h-px bg-[#e9edf3]" />
                    <div>
                      <div className="font-serif text-[32px] font-light leading-none text-ink lg:text-[38px]">120+</div>
                      <div className="mt-2 text-[13px] leading-snug text-muted">active client accounts</div>
                    </div>
                    <div className="my-5 h-px bg-[#e9edf3]" />
                    <div>
                      <div className="font-serif text-[32px] font-light leading-none text-ink lg:text-[38px]">1000+</div>
                      <div className="mt-2 text-[13px] leading-snug text-muted">end-to-end projects</div>
                    </div>
                  </div>
                </>
              ) : openMenu === 'about' ? (
                <>
                  {/* Col 1: About us */}
                  <a
                    href="#about"
                    onClick={() => setOpenMenu(null)}
                    className="group col-span-3 flex flex-col justify-between border-r border-[#e9edf3] p-6 transition-colors hover:bg-[#fafafb]"
                  >
                    <div>
                      <h3 className="text-[17px] font-bold text-ink">About us</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        Meet ELEKS, a trusted partner for software engineering and technology consulting services.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-center py-2">
                      <img
                        src="/eleks/menu/menu-about-us-image.svg"
                        alt="About us"
                        className="max-h-[140px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </a>

                  {/* Col 2: How we work */}
                  <a
                    href="#about"
                    onClick={() => setOpenMenu(null)}
                    className="group col-span-3 flex flex-col justify-between border-r border-[#e9edf3] p-6 transition-colors hover:bg-[#fafafb]"
                  >
                    <div>
                      <h3 className="text-[17px] font-bold text-ink">How we work</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        Learn how we help our clients address complex business problems with technology solutions.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-center py-2">
                      <img
                        src="/eleks/menu/menu-how-we-work-image.svg"
                        alt="How we work"
                        className="max-h-[140px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </a>

                  {/* Col 3 & 4: 2x2 Grid for Awards & partners, Leadership, Trust Centre, Products */}
                  <div className="col-span-4 grid grid-cols-2 border-r border-[#e9edf3]">
                    <a
                      href="#about"
                      onClick={() => setOpenMenu(null)}
                      className="group flex flex-col justify-between border-b border-r border-[#e9edf3] p-5 transition-colors hover:bg-[#fafafb]"
                    >
                      <span className="text-[15px] font-bold text-ink transition-colors group-hover:text-brand">
                        Awards and partners
                      </span>
                      <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#edf2fe] p-2 transition-transform duration-200 group-hover:scale-110">
                        <img src="/eleks/menu/thumb-up-icon-blue.svg" alt="" className="h-full w-full object-contain" />
                      </div>
                    </a>
                    <a
                      href="#about"
                      onClick={() => setOpenMenu(null)}
                      className="group flex flex-col justify-between border-b border-[#e9edf3] p-5 transition-colors hover:bg-[#fafafb]"
                    >
                      <span className="text-[15px] font-bold text-ink transition-colors group-hover:text-brand">
                        Leadership team
                      </span>
                      <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#edf2fe] p-2 transition-transform duration-200 group-hover:scale-110">
                        <img src="/eleks/menu/team-icon-blue.svg" alt="" className="h-full w-full object-contain" />
                      </div>
                    </a>
                    <a
                      href="#about"
                      onClick={() => setOpenMenu(null)}
                      className="group flex flex-col justify-between border-r border-[#e9edf3] p-5 transition-colors hover:bg-[#fafafb]"
                    >
                      <span className="text-[15px] font-bold text-ink transition-colors group-hover:text-brand">
                        ELEKS’ Trust Centre
                      </span>
                      <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#edf2fe] p-2 transition-transform duration-200 group-hover:scale-110">
                        <img src="/eleks/menu/icon-blue-trust.svg" alt="" className="h-full w-full object-contain" />
                      </div>
                    </a>
                    <a
                      href="#about"
                      onClick={() => setOpenMenu(null)}
                      className="group flex flex-col justify-between p-5 transition-colors hover:bg-[#fafafb]"
                    >
                      <span className="text-[15px] font-bold text-ink transition-colors group-hover:text-brand">
                        Our products
                      </span>
                      <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#edf2fe] p-2 transition-transform duration-200 group-hover:scale-110">
                        <img src="/eleks/menu/products-icon-blue.svg" alt="" className="h-full w-full object-contain" />
                      </div>
                    </a>
                  </div>

                  {/* Col 5: CSR, Careers, Press kit */}
                  <div className="col-span-2 flex flex-col justify-start space-y-5 p-6">
                    <a
                      href="#about"
                      onClick={() => setOpenMenu(null)}
                      className="text-[15px] font-bold text-ink transition-colors hover:text-brand"
                    >
                      CSR
                    </a>
                    <a
                      href="https://careers.eleks.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] font-bold text-ink transition-colors hover:text-brand"
                    >
                      Careers
                    </a>
                    <a
                      href="#about"
                      onClick={() => setOpenMenu(null)}
                      className="text-[15px] font-bold text-ink transition-colors hover:text-brand"
                    >
                      Press kit
                    </a>
                  </div>
                </>
              ) : openMenu === 'insights' ? (
                <>
                  {/* Col 1: Blog */}
                  <a
                    href="#insights"
                    onClick={() => setOpenMenu(null)}
                    className="group col-span-4 flex flex-col justify-between border-r border-[#e9edf3] p-6 transition-colors hover:bg-[#fafafb]"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#edf2fe] p-2">
                          <img src="/eleks/menu/blog-icon-blue.svg" alt="" className="h-full w-full object-contain" />
                        </div>
                        <h3 className="text-[17px] font-bold text-ink">Blog</h3>
                      </div>
                      <p className="mt-3 text-[13px] leading-relaxed text-muted">
                        Insights, opinions, and practical guidance from ELEKS experts on software engineering, AI, and enterprise technology.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-center overflow-hidden rounded-[8px]">
                      <img
                        src="/eleks/menu/blog-menu-image.png"
                        alt="Blog"
                        className="max-h-[140px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </a>

                  {/* Col 2: Events */}
                  <a
                    href="#insights"
                    onClick={() => setOpenMenu(null)}
                    className="group col-span-4 flex flex-col justify-between border-r border-[#e9edf3] p-6 transition-colors hover:bg-[#fafafb]"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#edf2fe] p-2">
                          <img src="/eleks/menu/events-icon-blue.svg" alt="" className="h-full w-full object-contain" />
                        </div>
                        <h3 className="text-[17px] font-bold text-ink">Events</h3>
                      </div>
                      <p className="mt-3 text-[13px] leading-relaxed text-muted">
                        Meetups, conferences, and roundtables where ELEKS experts speak, exhibit, and connect with the global technology community.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-center overflow-hidden rounded-[8px]">
                      <img
                        src="/eleks/menu/events-menu-image.png"
                        alt="Events"
                        className="max-h-[140px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </a>

                  {/* Col 3: R&D and News stack */}
                  <div className="col-span-4 flex flex-col">
                    <a
                      href="#insights"
                      onClick={() => setOpenMenu(null)}
                      className="group flex flex-1 flex-col justify-center border-b border-[#e9edf3] p-6 transition-colors hover:bg-[#fafafb]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#edf2fe] p-2">
                          <img src="/eleks/menu/rd-consulting-blue-icon.svg" alt="" className="h-full w-full object-contain" />
                        </div>
                        <h3 className="text-[17px] font-bold text-ink group-hover:text-brand">R&D</h3>
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        Hands-on findings from our engineers exploring emerging technologies through real-world experiments and proof-of-concepts.
                      </p>
                    </a>
                    <a
                      href="#insights"
                      onClick={() => setOpenMenu(null)}
                      className="group flex flex-1 flex-col justify-center p-6 transition-colors hover:bg-[#fafafb]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#edf2fe] p-2">
                          <img src="/eleks/menu/news-icon-blue.svg" alt="" className="h-full w-full object-contain" />
                        </div>
                        <h3 className="text-[17px] font-bold text-ink group-hover:text-brand">News</h3>
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        The latest announcements, press releases, and updates from across the ELEKS organisation.
                      </p>
                    </a>
                  </div>
                </>
              ) : openMenu === 'services' ? (
                <>
                  {/* Left Sidebar: 5 Categories on dark background */}
                  <div className="col-span-3 flex flex-col justify-start bg-[#16181f] p-4 text-white">
                    {servicesMenuData.map((cat) => {
                      const isCatActive = cat.name === activeServiceCat;
                      return (
                        <button
                          key={cat.name}
                          type="button"
                          onMouseEnter={() => setActiveServiceCat(cat.name)}
                          onClick={() => setActiveServiceCat(cat.name)}
                          className={`rounded-[6px] p-4 text-left transition-all duration-150 ${isCatActive
                              ? 'bg-white text-ink shadow-sm'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                          <div className="text-[17px] font-bold leading-tight">{cat.name}</div>
                          <div
                            className={`mt-1.5 text-[12px] leading-[1.35] ${isCatActive ? 'text-muted' : 'text-white/60'
                              }`}
                          >
                            {cat.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Content: 3-column Grid of Service Cards for active category */}
                  <div className="col-span-9 bg-white p-6">
                    {(() => {
                      const currentCat =
                        servicesMenuData.find((c) => c.name === activeServiceCat) || servicesMenuData[0];
                      return (
                        <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                          {currentCat.items.map((item) => (
                            <a
                              key={item.title}
                              href={item.url || '#services'}
                              onClick={() => setOpenMenu(null)}
                              className="group flex flex-col rounded-[8px] p-4 transition-colors hover:bg-[#f8f9fc]"
                            >
                              <div className="flex items-center gap-3">
                                {item.localIcon && (
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#edf2fe] p-2 transition-transform duration-200 group-hover:scale-105">
                                    <img src={item.localIcon} alt="" className="h-full w-full object-contain" />
                                  </div>
                                )}
                              </div>
                              <h4 className="mt-3 text-[16px] font-bold text-ink transition-colors group-hover:text-brand">
                                {item.title}
                              </h4>
                              {item.desc ? (
                                <p className="mt-1.5 text-[12px] leading-[1.4] text-muted">{item.desc}</p>
                              ) : null}
                              {item.subLinks && item.subLinks.length > 0 && (
                                <ul className="mt-2 space-y-1">
                                  {item.subLinks.map((sub: string) => (
                                    <li
                                      key={sub}
                                      className="text-[13px] font-medium text-muted transition-colors hover:text-brand"
                                    >
                                      {sub}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </a>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </>
              ) : openMenu === 'clients' ? (
                <>
                  {/* Left Column: Our clients */}
                  <a
                    href="#clients"
                    onClick={() => setOpenMenu(null)}
                    className="group col-span-5 flex flex-col justify-between border-r border-[#e9edf3] p-8 transition-colors hover:bg-[#fafafb]"
                  >
                    <div>
                      <h3 className="text-[18px] font-bold text-ink">Our clients</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">
                        We are proud of contributing to the success of the world’s leading brands.
                      </p>
                    </div>
                    <div className="mt-8 flex items-center justify-center py-4">
                      <img
                        src="/eleks/menu-clients-image-1.svg"
                        alt="Clients"
                        className="max-h-[140px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </a>

                  {/* Middle Column: Case studies */}
                  <a
                    href="#clients"
                    onClick={() => setOpenMenu(null)}
                    className="group col-span-4 flex flex-col justify-between border-r border-[#e9edf3] p-8 transition-colors hover:bg-[#fafafb]"
                  >
                    <div>
                      <h3 className="text-[18px] font-bold text-ink">Case studies</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">
                        See how ELEKS has helped its clients achieve their vision of digital innovation.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-center overflow-hidden rounded-[8px] bg-[#f4f5f8] p-4">
                      <img
                        src="/eleks/menu-case-studies-image.png"
                        alt="Case studies"
                        className="max-h-[150px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </a>

                  {/* Right Column: Key Stats */}
                  <div className="col-span-3 flex flex-col justify-around bg-[#fcfcfd] p-8">
                    <div>
                      <div className="font-serif text-[38px] font-light leading-none text-ink">20+</div>
                      <div className="mt-2 text-[13px] leading-snug text-muted">years of partnership with clients</div>
                    </div>
                    <div className="my-2 h-px bg-[#e9edf3]" />
                    <div>
                      <div className="font-serif text-[38px] font-light leading-none text-ink">120+</div>
                      <div className="mt-2 text-[13px] leading-snug text-muted">active client accounts</div>
                    </div>
                    <div className="my-2 h-px bg-[#e9edf3]" />
                    <div>
                      <div className="font-serif text-[38px] font-light leading-none text-ink">1000+</div>
                      <div className="mt-2 text-[13px] leading-snug text-muted">end-to-end projects</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-[#1f1e2b] px-7 py-7 text-white">
                    {openMenu === 'industries' ? (
                      <ul className="grid grid-cols-2 gap-x-8 gap-y-8">
                        {industries.map((ind) => (
                          <li key={ind.id}>
                            <a
                              href={`#industry/${ind.id}`}
                              onClick={() => {
                                setOpenMenu(null);
                                window.location.hash = `#industry/${ind.id}`;
                              }}
                              className="group flex items-center gap-5"
                            >
                              <IndustryIcon id={ind.id} />
                              <span className="text-[18px] font-bold transition-colors duration-150 group-hover:text-[#a9b6ff]">
                                {ind.name}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-2">
                        {(openMenu === 'about' ? aboutGroups : serviceGroups).map((g) => (
                          <div key={g.title}>
                            <p className="text-[19px] font-bold">{g.title}</p>
                            <ul className="mt-4 space-y-3">
                              {g.links.map((l) => (
                                <li key={l}>
                                  <a
                                    href={openMenu === 'about' ? (l === 'Global offices' ? '#offices' : '#about') : '#services'}
                                    onClick={() => setOpenMenu(null)}
                                    className="text-[15px] text-white/75 transition-colors duration-150 hover:text-white"
                                  >
                                    {l}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col bg-white p-3">
                    <div className="px-3 pb-10 pt-6">
                      <p className="text-[30px] font-light leading-tight text-ink xl:text-[32px]">
                        {openMenu === 'industries'
                          ? 'Innovative solutions across industries'
                          : openMenu === 'about'
                            ? '30+ years of engineering excellence'
                            : 'Full-cycle software services'}
                      </p>
                      <p className="mt-4 max-w-[360px] text-[14px] leading-relaxed text-muted">
                        {openMenu === 'industries'
                          ? 'Software expertise shaped around the specific regulatory and operational needs of each sector we serve.'
                          : openMenu === 'about'
                            ? 'Employee-owned and globally distributed across 20 offices, partnering with Fortune 500 leaders and ambitious innovators.'
                            : 'From first strategy workshop to long-term support, one accountable team owns your delivery end to end.'}
                      </p>
                      <a
                        href={openMenu === 'industries' ? '#industries' : openMenu === 'about' ? '#offices' : '#services'}
                        onClick={() => setOpenMenu(null)}
                        className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-brand hover:underline"
                      >
                        {openMenu === 'industries'
                          ? 'Explore all industries'
                          : openMenu === 'about'
                            ? 'See our global offices'
                            : 'Explore all services'}{' '}
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="min-h-[260px] flex-1 overflow-hidden rounded-[6px]">
                      <img
                        src={
                          openMenu === 'industries'
                            ? images.menu
                            : openMenu === 'about'
                              ? images.overview
                              : images.data
                        }
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease }}
              className="absolute inset-x-0 top-[88px] h-[calc(100dvh-88px)] overflow-y-auto bg-white px-5 pb-10 md:px-14 lg:hidden"
            >
              <ul className="divide-y divide-line">
                {navItems.map((item) => (
                  <li key={item.label}>
                    {item.menu ? (
                      <>
                        <button
                          aria-expanded={mobileSub === item.menu}
                          onClick={() => setMobileSub(mobileSub === item.menu ? null : item.menu)}
                          className="flex w-full items-center justify-between py-5 text-[22px] text-ink"
                        >
                          {item.label}
                          <ChevronDownIcon
                            className={`h-5 w-5 transition-transform duration-200 ${mobileSub === item.menu ? 'rotate-180' : ''
                              }`}
                          />
                        </button>
                        {mobileSub === item.menu && (
                          <ul className="grid grid-cols-1 gap-3 pb-5 sm:grid-cols-2">
                            {(item.menu === 'industries'
                              ? industries.map((i) => i.name)
                              : item.menu === 'about'
                                ? aboutGroups.flatMap((g) => g.links)
                                : serviceGroups.flatMap((g) => g.links)
                            ).map((l) => (
                              <li key={l}>
                                <a
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="text-[15px] text-muted hover:text-ink"
                                >
                                  {l}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-5 text-[22px] text-ink"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-2">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`rounded-full px-4 py-2 text-sm ${l === lang ? 'bg-ink text-white' : 'bg-soft text-ink'
                      }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onContact();
                }}
                className="mt-8 flex w-full items-center justify-center gap-1.5 rounded-full bg-ink py-4 font-bold text-white"
              >
                Contact us <ArrowUpRightIcon className="h-4 w-4" />
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
