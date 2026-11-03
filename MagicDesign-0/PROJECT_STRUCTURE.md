# ELEKS Clone Architecture & Deployment Guide

This project is a 1:1 responsive, animated visual clone of the live [ELEKS](https://eleks.com/) website built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**, packaged and configured for static deployment onto **Windows Server IIS**.

---

## 1. Project Overview & Exact Match Implementations

All components were refactored based directly on extracted DOM hierarchy and CSS rules from live `eleks.com`:

| Section | Component | Exact Match Implementation |
|---|---|---|
| **Header** | `src/components/Header.tsx` | Mega menus (Services, Industries, Clients, About us, Insights), dynamic sticky scroll state turning the "Contact us" pill into the live cyan `#6ab8ee` gradient animation. |
| **Hero Slider** | `src/components/HeroSlider.tsx` | 4 regional hero slides (`ELEKS overview`, `Data&AI`, `Fintech`, `Energy`) with vertical expandable inactive card strips, official SVGs (`iaop-home-logo-white.svg`, `stevie-winner-2025.svg`, `webby-home-logo-white.svg`), and floating consultation card (`cta-video-poster-small.jpg`). |
| **How we help your business move forward** | `src/components/HowWeHelpSection.tsx` | **Sticky Stacking Cards (`.service__list` / `.service__item`)**: Replaced tabs with stacked cards where Card 2 slides up and stacks over Card 1 on scroll (`sticky top-[124px]`). Features the exact 2x2 grid with gray pill badges `01`–`04`, gray CTA buttons, and original high-res illustrations (`ai-native-enterprise-image.jpg`, `digital-product-engineering-image.jpg`). |
| **Why trust ELEKS** | `src/components/TrustSection.tsx` | 4-column fade-up list (`01`–`04`) with proportional typography and borders matching `.section--help-your-business`. |
| **Customer Stories** | `src/components/CasesSection.tsx` | 5 expandable client cards (`TAIT`, `DPD`, `Natran`, `David Lloyd`, `Fleming`) with video previews, colored client SVG logos, and lightbox modal. |
| **Company Highlights** | `src/components/PartnershipSection.tsx` | **Dark `#1e1d28` section** (`.section--company-highlights.section--black`): 2x2 statistics counters (`1000+`, `120+`, `35+`, `21`) and infinite scrolling awards marquee containing 9 authentic industry awards. |
| **Industries** | `src/components/SectorsSection.tsx` | Horizontal tall card carousel (`.industry__list` / `.industry__item`) with slider arrows and clip-path hover animations across 13 industry sectors. |
| **Expert Insights** | `src/components/InsightsSection.tsx` | 2x2 card grid with Audio + R&D/Article badges, authors, avatars, and hover transitions. |
| **Contact Us & Testimonial** | `src/components/ContactSection.tsx` | Dual-column dark section with full consultation contact form (Attachment upload, NDA checkbox, validation) alongside the overlapping white customer testimonial card slider (Sam Fleming, Caroline Aumeran, Samer Awajan) with progress bar and navigation. |
| **Footer** | `src/components/Footer.tsx` | Light-themed footer with closest office location (Tallinn), corporate CAGE/SAM IDs, 5-column expandable sitemap, and social icon pills. |
| **AI Guide** | `src/components/AiGuide.tsx` | Animated bottom gradient AI Guide assistant trigger and interactive dialog. |

---

## 2. Directory Structure

```text
MagicDesign-0/
├── dist/                          # Production output for IIS
│   ├── assets/                    # Compiled JS/CSS bundles
│   ├── eleks/                     # 145 downloaded original ELEKS assets (SVGs, JPGs, PNGs)
│   ├── index.html                 # Main entrypoint
│   └── web.config                 # IIS configuration file
├── public/
│   ├── eleks/                     # Static original assets downloaded from eleks.com
│   └── web.config                 # Static hosting, URL rewrite, gzip & MIME settings
├── src/
│   ├── components/                # React sections and UI widgets
│   ├── data/
│   │   └── site.ts                # Structured content, client stories, stats, awards
│   ├── App.tsx                    # Main single-page application layout
│   ├── index.css                  # Tailwind directives and custom ELEKS animations
│   └── main.tsx                   # Entrypoint
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 3. Windows Server IIS Deployment Steps

1. **Prerequisites on Windows Server**:
   - Ensure the **Web Server (IIS)** role is installed.
   - Install the **URL Rewrite Module 2.1** for IIS (available from Microsoft).

2. **Publishing the Build**:
   - Run `npm run build` inside `MagicDesign-0`.
   - Copy the entire contents of the `G:\Development\PrimeTechWebsiteRevamp\MagicDesign-0\dist` directory to your IIS site root (e.g., `C:\inetpub\wwwroot\eleks-clone`).

3. **Verify `web.config`**:
   - `web.config` is automatically included in `dist/` with:
     - SPA routing rules (`Rewrite` non-file requests to `/index.html`).
     - MIME types for `.json`, `.woff`, `.woff2`, and `.svg`.
     - Static content caching and compression headers.

4. **Binding & Browsing**:
   - Set up an HTTP/HTTPS binding in IIS Manager.
   - Browse the site. All animations, sticky stacking cards, responsive sliders, and original assets run completely standalone.
