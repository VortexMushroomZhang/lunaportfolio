import { useState } from "react";
import Navigation from "@/components/navigation";
import SiteFooter from "@/components/site-footer";

const CREAM = "#F7F4EF";
const INK = "#1a1a1a";

// ─── Lego-style face ──────────────────────────────────────────────────────────

function LegoFace({ x = 50, y = 36, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      {/* Eyebrows — short angled strokes */}
      <line x1="-10" y1="-9" x2="-5" y2="-11" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="5" y1="-11" x2="10" y2="-9" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
      {/* Eyes — small solid ovals */}
      <ellipse cx="-6.5" cy="-4" rx="3" ry="3.5" fill="#1a1a1a" />
      <ellipse cx="6.5" cy="-4" rx="3" ry="3.5" fill="#1a1a1a" />
      {/* Smile — clean arc */}
      <path d="M-7,5 Q0,12 7,5" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

// ─── SVG Characters ───────────────────────────────────────────────────────────

function CookFigure() {
  return (
    <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* chef hat */}
      <ellipse cx="50" cy="17" rx="18" ry="7" fill="white" stroke="#ccc" strokeWidth="1.2" />
      <rect x="35" y="10" width="30" height="15" rx="2" fill="white" stroke="#ccc" strokeWidth="1.2" />
      {/* head */}
      <ellipse cx="50" cy="35" rx="20" ry="17" fill="#F5CBA7" />
      <LegoFace x={50} y={35} scale={0.85} />
      {/* body — white chef jacket */}
      <rect x="22" y="50" width="56" height="55" rx="4" fill="#F7F7F7" stroke="#ddd" strokeWidth="1" />
      {/* jacket buttons */}
      <circle cx="50" cy="60" r="2" fill="#ddd" />
      <circle cx="50" cy="70" r="2" fill="#ddd" />
      <circle cx="50" cy="80" r="2" fill="#ddd" />
      {/* apron */}
      <rect x="35" y="52" width="30" height="50" rx="3" fill="#EFEFEF" stroke="#e0e0e0" strokeWidth="0.8" />
      <rect x="43" y="52" width="14" height="4" rx="2" fill="#ddd" />
      {/* pocket */}
      <rect x="39" y="80" width="22" height="14" rx="2" fill="#e8e8e8" stroke="#ddd" strokeWidth="1" />
      {/* spatula */}
      <line x1="74" y1="55" x2="85" y2="75" stroke="#888" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="73" cy="53" rx="5" ry="3" fill="#aaa" />
      {/* legs — slate gray */}
      <rect x="30" y="104" width="17" height="32" rx="3" fill="#607D8B" />
      <rect x="53" y="104" width="17" height="32" rx="3" fill="#607D8B" />
      {/* shoes */}
      <ellipse cx="38" cy="137" rx="11" ry="5" fill="#37474F" />
      <ellipse cx="61" cy="137" rx="11" ry="5" fill="#37474F" />
    </svg>
  );
}

function ClimberFigure() {
  return (
    <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* cool snapback cap */}
      <path d="M31,40 Q31,22 50,20 Q69,22 69,40" fill="#C0392B" />
      {/* cap brim — extends to the left */}
      <rect x="22" y="37" width="30" height="5" rx="2.5" fill="#A93226" />
      {/* cap button */}
      <circle cx="50" cy="20" r="2" fill="#A93226" />
      {/* head */}
      <ellipse cx="50" cy="40" rx="19" ry="16" fill="#FDDBB4" />
      <LegoFace x={50} y={40} scale={0.82} />
      {/* body */}
      <rect x="20" y="55" width="60" height="50" rx="5" fill="#2980B9" />
      {/* harness — shoulder straps + waist belt (no A crossbar) */}
      <line x1="35" y1="57" x2="35" y2="92" stroke="#E67E22" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="65" y1="57" x2="65" y2="92" stroke="#E67E22" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="25" y="88" width="50" height="5" rx="2" fill="#E67E22" />
      {/* left arm extended — holding chalk bag */}
      <rect x="6" y="68" width="14" height="7" rx="3" fill="#2980B9" />
      {/* chalk bag in hand */}
      <rect x="1" y="56" width="16" height="22" rx="4" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="1.5" />
      <ellipse cx="9" cy="55" rx="8" ry="3.5" fill="#B0BEC5" />
      {/* chalk dust puff */}
      <circle cx="6" cy="50" r="2.5" fill="white" opacity="0.65" />
      <circle cx="12" cy="48" r="2" fill="white" opacity="0.45" />
      <circle cx="9" cy="46" r="3" fill="white" opacity="0.3" />
      {/* legs */}
      <rect x="28" y="104" width="18" height="30" rx="3" fill="#1A5276" />
      <rect x="54" y="104" width="18" height="30" rx="3" fill="#1A5276" />
      {/* climbing shoes */}
      <ellipse cx="37" cy="136" rx="12" ry="5" fill="#E74C3C" />
      <ellipse cx="63" cy="136" rx="12" ry="5" fill="#E74C3C" />
    </svg>
  );
}

