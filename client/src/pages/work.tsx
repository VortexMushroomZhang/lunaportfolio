import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/navigation";

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
    envBg: "#1c2a38",
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
    envBg: "#1a2a1c",
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
    envBg: "#2a1a0a",
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
        photosRef.current.style.transform = `translate3d(${dx * 5}px,${dy * 5}px,0)`;
    };
    scene.addEventListener("mousemove", onMove);
    return () => scene.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={{ background: BG, height: "100vh", overflow: "hidden", position: "relative" }}>
      <Navigation />

      <div
        ref={sceneRef}
        style={{ position: "relative", width: "100vw", height: "100vh", display: "flex", alignItems: "center" }}
      >
        {/* ── LEFT PANEL — project navigator only ── */}
        <div style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: "46vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "clamp(32px, 5vw, 80px)",
          paddingRight: 40,
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
                  fontSize: 13,
                  fontWeight: i === current ? 600 : 400,
                  color: i === current ? "#1a1a1a" : "rgba(0,0,0,0.32)",
                  cursor: "pointer",
                  padding: "13px 0",
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
                  fontSize: 9,
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
            maxWidth: 560,
            height: "85vh",
            maxHeight: 740,
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
              bottom: 30,
              left: "50%",
              transform: "translateX(-52%) rotate(1.5deg)",
              width: 360,
              height: 460,
              zIndex: 1,
              filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.18))",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "#5a3515", borderRadius: "2px 2px 3px 3px" }}>
              <div style={{
                position: "absolute", top: -18, left: 20,
                width: 80, height: 20, background: "#5a3515",
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
                CLASSIFICATION:&nbsp;<span style={{ display: "inline-block", background: "rgba(0,0,0,0.6)", height: 9, width: 60, verticalAlign: "middle" }} /><br />
                PROJECT REF:&nbsp;<span style={{ display: "inline-block", background: "rgba(0,0,0,0.6)", height: 9, width: 40, verticalAlign: "middle" }} /><br />
                AUTHORIZATION: DR.&nbsp;<span style={{ display: "inline-block", background: "rgba(0,0,0,0.6)", height: 9, width: 50, verticalAlign: "middle" }} />
              </div>
              <div style={{
                position: "absolute", bottom: 20, right: 16,
                fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: "0.4em", color: "rgba(192,57,43,0.3)",
                transform: "rotate(-4deg)",
              }}>CONFIDENTIAL</div>
            </div>
          </div>

          {/* Film strip */}
          <div
            ref={filmRef}
            style={{
              position: "absolute",
              left: "50%", top: 0, bottom: 0,
              transform: "translateX(-148px) rotate(-1deg)",
              width: 52, zIndex: 0,
              background: "#050505",
              borderLeft: "3px solid #111",
              borderRight: "3px solid #111",
              overflow: "hidden",
            }}
          >
            {FILM_GRADIENTS.map((grad, i) => (
              <div key={i} style={{
                position: "absolute",
                left: 14, right: 14,
                top: 18 + i * 80, height: 70,
                border: "1px solid #1e1e1e",
                background: grad,
              }} />
            ))}
          </div>

          {/* 2 Photo clips — right side, bottom-aligned to envelope */}
          <div
            ref={photosRef}
            style={{
              position: "absolute",
              right: 18,
              bottom: 155,
              zIndex: 22,
            }}
          >
            <div style={{ transform: "rotate(3.5deg)", marginBottom: -48 }}>
              <div style={{
                background: "#c8c0b0",
                padding: "5px 5px 22px",
                width: 132,
                boxShadow: "0 4px 18px rgba(0,0,0,0.22)",
              }}>
                <div style={{
                  width: 122, height: 90,
                  background: "linear-gradient(170deg,#0a0f0a,#1a2a1a,#080c08)",
                  filter: "grayscale(0.8) contrast(1.3)",
                }} />
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 7,
                  color: "#555", letterSpacing: "0.1em",
                  marginTop: 5, textAlign: "right",
                }}>FIELD · NR-001</div>
              </div>
            </div>
            <div style={{ transform: "rotate(-2deg)", marginLeft: 10 }}>
              <div style={{
                background: "#c8c0b0",
                padding: "5px 5px 22px",
                width: 132,
                boxShadow: "0 4px 18px rgba(0,0,0,0.22)",
              }}>
                <div style={{
                  width: 122, height: 90,
                  background: "radial-gradient(ellipse at 45% 55%,#e0e0e0,#a0a0a0 20%,#303030 55%,#080808)",
                  filter: "grayscale(1) contrast(1.5)",
                }} />
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 7,
                  color: "#555", letterSpacing: "0.1em",
                  marginTop: 5, textAlign: "right",
                }}>SCAN · 2024</div>
              </div>
            </div>
          </div>

          {/* Ticket — slides up on hover */}
          <div style={{
            position: "absolute",
            bottom: hovered ? 290 : 50,
            left: "50%",
            transform: `translateX(-50%) rotate(${hovered ? "-0.4deg" : "-1deg"})`,
            width: 314,
            zIndex: 15,
            transition: "bottom 0.72s cubic-bezier(0.16,1,0.3,1), transform 0.72s cubic-bezier(0.16,1,0.3,1)",
            filter: "drop-shadow(0 -4px 30px rgba(0,0,0,0.1))",
          }}>
            <div style={{ background: PAPER, position: "relative" }}>
              {/* Perf top */}
              <div style={{
                height: 14, background: PAPER,
                display: "flex", alignItems: "center",
                padding: "0 14px", gap: 6,
                borderBottom: "1.5px dashed rgba(0,0,0,0.2)",
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: BG, flexShrink: 0 }} />
                <div style={{ flex: 1, height: 1, background: "repeating-linear-gradient(to right,rgba(0,0,0,0.12) 0,rgba(0,0,0,0.12) 4px,transparent 4px,transparent 8px)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: BG, flexShrink: 0 }} />
              </div>

              {/* Head */}
              <div style={{
                padding: "12px 16px 10px",
                borderBottom: "1px dotted rgba(0,0,0,0.2)",
                display: "flex", alignItems: "flex-start", gap: 10,
              }}>
                <div style={{
                  width: 34, height: 34,
                  border: "1.5px solid rgba(0,0,0,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, flexShrink: 0,
                  background: "rgba(0,0,0,0.03)", color: "#1a1710",
                  fontFamily: "var(--font-mono)",
                }}>◈</div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 20, lineHeight: 1.1,
                    color: "#1a1710", letterSpacing: "0.02em", fontWeight: 600,
                  }}>{p.name}</div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: 7,
                    letterSpacing: "0.18em", color: "#3d3828",
                    marginTop: 3, textTransform: "uppercase",
                  }}>{p.sub}</div>
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  color: "rgba(0,0,0,0.22)", marginTop: 3, flexShrink: 0,
                }}>({p.period})</div>
              </div>

              {/* Meta */}
              <div style={{
                padding: "9px 16px",
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "6px 0",
                borderBottom: "1px dotted rgba(0,0,0,0.2)",
              }}>
                {[["TYPE", p.type], ["STATUS", p.status], ["PERIOD", p.period], ["COMPANY", p.company]].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: 6, letterSpacing: "0.28em", color: "rgba(0,0,0,0.32)", textTransform: "uppercase", marginBottom: 2, fontFamily: "var(--font-mono)" }}>{label} :</div>
                    <div style={{ fontSize: 9.5, color: "#1a1710", fontFamily: "var(--font-sans)" }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Body */}
              <div style={{ padding: "10px 16px", borderBottom: "1px dotted rgba(0,0,0,0.2)" }}>
                <div style={{
                  fontFamily: "var(--font-sans)", fontSize: 9,
                  lineHeight: 1.85, color: "#3d3828",
                }}>{p.desc}</div>
              </div>

              {/* Stamp row */}
              <div style={{
                padding: "8px 16px",
                display: "flex", alignItems: "center", gap: 8,
                borderBottom: "1px dotted rgba(0,0,0,0.2)",
              }}>
                <div style={{
                  border: `2px solid ${TEAL}`,
                  color: TEAL,
                  fontFamily: "var(--font-mono)", fontSize: 8,
                  letterSpacing: "0.3em", padding: "3px 7px",
                  transform: "rotate(-3deg)", opacity: 0.7, flexShrink: 0,
                }}>{p.status.toUpperCase()}</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", flex: 1, justifyContent: "flex-end" }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 6, letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      border: "1px solid rgba(0,0,0,0.18)",
                      padding: "2px 5px", color: "rgba(0,0,0,0.38)",
                      fontFamily: "var(--font-mono)",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div style={{
                padding: "9px 16px 10px",
                fontFamily: "var(--font-serif)", fontSize: 12,
                color: "#1a1710", lineHeight: 1.5, fontStyle: "italic",
              }}>{p.quote}</div>

              {/* Perf bottom */}
              <div style={{
                height: 14, background: PAPER,
                display: "flex", alignItems: "center",
                padding: "0 14px", gap: 6,
                borderTop: "1.5px dashed rgba(0,0,0,0.2)",
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: BG, flexShrink: 0 }} />
                <div style={{ flex: 1, height: 1, background: "repeating-linear-gradient(to right,rgba(0,0,0,0.12) 0,rgba(0,0,0,0.12) 4px,transparent 4px,transparent 8px)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: BG, flexShrink: 0 }} />
              </div>

              {/* Scallop */}
              <div style={{ height: 13, background: PAPER, position: "relative", overflow: "hidden" }}>
                <div style={{
                  position: "absolute", bottom: -6, left: -4, right: -4, height: 18,
                  background: `radial-gradient(circle at 50% 0%, ${BG} 6px, ${PAPER} 6px)`,
                  backgroundSize: "16px 12px", backgroundRepeat: "repeat-x",
                }} />
              </div>
            </div>
          </div>

          {/* Envelope shell */}
          <div style={{
            position: "absolute",
            bottom: 28, left: "50%",
            transform: `translateX(-50%) rotate(-1deg)${hovered ? " translateY(-4px)" : ""}`,
            width: 340, height: 195,
            zIndex: 20,
            filter: "drop-shadow(0 24px 60px rgba(0,0,0,0.25))",
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
                clipPath: "polygon(0 100%, 0 0, 100% 100%)",
                background: "rgba(0,0,0,0.22)",
              }} />
              <div style={{
                position: "absolute", bottom: 0, right: 0,
                width: "50%", height: "100%",
                clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                background: "rgba(0,0,0,0.14)",
              }} />
              <div style={{
                position: "absolute", top: 10, left: 12,
                border: `1px solid ${TEAL}70`,
                padding: "6px 10px", fontSize: 6.5,
                lineHeight: 2, color: `${TEAL}a0`,
                letterSpacing: "0.12em", zIndex: 2,
                fontFamily: "var(--font-mono)",
              }}>
                <div style={{
                  fontFamily: "var(--font-serif)", fontSize: 9,
                  letterSpacing: "0.3em", color: TEAL,
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
                fontFamily: "var(--font-mono)", fontSize: 7.5,
                letterSpacing: "0.08em", padding: "5px 10px",
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
            display: "flex", gap: 7, zIndex: 40,
          }}>
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: 5, height: 5, borderRadius: "50%", border: "none", padding: 0,
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
  );
}
