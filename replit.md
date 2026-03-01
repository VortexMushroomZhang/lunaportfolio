# Xumeng Zhang Portfolio

## Overview
Creative product designer portfolio website for Xumeng Zhang (LunaZhang). Warm, editorial, data-driven design style. Features an interactive raindrop hero section with letter-carrying raindrops on a foggy glass window effect, followed by content sections with Vercel-like line design and glass effects.

## Architecture
- **Frontend**: React SPA with Vite, Tailwind CSS, Shadcn UI
- **Backend**: Express.js (minimal, serves static assets)
- **Routing**: wouter for client-side routing

## Brand System
- **Fonts**: Bitter (serif headings), Lato (sans-serif body), DM Mono (monospace)
- **Brand Cream**: #F7F4EF (main content background)
- **Text**: #1a1a1a (dark), rgba variants for muted
- **Glass Effects**: Frosted glass cards with backdrop-blur
- **Line Elements**: Vercel-style horizontal/vertical guide lines
- **Custom Cursor**: White dot, 14px normal / 20px clicked, `mix-blend-mode: difference`, site-wide

## Pages
- **Home**: Hero + Latest Work + Work Experience + How/Principles + Footer
- Work (planned)
- Exploration (planned)
- About (planned)

## Key Components
- `custom-cursor.tsx`: Global white dot cursor with difference blending, 14x14 / 20x20 on click
- `raindrop-canvas.tsx`: HTML5 Canvas interactive raindrop simulation
  - 600 drops, spawn rate 8, radius 1.5–9.5, drifting right
  - Time-based background: city sunset (night) / street rain (day)
  - Brightness 0.85 for visible background through foggy window
  - Organic blob shapes, wind-driven movement, drop merging
  - Hover-to-collect macro drop with wobble surface tension
- `typewriter-banner.tsx`: "Xumeng Zhang" + cycling roles (Product builder./Researcher./Designer.) in Lato semibold
- `navigation.tsx`: "XUMENG ZHANG" logo, Work/Exploration/About pills. Scroll-aware: transparent on hero, cream (#F7F4EF) background after scroll
- Home page sections:
  - Hero footer: location, work sector, contact links (CookingInstagram, LinkedIn) with arrow hover
  - Latest Work: 3 featured project cards with glass effect
  - Work Experience: Featured (Van Lanschot Kempen) + 3 past roles
  - How/Principles: Philosophy text + numbered principles
  - Footer: copyright + social links

## Project Structure
```
client/src/
  components/
    custom-cursor.tsx     - Global custom cursor
    raindrop-canvas.tsx   - Interactive canvas raindrop effect
    typewriter-banner.tsx - Name + typewriter roles
    navigation.tsx        - Scroll-aware site navigation
    ui/                   - Shadcn UI components
  pages/
    home.tsx              - Home page with all sections
    not-found.tsx         - 404 page
  App.tsx                 - Root with routing + custom cursor
client/public/
  images/
    bg-city-sunset.jpg    - Evening/night background
    bg-street-rain.jpg    - Day background
```

## Contact Links
- LinkedIn: https://www.linkedin.com/in/xumeng-zhang/
- CookingInstagram: https://www.instagram.com/luna_in_kitchen/