function SnowboarderFigure() {
  return (
    <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* helmet shell — hard dome */}
      <path d="M29,38 Q29,17 50,15 Q71,17 71,38" fill="#1565C0" />
      {/* helmet lower band */}
      <rect x="29" y="35" width="42" height="6" rx="3" fill="#0D47A1" />
      {/* helmet vents */}
      <rect x="40" y="19" width="5" height="11" rx="2.5" fill="rgba(255,255,255,0.18)" />
      <rect x="55" y="19" width="5" height="11" rx="2.5" fill="rgba(255,255,255,0.18)" />
      {/* goggles pushed up on helmet */}
      <rect x="32" y="22" width="36" height="11" rx="5" fill="#FF8F00" />
      <ellipse cx="50" cy="27" rx="13" ry="4" fill="#FFE082" opacity="0.5" />
      {/* head */}
      <ellipse cx="50" cy="37" rx="19" ry="15" fill="#FDDBB4" />
      <LegoFace x={50} y={40} scale={0.82} />
      {/* puffy jacket — dark blue */}
      <rect x="18" y="52" width="64" height="52" rx="6" fill="#1565C0" />
      {/* jacket quilting lines */}
      <line x1="18" y1="67" x2="82" y2="67" stroke="#0D47A1" strokeWidth="1.5" />
      <line x1="18" y1="82" x2="82" y2="82" stroke="#0D47A1" strokeWidth="1.5" />
      <line x1="18" y1="97" x2="82" y2="97" stroke="#0D47A1" strokeWidth="1.5" />
      {/* logo patch */}
      <circle cx="50" cy="73" r="7" fill="#FF8F00" />
      {/* legs */}
      <rect x="27" y="103" width="18" height="30" rx="3" fill="#0D47A1" />
      <rect x="55" y="103" width="18" height="30" rx="3" fill="#0D47A1" />
      {/* board */}
      <rect x="10" y="130" width="80" height="8" rx="4" fill="#1A237E" />
      <ellipse cx="50" cy="134" rx="40" ry="4" fill="#283593" opacity="0.6" />
    </svg>
  );
}

