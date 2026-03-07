import Navigation from "@/components/navigation";
import SiteFooter from "@/components/site-footer";
import InteractiveTree from "@/components/interactive-tree";
import { useState, useEffect, useRef, useCallback } from "react";

import sunsetEindhoven from "@images/Sunset/Eindhoven_March_2024.jpg";
import sunsetJoshuaTree from "@images/Sunset/Joshua_Tree_June_2025.JPG";
import sunsetLA from "@images/Sunset/Los_Angelos_Jun_2025.JPG";
import sunsetOstend from "@images/Sunset/Ostend_Feb_2022.JPG";
import sunsetParisApril from "@images/Sunset/Paris_April_2025.JPG";
import sunsetParisJune from "@images/Sunset/Paris_June_2025.JPG";
import sunsetParisSep from "@images/Sunset/Paris_Sep_2025.JPG";

const TEAL = "#0A5068";
const LAV_PURPLE = "#A290C0";
const PERIW_PURPLE = "#6A6494";
const CONTENT = "max-w-6xl mx-auto";

/* ─── Vibe coding project placeholders ─── */
const ASCII_ART = [
  `    ~~--__  ~~--
  ~~--    ~~--__
~~--__  ~~--    ~~
    ~~--__  ~~--`,
  `     /\\
    /  \\__/\\
   /   /    \\
  /___/  /\\  \\
      \\_/  \\_/`,
  `    * . * . *
  .  \\|/  .
  * --+-- *
  .  /|\\  .
    * . * . *`,
  `  ~  ~  ~  ~
 ~ ~ ~ ~ ~ ~
  ~  ~  ~  ~
 ~ ~ ~ ~ ~ ~`,
  `      |
     /|\\
    / | \\
   /  |  \\
  /___|___\\
      |`,
  `  .  ..  . .
 . .  .  .. .
  ..  . .  .
 .  .. .  . .`,
];

const vibeProjects = [
  { id: 1, title: "Project One", ascii: ASCII_ART[0] },
  { id: 2, title: "Project Two", ascii: ASCII_ART[1] },
  { id: 3, title: "Project Three", ascii: ASCII_ART[2] },
  { id: 4, title: "Project Four", ascii: ASCII_ART[3] },
  { id: 5, title: "Project Five", ascii: ASCII_ART[4] },
  { id: 6, title: "Project Six", ascii: ASCII_ART[5] },
  { id: 7, title: "Project Seven", ascii: ASCII_ART[0] },
  { id: 8, title: "Project Eight", ascii: ASCII_ART[1] },
  { id: 9, title: "Project Nine", ascii: ASCII_ART[2] },
];

// 5-col sparse grid — no row fully filled (at least 1 empty per row)
// Row 0: 3 tiles (cols 0,2,4)
// Row 1: 4 tiles (cols 0,1,3,4)
// Row 2: 2 tiles (cols 1,3)
const gridPlacements: { row: number; col: number }[] = [
  { row: 0, col: 0 },
  { row: 0, col: 2 },
  { row: 0, col: 4 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: 3 },
  { row: 1, col: 4 },
  { row: 2, col: 1 },
  { row: 2, col: 3 },
];

/* ─── Sunset data ─── */
const sunsets = [
  { src: sunsetEindhoven, title: "March 2024", location: "Eindhoven, Netherlands" },
  { src: sunsetJoshuaTree, title: "June 2025", location: "Joshua Tree, California" },
  { src: sunsetLA, title: "June 2025", location: "Los Angeles, California" },
  { src: sunsetOstend, title: "Feburary 2022", location: "Ostend, Belgium" },
  { src: sunsetParisApril, title: "April 2025", location: "Paris, France" },
  { src: sunsetParisJune, title: "June 2025", location: "Paris, France" },
  { src: sunsetParisSep, title: "September 2025", location: "Paris, France" },
];

