import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/navigation";
import SiteFooter from "@/components/site-footer";

const TEAL = "#0A5068";
const BG = "#F7F4EF";
const PAPER = "#e8e0d0";
const LINE = "rgba(0,0,0,0.08)";

const projects = [
  {
    id: "work-projects",
    num: "01",
    name: "Client APP & CRM AI",
    sub: "Banker tools · Finance",
    type: "Work",
    status: "Ongoing",
    period: "2023 — Now",
    company: "Van Lanschot Kempen",
    desc: "Leading research on banker-facing CRM and data analysis toolings, internal AI chat assistant, and client-facing mobile applications.",
    tags: ["Research", "AI", "Mobile"],
    quote: '"Design that moves at the speed of finance."',
    envBg: "#0A3040",
  },
  {
    id: "client-voice",
    num: "02",
    name: "Client Voice",
    sub: "Feedback intelligence · SaaS",
    type: "Interest Project",
    status: "Completed",
    period: "2026 · Jan",
    company: "Self-initiated",
    desc: "Transforming scattered client feedback into one dynamic source of truth that organizes, highlights, and accelerates what matters for the product team.",
    tags: ["Research Ops", "Data", "UX"],
    quote: '"One source of truth for everything that matters."',
    envBg: "#224128",
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
    quote: '"Practice with intention, improve by design."',
    envBg: "#6A6494",
  },
];