function JewelryMakerFigure() {
  return (
    <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* hair bun */}
      <circle cx="50" cy="16" r="8" fill="#5D4037" />
      {/* head */}
      <ellipse cx="50" cy="34" rx="19" ry="17" fill="#FDDBB4" />
      <LegoFace x={50} y={34} scale={0.82} />
      {/* neck necklace */}
      <path d="M36 51 Q50 60 64 51" stroke="#F1C40F" strokeWidth="2" fill="none" />
      <circle cx="50" cy="60" r="3.5" fill="#4CAF50" />
      <circle cx="43" cy="57" r="2.5" fill="#66BB6A" />
      <circle cx="57" cy="57" r="2.5" fill="#2E7D32" />
      {/* body — muted forest green */}
      <rect x="22" y="50" width="56" height="55" rx="5" fill="#4A7C5E" />
      {/* pattern dots */}
      {[32, 44, 56, 68].map(x => [62, 72, 82, 92].map(y => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.5" fill="#2E5A40" opacity="0.65" />
      )))}
      {/* left arm extended — displaying necklace */}
      <rect x="5" y="64" width="17" height="7" rx="3" fill="#2E5A40" />
      {/* necklace chain arch */}
      <path d="M11,62 Q2,75 11,85" stroke="#C4AA5A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M11,62 Q20,75 11,85" stroke="#C4AA5A" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* green gem pendant */}
      <ellipse cx="11" cy="87" rx="6" ry="7" fill="#27AE60" stroke="#1E8449" strokeWidth="1.5" />
      <ellipse cx="9" cy="85" rx="2.5" ry="2" fill="#82E0AA" opacity="0.8" />
      {/* legs */}
      <rect x="29" y="104" width="17" height="30" rx="3" fill="#2E5A40" />
      <rect x="54" y="104" width="17" height="30" rx="3" fill="#2E5A40" />
      {/* shoes */}
      <ellipse cx="37" cy="136" rx="12" ry="5" fill="#1A3A28" />
      <ellipse cx="62" cy="136" rx="12" ry="5" fill="#1A3A28" />
    </svg>
  );
}

function PhotoTakerFigure() {
  return (
    <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* head */}
      <ellipse cx="50" cy="32" rx="20" ry="18" fill="#FDDBB4" />
      <LegoFace x={50} y={32} scale={0.88} />
      {/* camera strap around neck */}
      <path d="M34 50 Q25 60 28 75" stroke="#7F8C8D" strokeWidth="2.5" fill="none" />
      {/* body – vest */}
      <rect x="20" y="49" width="60" height="55" rx="5" fill="#566573" />
      {/* vest pockets */}
      <rect x="24" y="58" width="18" height="13" rx="2" fill="#4D5D6B" stroke="#3D4E5A" strokeWidth="1" />
      <rect x="58" y="58" width="18" height="13" rx="2" fill="#4D5D6B" stroke="#3D4E5A" strokeWidth="1" />
      <rect x="30" y="80" width="40" height="16" rx="2" fill="#4D5D6B" stroke="#3D4E5A" strokeWidth="1" />
      {/* camera */}
      <rect x="30" y="52" width="40" height="28" rx="4" fill="#2C3E50" />
      <circle cx="50" cy="66" r="9" fill="#1A252F" />
      <circle cx="50" cy="66" r="5.5" fill="#212F3C" />
      <circle cx="50" cy="66" r="3" fill="#85C1E9" opacity="0.4" />
      <circle cx="47" cy="63" r="1.5" fill="white" opacity="0.5" />
      <rect x="62" y="53" width="6" height="4" rx="1" fill="#E74C3C" />
      <rect x="32" y="53" width="10" height="3" rx="1" fill="#7F8C8D" />
      {/* legs */}
      <rect x="27" y="103" width="18" height="31" rx="3" fill="#2C3E50" />
      <rect x="55" y="103" width="18" height="31" rx="3" fill="#2C3E50" />
      {/* shoes */}
      <ellipse cx="36" cy="136" rx="12" ry="5" fill="#1A252F" />
      <ellipse cx="64" cy="136" rx="12" ry="5" fill="#1A252F" />
    </svg>
  );
}

