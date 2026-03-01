import { useEffect, useRef, useCallback } from "react";

interface Drop {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  letter: string;
  letterSize: number;
  shape: number[];
  flatness: number;
  angle: number;
}

interface TrailDot {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

interface MacroDrop {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  falling: boolean;
  active: boolean;
  trail: TrailDot[];
  letters: string[];
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const NUM_DROPS = 600;
const SPAWN_RATE = 8;
const FLOW_ANGLE = Math.PI * 0.42;
const FLOW_SPEED = 0.07;
const FLOW_VARIATION = 0.02;
const GRAVITY = 0.04;
const DRAG = 0.998;
const ATTRACTION_RADIUS = 130;
const IDLE_MS = 1800;
const MACRO_GRAVITY = 0.45;
const MACRO_WIND = 0.6;

const BG_IMAGES = [
  "/images/bg-city-sunset.jpg",
  "/images/bg-street-rain.jpg",
];

function pickBg(): string {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) return BG_IMAGES[1];
  return BG_IMAGES[0];
}

function makeShape(): number[] {
  const pts: number[] = [];
  const segments = 8 + Math.floor(Math.random() * 5);
  for (let i = 0; i < segments; i++) {
    pts.push(0.7 + Math.random() * 0.6);
  }
  return pts;
}

export default function RaindropCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const macroRef = useRef<MacroDrop>({
    x: -999, y: -999, r: 22, vx: 0, vy: 0,
    falling: false, active: false, trail: [], letters: [],
  });
  const mouseRef = useRef({ x: -999, y: -999, active: false, pressed: false });
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const tRef = useRef(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const blurCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const randomLetter = () => LETTERS[Math.floor(Math.random() * LETTERS.length)];

  const makeDrop = useCallback((w: number, h: number, top = false): Drop => {
    const r = 1.5 + Math.random() * 8;
    const flowDir = FLOW_ANGLE + (Math.random() - 0.5) * 0.3;
    return {
      x: top ? Math.random() * w * 1.3 - w * 0.15 : Math.random() * w,
      y: top ? -(r * 2 + Math.random() * 100) : Math.random() * h,
      r, vx: 0, vy: 0,
      opacity: 0.6 + Math.random() * 0.4,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.005 + Math.random() * 0.015,
      letter: randomLetter(),
      letterSize: Math.max(7, r * 2),
      shape: makeShape(),
      flatness: 0.15 + Math.random() * 0.35,
      angle: flowDir,
    };
  }, []);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d")!;

    const blurCvs = document.createElement("canvas");
    blurCanvasRef.current = blurCvs;
    const blurCtx = blurCvs.getContext("2d")!;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = pickBg();
    imgRef.current = img;

    let blurReady = false;

    const coverParams = (iw: number, ih: number, cw: number, ch: number) => {
      const ir = iw / ih, cr = cw / ch;
      let dw = cw, dh = ch, ox = 0, oy = 0;
      if (cr > ir) { dh = cw / ir; oy = (ch - dh) / 2; }
      else { dw = ch * ir; ox = (cw - dw) / 2; }
      return { dw, dh, ox, oy };
    };

    const renderBlur = () => {
      if (!img.complete || img.naturalWidth === 0) return;
      const { w, h } = sizeRef.current;
      blurCvs.width = w;
      blurCvs.height = h;
      const p = coverParams(img.naturalWidth, img.naturalHeight, w, h);
      blurCtx.filter = "blur(14px) brightness(0.85) saturate(0.7)";
      blurCtx.drawImage(img, p.ox - 20, p.oy - 20, p.dw + 40, p.dh + 40);
      blurCtx.filter = "none";
      blurCtx.fillStyle = "rgba(180,195,205,0.02)";
      blurCtx.fillRect(0, 0, w, h);
      blurReady = true;
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = innerWidth, h = innerHeight;
      cvs.width = w * dpr; cvs.height = h * dpr;
      cvs.style.width = w + "px"; cvs.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      renderBlur();
    };

    resize();
    addEventListener("resize", resize);

    dropsRef.current = [];
    const drops = dropsRef.current;
    const { w: iw, h: ih } = sizeRef.current;
    for (let i = 0; i < NUM_DROPS; i++) drops.push(makeDrop(iw, ih));

    const organicPath = (cx: CanvasRenderingContext2D, x: number, y: number, r: number, shape: number[] | undefined, flatness: number, moveAngle: number, speed = 0) => {
      if (!shape || shape.length === 0) {
        cx.beginPath();
        cx.arc(x, y, r, 0, Math.PI * 2);
        cx.closePath();
        return;
      }
      const n = shape.length;
      cx.beginPath();

      const stretch = 1 + Math.min(speed * 3, 0.7);

      cx.save();
      cx.translate(x, y);
      cx.rotate(moveAngle - Math.PI / 2);
      cx.scale(1 / stretch, stretch);

      const pts: [number, number][] = [];
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n;
        const dist = r * shape[i];
        const squash = 1 - flatness * Math.abs(Math.cos(a));
        pts.push([Math.cos(a) * dist * squash, Math.sin(a) * dist * squash]);
      }

      cx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 0; i < n; i++) {
        const curr = pts[i];
        const next = pts[(i + 1) % n];
        const cpx = (curr[0] + next[0]) / 2;
        const cpy = (curr[1] + next[1]) / 2;
        cx.quadraticCurveTo(curr[0], curr[1], cpx, cpy);
      }
      cx.closePath();
      cx.restore();
    };

    const simpleOrganicPath = (cx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      cx.beginPath();
      cx.arc(x, y, r, 0, Math.PI * 2);
      cx.closePath();
    };

    const drawDrop = (cx: CanvasRenderingContext2D, d: Drop, elong = 0) => {
      const { x, y, r, opacity: opa } = d;
      if (r < 0.5 || opa < 0.01) return;

      const moveAngle = Math.atan2(d.vy || Math.sin(d.angle), d.vx || Math.cos(d.angle));
      const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);

      if (r < 1.8) {
        cx.save();
        cx.globalAlpha = opa * 0.55;
        cx.beginPath();
        cx.arc(x, y, r, 0, Math.PI * 2);
        const sg = cx.createRadialGradient(x - r * 0.15, y - r * 0.15, 0, x, y, r);
        sg.addColorStop(0, "rgba(230,240,250,0.4)");
        sg.addColorStop(0.7, "rgba(215,228,242,0.15)");
        sg.addColorStop(1, "rgba(200,218,240,0.03)");
        cx.fillStyle = sg;
        cx.fill();
        cx.font = `${Math.max(5, r * 2.2)}px 'Lato', sans-serif`;
        cx.fillStyle = `rgba(80,90,100,${0.35 * opa})`;
        cx.textAlign = "center";
        cx.textBaseline = "middle";
        cx.fillText(d.letter, x, y);
        cx.restore();
        return;
      }

      cx.save();

      organicPath(cx, x, y, r, d.shape, d.flatness, moveAngle, spd);
      cx.clip();

      if (img.complete && img.naturalWidth > 0) {
        const { w, h } = sizeRef.current;
        const p = coverParams(img.naturalWidth, img.naturalHeight, w, h);
        const magnify = 1.06;
        cx.save();
        cx.translate(x, y);
        cx.scale(magnify, magnify);
        cx.translate(-x, -y);
        cx.globalAlpha = 0.85 * opa;
        cx.drawImage(img, p.ox, p.oy, p.dw, p.dh);
        cx.restore();
      }

      const edge = cx.createRadialGradient(x - r * 0.1, y - r * 0.1, r * 0.15, x, y, r);
      edge.addColorStop(0, "rgba(255,255,255,0)");
      edge.addColorStop(0.4, "rgba(255,255,255,0)");
      edge.addColorStop(0.65, `rgba(218,232,248,${0.12 * opa})`);
      edge.addColorStop(0.8, `rgba(198,220,252,${0.22 * opa})`);
      edge.addColorStop(0.92, `rgba(178,208,252,${0.3 * opa})`);
      edge.addColorStop(1.0, `rgba(160,198,250,${0.12 * opa})`);
      organicPath(cx, x, y, r, d.shape, d.flatness, moveAngle, spd);
      cx.fillStyle = edge;
      cx.fill();

      if (r > 3) {
        const crR = cx.createRadialGradient(x + r * 0.28, y + r * 0.22, 0, x + r * 0.28, y + r * 0.22, r * 0.45);
        crR.addColorStop(0, `rgba(255,155,125,${0.035 * opa})`);
        crR.addColorStop(1, "rgba(255,155,125,0)");
        organicPath(cx, x, y, r, d.shape, d.flatness, moveAngle, spd);
        cx.fillStyle = crR;
        cx.fill();

        const crB = cx.createRadialGradient(x - r * 0.28, y - r * 0.18, 0, x - r * 0.28, y - r * 0.18, r * 0.45);
        crB.addColorStop(0, `rgba(115,175,255,${0.035 * opa})`);
        crB.addColorStop(1, "rgba(115,175,255,0)");
        organicPath(cx, x, y, r, d.shape, d.flatness, moveAngle, spd);
        cx.fillStyle = crB;
        cx.fill();
      }

      const hx = x - r * 0.22, hy = y - r * 0.28, hr = r * 0.28;
      const hl = cx.createRadialGradient(hx, hy, 0, hx, hy, hr);
      hl.addColorStop(0, `rgba(255,255,255,${0.6 * opa})`);
      hl.addColorStop(0.35, `rgba(255,255,255,${0.2 * opa})`);
      hl.addColorStop(1, "rgba(255,255,255,0)");
      cx.fillStyle = hl;
      cx.beginPath();
      cx.arc(hx, hy, hr, 0, Math.PI * 2);
      cx.fill();

      if (r > 3.5) {
        const bx = x + r * 0.08, by = y + r * 0.32, br = r * 0.15;
        const bl = cx.createRadialGradient(bx, by, 0, bx, by, br);
        bl.addColorStop(0, `rgba(255,255,255,${0.15 * opa})`);
        bl.addColorStop(1, "rgba(255,255,255,0)");
        cx.fillStyle = bl;
        cx.beginPath();
        cx.arc(bx, by, br, 0, Math.PI * 2);
        cx.fill();
      }

      organicPath(cx, x, y, r, d.shape, d.flatness, moveAngle, spd);
      cx.strokeStyle = `rgba(255,255,255,${0.1 * opa})`;
      cx.lineWidth = 0.5;
      cx.stroke();

      cx.restore();

      cx.save();
      cx.font = `${d.letterSize}px 'Lato', sans-serif`;
      cx.fillStyle = `rgba(60,70,80,${0.45 * opa})`;
      cx.textAlign = "center";
      cx.textBaseline = "middle";
      cx.fillText(d.letter, x, y + 1);
      cx.restore();
    };

    const drawMacroDrop = (cx: CanvasRenderingContext2D, mx: number, my: number, mr: number, elong = 0, letters: string[], time: number) => {
      if (mr < 1) return;
      cx.save();

      const wobbleN = 10;
      cx.beginPath();
      const wobblePts: [number, number][] = [];
      for (let i = 0; i < wobbleN; i++) {
        const a = (Math.PI * 2 * i) / wobbleN;
        const wobbleAmt = mr * 0.04 * Math.sin(time * 0.06 + i * 1.7);
        const dist = mr + wobbleAmt;
        wobblePts.push([mx + Math.cos(a) * dist, my + Math.sin(a) * dist]);
      }
      cx.moveTo(wobblePts[0][0], wobblePts[0][1]);
      for (let i = 0; i < wobbleN; i++) {
        const curr = wobblePts[i];
        const next = wobblePts[(i + 1) % wobbleN];
        cx.quadraticCurveTo(curr[0], curr[1], (curr[0] + next[0]) / 2, (curr[1] + next[1]) / 2);
      }
      cx.closePath();
      cx.clip();

      if (img.complete && img.naturalWidth > 0) {
        const { w, h } = sizeRef.current;
        const p = coverParams(img.naturalWidth, img.naturalHeight, w, h);
        cx.save();
        cx.translate(mx, my);
        cx.scale(1.08, 1.08);
        cx.translate(-mx, -my);
        cx.globalAlpha = 0.88;
        cx.drawImage(img, p.ox, p.oy, p.dw, p.dh);
        cx.restore();
      }

      const edge = cx.createRadialGradient(mx - mr * 0.08, my - mr * 0.08, mr * 0.15, mx, my, mr);
      edge.addColorStop(0, "rgba(255,255,255,0)");
      edge.addColorStop(0.55, "rgba(255,255,255,0)");
      edge.addColorStop(0.78, "rgba(205,222,248,0.1)");
      edge.addColorStop(0.93, "rgba(185,212,252,0.18)");
      edge.addColorStop(1.0, "rgba(165,200,250,0.06)");
      cx.fillStyle = edge;
      cx.fillRect(mx - mr, my - mr, mr * 2, mr * 2);

      const hx = mx - mr * 0.18, hy = my - mr * 0.22, hr = mr * 0.32;
      const hl = cx.createRadialGradient(hx, hy, 0, hx, hy, hr);
      hl.addColorStop(0, "rgba(255,255,255,0.45)");
      hl.addColorStop(0.4, "rgba(255,255,255,0.12)");
      hl.addColorStop(1, "rgba(255,255,255,0)");
      cx.fillStyle = hl;
      cx.beginPath();
      cx.arc(hx, hy, hr, 0, Math.PI * 2);
      cx.fill();

      cx.restore();

      cx.save();
      cx.beginPath();
      for (let i = 0; i < wobbleN; i++) {
        const curr = wobblePts[i];
        const next = wobblePts[(i + 1) % wobbleN];
        if (i === 0) cx.moveTo(wobblePts[0][0], wobblePts[0][1]);
        cx.quadraticCurveTo(curr[0], curr[1], (curr[0] + next[0]) / 2, (curr[1] + next[1]) / 2);
      }
      cx.closePath();
      cx.strokeStyle = "rgba(255,255,255,0.1)";
      cx.lineWidth = 0.5;
      cx.stroke();
      cx.restore();

      if (letters.length > 0) {
        cx.save();
        cx.font = `${Math.min(13, mr * 0.45)}px 'Lato', sans-serif`;
        cx.fillStyle = "rgba(50,60,70,0.4)";
        cx.textAlign = "center";
        cx.textBaseline = "middle";
        const shown = letters.slice(-6);
        const spacing = Math.min(mr * 0.3, 9);
        shown.forEach((l, i) => {
          const ox = (i - (shown.length - 1) / 2) * spacing;
          cx.fillText(l, mx + ox, my);
        });
        cx.restore();
      }
    };

    const drawTrail = (cx: CanvasRenderingContext2D, t: TrailDot) => {
      if (t.opacity < 0.02 || t.r < 0.3) return;
      cx.save();
      cx.beginPath();
      cx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
      cx.clip();
      if (img.complete && img.naturalWidth > 0) {
        const { w, h } = sizeRef.current;
        const p = coverParams(img.naturalWidth, img.naturalHeight, w, h);
        cx.globalAlpha = 0.55 * t.opacity;
        cx.drawImage(img, p.ox, p.oy, p.dw, p.dh);
      }
      const eg = cx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.r);
      eg.addColorStop(0, `rgba(215,228,242,${0.03 * t.opacity})`);
      eg.addColorStop(1, `rgba(195,218,245,${0.08 * t.opacity})`);
      cx.fillStyle = eg;
      cx.beginPath();
      cx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
      cx.fill();
      cx.restore();
    };

    const drawCursor = (cx: CanvasRenderingContext2D, mx: number, my: number, pressed: boolean) => {
      const cursorR = pressed ? 10 : 7;
      cx.save();
      cx.globalCompositeOperation = "difference";
      cx.fillStyle = "#ffffff";
      cx.beginPath();
      cx.arc(mx, my, cursorR, 0, Math.PI * 2);
      cx.fill();
      cx.restore();
    };

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      tRef.current++;
      const { w, h } = sizeRef.current;
      const drops = dropsRef.current;
      const macro = macroRef.current;
      const mouse = mouseRef.current;
      const t = tRef.current;

      const flowCos = Math.cos(FLOW_ANGLE);
      const flowSin = Math.sin(FLOW_ANGLE);

      ctx.clearRect(0, 0, w, h);

      if (blurReady) {
        ctx.drawImage(blurCvs, 0, 0);
      } else {
        ctx.fillStyle = "#1e2830";
        ctx.fillRect(0, 0, w, h);
      }

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.wobble += d.wobbleSpeed;

        const flowF = FLOW_SPEED * (1 + d.r * 0.04);
        const variation = Math.sin(d.wobble) * FLOW_VARIATION;
        d.vx += (flowCos * flowF + variation * 0.3) * 0.015;
        d.vy += (flowSin * flowF + GRAVITY * 0.3) * 0.015;

        d.vy *= DRAG;
        d.vx *= DRAG;
        d.x += d.vx;
        d.y += d.vy;

        if (d.y > h + d.r * 3 || d.x < -d.r * 3 || d.x > w + d.r * 3 || d.y < -d.r * 10) {
          drops[i] = makeDrop(w, h, true);
          continue;
        }

        for (let j = i - 1; j >= Math.max(0, i - 12); j--) {
          const o = drops[j];
          const dx = d.x - o.x, dy = d.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < (d.r + o.r) * 0.8 && dist > 0) {
            const area = d.r * d.r + o.r * o.r;
            d.r = Math.sqrt(area);
            d.letterSize = Math.max(7, d.r * 2);
            d.vx = (d.vx + o.vx) * 0.5;
            d.vy = (d.vy + o.vy) * 0.5 + 0.01;
            for (let k = 0; k < d.shape.length; k++) {
              d.shape[k] = (d.shape[k] + (o.shape[k % o.shape.length] || 1)) / 2;
            }
            drops.splice(j, 1);
            i--;
            break;
          }
        }
      }

      while (drops.length < NUM_DROPS) {
        for (let s = 0; s < Math.min(SPAWN_RATE, NUM_DROPS - drops.length); s++) {
          drops.push(makeDrop(w, h, true));
        }
        break;
      }

      if (macro.active && !macro.falling) {
        macro.x += (mouse.x - macro.x) * 0.12;
        macro.y += (mouse.y - macro.y) * 0.12;

        for (let i = drops.length - 1; i >= 0; i--) {
          const d = drops[i];
          const dx = macro.x - d.x, dy = macro.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < ATTRACTION_RADIUS) {
            const ratio = 1 - dist / ATTRACTION_RADIUS;
            const f = ratio * ratio * 0.08;
            const nx = dx / (dist || 1), ny = dy / (dist || 1);
            d.vx += nx * f * dist * 0.02;
            d.vy += ny * f * dist * 0.02;
            if (dist < ATTRACTION_RADIUS * 0.5) {
              d.vx += dx * ratio * 0.03;
              d.vy += dy * ratio * 0.03;
            }
          }
          const mergeThreshold = macro.r * 0.7 + d.r;
          if (dist < mergeThreshold) {
            const prevArea = macro.r * macro.r;
            const addArea = d.r * d.r;
            macro.r = Math.min(Math.sqrt(prevArea + addArea), 65);
            macro.letters.push(d.letter);
            if (macro.letters.length > 12) macro.letters.shift();
            drops.splice(i, 1);
          }
        }

        if (!macro.trail.length || Math.hypot(macro.x - macro.trail[macro.trail.length - 1].x, macro.y - macro.trail[macro.trail.length - 1].y) > 3) {
          macro.trail.push({ x: macro.x, y: macro.y, r: macro.r * 0.22, opacity: 0.3 });
          if (macro.trail.length > 40) macro.trail.shift();
        }
      } else if (macro.falling) {
        macro.vy += MACRO_GRAVITY;
        macro.vx = flowCos * MACRO_WIND + Math.sin(t * 0.008) * 0.5;
        macro.x += macro.vx;
        macro.y += macro.vy;
        if (macro.r > 2.5) macro.r -= 0.12;

        if (!macro.trail.length || Math.hypot(macro.x - macro.trail[macro.trail.length - 1].x, macro.y - macro.trail[macro.trail.length - 1].y) > macro.r * 0.5) {
          macro.trail.push({ x: macro.x, y: macro.y, r: macro.r * 0.2, opacity: 0.25 });
          if (macro.trail.length > 45) macro.trail.shift();
        }

        for (let i = drops.length - 1; i >= 0; i--) {
          const d = drops[i];
          const dist = Math.hypot(macro.x - d.x, macro.y - d.y);
          if (dist < macro.r + d.r) {
            macro.r = Math.min(macro.r + d.r * 0.08, 65);
            drops.splice(i, 1);
          }
        }

        if (macro.y > h + macro.r * 2) {
          macro.x = -999; macro.y = -999; macro.r = 22;
          macro.falling = false; macro.active = false;
          macro.vy = 0; macro.vx = 0; macro.trail = []; macro.letters = [];
        }
      }

      if (macro.active || macro.falling) {
        for (const td of macro.trail) {
          td.opacity *= 0.965;
          drawTrail(ctx, td);
        }
        macro.trail = macro.trail.filter(td => td.opacity > 0.02);
      }

      for (const d of drops) {
        drawDrop(ctx, d);
      }

      if (macro.active || macro.falling) {
        drawMacroDrop(ctx, macro.x, macro.y, macro.r, 0, macro.letters, t);
      }

      
    };

    const onMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      const mc = macroRef.current;
      m.x = e.clientX; m.y = e.clientY; m.active = true;

      if (!mc.active && !mc.falling) {
        mc.active = true; mc.x = e.clientX; mc.y = e.clientY; mc.r = 22;
      }
      if (mc.falling) { mc.falling = false; mc.vy = 0; mc.vx = 0; mc.active = true; }

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (mc.active) { mc.falling = true; mc.active = false; m.active = false; }
      }, IDLE_MS);
    };

    const onLeave = () => {
      const mc = macroRef.current;
      if (mc.active) { mc.falling = true; mc.active = false; }
      mouseRef.current.active = false;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };

    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY } as MouseEvent);
      }
    };

    const startWhenReady = () => {
      renderBlur();
      animate();
    };

    if (img.complete && img.naturalWidth > 0) startWhenReady();
    else { img.onload = startWhenReady; img.onerror = () => animate(); }

    const onDown = () => { mouseRef.current.pressed = true; };
    const onUp = () => { mouseRef.current.pressed = false; };

    addEventListener("mousemove", onMove);
    addEventListener("mouseout", onLeave);
    addEventListener("mousedown", onDown);
    addEventListener("mouseup", onUp);
    addEventListener("touchmove", onTouch, { passive: true });
    addEventListener("touchend", onLeave);

    return () => {
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseout", onLeave);
      removeEventListener("mousedown", onDown);
      removeEventListener("mouseup", onUp);
      removeEventListener("touchmove", onTouch);
      removeEventListener("touchend", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [makeDrop]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="canvas-raindrop"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        cursor: "none",
      }}
    />
  );
}
