# VortexMushroom Portfolio

## Overview
Creative product designer portfolio website with a warm, editorial, data-driven design style.

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
- **Home**: Interactive raindrop hero section with foggy glass effect
- Work (planned)
- Exploration (planned)
- About (planned)

## Key Components
- `raindrop-canvas.tsx`: HTML5 Canvas interactive raindrop simulation with realistic physics
  - Pre-rendered blurred background for performance
  - Realistic water drop shapes with chromatic aberration
  - Wind-driven movement (car window simulation)
  - Hover-to-collect interaction with macro drop merging
  - Continuous rain spawning
- `navigation.tsx`: Floating navigation with glassmorphism on hero page

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
    hero-bg.png           - Hero background image
```