function ObserverFigure() {
  return (
    <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* head */}
      <ellipse cx="50" cy="32" rx="20" ry="18" fill="#FDDBB4" />
      <LegoFace x={50} y={33} scale={0.82} />
      {/* glasses over face */}
      <rect x="31" y="27" width="15" height="10" rx="5" fill="none" stroke="#2C3E50" strokeWidth="2" />
      <rect x="54" y="27" width="15" height="10" rx="5" fill="none" stroke="#2C3E50" strokeWidth="2" />
      <line x1="46" y1="32" x2="54" y2="32" stroke="#2C3E50" strokeWidth="2" />
      {/* turtleneck */}
      <rect x="38" y="48" width="24" height="14" rx="3" fill="#1ABC9C" />
      {/* body – trench coat */}
      <rect x="16" y="56" width="68" height="52" rx="5" fill="#D4AC0D" />
      {/* coat lapels */}
      <polygon points="50,56 38,70 50,66" fill="#B7950B" />
      <polygon points="50,56 62,70 50,66" fill="#B7950B" />
      {/* belt */}
      <rect x="16" y="88" width="68" height="7" rx="2" fill="#B7950B" />
      <rect x="46" y="87" width="8" height="9" rx="1" fill="#F1C40F" />
      {/* notebook */}
      <rect x="68" y="62" width="14" height="20" rx="2" fill="#ECF0F1" stroke="#BDC3C7" strokeWidth="1" />
      <line x1="70" y1="67" x2="80" y2="67" stroke="#BDC3C7" strokeWidth="1" />
      <line x1="70" y1="71" x2="80" y2="71" stroke="#BDC3C7" strokeWidth="1" />
      <line x1="70" y1="75" x2="80" y2="75" stroke="#BDC3C7" strokeWidth="1" />
      {/* pen */}
      <line x1="78" y1="60" x2="82" y2="82" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
      {/* legs */}
      <rect x="27" y="107" width="18" height="27" rx="3" fill="#B7950B" />
      <rect x="55" y="107" width="18" height="27" rx="3" fill="#B7950B" />
      {/* shoes */}
      <ellipse cx="36" cy="136" rx="13" ry="5" fill="#2C3E50" />
      <ellipse cx="64" cy="136" rx="13" ry="5" fill="#2C3E50" />
    </svg>
  );
}

function PainterFigure() {
  return (
    <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* beret */}
      <ellipse cx="50" cy="18" rx="22" ry="9" fill="#8E44AD" />
      <circle cx="60" cy="14" r="4" fill="#7D3C98" />
      {/* head */}
      <ellipse cx="50" cy="34" rx="19" ry="17" fill="#FDDBB4" />
      <LegoFace x={50} y={34} scale={0.82} />
      {/* smock */}
      <rect x="18" y="50" width="64" height="55" rx="5" fill="#FFFFFF" stroke="#eee" strokeWidth="1" />
      {/* paint splatters on smock */}
      <circle cx="33" cy="70" r="5" fill="#E74C3C" opacity="0.8" />
      <circle cx="38" cy="82" r="3" fill="#3498DB" opacity="0.8" />
      <circle cx="55" cy="75" r="4" fill="#F39C12" opacity="0.8" />
      <circle cx="64" cy="68" r="3" fill="#2ECC71" opacity="0.8" />
      <circle cx="45" cy="92" r="3.5" fill="#9B59B6" opacity="0.8" />
      <circle cx="70" cy="85" r="2.5" fill="#E74C3C" opacity="0.6" />
      {/* palette */}
      <ellipse cx="22" cy="80" rx="12" ry="9" fill="#ECF0F1" stroke="#BDC3C7" strokeWidth="1" />
      <circle cx="17" cy="75" r="3" fill="#E74C3C" />
      <circle cx="25" cy="73" r="3" fill="#F39C12" />
      <circle cx="29" cy="80" r="3" fill="#F1C40F" />
      <circle cx="22" cy="86" r="3" fill="#3498DB" />
      <circle cx="14" cy="83" r="3" fill="#9B59B6" />
      {/* brush */}
      <line x1="78" y1="52" x2="84" y2="78" stroke="#795548" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="81" cy="80" rx="3" ry="4" fill="#E74C3C" />
      {/* legs */}
      <rect x="28" y="104" width="18" height="30" rx="3" fill="#8E44AD" />
      <rect x="54" y="104" width="18" height="30" rx="3" fill="#8E44AD" />
      {/* shoes */}
      <ellipse cx="37" cy="136" rx="12" ry="5" fill="#4A235A" />
      <ellipse cx="63" cy="136" rx="12" ry="5" fill="#4A235A" />
    </svg>
  );
}

