# Wallpaper Calendar

A web app for creating minimalist calendar wallpapers with gradient backgrounds. Customize every element — position, size, color, and opacity — then export as a high-resolution PNG.

## Features

- **Gradient backgrounds** with 12 seasonal color presets and custom 3-stop gradients
- **Large month number** overlay with adjustable opacity (faded or solid)
- **Month name, year, and calendar grid** — each independently customizable
- **Calendar grid** toggles between dot-matrix and day numbers
- **Week numbers** (ISO 8601) — optional
- **Drag-to-reposition** elements directly on the canvas
- **X/Y position sliders** and size/opacity controls per element
- **Layout presets**: Classic, Centered, Corner, Minimal, Sections (with divider lines)
- **Resolution presets**: Phone (1080x1920), iPhone, Android, Desktop, QHD, 4K, 8K
- **One-click PNG export** at full resolution

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

Static output goes to `dist/` — ready for GitHub Pages or any static host.

## Tech Stack

- Vite + TypeScript
- HTML Canvas API
- Zero runtime dependencies
