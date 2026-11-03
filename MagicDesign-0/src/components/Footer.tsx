import React, { useState } from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { Logo } from './Logo';
import { footerColumns, languages } from '../data/site';

/** Footer — mirrors live eleks.com `footer.footer--new` (white, 2-column: address | 5-col sitemap). */
export function Footer() {
  const [lang, setLang] = useState('EN');
  const [services, ...rest] = footerColumns;

  return (
    <footer id="footer" className="bg-white pt-16 text-ink md:pt-20 xl:pt-24">
      <div className="px-5 md:px-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] xl:grid-cols-[288px_1fr]">
          {/* Col 1: logo + addresses */}
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-1 lg:gap-10">
            <Logo />
            <div className="text-[13px] leading-[1.5] xl:text-[14px]">
              <div className="font-bold">ELEKS' office near you:</div>
              <div className="mt-1 text-[#54575e]">Viru väljak 2, Tallinn, Harju maakond, 10111</div>
              <a
                href="#contact"
                className="mt-3 inline-flex items-center gap-1.5 font-bold transition-colors hover:text-brand"
              >
                Our offices worldwide <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="text-[13px] leading-[1.5] xl:text-[14px]">
              <div className="font-bold">Eleks, Inc.</div>
              <div className="mt-1 text-[#54575e]">
                CAGE/NCAGE: 7W6F0
                <br />
                SAM Unique Entity ID: NQ9PRQMMSJG4
              </div>
            </div>
          </div>

          {/* Col 2: sitemap (Services spans 2 cols, then Expertise / Industries / Company) */}
          <nav aria-label="Footer" className="hidden gap-x-4 gap-y-10 md:grid md:grid-cols-3 xl:grid-cols-5">
            <div className="md:col-span-3 xl:col-span-2">
              <h3 className="mb-6 text-[22px] font-light xl:text-[24px]">{services.title}</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {services.subgroups?.map((g) => (
                  <div key={g.subtitle}>
                    <div className="mb-2 text-[13px] font-bold xl:text-[14px]">{g.subtitle}</div>
                    <FooterLinks links={g.links} />
                  </div>
                ))}
              </div>
            </div>
            {rest.map((col) => (
              <div key={col.title}>
                <h3 className="mb-6 text-[22px] font-light xl:text-[24px]">{col.title}</h3>
                <FooterLinks links={col.links} />
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom info bar (.footer--new__info) */}
      <div className="mt-14 border-t border-[#e9edf3] md:mt-20">
        <div className="flex flex-col gap-5 px-5 py-6 text-[13px] md:flex-row md:items-center md:px-14 xl:pl-[18.75vw]">
          <ul className="flex items-center gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label={`ELEKS on ${s.label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f2f5] text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-6 md:ml-8">
            {['Terms of Use', 'Privacy policy', 'Site Map'].map((l) => (
              <li key={l}>
                <a href="#top" className="transition-colors hover:text-brand">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 md:ml-auto">
            {languages.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`uppercase transition-colors hover:text-brand ${l === lang ? 'text-brand' : ''}`}
              >
                {l.toLowerCase()}
              </button>
            ))}
          </div>
          <div className="text-[#54575e] md:ml-8">© 1991-2026 ELEKS, All rights reserved</div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ links }: { links: string[] }) {
  return (
    <ul>
      {links.map((l) => (
        <li key={l}>
          <a
            href="#top"
            className="group relative block py-1 pr-4 text-[13px] leading-[1.6] transition-[padding] duration-300 hover:pl-4 hover:pr-0 xl:text-[14px]"
          >
            <ArrowUpRightIcon className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {l}
          </a>
        </li>
      ))}
    </ul>
  );
}

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ELEKS.Software',
    path: 'M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z'
  },
  {
    label: 'X',
    href: 'https://x.com/ELEKSSoftware',
    path: 'M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/eleks/',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm7 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5z'
  }
];