function CatMomFigure() {
  return (
    <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* cat ears — brown */}
      <polygon points="32,22 26,10 38,18" fill="#6D4C41" />
      <polygon points="34,21 29,12 37,17" fill="#8D6E63" />
      <polygon points="68,22 74,10 62,18" fill="#6D4C41" />
      <polygon points="66,21 71,12 63,17" fill="#8D6E63" />
      {/* head */}
      <ellipse cx="50" cy="33" rx="20" ry="18" fill="#FDDBB4" />
      <LegoFace x={50} y={33} scale={0.82} />
      {/* blush — warm beige */}
      <ellipse cx="36" cy="40" rx="5" ry="3" fill="#C4AA5A" opacity="0.35" />
      <ellipse cx="64" cy="40" rx="5" ry="3" fill="#C4AA5A" opacity="0.35" />
      {/* body — brand teal */}
      <rect x="20" y="50" width="60" height="55" rx="5" fill="#0A5068" />
      {/* pattern dots — warm brown */}
      {[33, 50, 67].map(x => [62, 76, 90].map(y => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="#5D4037" opacity="0.5" />
      )))}
      {/* cat held in arms */}
      <ellipse cx="50" cy="60" rx="14" ry="10" fill="#B0BEC5" />
      <polygon points="40,52 37,45 44,51" fill="#B0BEC5" />
      <polygon points="60,52 63,45 56,51" fill="#B0BEC5" />
      <ellipse cx="44" cy="59" rx="2.5" ry="1.5" fill="#546E7A" />
      <ellipse cx="56" cy="59" rx="2.5" ry="1.5" fill="#546E7A" />
      <path d="M47,63 Q50,65 53,63" stroke="#546E7A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* tail */}
      <path d="M63,60 Q80,55 75,70" stroke="#B0BEC5" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* legs — dark teal */}
      <rect x="27" y="104" width="18" height="30" rx="3" fill="#083F52" />
      <rect x="55" y="104" width="18" height="30" rx="3" fill="#083F52" />
      {/* shoes — warm brown */}
      <ellipse cx="36" cy="136" rx="12" ry="5" fill="#4E342E" />
      <ellipse cx="64" cy="136" rx="12" ry="5" fill="#4E342E" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const personalities = [
  {
    id: "cook",
    label: "The Cook",
    Figure: CookFigure,
    accent: "#607D8B",
    description: "Kitchen is my lab. I find deep joy in cooking for friends. Cooking is how I show love — and honestly, how I unwind after a long work sprint.",
  },
  {
    id: "climber",
    label: "The Climber",
    Figure: ClimberFigure,
    accent: "#C0392B",
    description: "Climbing strips away everything except the next hold. It taught me patience, reading surfaces, and that falling is fine, you'll send the next time.",
  },
  {
    id: "snowboarder",
    label: "The Snowboarder",
    Figure: SnowboarderFigure,
    accent: "#1565C0",
    description: "That feeling of cutting fresh powder is hard to describe — pure flow state. The mountain doesn't care about your to-do list. Snowboarding resets me every winter.",
  },
  {
    id: "jewelry-maker",
    label: "The Jewellery Maker",
    Figure: JewelryMakerFigure,
    accent: "#4A7C5E",
    description: "I love working with my hands at a tiny scale. Shaping beads, setting stones — it's meditative. Every piece I make is a small solved puzzle you can wear.",
  },
  {
    id: "photo-taker",
    label: "The Photo Taker",
    Figure: PhotoTakerFigure,
    accent: "#566573",
    description: "I shoot to remember how light falls, how strangers move, the textures most people walk past. Photography is my way of saying: this moment mattered.",
  },
  {
    id: "observer",
    label: "The Observer",
    Figure: ObserverFigure,
    accent: "#D4AC0D",
    description: "I am happiest watching how people navigate a space, a product, a situation. Patterns emerge. Stories surface. Being a keen observer is the thing that made me a researcher.",
  },
  {
    id: "painter",
    label: "The Painter",
    Figure: PainterFigure,
    accent: "#8E44AD",
    description: "Painting is where I get to be completely illogical. No user flows, no constraints, just colour and intuition. It's how I tap into the part of my brain that doesn't speak in words.",
  },
  {
    id: "cat-mom",
    label: "The Cat Mom",
    Figure: CatMomFigure,
    accent: "#0A5068",
    description: "My cat Muer is my grounding object. Every home needs a small chaotic co-worker.",
  },
];

