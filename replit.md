# LunaZhang Portfolio

## Overview
Creative product designer portfolio website with a warm, editorial, data-driven design style. Features an interactive raindrop hero section with letter-carrying raindrops on a foggy glass window effect.

## Architecture
- **Frontend**: React SPA with Vite, Tailwind CSS, Shadcn UI
- **Backend**: Express.js (minimal, serves static assets)
- **Routing**: wouter for client-side routing

## Brand System
- **Fonts**: Bitter (serif headings), Lato (sans-serif body), DM Mono (monospace)
- **Primary Color**: Vivid Teal (#0D9488)
- **Accent Brown**: #8B5E3C
- **Light Mode**: Cream/beige background (#F7F4EF) with dark text
- **Dark Mode**: Deep ink navy (#051C1C) with off-white text

## Pages
- **Home**: Interactive raindrop hero with foggy mountain cabin background
- Work (planned)
- Exploration (planned)
- About (planned)

## Key Components
- `raindrop-canvas.tsx`: HTML5 Canvas interactive raindrop simulation
  - Pre-rendered blurred background (foggy mountain cabin) for performance
  - Realistic water drop shapes with chromatic aberration on edges
  - Each raindrop carries a small letter
  - Wind-driven movement (car window simulation)
  - Hover-to-collect: black dot cursor with burn effect, attracts/absorbs nearby drops
  - Idle drop: collected rain falls with wind when mouse stops
  - Continuous rain spawning (screen never empty)
  - Macro drop collects absorbed letters
- `navigation.tsx`: "LUNA ZHANG" logo left, Work/Exploration/About in rounded pill right
- Home page footer: location, work sector, and contact links (LinkedIn, CookingInstagram)

## Project Structure
```
client/src/
  components/
    raindrop-canvas.tsx   - Interactive canvas raindrop effect
    navigation.tsx        - Site navigation
    ui/                   - Shadcn UI components
  pages/
    home.tsx              - Home page with hero section
    not-found.tsx         - 404 page
  App.tsx                 - Root with routing
client/public/
  images/
    hero-bg.png           - Hero background (foggy mountain cabin)
```
