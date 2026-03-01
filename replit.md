# Xumeng Zhang Portfolio

## Overview
Creative product designer portfolio website for Xumeng Zhang (LunaZhang). Warm, editorial, data-driven design style. Features an interactive raindrop hero section on a foggy glass window effect, followed by content sections with Vercel-style sharp-cornered containers separated by thin line borders.

## Architecture
- **Frontend**: React SPA with Vite, Tailwind CSS, Shadcn UI
- **Backend**: Express.js (minimal, serves static assets)
- **Routing**: wouter for client-side routing

## Brand System
- **Fonts**: Bitter (serif headings), Lato (sans-serif body), DM Mono (monospace)
- **Brand Cream**: #F7F4EF (main content background)
- **Brand Colors**: Steel Teal (#4A7C7E), Dark Sienna (#6B3A2A), Mauve Brown (#8B6F5E), Deep Forest, Lavender Purple
- **Text**: #1a1a1a (dark), rgba variants for muted
- **Container Style**: Vercel-inspired — no rounded corners, adjacent cells separated by 1px lines, outer border on grid
- **Layout**: Content centered with max-w-6xl mx-auto; border lines extend full viewport width (edge to edge)
- **Line Elements**: Thin borders (rgba(0,0,0,0.08)) between grid cells
- **Film Grain**: Animated noise overlay on all pages (canvas, 10fps, 1/4 resolution, pauses when tab hidden, respects prefers-reduced-motion)
- **Custom Cursor**: White dot, 14px normal / 20px clicked, `mix-blend-mode: difference`, site-wide
- **Links**: No underline at rest, arrow tilted 45° up (↗); on hover underline appears + arrow rotates to horizontal (→)

## Pages
- **Home**: Hero + Latest Work + Work Experience + How/Principles + Footer
- Work (planned)
- Exploration (planned)
- About (planned)

## Key Components
- `custom-cursor.tsx`: Global white dot cursor with difference blending, 14x14 / 20x20 on click
- `raindrop-canvas.tsx`: HTML5 Canvas interactive raindrop simulation
  - 600 drops, spawn rate 8, radius 1.5–9.5, drifting right
  - No letters on drops (removed)
  - Faster flow speed (0.12), gravity (0.06)
  - Time-based background: city sunset (night) / street rain (day)
  - Brightness 0.85 for visible background through foggy window
  - Organic blob shapes, wind-driven movement, drop merging
  - Hover-to-collect macro drop with wobble surface tension
- `typewriter-banner.tsx`: "Xumeng Zhang" + cycling roles (Product builder./Researcher./Designer.) in Lato semibold
- `navigation.tsx`: "XUMENG ZHANG" logo + Work/Exploration/About pills. No background bar — only the pill container has a frosted glass background. Logo color adapts (white on hero, dark on cream)
- `site-footer.tsx`: Shared footer for all pages — info columns (location, work, contact), copyright close to ASCII art, full-width ASCII art landscape image as visual centerpiece
- Home page sections:
  - Hero footer: location, work sector, contact links (CookingInstagram, LinkedIn)
  - Latest Work: 3 project cards in Vercel-style grid (sharp corners, line borders)
  - Work Experience: Featured (Van Lanschot Kempen) + 3 past roles in line-separated grid
  - How/Principles: Philosophy text + numbered principles in line-separated grid
  - Footer: SiteFooter shared component with ASCII art

## Project Structure
```
client/src/
  components/
    custom-cursor.tsx     - Global custom cursor
    film-grain.tsx        - Animated film grain overlay (all pages)
    raindrop-canvas.tsx   - Interactive canvas raindrop effect
    typewriter-banner.tsx - Name + typewriter roles
    navigation.tsx        - Scroll-aware site navigation (no bg bar)
    site-footer.tsx       - Shared footer with ASCII art
    ui/                   - Shadcn UI components
  pages/
    home.tsx              - Home page with all sections
    not-found.tsx         - 404 page
  App.tsx                 - Root with routing + custom cursor
client/public/
  images/
    bg-city-sunset.jpg    - Evening/night background
    bg-street-rain.jpg    - Day background
attached_assets/
  ascii-art_*.png         - ASCII art landscape for footer
```

## Contact Links
- LinkedIn: https://www.linkedin.com/in/xumeng-zhang/
- CookingInstagram: https://www.instagram.com/luna_in_kitchen/