// ─── Hang Tag Popup ────────────────────────────────────────────────────────────

function HangTag({ description, label }: { description: string; label: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 2px)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Cord */}
      <svg width="22" height="38" style={{ display: "block" }} overflow="visible">
        <circle cx="11" cy="3" r="3" fill="rgba(40,28,16,0.5)" />
        <circle cx="11" cy="3" r="1.6" fill="rgba(200,170,120,0.55)" />
        <path d="M 11,6 C 9,18 13,28 11,38" stroke="#2e1c0a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 12,6 C 10,18 14,28 12,38" stroke="rgba(160,110,55,0.28)" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      </svg>

      {/* Tag layers */}
      <div style={{ position: "relative", width: 168 }}>
        {/* Layer 2: beige dot-grid, tilted left */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#f0e6c8",
            backgroundImage: "radial-gradient(circle, rgba(100,70,30,0.13) 1.5px, transparent 1.5px)",
            backgroundSize: "14px 14px",
            borderRadius: 3,
            transform: "translateX(-18px) rotate(-8deg)",
            transformOrigin: "top center",
            boxShadow: "0 10px 28px rgba(0,0,0,0.20)",
          }}
        >
          <div style={{ position: "absolute", inset: 8, border: "0.5px solid rgba(100,70,30,0.18)", borderRadius: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 12, height: 12, borderRadius: "50%", background: CREAM, border: "1px solid rgba(100,70,30,0.22)" }} />
        </div>

        {/* Layer 1: vellum — sulfuric acid paper, determines height */}
        <div
          style={{
            position: "relative",
            background: "rgba(232,224,200,0.62)",
            backdropFilter: "blur(1.5px)",
            borderRadius: 3,
            border: "1px solid rgba(200,185,155,0.38)",
            transform: "translateX(6px) rotate(2.5deg)",
            transformOrigin: "top center",
            padding: "42px 18px 30px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          }}
        >
          {/* hole at top */}
          <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 12, height: 12, borderRadius: "50%", background: CREAM, border: "1.5px solid rgba(0,0,0,0.18)" }} />

          {/* Description text */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              color: "rgba(20,12,6,0.78)",
              letterSpacing: "0.03em",
              lineHeight: 1.9,
              textAlign: "center",
            }}
          >
            {description}
          </div>

          {/* Label caption */}
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 10,
              color: "rgba(20,12,6,0.38)",
              textAlign: "center",
              fontStyle: "italic",
              letterSpacing: "0.08em",
              marginTop: 12,
            }}
          >
            {label}
          </div>

          {/* Star mark */}
          <div style={{ textAlign: "center", marginTop: 10, fontSize: 14, color: "rgba(20,12,6,0.22)", lineHeight: 1 }}>
            ✳
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function About() {
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setActive(prev => (prev === id ? null : id));
  };

  return (
    <div data-testid="page-about" style={{ background: CREAM, minHeight: "100vh" }}>
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="flex flex-col items-center justify-center pt-32 pb-12 px-6"
        data-testid="section-about-hero"
      >
        <img
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt="logo"
          style={{ width: 88, height: 88, marginBottom: 28, opacity: 0.88 }}
        />

        <h1
          className="font-sans font-black text-5xl md:text-7xl tracking-tight mb-4 text-center select-none"
          style={{ color: INK, letterSpacing: "-0.02em" }}
          data-testid="text-about-heading"
        >
          WHO AM I?
        </h1>
        <p
          className="font-serif text-lg md:text-xl font-light text-center max-w-xl leading-relaxed"
          style={{ color: "rgba(0,0,0,0.45)" }}
        >
          Hard to define! <br />I am a designer and researcher by profession, and a collection of curious sub selves by nature.
        </p>
        <p
          className="font-sans text-sm mt-4 text-center"
          style={{ color: "rgba(0,0,0,0.3)" }}
        >
          Click a figure to meet them.
        </p>
      </section>

      {/* ── Figures row ──────────────────────────────────────── */}
      <section
        className="px-4 md:px-8 pb-80"
        data-testid="section-figures"
        style={{ overflow: "visible" }}
      >
        <div className="max-w-6xl mx-auto" style={{ overflow: "visible" }}>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3" style={{ overflow: "visible" }}>
            {personalities.map((p) => {
              const isActive = active === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleClick(p.id)}
                  data-testid={`figure-${p.id}`}
                  className="flex flex-col items-center gap-2 group focus:outline-none"
                  style={{ position: "relative" }}
                  aria-pressed={isActive}
                >
                  <div
                    className="w-full transition-all duration-200 ease-out"
                    style={{
                      height: "clamp(90px, 14vw, 155px)",
                      transform: isActive ? "translateY(-6px) scale(1.05)" : "translateY(0) scale(1)",
                      filter: isActive
                        ? `drop-shadow(0 6px 16px ${p.accent}55)`
                        : "drop-shadow(0 2px 4px rgba(0,0,0,0.08))",
                    }}
                  >
                    <p.Figure />
                  </div>
                  <span
                    className="font-sans text-[10px] md:text-xs font-medium text-center leading-tight transition-colors duration-150 px-1"
                    style={{ color: isActive ? p.accent : "rgba(0,0,0,0.4)" }}
                  >
                    {p.label}
                  </span>

                  {isActive && <HangTag description={p.description} label={p.label} />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bio section ──────────────────────────────────────── */}
      <section
        className="px-4 md:px-8 py-20"
        data-testid="section-bio"
      >
        <div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 border-t pt-16"
          style={{ borderColor: "rgba(0,0,0,0.08)" }}
        >
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-6" style={{ color: "#A290C0" }}>
              The person
            </p>
            <p
              className="font-serif text-2xl md:text-3xl font-light leading-relaxed"
              style={{ color: INK }}
            >
              I am Xumeng Zhang <br /> a product designer based in EU.
            </p>
            <div className="mt-8 h-px w-12" style={{ background: "#A290C042" }} />
            <p
              className="font-serif text-lg leading-relaxed mt-8"
              style={{ color: "rgba(0,0,0,0.55)" }}
            >
              My work lives at the intersection of deep user insight and elegant product design. Outside of that, I am a collection of curious sub selves — all of whom inform how I see the world.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: "#A290C0" }}>
              The facts
            </p>
            {[
              { label: "Based in", value: "Amsterdam, NL & Paris, FR" },
              { label: "Currently", value: "Product Designer @ Van Lanschot Kempen" },
              { label: "Education", value: "MSc Industrial Design, TU/e. BSc Industrial Design, Zhejiang University" },
              { label: "Languages", value: "Chinese · English · French (A2)" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-start gap-6 py-4 border-b"
                style={{ borderColor: "rgba(0,0,0,0.07)" }}
              >
                <span className="font-sans text-xs font-medium w-24 flex-shrink-0 pt-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>
                  {label}
                </span>
                <span className="font-sans text-sm font-medium" style={{ color: INK }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
