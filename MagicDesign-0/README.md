# Novium (ELEKS Visual Clone) — Vite + React + Tailwind + IIS

This project is a complete visual and interactive clone of the **ELEKS.com** enterprise website built with **React 18, TypeScript, Vite 5, Tailwind CSS 3, and Framer Motion 11**, ready for static deployment on **Windows Server IIS**.

Full architectural tracking and component documentation is available in [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md).

## Quick Start (Local Development)

```powershell
cd G:\Development\PrimeTechWebsiteRevamp\MagicDesign-0
npm install
npm run dev
```

## Production Build for Windows Server IIS

```powershell
cd G:\Development\PrimeTechWebsiteRevamp\MagicDesign-0
npm run build
```

This creates the `dist/` directory containing the compiled static bundle along with `dist/web.config` pre-configured for IIS URL Rewrite, static caching, and Gzip compression. Point your IIS Website physical path directly to the `dist` folder.
