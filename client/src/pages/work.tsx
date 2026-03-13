import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/navigation";
import SiteFooter from "@/components/site-footer";
import vlkWorkImg from "@images/VLK_work.svg";
import clientVoiceImg from "@images/ClientVoice.png";
import masteryLoopImg from "@images/MasteryLoop.jpg";

const TEAL = "#0A5068";
const BG = "#F7F4EF";
const PAPER = "#e8e0d0";
const LINE = "rgba(0,0,0,0.08)";

const projects = [
  {
    id: "work-projects",
    num: "01",
    name: "Client APP",
    sub: "Finance",
    type: "Work",
    status: "Ongoing",
    period: "2023 — Now",
    company: "Van Lanschot Kempen",
    desc: "Research and design for the next-gen private banking client app, focused on delivering a best-in-class digital experience that reflects the precision and craftsmanship of our financial services.",
    tags: ["Research", "Design", "Mobile"],
    quote: '"Accuracy and craftmanship in Finance."',
    envBg: "#0A3040",
    image: vlkWorkImg,
  },
  {
    id: "client-voice",
    num: "02",
    name: "Client Voice",
    sub: "Client feedback · SaaS",
    type: "Work interest project",
    status: "Completed",
    period: "2026 · Jan",
    company: "Self-initiated",
    desc: "Transforming scattered client feedback into one dynamic source of truth that organizes, highlights, and accelerates what matters for the product team.",
    tags: ["Research Ops", "Data", "UX"],
    quote: '"One source of truth for everything that matters."',
    envBg: "#224128",
    image: clientVoiceImg,
  },
  {
    id: "mastery-loop",
    num: "03",
    name: "Mastery Loop",
    sub: "Language practice · EdTech",
    type: "Side Project",
    status: "Live",
    period: "2026 · Mar",
    company: "Personal",
    desc: "An old-school inspired language practice tool for listening, reading, writing, and dictation through a continuous cycle of focused exercises.",
    tags: ["EdTech", "Learning", "Design"],
    quote: '"Practice with intention."',
    envBg: "#6A6494",
    image: masteryLoopImg,
  },
  {
    id: "AI-in-current-workflow",
    num: "04",
    name: "AI assistant workflow integration",
    sub: "2025 · NOV",
    type: "Work",
    status: "Live",
    period: "2025",
    company: "Van Lanschot Kempen",
    desc: "Implementing AI tools within banker tooling cluster to enhance efficiency and insights while maintaining the high standards of precision and client service expected in private banking.",
    tags: ["AI", "DesignOps", "ResearchOps"],
    quote: '"AI implementation in current workflow for workflow enhancement."',
    envBg: "#3A2E28",
    image: vlkWorkImg,
  },
  {
    id: "placeholder-05",
    num: "05",
    name: "Coming Soon",
    sub: "TBD",
    type: "Side Project",
    status: "Upcoming",
    period: "2026",
    company: "Personal",
    desc: "This project is currently in early research and discovery. Details will be added as the work progresses.",
    tags: ["TBD"],
    quote: '"Every great design begins with an even better story."',
    envBg: "#2A3038",
    image: masteryLoopImg,
  },
];

const FILM_FRAMES = [
  "linear-gradient(180deg,#5c2800,#9b4a08,#3d1a00)",
  "linear-gradient(180deg,#7a3a0a,#c07020,#5a2800)",
  "linear-gradient(180deg,#3d1a00,#6b3000,#9b4a10)",
  "linear-gradient(180deg,#a05010,#c47820,#7a3808)",
  "linear-gradient(180deg,#6b3008,#503000,#8b4510)",
  "linear-gradient(180deg,#401800,#8b3a0a,#401800)",
  "linear-gradient(180deg,#8b4a18,#b06a20,#6b3a10)",
  "linear-gradient(180deg,#5c2800,#9b4a10,#3d1a00)",
];