const FILM_GRADIENTS = [
  "linear-gradient(160deg,#1a0a2e,#3a1060,#0d0520)",
  "linear-gradient(170deg,#001a30,#003a6a,#0a2040)",
  "linear-gradient(150deg,#0d1a0d,#1a4a1a,#0a1505)",
  "linear-gradient(165deg,#2a1500,#7a3a00,#3a1a00)",
  "linear-gradient(155deg,#1a0505,#4a0a0a,#200505)",
  "linear-gradient(160deg,#050520,#0a0a3a,#050510)",
  "linear-gradient(160deg,#1a1a0a,#3a3a10,#101005)",
  "linear-gradient(170deg,#0a1a1a,#104040,#051515)",
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
        photosRef.current.style.transform = `rotate(-2deg) translate3d(${dx * 5}px,${dy * 5}px,0)`;
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
            {/* Folder */}
            <div
              ref={folderRef}
              style={{
                position: "absolute",
                bottom: 32,
                left: "50%",
                transform: "translateX(-52%) rotate(1.5deg)",
                width: 380,
                height: 480,
                zIndex: 1,
                filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.16))",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "#5a3515", borderRadius: "2px 2px 3px 3px" }}>
                <div style={{
                  position: "absolute", top: -18, left: 20,
                  width: 88, height: 20, background: "#5a3515",
                  borderRadius: "3px 3px 0 0",
                  fontFamily: "var(--font-mono)", fontSize: 7,
                  letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)",
                  display: "flex", alignItems: "center", paddingLeft: 8,
                }}>PROJ-FILES</div>
                <div style={{
                  position: "absolute", top: 16, left: 20, right: 20,
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "8px 10px", fontSize: 7,
                  color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em",
                  lineHeight: 2, fontFamily: "var(--font-mono)",
                }}>
                  CLASSIFICATION:&nbsp;
                  <span style={{ display: "inline-block", background: "rgba(0,0,0,0.6)", height: 9, width: 64, verticalAlign: "middle" }} /><br />
                  PROJECT REF:&nbsp;
                  <span style={{ display: "inline-block", background: "rgba(0,0,0,0.6)", height: 9, width: 42, verticalAlign: "middle" }} /><br />
                  AUTHORIZATION: DR.&nbsp;
                  <span style={{ display: "inline-block", background: "rgba(0,0,0,0.6)", height: 9, width: 52, verticalAlign: "middle" }} />
                </div>
                <div style={{
                  position: "absolute", bottom: 20, right: 16,
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  letterSpacing: "0.4em", color: "rgba(192,57,43,0.3)",
                  transform: "rotate(-4deg)",
                }}>CONFIDENTIAL</div>
              </div>
            </div>

            {/* Film strip — warm dark brown for light background */}
            <div
              ref={filmRef}
              style={{
                position: "absolute",
                left: "50%", top: 0, bottom: 0,
                transform: "translateX(-148px) rotate(-1deg)",
                width: 52, zIndex: 0,
                background: "#1e1508",
                borderLeft: "3px solid #2d2010",
                borderRight: "3px solid #2d2010",
                overflow: "hidden",
              }}
            >
              {FILM_GRADIENTS.map((grad, i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: 14, right: 14,
                  top: 18 + i * 80, height: 70,
                  border: "1px solid #2a1e0c",
                  background: grad,
                }} />
              ))}
            </div>

            {/* ── Clip photo group — right side, bottom-aligned to envelope ── */}
            <div
              ref={photosRef}
              style={{
                position: "absolute",
                right: 8,
                bottom: 158,
                width: 175,
                zIndex: 22,
                transform: "rotate(-2deg)",
              }}
            >
              {/* Binder clip */}
              <div style={{
                position: "absolute",
                top: -28, left: "50%",
                transform: "translateX(-50%)",
                zIndex: 30, width: 44,
              }}>
                <div style={{
                  width: 44, height: 14,
                  background: "linear-gradient(180deg,#d0d0d0,#909090 40%,#b0b0b0)",
                  borderRadius: "3px 3px 0 0",
                  position: "relative",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.28)",
                }}>
                  <div style={{
                    position: "absolute", top: 3, left: "50%",
                    transform: "translateX(-50%)",
                    width: 10, height: 10, borderRadius: "50%",
                    background: "radial-gradient(circle at 35% 35%,#e8e8e8,#888)",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)",
                  }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
                  <div style={{ width: 16, height: 20, background: "linear-gradient(180deg,#b0b0b0,#787878)", clipPath: "polygon(15% 0%,85% 0%,100% 100%,0% 100%)" }} />
                  <div style={{ width: 16, height: 20, background: "linear-gradient(180deg,#b0b0b0,#787878)", clipPath: "polygon(15% 0%,85% 0%,100% 100%,0% 100%)" }} />
                </div>
              </div>

              {/* Photo 1 */}
              <div style={{ marginBottom: -60, transform: "rotate(-4deg)", marginLeft: -8 }}>
                <div style={{
                  background: "#c8c0b0",
                  padding: "5px 5px 24px", width: 160,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                }}>
                  <div style={{
                    width: 150, height: 110,
                    background: "linear-gradient(170deg,#0a0f0a,#1a2a1a,#080c08)",
                    filter: "grayscale(0.8) contrast(1.3)",
                  }} />
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: 7,
                    color: "#444", letterSpacing: "0.12em",
                    marginTop: 5, textAlign: "right",
                  }}>34156301 · 5A6205</div>
                </div>
              </div>

              {/* Photo 2 */}
              <div style={{ transform: "rotate(3deg)", marginLeft: 10 }}>
                <div style={{
                  background: "#c8c0b0",
                  padding: "5px 5px 24px", width: 160,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                }}>
                  <div style={{
                    width: 150, height: 110,
                    background: "radial-gradient(ellipse at 45% 55%,#e8e8e8,#a0a0a0 20%,#303030 55%,#080808)",
                    filter: "grayscale(1) contrast(1.6)",
                  }} />
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: 7,
                    color: "#444", letterSpacing: "0.12em",
                    marginTop: 5, textAlign: "right",
                  }}>FIELD SCAN · NR-001</div>
                </div>
              </div>
            </div>

            {/* ── Tracing / sulfuric paper — over photos ── */}
            <div style={{
              position: "absolute",
              right: 4, bottom: 158,
              transform: "rotate(-1deg)",
              width: 168, height: 275,
              zIndex: 28, pointerEvents: "none",
            }}>
              <div style={{
                width: "100%", height: "100%",
                background: "rgba(210,220,200,0.14)",
                border: "1px solid rgba(180,190,170,0.22)",
                backdropFilter: "blur(0.5px)",
                position: "relative", overflow: "hidden",
              }}>
                {/* Ruled lines */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "repeating-linear-gradient(to bottom,transparent 0px,transparent 13px,rgba(0,0,0,0.045) 13px,rgba(0,0,0,0.045) 14px)",
                }} />
                {/* Faint text content */}
                <div style={{
                  position: "absolute", top: 18, left: 14, right: 14,
                  fontFamily: "var(--font-mono)", fontSize: 7,
                  lineHeight: 2, color: "rgba(40,50,30,0.32)",
                  whiteSpace: "pre-line", letterSpacing: "0.05em",
                }}>
                  {"RESEARCH NOTES\n\nCase No.:\nR-01 · CRM\nR-02 · AI Chat\nR-03 · Mobile\n\n— map user journey\nacross touchpoints"}
                </div>
                {/* Edge shadow curl */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right,rgba(0,0,0,0.07) 0%,transparent 12%),linear-gradient(to left,rgba(0,0,0,0.04) 0%,transparent 10%),linear-gradient(to bottom,rgba(0,0,0,0.05) 0%,transparent 8%),linear-gradient(to top,rgba(0,0,0,0.08) 0%,transparent 12%)",
                  pointerEvents: "none",
                }} />
              </div>
            </div>

            {/* ── Tape strips ── */}
            <div style={{
              position: "absolute", top: "52%", right: 6,
              width: 22, height: 22,
              background: `${TEAL}70`,
              zIndex: 29, transform: "rotate(-3deg)",
            }} />
            <div style={{
              position: "absolute", top: "62%", right: 10,
              width: 17, height: 17,
              background: `${TEAL}55`,
              zIndex: 29, transform: "rotate(5deg)",
            }} />

            {/* ── Paper clip ── */}
            <div style={{
              position: "absolute",
              top: 90, right: 62,
              zIndex: 30, width: 11, height: 32,
              border: "2px solid #888",
              borderRadius: "6px 6px 0 0",
              borderBottom: "none",
            }}>
              <div style={{
                position: "absolute",
                top: 5, left: 1,
                width: 5, height: 19,
                border: "2px solid #888",
                borderRadius: "3px 3px 0 0",
                borderBottom: "none",
              }} />
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
                Note —<br />consistent, clear, fun
              </div>
              <div style={{
                background: "#e8e2d5",
                padding: "8px 8px 32px", width: 155,
                boxShadow: "2px 4px 14px rgba(0,0,0,0.18)",
              }}>
                <div style={{ width: 139, height: 120, background: "#ddd8cc", position: "relative", overflow: "hidden" }}>
                  <svg viewBox="0 0 139 120" xmlns="http://www.w3.org/2000/svg" fill="none"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.85 }}>
                    <rect width="139" height="120" fill="#ccc8be" />
                    <path d="M30,20 C18,22 10,35 14,48 C8,55 12,68 20,72 C16,82 22,95 35,98 C42,108 58,112 68,105 C78,112 92,108 96,96 C110,94 118,80 112,68 C122,58 118,42 108,36 C112,24 100,14 88,18 C78,8 58,10 50,18 C42,12 34,16 30,20Z"
                      fill="#e8e4da" stroke="#2a2820" strokeWidth="1.2" />
                    <path d="M38,32 C30,38 28,50 34,58 C30,66 36,78 46,80" stroke="#2a2820" strokeWidth="0.7" opacity="0.6" />
                    <path d="M55,22 C48,30 50,42 58,46 C52,54 56,66 64,68" stroke="#2a2820" strokeWidth="0.7" opacity="0.6" />
                    <path d="M75,20 C70,28 74,40 80,44 C76,52 78,64 86,66" stroke="#2a2820" strokeWidth="0.7" opacity="0.6" />
                    <path d="M95,32 C100,40 98,52 92,58 C98,66 96,78 88,82" stroke="#2a2820" strokeWidth="0.7" opacity="0.6" />
                    <circle cx="44" cy="55" r="3" fill="#2a2820" opacity="0.5" />
                    <circle cx="70" cy="45" r="2" fill="#2a2820" opacity="0.4" />
                    <circle cx="88" cy="60" r="2.5" fill="#2a2820" opacity="0.5" />
                    <line x1="35" y1="90" x2="100" y2="90" stroke="#2a2820" strokeWidth="0.5" opacity="0.4" />
                    <line x1="35" y1="88" x2="35" y2="92" stroke="#2a2820" strokeWidth="0.5" opacity="0.4" />
                    <line x1="100" y1="88" x2="100" y2="92" stroke="#2a2820" strokeWidth="0.5" opacity="0.4" />
                    <text x="60" y="99" fontFamily="monospace" fontSize="5" fill="#2a2820" opacity="0.5">~3.2 km</text>
                    <path d="M55,68 L58,62 L61,68" stroke="#2a2820" strokeWidth="0.6" opacity="0.45" />
                    <path d="M76,72 L79,66 L82,72" stroke="#2a2820" strokeWidth="0.6" opacity="0.45" />
                    <rect x="48" y="46" width="6" height="4" stroke="#2a2820" strokeWidth="0.5" opacity="0.4" fill="none" />
                    <rect x="80" y="36" width="5" height="4" stroke="#2a2820" strokeWidth="0.5" opacity="0.4" fill="none" />
                    {/* Teal tape square */}
                    <rect x="56" y="3" width="26" height="20" fill={`${TEAL}88`} rx="1" />
                    <line x1="63" y1="9" x2="75" y2="17" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  </svg>
                </div>
                <div style={{
                  fontFamily: "var(--font-serif)", fontSize: 10,
                  color: "#555", textAlign: "center",
                  marginTop: 6, fontStyle: "italic",
                }}>Storytelling</div>
              </div>
            </div>

            {/* ── Ticket — slides up on hover ── */}
            <div style={{
              position: "absolute",
              bottom: hovered ? 300 : 52,
              left: "50%",
              transform: `translateX(-50%) rotate(${hovered ? "-0.4deg" : "-1deg"})`,
              width: 370,
              zIndex: 15,
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

            {/* ── Envelope shell ── */}
            <div style={{
              position: "absolute",
              bottom: 30, left: "50%",
              transform: `translateX(-50%) rotate(-1deg)${hovered ? " translateY(-4px)" : ""}`,
              width: 360, height: 205,
              zIndex: 20,
              filter: "drop-shadow(0 24px 60px rgba(0,0,0,0.22))",
              transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
            }}>
              <div style={{
                position: "absolute", inset: 0, borderRadius: 2, overflow: "hidden",
                background: p.envBg, transition: "background 0.5s",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(255,255,255,0.015) 18px,rgba(255,255,255,0.015) 19px)",
                  pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", bottom: 0, left: 0,
                  width: "50%", height: "100%",
                  clipPath: "polygon(0 100%,0 0,100% 100%)",
                  background: "rgba(0,0,0,0.22)",
                }} />
                <div style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: "50%", height: "100%",
                  clipPath: "polygon(100% 0,0 100%,100% 100%)",
                  background: "rgba(0,0,0,0.14)",
                }} />
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
                  }}>RESEARCH CASE</div>
                  {p.company.toUpperCase()}<br />
                  {p.type.toUpperCase()}<br />
                  {p.period}
                </div>
                <div style={{
                  position: "absolute", bottom: 14, right: 14,
                  background: TEAL, color: "white",
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  letterSpacing: "0.08em", padding: "5px 11px",
                  borderRadius: 1, zIndex: 2,
                }}>PROJECT FILES</div>
              </div>
            </div>

            {/* Hint */}
            <div style={{
              position: "absolute", bottom: 14, left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--font-serif)", fontSize: 11, fontStyle: "italic",
              color: "rgba(0,0,0,0.2)", whiteSpace: "nowrap",
              pointerEvents: "none", zIndex: 35,
              opacity: hovered ? 0 : 1, transition: "opacity 0.3s",
            }}>hover to retrieve ↑</div>

            {/* Dots */}
            <div style={{
              position: "absolute", bottom: 6, left: "50%",
              transform: "translateX(-50%)",
              display: "flex", gap: 8, zIndex: 40,
            }}>
              {projects.map((proj, i) => (
                <button
                  key={i}
                  aria-label={`View project ${proj.name}`}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: 6, height: 6, borderRadius: "50%", border: "none", padding: 0,
                    background: i === current ? TEAL : "rgba(0,0,0,0.18)",
                    transform: i === current ? "scale(1.4)" : "scale(1)",
                    transition: "background 0.3s, transform 0.3s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <SiteFooter />
    </div>
  );
}