/* ─── Crossfade Sunset Viewer (sticky full-screen) ─── */
function SunsetViewer() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const DURATION = 6000;
  const FADE = 2000;

  const advance = useCallback(() => {
    const nextIdx = (current + 1) % sunsets.length;
    setNext(nextIdx);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(nextIdx);
      setTransitioning(false);
    }, FADE);
  }, [current]);

  useEffect(() => {
    timerRef.current = setTimeout(advance, DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [advance]);

  const goTo = (idx: number) => {
    if (idx === current || transitioning) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setNext(idx);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, FADE);
  };

  return (
    <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
      <img
        key={`current-${current}`}
        src={sunsets[current].src}
        alt={sunsets[current].title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <img
        key={`next-${next}`}
        src={sunsets[next].src}
        alt={sunsets[next].title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: transitioning ? 1 : 0,
          transition: `opacity ${FADE}ms ease-in-out`,
        }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}
      />

      {/* Title + location */}
      <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-14 md:pb-20 z-10">
        <h3
          className="font-serif text-2xl md:text-4xl font-light tracking-tight text-white mb-2"
          style={{
            opacity: transitioning ? 0 : 1,
            transition: `opacity ${FADE * 0.4}ms ease`,
          }}
        >
          {sunsets[current].title}
        </h3>
        <p
          className="font-sans text-xs md:text-sm tracking-widest uppercase"
          style={{
            color: "rgba(255,255,255,0.6)",
            opacity: transitioning ? 0 : 1,
            transition: `opacity ${FADE * 0.4}ms ease`,
          }}
        >
          {sunsets[current].location}
        </p>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2 z-10">
        {sunsets.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: idx === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              transform: idx === current ? "scale(1.3)" : "scale(1)",
            }}
            aria-label={`View sunset ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-5 right-6 z-10">
        <p className="font-sans text-[10px] tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
          Scroll to continue
        </p>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Exploration() {
  return (
    <div data-testid="page-exploration">
      <Navigation />

      {/* ═══ Section 1: Hero — Interactive Tree ═══ */}
      <section
        className="relative w-full h-screen"
        style={{ background: "#F7F4EF" }}
        data-testid="section-hero-exploration"
      >
        <InteractiveTree />
      </section>

      {/* ═══ Section 2: Vibe Coding Projects — home page card style on lavender ═══ */}
      <section
        className="relative"
        style={{ background: LAV_PURPLE }}
        data-testid="section-vibe-projects"
      >
        <div className={`${CONTENT} px-6 py-20 md:py-28`}>
          <div className="mb-16">
            <p
              className="font-sans text-xs uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Explorations
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-light tracking-tight"
              style={{ color: "#ffffff" }}
            >
              Interest Projects
            </h2>
          </div>
        </div>

        <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.12)" }} />

        {/* Sparse 5-col grid — small cards, text at bottom */}
        <div
          className={`${CONTENT} relative grid border-l border-r`}
          style={{
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(3, auto)",
            borderColor: "rgba(255,255,255,0.12)",
          }}
        >
          {vibeProjects.map((project, idx) => {
            const { row, col } = gridPlacements[idx];
            return (
              <a
                key={project.id}
                href="#"
                className="group block transition-all duration-200"
                style={{
                  gridRow: row + 1,
                  gridColumn: col + 1,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  marginTop: "-1px",
                  marginLeft: "-1px",
                }}
              >
                <div
                  className="aspect-square flex flex-col overflow-hidden p-4 transition-colors duration-200 group-hover:bg-white/10"
                  style={{ cursor: "pointer" }}
                >
                  {/* ASCII art — fills the top area */}
                  <div className="flex-1 flex items-center justify-center">
                    <pre
                      className="text-[10px] md:text-xs leading-snug transition-all duration-200 group-hover:scale-105"
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      {project.ascii}
                    </pre>
                  </div>
                  {/* Title pinned to bottom */}
                  <span
                    className="font-sans text-xs font-medium transition-colors duration-200 group-hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {project.title}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
      </section>

      {/* ═══ Section 3: Watch Sunset Together — sticky full-screen ═══ */}
      <section className="relative" data-testid="section-sunset">
        <div className={`${CONTENT} px-6 py-20 md:py-28`} style={{ background: "#F7F4EF" }}>
          <div className="text-center mb-4">
            <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: LAV_PURPLE }}>
              Pause & Breathe
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-light tracking-tight"
              style={{ color: "#1a1a1a" }}
            >
              Watch Sunset Together
            </h2>
          </div>
        </div>

        {/* Sticky container — scroll through to release */}
        <div style={{ height: "100vh", position: "relative" }}>
          <SunsetViewer />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