export default function Work() {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);

  const folderRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const p = projects[current];

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      if (filmRef.current)
        filmRef.current.style.transform = `translateX(-148px) rotate(-1deg) translate3d(${dx * 2}px,${dy * 2}px,0)`;
      if (folderRef.current)
        folderRef.current.style.transform = `translateX(-52%) rotate(1.5deg) translate3d(${dx * 4}px,${dy * 4}px,0)`;
      if (photosRef.current)
        photosRef.current.style.transform = `rotate(-4deg) translate3d(${dx * 5}px,${dy * 5}px,0)`;
      if (mapRef.current)
        mapRef.current.style.transform = `rotate(-5deg) translate3d(${dx * 3}px,${dy * 3}px,0)`;
    };
    scene.addEventListener("mousemove", onMove);
    return () => scene.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={{ background: BG }}>
      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Navigation />

        <div
          ref={sceneRef}
          style={{ position: "relative", width: "100vw", height: "100vh", display: "flex", alignItems: "center" }}
        >
          {/* ── LEFT PANEL — project navigator, bottom-aligned ── */}
          <div style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: "46vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingLeft: "clamp(32px, 5vw, 80px)",
            paddingRight: 40,
            paddingBottom: "clamp(40px, 6vh, 72px)",
          }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {projects.map((proj, i) => (
                <li
                  key={proj.id}
                  onClick={() => setCurrent(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: i === current ? 600 : 400,
                    color: i === current ? "#1a1a1a" : "rgba(0,0,0,0.32)",
                    cursor: "pointer",
                    padding: "14px 0",
                    borderBottom: `1px solid ${LINE}`,
                    transition: "color 0.25s",
                    letterSpacing: "0.01em",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: i === current ? TEAL : "rgba(0,0,0,0.22)",
                    minWidth: 26,
                    letterSpacing: "0.05em",
                    flexShrink: 0,
                  }}>
                    {proj.num}
                  </span>
                  <span style={{ flex: 1 }}>{proj.name}</span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    color: i === current ? `${TEAL}99` : "rgba(0,0,0,0.18)",
                    textTransform: "uppercase",
                  }}>
                    {proj.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT — Envelope Area ── */}
          <div
            style={{
              position: "absolute",
              right: "6vw",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48vw",
              maxWidth: 580,
              height: "85vh",
              maxHeight: 760,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* ── Dossier / Clipboard ── */}
            <div
              ref={folderRef}
              style={{
                position: "absolute",
                bottom: 18,
                left: "50%",
                transform: "translateX(-52%) rotate(1.5deg)",
                width: 490,
                height: 580,
                zIndex: 1,
                filter: "drop-shadow(0 28px 70px rgba(0,0,0,0.28))",
              }}
            >
              {/* ── Document 1 — cream paper sticking out top-left ── */}
              <div style={{
                position: "absolute", top: -88, left: 38,
                width: 310, height: 240,
                background: "#f0ebe0",
                transform: "rotate(-4deg)",
                boxShadow: "0 -4px 16px rgba(0,0,0,0.13)",
                overflow: "hidden",
              }}>
                {/* Blue ruled lines */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "repeating-linear-gradient(to bottom,transparent 0,transparent 18px,rgba(100,130,200,0.13) 18px,rgba(100,130,200,0.13) 19px)",
                }} />
                {/* Red margin line */}
                <div style={{ position: "absolute", top: 0, bottom: 0, left: 38, width: 1, background: "rgba(200,60,40,0.2)" }} />
                <div style={{ padding: "10px 14px 10px 48px", fontFamily: "var(--font-mono)", fontSize: 7, color: "rgba(0,0,0,0.45)", letterSpacing: "0.1em", lineHeight: "19px" }}>
                  FILE REF: {p.num} · {p.id.toUpperCase()}<br />
                  PROJECT: {p.name.toUpperCase()}<br />
                  COMPANY: {p.company.toUpperCase()}<br />
                  STATUS: {p.status.toUpperCase()}<br />
                  PERIOD: {p.period}<br />
                  <br />
                  {p.desc.slice(0, 60)}...
                </div>
                {/* FILED stamp */}
                <div style={{
                  position: "absolute", bottom: 18, right: 16,
                  border: "2px solid rgba(170,35,20,0.38)",
                  color: "rgba(170,35,20,0.38)",
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: "0.22em", padding: "2px 7px",
                  transform: "rotate(7deg)", fontWeight: 700,
                }}>FILED</div>
              </div>

              {/* ── Document 2 — smaller slip top-right ── */}
              <div style={{
                position: "absolute", top: -52, right: 22,
                width: 185, height: 130,
                background: "#e8e2d4",
                transform: "rotate(5deg)",
                boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "repeating-linear-gradient(to bottom,transparent 0,transparent 18px,rgba(100,130,200,0.1) 18px,rgba(100,130,200,0.1) 19px)",
                }} />
                <div style={{ padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: 6.5, color: "rgba(0,0,0,0.35)", letterSpacing: "0.1em", lineHeight: "19px" }}>
                  CASE {parseInt(p.num)}<br />
                  {p.type.toUpperCase()}<br />
                  {p.tags.join(" · ")}
                </div>
              </div>

              {/* ── Folder base — dusky pink ── */}
              <div style={{ position: "absolute", inset: 0, background: "#C899B4", borderRadius: "0 0 4px 4px" }}>

                {/* Primary tab */}
                <div style={{
                  position: "absolute", top: -26, left: 32,
                  width: 140, height: 28,
                  background: "#C899B4",
                  borderRadius: "5px 5px 0 0",
                  display: "flex", alignItems: "center", paddingLeft: 12,
                  fontFamily: "var(--font-mono)", fontSize: 8,
                  letterSpacing: "0.2em", color: "rgba(60,10,40,0.55)",
                }}>PROJ-FILES</div>

                {/* Secondary tab (darker) */}
                <div style={{
                  position: "absolute", top: -26, right: 72,
                  width: 80, height: 28,
                  background: "#a87898",
                  borderRadius: "5px 5px 0 0",
                }} />

                {/* Top edge highlight */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.14)" }} />

                {/* Horizontal grain lines */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "repeating-linear-gradient(to bottom,transparent,transparent 34px,rgba(0,0,0,0.03) 34px,rgba(0,0,0,0.03) 35px)",
                }} />

                {/* Left binding strip */}
                <div style={{
                  position: "absolute", top: 0, bottom: 0, left: 0, width: 22,
                  background: "linear-gradient(to right,rgba(0,0,0,0.22),rgba(0,0,0,0.06))",
                  borderRight: "1px solid rgba(0,0,0,0.1)",
                }}>
                  {[55, 150, 260, 370, 470].map(top => (
                    <div key={top} style={{
                      position: "absolute", top, left: "50%",
                      transform: "translateX(-50%)",
                      width: 7, height: 7, borderRadius: "50%",
                      background: "rgba(0,0,0,0.28)",
                      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
                    }} />
                  ))}
                </div>

                {/* Classification header box */}
                <div style={{
                  position: "absolute", top: 22, left: 32, right: 26,
                  border: "1px solid rgba(60,10,40,0.16)",
                  padding: "10px 14px",
                }}>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: 7.5,
                    color: "rgba(60,10,40,0.5)", letterSpacing: "0.14em", lineHeight: 2.3,
                  }}>
                    CLASSIFICATION:&nbsp;
                    <span style={{ display: "inline-block", background: "rgba(60,10,40,0.35)", height: 9, width: 96, verticalAlign: "middle" }} /><br />
                    PROJECT REF:&nbsp;
                    <span style={{ display: "inline-block", background: "rgba(60,10,40,0.35)", height: 9, width: 60, verticalAlign: "middle" }} /><br />
                    AUTHORIZATION: DR.&nbsp;
                    <span style={{ display: "inline-block", background: "rgba(60,10,40,0.35)", height: 9, width: 74, verticalAlign: "middle" }} />
                  </div>
                </div>

                {/* Horizontal rule */}
                <div style={{ position: "absolute", top: 148, left: 32, right: 26, height: 1, background: "rgba(60,10,40,0.12)" }} />

                {/* Project name */}
                <div style={{
                  position: "absolute", top: 160, left: 34,
                  fontFamily: "var(--font-serif)", fontSize: 24,
                  color: "rgba(60,10,40,0.32)", fontStyle: "italic",
                  letterSpacing: "0.03em",
                }}>{p.name}</div>

                {/* Ruled content section */}
                <div style={{
                  position: "absolute", top: 206, left: 32, right: 26, height: 230,
                  background: "repeating-linear-gradient(to bottom,transparent,transparent 21px,rgba(60,10,40,0.06) 21px,rgba(60,10,40,0.06) 22px)",
                }}>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: 7.5,
                    color: "rgba(60,10,40,0.4)", letterSpacing: "0.1em",
                    lineHeight: "22px", padding: "1px 6px",
                  }}>
                    {p.tags.map(t => `[ ${t} ]`).join("  ")}<br />
                    {p.type.toUpperCase()}&nbsp;&nbsp;&nbsp;&nbsp;{p.period}<br />
                    {p.company.toUpperCase()}<br />
                    <br />
                    {p.desc.slice(0, 55)}...
                  </div>
                </div>

                {/* Large CONFIDENTIAL stamp */}
                <div style={{
                  position: "absolute", bottom: 88, left: "50%",
                  transform: "translateX(-48%) rotate(-8deg)",
                  border: "4px solid rgba(150,30,20,0.42)",
                  color: "rgba(150,30,20,0.42)",
                  fontFamily: "var(--font-mono)", fontSize: 22,
                  letterSpacing: "0.3em", padding: "5px 18px",
                  fontWeight: 800, whiteSpace: "nowrap",
                }}>CONFIDENTIAL</div>

                {/* Tape strips at bottom */}
                <div style={{
                  position: "absolute", bottom: 44, left: 48,
                  width: 72, height: 18,
                  background: "rgba(60,10,40,0.12)",
                  transform: "rotate(-2deg)",
                }} />
                <div style={{
                  position: "absolute", bottom: 36, right: 56,
                  width: 52, height: 14,
                  background: "rgba(60,10,40,0.1)",
                  transform: "rotate(3deg)",
                }} />
              </div>
            </div>

            {/* ── Film strip 1 (parallax) ── */}
            <div
              ref={filmRef}
              style={{
                position: "absolute",
                left: "50%", top: 0, bottom: 0,
                transform: "translateX(-148px) rotate(-1.5deg)",
                width: 50, zIndex: 0,
                background: "#1e0c00",
                overflow: "hidden",
              }}
            >
              {/* Amber film frames */}
              {FILM_FRAMES.map((grad, i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: 9, right: 9,
                  top: 8 + i * 80, height: 70,
                  background: grad, opacity: 0.88,
                }} />
              ))}
              {/* Sprocket holes — left column */}
              {Array.from({ length: 44 }).map((_, i) => (
                <div key={`l${i}`} style={{
                  position: "absolute",
                  top: 3 + i * 18, left: 1,
                  width: 6, height: 10, borderRadius: 1,
                  background: "rgba(255,255,255,0.18)",
                }} />
              ))}
              {/* Sprocket holes — right column */}
              {Array.from({ length: 44 }).map((_, i) => (
                <div key={`r${i}`} style={{
                  position: "absolute",
                  top: 3 + i * 18, right: 1,
                  width: 6, height: 10, borderRadius: 1,
                  background: "rgba(255,255,255,0.18)",
                }} />
              ))}
            </div>

            {/* ── Film strip 2 (static, slightly offset) ── */}
            <div style={{
              position: "absolute",
              left: "50%", top: "8%", bottom: "-4%",
              transform: "translateX(-96px) rotate(2.5deg)",
              width: 50, zIndex: 0,
              background: "#250f00",
              overflow: "hidden",
            }}>
              {FILM_FRAMES.map((grad, i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: 9, right: 9,
                  top: 8 + i * 80, height: 70,
                  background: grad, opacity: 0.75,
                }} />
              ))}
              {Array.from({ length: 44 }).map((_, i) => (
                <div key={`l${i}`} style={{
                  position: "absolute",
                  top: 3 + i * 18, left: 1,
                  width: 6, height: 10, borderRadius: 1,
                  background: "rgba(255,255,255,0.14)",
                }} />
              ))}
              {Array.from({ length: 44 }).map((_, i) => (
                <div key={`r${i}`} style={{
                  position: "absolute",
                  top: 3 + i * 18, right: 1,
                  width: 6, height: 10, borderRadius: 1,
                  background: "rgba(255,255,255,0.14)",
                }} />
              ))}
            </div>

            {/* ── Layered hang-tag label (parallax) ── */}
            <div
              ref={photosRef}
              style={{
                position: "absolute",
                right: -55,
                bottom: 160,
                width: 195,
                height: 340,
                zIndex: 10,
                transform: "rotate(-4deg)",
              }}
            >
              {/* ── Tag layer 3 — beige + dot-grid pattern, big tilt left ── */}
              <div style={{
                position: "absolute", inset: 0,
                background: "#f0e6c8",
                backgroundImage: "radial-gradient(circle, rgba(100,70,30,0.13) 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
                borderRadius: 3,
                transform: "translateX(-26px) rotate(-9deg)",
                transformOrigin: "top center",
                boxShadow: "0 12px 32px rgba(0,0,0,0.22)",
              }}>
                <div style={{
                  position: "absolute", inset: 10,
                  border: "0.5px solid rgba(100,70,30,0.18)",
                  borderRadius: 2, pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", top: 16, left: "50%",
                  transform: "translateX(-50%)",
                  width: 14, height: 14, borderRadius: "50%",
                  background: BG, border: "1px solid rgba(100,70,30,0.22)",
                }} />
              </div>

              {/* ── Tag layer 2 — photo card, medium tilt ── */}
              <div style={{
                position: "absolute", inset: 0,
                borderRadius: 3, overflow: "hidden",
                transform: "translateX(-9px) rotate(-3.5deg)",
                transformOrigin: "top center",
                boxShadow: "0 8px 22px rgba(0,0,0,0.2)",
              }}>
                <img
                  src={p.image} alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute", top: 16, left: "50%",
                  transform: "translateX(-50%)",
                  width: 14, height: 14, borderRadius: "50%",
                  background: BG,
                }} />
              </div>

              {/* ── Tag layer 1 — sulfuric acid vellum, slight tilt right, front ── */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(232,224,200,0.60)",
                backdropFilter: "blur(1.5px)",
                borderRadius: 3,
                border: "1px solid rgba(200,185,155,0.38)",
                transform: "translateX(5px) rotate(2.5deg)",
                transformOrigin: "top center",
              }}>
                <div style={{
                  position: "absolute", top: 16, left: "50%",
                  transform: "translateX(-50%)",
                  width: 14, height: 14, borderRadius: "50%",
                  background: BG, border: "1.5px solid rgba(0,0,0,0.18)",
                }} />
                <div style={{
                  position: "absolute", top: 52, left: 18, right: 18,
                  fontFamily: "var(--font-mono)", fontSize: 7.5,
                  color: "rgba(20,12,6,0.75)", letterSpacing: "0.05em",
                  lineHeight: 1.8, textAlign: "center", whiteSpace: "pre-line",
                }}>{p.quote.replace(/^"|"$/g, "")}</div>
                <div style={{
                  position: "absolute", bottom: 48, left: 14, right: 14,
                  fontFamily: "var(--font-serif)", fontSize: 9,
                  color: "rgba(20,12,6,0.45)", textAlign: "center",
                  fontStyle: "italic", letterSpacing: "0.08em",
                }}>{p.name}</div>
                <div style={{
                  position: "absolute", bottom: 20, left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 14, color: "rgba(20,12,6,0.28)", lineHeight: 1,
                }}>✳</div>
              </div>

              {/* ── Cord — thin natural hanging cord from board pin to tag hole ── */}
              <svg
                width="28" height="148"
                style={{
                  position: "absolute", top: -133, left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 25, pointerEvents: "none",
                  overflow: "visible",
                }}
              >
                {/* Board pin / tack */}
                <circle cx="14" cy="5" r="3.5" fill="rgba(40,28,16,0.55)" />
                <circle cx="14" cy="5" r="1.8" fill="rgba(200,170,120,0.6)" />
                {/* Cord — gentle catenary sag */}
                <path
                  d="M 14,8 C 11,42 17,82 14,143"
                  stroke="#2e1c0a"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Subtle highlight for cord texture */}
                <path
                  d="M 15,8 C 12,42 18,82 15,143"
                  stroke="rgba(160,110,55,0.3)"
                  strokeWidth="0.7"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>


            {/* ── Map / illustration polaroid ── */}
            <div
              ref={mapRef}
              style={{
                position: "absolute",
                bottom: 122, left: -40,
                transform: "rotate(-5deg)",
                zIndex: 6,
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.18))",
              }}
            >
              <div style={{
                position: "absolute",
                top: -36, left: -5,
                fontFamily: "var(--font-serif)", fontSize: 11,
                color: "rgba(30,30,20,0.5)",
                transform: "rotate(1deg)",
                whiteSpace: "nowrap", lineHeight: 1.5,
                fontStyle: "italic",
              }}>
                consistent, clear, fun
              </div>
              <div style={{
                background: "#e8e2d5",
                padding: "8px 8px 32px", width: 155,
                boxShadow: "2px 4px 14px rgba(0,0,0,0.18)",
              }}>
                <div style={{ width: 139, height: 120, overflow: "hidden" }}>
                  <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{
                  fontFamily: "var(--font-serif)", fontSize: 10,
                  color: "#555", textAlign: "center",
                  marginTop: 6, fontStyle: "italic",
                }}>{p.name}</div>
              </div>
            </div>

            {/* ── Ticket — sandwiched: flap behind, body in front ── */}
            <div style={{
              position: "absolute",
              bottom: hovered ? 220 : 90,
              left: "50%",
              transform: `translateX(-50%) rotate(${hovered ? "-0.4deg" : "-0.8deg"})`,
              width: 370,
              zIndex: 12,
              transition: "bottom 0.72s cubic-bezier(0.16,1,0.3,1), transform 0.72s cubic-bezier(0.16,1,0.3,1)",
              filter: "drop-shadow(0 -4px 30px rgba(0,0,0,0.1))",
            }}>
              <div style={{ background: PAPER, position: "relative" }}>
                {/* Perf top */}
                <div style={{
                  height: 16, background: PAPER,
                  display: "flex", alignItems: "center",
                  padding: "0 16px", gap: 7,
                  borderBottom: "1.5px dashed rgba(0,0,0,0.18)",
                }}>
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: BG, flexShrink: 0 }} />
                  <div style={{ flex: 1, height: 1, background: "repeating-linear-gradient(to right,rgba(0,0,0,0.12) 0,rgba(0,0,0,0.12) 4px,transparent 4px,transparent 8px)" }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: BG, flexShrink: 0 }} />
                </div>

                {/* Head */}
                <div style={{
                  padding: "14px 20px 12px",
                  borderBottom: "1px dotted rgba(0,0,0,0.18)",
                  display: "flex", alignItems: "flex-start", gap: 12,
                }}>
                  <div style={{
                    width: 38, height: 38,
                    border: "1.5px solid rgba(0,0,0,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, flexShrink: 0,
                    background: "rgba(0,0,0,0.03)", color: "#1a1710",
                    fontFamily: "var(--font-mono)",
                  }}>◈</div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 24, lineHeight: 1.1,
                      color: "#1a1710", letterSpacing: "0.02em", fontWeight: 600,
                    }}>{p.name}</div>
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: 10,
                      letterSpacing: "0.16em", color: "#3d3828",
                      marginTop: 4, textTransform: "uppercase",
                    }}>{p.sub}</div>
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: 11,
                    color: "rgba(0,0,0,0.22)", marginTop: 3, flexShrink: 0,
                  }}>({p.period})</div>
                </div>

                {/* Meta */}
                <div style={{
                  padding: "11px 20px",
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "8px 0",
                  borderBottom: "1px dotted rgba(0,0,0,0.18)",
                }}>
                  {[["TYPE", p.type], ["STATUS", p.status], ["PERIOD", p.period], ["COMPANY", p.company]].map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(0,0,0,0.3)", textTransform: "uppercase", marginBottom: 2, fontFamily: "var(--font-mono)" }}>{label} :</div>
                      <div style={{ fontSize: 12, color: "#1a1710", fontFamily: "var(--font-sans)" }}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* Body */}
                <div style={{ padding: "12px 20px", borderBottom: "1px dotted rgba(0,0,0,0.18)" }}>
                  <div style={{
                    fontFamily: "var(--font-sans)", fontSize: 11,
                    lineHeight: 1.85, color: "#3d3828",
                  }}>{p.desc}</div>
                </div>

                {/* Stamp row */}
                <div style={{
                  padding: "10px 20px",
                  display: "flex", alignItems: "center", gap: 10,
                  borderBottom: "1px dotted rgba(0,0,0,0.18)",
                }}>
                  <div style={{
                    border: `2px solid ${TEAL}`,
                    color: TEAL,
                    fontFamily: "var(--font-mono)", fontSize: 10,
                    letterSpacing: "0.28em", padding: "3px 8px",
                    transform: "rotate(-3deg)", opacity: 0.75, flexShrink: 0,
                  }}>{p.status.toUpperCase()}</div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", flex: 1, justifyContent: "flex-end" }}>
                    {p.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 10, letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        border: "1px solid rgba(0,0,0,0.15)",
                        padding: "2px 6px", color: "rgba(0,0,0,0.36)",
                        fontFamily: "var(--font-mono)",
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div style={{
                  padding: "11px 20px 12px",
                  fontFamily: "var(--font-serif)", fontSize: 14,
                  color: "#1a1710", lineHeight: 1.5, fontStyle: "italic",
                }}>{p.quote}</div>

                {/* Perf bottom */}
                <div style={{
                  height: 16, background: PAPER,
                  display: "flex", alignItems: "center",
                  padding: "0 16px", gap: 7,
                  borderTop: "1.5px dashed rgba(0,0,0,0.18)",
                }}>
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: BG, flexShrink: 0 }} />
                  <div style={{ flex: 1, height: 1, background: "repeating-linear-gradient(to right,rgba(0,0,0,0.12) 0,rgba(0,0,0,0.12) 4px,transparent 4px,transparent 8px)" }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: BG, flexShrink: 0 }} />
                </div>

                {/* Scallop */}
                <div style={{ height: 14, background: PAPER, position: "relative", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", bottom: -6, left: -4, right: -4, height: 20,
                    background: `radial-gradient(circle at 50% 0%,${BG} 6px,${PAPER} 6px)`,
                    backgroundSize: "16px 12px", backgroundRepeat: "repeat-x",
                  }} />
                </div>
              </div>
            </div>

            {/* ── Envelope flap — flat rectangle, BEHIND ticket (zIndex 6) ── */}
            <div style={{
              position: "absolute",
              bottom: 235, left: "50%",
              transform: `translateX(-50%) rotate(-1deg)`,
              width: 380,
              zIndex: 6,
            }}>
              {/* Flat open flap — inner face shows slightly lighter */}
              <div style={{
                width: "100%", height: 60,
                background: p.envBg,
                filter: "brightness(1.12)",
                transition: "background 0.5s, filter 0.5s",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 18px rgba(0,0,0,0.22)",
              }} />
            </div>

            {/* ── Envelope body — IN FRONT of ticket (zIndex 18), hides ticket bottom ── */}
            <div style={{
              position: "absolute",
              bottom: 30, left: "50%",
              transform: `translateX(-50%) rotate(-1deg)`,
              width: 380,
              zIndex: 18,
              filter: "drop-shadow(0 24px 60px rgba(0,0,0,0.26))",
              transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
            }}>
              <div style={{
                height: 205, borderRadius: "0 0 3px 3px", overflow: "hidden",
                background: p.envBg, transition: "background 0.5s",
                position: "relative",
              }}>
                {/* Full X fold — all 4 triangles from each corner to centre */}
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: "50%", height: "50%",
                  clipPath: "polygon(0 0,100% 0,0 100%)",
                  background: "rgba(255,255,255,0.04)",
                }} />
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: "50%", height: "50%",
                  clipPath: "polygon(0 0,100% 0,100% 100%)",
                  background: "rgba(0,0,0,0.1)",
                }} />
                <div style={{
                  position: "absolute", bottom: 0, left: 0,
                  width: "50%", height: "50%",
                  clipPath: "polygon(0 0,0 100%,100% 100%)",
                  background: "rgba(0,0,0,0.14)",
                }} />
                <div style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: "50%", height: "50%",
                  clipPath: "polygon(100% 0,0 100%,100% 100%)",
                  background: "rgba(0,0,0,0.08)",
                }} />
                {/* Address box */}
                <div style={{
                  position: "absolute", top: 10, left: 12,
                  border: `1px solid ${TEAL}70`,
                  padding: "6px 10px", fontSize: 10,
                  lineHeight: 2, color: `${TEAL}a0`,
                  letterSpacing: "0.1em", zIndex: 2,
                  fontFamily: "var(--font-mono)",
                }}>
                  <div style={{
                    fontFamily: "var(--font-serif)", fontSize: 11,
                    letterSpacing: "0.25em", color: TEAL,
                    borderBottom: `1px solid ${TEAL}40`,
                    paddingBottom: 3, marginBottom: 4, fontWeight: 600,
                  }}>CASE {parseInt(p.num)}</div>
                  {p.company.toUpperCase()}<br />
                  {p.type.toUpperCase()}<br />
                  {p.period}
                </div>
                {/* Sticker */}
                <div style={{
                  position: "absolute", bottom: 14, right: 14,
                  background: TEAL, color: "white",
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  letterSpacing: "0.08em", padding: "5px 11px",
                  borderRadius: 1, zIndex: 2,
                }}>PROJECT FILES</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <SiteFooter />
    </div>
  );
}
