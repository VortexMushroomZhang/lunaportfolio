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
  seed: number;
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
}

const NUM_DROPS = 180;
const SPAWN_RATE = 2;
const WIND_BASE = 0.18;
const WIND_VARIATION = 0.25;
const GRAVITY = 0.06;
const DRAG = 0.997;
const ATTRACTION_RADIUS = 130;
const IDLE_MS = 1800;
const MACRO_GRAVITY = 0.45;
const MACRO_WIND = 0.6;

export default function RaindropCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const macroRef = useRef<MacroDrop>({
    x: -999, y: -999, r: 22, vx: 0, vy: 0,
    falling: false, active: false, trail: [],
  });
  const mouseRef = useRef({ x: -999, y: -999, active: false });
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const tRef = useRef(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const blurCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const makeDrop = useCallback((w: number, h: number, top = false): Drop => {
    const r = 1.2 + Math.random() * 4.5;
    return {
      x: Math.random() * w,
      y: top ? -(r * 2 + Math.random() * 80) : Math.random() * h,
      r, vx: 0, vy: 0,
      opacity: 0.55 + Math.random() * 0.45,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.008 + Math.random() * 0.018,
      seed: Math.random(),
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
    img.src = "/images/hero-bg.png";
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
      blurCtx.filter = "blur(12px) brightness(0.5) saturate(0.75)";
      blurCtx.drawImage(img, p.ox - 16, p.oy - 16, p.dw + 32, p.dh + 32);
      blurCtx.filter = "none";
      blurCtx.fillStyle = "rgba(160,185,200,0.08)";
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

    const drops = dropsRef.current;
    if (drops.length === 0) {
      const { w, h } = sizeRef.current;
      for (let i = 0; i < NUM_DROPS; i++) drops.push(makeDrop(w, h));
    }

    const dropPath = (cx: CanvasRenderingContext2D, x: number, y: number, r: number, elong = 0) => {
      const s = 1 + elong * 0.35;
      cx.beginPath();
      cx.save();
      cx.translate(x, y);
      cx.scale(1, s);
      if (r > 2.5) {
        cx.moveTo(0, -r);
        cx.bezierCurveTo(r * 0.45, -r * 0.85, r, -r * 0.25, r, r * 0.15);
        cx.bezierCurveTo(r, r * 0.65, r * 0.5, r, 0, r);
        cx.bezierCurveTo(-r * 0.5, r, -r, r * 0.65, -r, r * 0.15);
        cx.bezierCurveTo(-r, -r * 0.25, -r * 0.45, -r * 0.85, 0, -r);
      } else {
        cx.arc(0, 0, r, 0, Math.PI * 2);
      }
      cx.restore();
      cx.closePath();
    };

    const drawDrop = (
      cx: CanvasRenderingContext2D,
      x: number, y: number, r: number,
      opa: number, elong = 0, macro = false
    ) => {
      if (r < 0.5 || opa < 0.01) return;

      if (r < 2 && !macro) {
        cx.save();
        cx.globalAlpha = opa * 0.7;
        cx.beginPath();
        cx.arc(x, y, r, 0, Math.PI * 2);
        const sg = cx.createRadialGradient(x - r * 0.2, y - r * 0.2, 0, x, y, r);
        sg.addColorStop(0, "rgba(220,235,250,0.5)");
        sg.addColorStop(0.6, "rgba(200,220,240,0.25)");
        sg.addColorStop(1, "rgba(180,210,240,0.08)");
        cx.fillStyle = sg;
        cx.fill();
        cx.restore();
        return;
      }

      cx.save();

      dropPath(cx, x, y, r, elong);
      cx.clip();

      if (img.complete && img.naturalWidth > 0) {
        const { w, h } = sizeRef.current;
        const p = coverParams(img.naturalWidth, img.naturalHeight, w, h);
        const magnify = macro ? 1.08 : 1.04;
        const refX = x, refY = y;
        cx.save();
        cx.translate(refX, refY);
        cx.scale(magnify, magnify);
        cx.translate(-refX, -refY);
        cx.globalAlpha = 0.92 * opa;
        cx.drawImage(img, p.ox, p.oy, p.dw, p.dh);
        cx.restore();
      }

      const edge = cx.createRadialGradient(x - r * 0.12, y - r * 0.12, r * 0.25, x, y, r);
      edge.addColorStop(0, "rgba(255,255,255,0)");
      edge.addColorStop(0.55, "rgba(255,255,255,0)");
      edge.addColorStop(0.72, `rgba(210,225,245,${0.06 * opa})`);
      edge.addColorStop(0.85, `rgba(190,215,255,${0.14 * opa})`);
      edge.addColorStop(0.94, `rgba(170,205,255,${0.22 * opa})`);
      edge.addColorStop(1.0, `rgba(150,195,255,${0.1 * opa})`);
      dropPath(cx, x, y, r, elong);
      cx.fillStyle = edge;
      cx.fill();

      if (r > 2) {
        const crR = cx.createRadialGradient(x + r * 0.35, y + r * 0.25, 0, x + r * 0.35, y + r * 0.25, r * 0.55);
        crR.addColorStop(0, `rgba(255,140,100,${0.05 * opa})`);
        crR.addColorStop(1, "rgba(255,140,100,0)");
        dropPath(cx, x, y, r, elong);
        cx.fillStyle = crR;
        cx.fill();

        const crB = cx.createRadialGradient(x - r * 0.35, y - r * 0.25, 0, x - r * 0.35, y - r * 0.25, r * 0.55);
        crB.addColorStop(0, `rgba(100,160,255,${0.05 * opa})`);
        crB.addColorStop(1, "rgba(100,160,255,0)");
        dropPath(cx, x, y, r, elong);
        cx.fillStyle = crB;
        cx.fill();

        const crG = cx.createRadialGradient(x - r * 0.1, y + r * 0.35, 0, x - r * 0.1, y + r * 0.35, r * 0.4);
        crG.addColorStop(0, `rgba(130,255,160,${0.03 * opa})`);
        crG.addColorStop(1, "rgba(130,255,160,0)");
        dropPath(cx, x, y, r, elong);
        cx.fillStyle = crG;
        cx.fill();
      }

      const hx = x - r * 0.28, hy = y - r * 0.32, hr = r * 0.32;
      const hl = cx.createRadialGradient(hx, hy, 0, hx, hy, hr);
      hl.addColorStop(0, `rgba(255,255,255,${0.6 * opa})`);
      hl.addColorStop(0.4, `rgba(255,255,255,${0.2 * opa})`);
      hl.addColorStop(1, "rgba(255,255,255,0)");
      cx.fillStyle = hl;
      cx.beginPath();
      cx.arc(hx, hy, hr, 0, Math.PI * 2);
      cx.fill();

      if (r > 3) {
        const bx = x + r * 0.12, by = y + r * 0.38, br = r * 0.18;
        const bl = cx.createRadialGradient(bx, by, 0, bx, by, br);
        bl.addColorStop(0, `rgba(255,255,255,${0.15 * opa})`);
        bl.addColorStop(1, "rgba(255,255,255,0)");
        cx.fillStyle = bl;
        cx.beginPath();
        cx.arc(bx, by, br, 0, Math.PI * 2);
        cx.fill();
      }

      dropPath(cx, x, y, r, elong);
      cx.strokeStyle = `rgba(255,255,255,${0.1 * opa})`;
      cx.lineWidth = 0.4;
      cx.stroke();

      cx.restore();
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
        cx.globalAlpha = 0.7 * t.opacity;
        cx.drawImage(img, p.ox, p.oy, p.dw, p.dh);
      }
      const eg = cx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.r);
      eg.addColorStop(0, `rgba(200,220,240,${0.04 * t.opacity})`);
      eg.addColorStop(1, `rgba(180,210,250,${0.12 * t.opacity})`);
      cx.fillStyle = eg;
      cx.beginPath();
      cx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
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

      const windX = Math.sin(t * 0.002) * WIND_VARIATION + WIND_BASE;

      ctx.clearRect(0, 0, w, h);

      if (blurReady) {
        ctx.drawImage(blurCvs, 0, 0);
      } else {
        ctx.fillStyle = "#0a1520";
        ctx.fillRect(0, 0, w, h);
      }

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.wobble += d.wobbleSpeed;
        d.vy += GRAVITY * 0.018 * (1 + d.r * 0.1);
        d.vx += windX * 0.004;
        d.vx += Math.sin(d.wobble) * 0.002;
        d.vy *= DRAG;
        d.vx *= DRAG;
        d.x += d.vx;
        d.y += d.vy;

        if (d.y > h + d.r * 2 || d.x < -d.r * 2 || d.x > w + d.r * 2) {
          drops[i] = makeDrop(w, h, true);
          continue;
        }

        for (let j = i - 1; j >= Math.max(0, i - 15); j--) {
          const o = drops[j];
          const dx = d.x - o.x, dy = d.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < d.r + o.r && dist > 0) {
            const area = d.r * d.r + o.r * o.r;
            d.r = Math.sqrt(area);
            d.vx = (d.vx + o.vx) * 0.5;
            d.vy = (d.vy + o.vy) * 0.5 + 0.015;
            drops.splice(j, 1);
            i--;
            break;
          }
        }
      }

      while (drops.length < NUM_DROPS) {
        const spawns = Math.min(SPAWN_RATE, NUM_DROPS - drops.length);
        for (let s = 0; s < spawns; s++) drops.push(makeDrop(w, h, true));
        break;
      }

      if (macro.active && !macro.falling) {
        macro.x += (mouse.x - macro.x) * 0.09;
        macro.y += (mouse.y - macro.y) * 0.09;

        for (let i = drops.length - 1; i >= 0; i--) {
          const d = drops[i];
          const dx = macro.x - d.x, dy = macro.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < ATTRACTION_RADIUS) {
            const f = (1 - dist / ATTRACTION_RADIUS) * 0.055;
            d.vx += dx * f;
            d.vy += dy * f;
          }
          if (dist < macro.r + d.r) {
            macro.r = Math.min(Math.sqrt(macro.r * macro.r + d.r * d.r), 70);
            drops.splice(i, 1);
          }
        }

        if (!macro.trail.length || Math.hypot(macro.x - macro.trail[macro.trail.length - 1].x, macro.y - macro.trail[macro.trail.length - 1].y) > 4) {
          macro.trail.push({ x: macro.x, y: macro.y, r: macro.r * 0.35, opacity: 0.35 });
          if (macro.trail.length > 30) macro.trail.shift();
        }
      } else if (macro.falling) {
        macro.vy += MACRO_GRAVITY;
        macro.vx = Math.sin(t * 0.008) * MACRO_WIND + windX * 2;
        macro.x += macro.vx;
        macro.y += macro.vy;
        if (macro.r > 2.5) macro.r -= 0.12;

        if (!macro.trail.length || Math.hypot(macro.x - macro.trail[macro.trail.length - 1].x, macro.y - macro.trail[macro.trail.length - 1].y) > macro.r * 0.8) {
          macro.trail.push({ x: macro.x, y: macro.y, r: macro.r * 0.3, opacity: 0.28 });
          if (macro.trail.length > 35) macro.trail.shift();
        }

        for (let i = drops.length - 1; i >= 0; i--) {
          const d = drops[i];
          const dist = Math.hypot(macro.x - d.x, macro.y - d.y);
          if (dist < macro.r + d.r) {
            macro.r = Math.min(macro.r + d.r * 0.08, 70);
            drops.splice(i, 1);
          }
        }

        if (macro.y > h + macro.r * 2) {
          macro.x = -999; macro.y = -999; macro.r = 22;
          macro.falling = false; macro.active = false;
          macro.vy = 0; macro.vx = 0; macro.trail = [];
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
        const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        drawDrop(ctx, d.x, d.y, d.r, d.opacity, Math.min(spd * 1.8, 0.5));
      }

      if (macro.active || macro.falling) {
        const ms = Math.sqrt(macro.vx * macro.vx + macro.vy * macro.vy);
        drawDrop(ctx, macro.x, macro.y, macro.r, 1, Math.min(ms * 0.4, 0.7), true);
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

    addEventListener("mousemove", onMove);
    addEventListener("mouseout", onLeave);
    addEventListener("touchmove", onTouch, { passive: true });
    addEventListener("touchend", onLeave);

    return () => {
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseout", onLeave);
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
