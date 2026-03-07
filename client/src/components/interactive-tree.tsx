import { useRef, useEffect, useCallback } from "react";

/* ─── Brand colours for dots ─── */
const BRAND_COLORS = [
  "#0D9488", // vivid-teal
  "#A290C0", // lavender
  "#8BA3C4", // periwinkle
  "#5C3020", // sienna
  "#6A6494", // violet
  "#7A9068", // sage
  "#C899B4", // dusky-pink
  "#0A5068", // teal
];

/* ─── Scattered text characters (hidden/subtle) ─── */
const WHISPER_CHARS = [
  "explore", "rêver", "树", "grow", "lumière", "风", "wander", "liberté",
  "花", "breathe", "ciel", "山", "create", "espoir", "水", "dream",
  "vie", "云", "happy", "soleil", "叶", "free", "monde", "春",
];

/* ─── Types ─── */
interface Vec2 { x: number; y: number }

interface BranchSeg {
  start: Vec2;
  end: Vec2;
  thickness: number;
  depth: number;
  angle: number;
  length: number;
  children: BranchSeg[];
  baseAngle: number;
}

interface Dot {
  pos: Vec2;
  color: string;
  radius: number;
  branch: BranchSeg;
  growBranches: BranchSeg[];
  growProgress: number;
  locked: boolean;
  hovered: boolean;
  char?: string;
}

interface WhisperChar {
  pos: Vec2;
  char: string;
  opacity: number;
  size: number;
  angle: number;
}

/* ─── Helpers ─── */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function buildBranch(
  start: Vec2,
  angle: number,
  length: number,
  thickness: number,
  depth: number,
  maxDepth: number,
): BranchSeg {
  const end: Vec2 = {
    x: start.x + Math.cos(angle) * length,
    y: start.y + Math.sin(angle) * length,
  };
  const seg: BranchSeg = { start, end, thickness, depth, angle, length, children: [], baseAngle: angle };

  if (depth < maxDepth) {
    // More children at lower depths for a fuller tree
    const numChildren = depth < 1 ? 3 + Math.floor(Math.random() * 2)
      : depth < 3 ? 2 + Math.floor(Math.random() * 2)
      : 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numChildren; i++) {
      const spread = 0.25 + Math.random() * 0.55;
      const side = i % 2 === 0 ? 1 : -1;
      const childAngle = angle + side * spread + (Math.random() - 0.5) * 0.15;
      const childLen = length * (0.55 + Math.random() * 0.25);
      const childThick = thickness * (depth < 2 ? 0.6 : 0.55);
      const t = 0.45 + Math.random() * 0.5;
      const branchStart: Vec2 = { x: lerp(start.x, end.x, t), y: lerp(start.y, end.y, t) };
      seg.children.push(buildBranch(branchStart, childAngle, childLen, childThick, depth + 1, maxDepth));
    }
  }
  return seg;
}

function buildGrowBranch(start: Vec2, color: string): BranchSeg[] {
  const branches: BranchSeg[] = [];
  const num = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < num; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
    const length = 20 + Math.random() * 40;
    branches.push(buildBranch(start, angle, length, 1.5, 0, 2));
  }
  (branches as any)._color = color;
  return branches;
}

function collectPoints(seg: BranchSeg, depth: number, results: { pos: Vec2; branch: BranchSeg }[]) {
  // Collect endpoints AND midpoints from depth 1+ for more dot placement options
  if (depth >= 1) {
    results.push({ pos: { ...seg.end }, branch: seg });
    // Also add a midpoint
    const mid: Vec2 = {
      x: lerp(seg.start.x, seg.end.x, 0.5 + (Math.random() - 0.5) * 0.3),
      y: lerp(seg.start.y, seg.end.y, 0.5 + (Math.random() - 0.5) * 0.3),
    };
    results.push({ pos: mid, branch: seg });
  }
  for (const child of seg.children) {
    collectPoints(child, depth + 1, results);
  }
}

/* ─── Background neuron: very faint, breathing, organic ─── */
interface NeuronSeg {
  sx: number; sy: number;
  ex: number; ey: number;
  mx: number; my: number; // control point
  thickness: number;
  children: NeuronSeg[];
  seed: number; // for per-segment wobble
}

function buildNeuronDendrite(
  x: number, y: number,
  angle: number, length: number,
  thickness: number, depth: number,
): NeuronSeg {
  const ex = x + Math.cos(angle) * length;
  const ey = y + Math.sin(angle) * length;
  const mx = (x + ex) / 2 + Math.sin(angle + 1.5) * length * 0.15;
  const my = (y + ey) / 2 + Math.cos(angle + 1.5) * length * 0.15;
  const seg: NeuronSeg = { sx: x, sy: y, ex, ey, mx, my, thickness, children: [], seed: Math.random() * 100 };

  if (depth > 0 && length > 8) {
    const numSub = 2 + (depth > 2 ? 1 : 0);
    for (let i = 0; i < numSub; i++) {
      const spread = 0.4 + Math.random() * 0.4;
      const side = i % 2 === 0 ? 1 : -1;
      const subAngle = angle + side * spread;
      const subLen = length * (0.55 + Math.random() * 0.15);
      const t = 0.5 + Math.random() * 0.4;
      const bx = lerp(x, ex, t);
      const by = lerp(y, ey, t);
      seg.children.push(buildNeuronDendrite(bx, by, subAngle, subLen, thickness * 0.6, depth - 1));
    }
  }
  return seg;
}

function buildNeuronShape(scale: number): NeuronSeg[] {
  const roots: NeuronSeg[] = [];
  const dendrites = [
    { angle: -1.3, len: 180 * scale, depth: 4 },
    { angle: -0.6, len: 150 * scale, depth: 3 },
    { angle: -2.0, len: 160 * scale, depth: 4 },
    { angle: -2.6, len: 130 * scale, depth: 3 },
    { angle: 0.3, len: 140 * scale, depth: 3 },
    { angle: 0.9, len: 120 * scale, depth: 2 },
    { angle: 2.2, len: 100 * scale, depth: 2 },
    { angle: 1.6, len: 250 * scale, depth: 2 }, // axon
  ];
  for (const d of dendrites) {
    roots.push(buildNeuronDendrite(0, 0, d.angle, d.len, 2.5, d.depth));
  }
  return roots;
}

function drawNeuron(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, neuronSegs: NeuronSeg[]) {
  const cx = w * 0.35;
  const cy = h * 0.45;
  const breathe = 1 + Math.sin(time * 0.4) * 0.08;
  const drift = Math.sin(time * 0.15) * 12;

  ctx.save();
  ctx.translate(cx + drift, cy + Math.sin(time * 0.2) * 8);
  ctx.scale(breathe, breathe);

  // Soma glow
  ctx.globalAlpha = 0.04;
  const somaR = Math.min(w, h) * 0.04;
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, somaR * 2.5);
  grad.addColorStop(0, "#6A6494");
  grad.addColorStop(0.4, "#A290C0");
  grad.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.arc(0, 0, somaR * 2.5, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Draw dendrites
  ctx.globalAlpha = 0.035;
  function drawSeg(seg: NeuronSeg) {
    const wobble = Math.sin(time * 0.6 + seg.seed) * 3;
    ctx.beginPath();
    ctx.moveTo(seg.sx, seg.sy);
    ctx.quadraticCurveTo(seg.mx + wobble, seg.my + wobble * 0.7, seg.ex, seg.ey);
    ctx.strokeStyle = "#8BA3C4";
    ctx.lineWidth = seg.thickness;
    ctx.lineCap = "round";
    ctx.stroke();
    for (const child of seg.children) drawSeg(child);
  }
  for (const root of neuronSegs) drawSeg(root);

  ctx.restore();
}

/* ─── The canvas component ─── */
export default function InteractiveTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    tree: BranchSeg | null;
    dots: Dot[];
    whispers: WhisperChar[];
    neuron: NeuronSeg[];
    mousePos: Vec2;
    time: number;
    width: number;
    height: number;
    dpr: number;
  }>({
    tree: null,
    dots: [],
    whispers: [],
    neuron: [],
    mousePos: { x: -100, y: -100 },
    time: 0,
    width: 0,
    height: 0,
    dpr: 1,
  });

  const initTree = useCallback((w: number, h: number) => {
    const s = stateRef.current;
    // Build background neuron shape (pre-generated, stable)
    s.neuron = buildNeuronShape(w / 1200);

    // Trunk starts from bottom-right, grows toward upper-left
    const trunkStart: Vec2 = { x: w * 0.72, y: h * 0.95 };
    const trunkAngle = -Math.PI / 2 - 0.2 + (Math.random() - 0.5) * 0.1; // slightly left-leaning upward
    const trunkLen = h * 0.42;
    s.tree = buildBranch(trunkStart, trunkAngle, trunkLen, 14, 0, 6);

    // Collect branch points to place dots
    const points: { pos: Vec2; branch: BranchSeg }[] = [];
    collectPoints(s.tree, 0, points);

    // Pick ~22-28 dots (doubled from before)
    const count = 22 + Math.floor(Math.random() * 7);
    const shuffled = points.sort(() => Math.random() - 0.5).slice(0, count);
    s.dots = shuffled.map((ep, i) => ({
      pos: ep.pos,
      color: BRAND_COLORS[i % BRAND_COLORS.length],
      radius: 3.5 + Math.random() * 3,
      branch: ep.branch,
      growBranches: [],
      growProgress: 0,
      locked: false,
      hovered: false,
      char: Math.random() > 0.65 ? WHISPER_CHARS[Math.floor(Math.random() * WHISPER_CHARS.length)] : undefined,
    }));

    // Scatter whisper characters along branches
    s.whispers = [];
    const allSegs: BranchSeg[] = [];
    function flattenSegs(seg: BranchSeg) {
      allSegs.push(seg);
      seg.children.forEach(flattenSegs);
    }
    flattenSegs(s.tree);

    for (let i = 0; i < 24; i++) {
      const seg = allSegs[Math.floor(Math.random() * allSegs.length)];
      const t = 0.2 + Math.random() * 0.6;
      const pos: Vec2 = {
        x: lerp(seg.start.x, seg.end.x, t) + (Math.random() - 0.5) * 25,
        y: lerp(seg.start.y, seg.end.y, t) + (Math.random() - 0.5) * 25,
      };
      s.whispers.push({
        pos,
        char: WHISPER_CHARS[Math.floor(Math.random() * WHISPER_CHARS.length)],
        opacity: 0.05 + Math.random() * 0.09,
        size: 9 + Math.random() * 8,
        angle: (Math.random() - 0.5) * 0.3,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = stateRef.current;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      s.dpr = window.devicePixelRatio || 1;
      s.width = rect.width;
      s.height = rect.height;
      canvas!.width = rect.width * s.dpr;
      canvas!.height = rect.height * s.dpr;
      ctx!.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      initTree(s.width, s.height);
    }

    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      s.mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      for (const dot of s.dots) {
        const dx = s.mousePos.x - dot.pos.x;
        const dy = s.mousePos.y - dot.pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const wasHovered = dot.hovered;
        dot.hovered = dist < dot.radius + 12;

        if (dot.hovered && !wasHovered && dot.growBranches.length === 0) {
          dot.growBranches = buildGrowBranch(dot.pos, dot.color);
        }
      }
    }

    function onClick() {
      for (const dot of s.dots) {
        if (dot.hovered) {
          dot.locked = true;
        }
      }
    }

    canvas!.addEventListener("mousemove", onMouseMove);
    canvas!.addEventListener("click", onClick);

    let raf: number;
    function draw() {
      s.time += 0.016;
      const w = s.width;
      const h = s.height;

      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = "#F7F4EF";
      ctx!.fillRect(0, 0, w, h);

      if (!s.tree) { raf = requestAnimationFrame(draw); return; }

      // ─── Background neuron: breathing, drifting organic shape ───
      drawNeuron(ctx!, w, h, s.time, s.neuron);

      function windOffset(x: number, y: number, depth: number): number {
        return Math.sin(s.time * 1.2 + x * 0.005 + depth * 0.7) * (1.5 + depth * 1.2)
          + Math.sin(s.time * 0.7 + y * 0.003) * 1.2;
      }

      // Draw whisper characters
      for (const wh of s.whispers) {
        const wx = wh.pos.x + windOffset(wh.pos.x, wh.pos.y, 3) * 0.4;
        ctx!.save();
        ctx!.translate(wx, wh.pos.y);
        ctx!.rotate(wh.angle);
        ctx!.font = `${wh.size}px 'Courier New', monospace`;
        ctx!.fillStyle = `rgba(10, 80, 104, ${wh.opacity})`;
        ctx!.textAlign = "center";
        ctx!.fillText(wh.char, 0, 0);
        ctx!.restore();
      }

      // Draw tree with wind — thicker trunk with organic variation
      function drawBranch(seg: BranchSeg, parentWindX: number) {
        const windX = windOffset(seg.start.x, seg.start.y, seg.depth);
        const startX = seg.start.x + parentWindX;
        const endX = seg.end.x + windX;
        const startY = seg.start.y;
        const endY = seg.end.y;

        // Draw with tapering: thick at start, thinner at end
        const startThick = seg.thickness;
        const endThick = seg.thickness * (seg.depth < 2 ? 0.7 : 0.6);

        ctx!.beginPath();
        ctx!.moveTo(startX, startY);
        const midX = (startX + endX) / 2 + windX * 0.3;
        const midY = (startY + endY) / 2;
        ctx!.quadraticCurveTo(midX, midY, endX, endY);

        const alpha = Math.max(0.12, 0.55 - seg.depth * 0.07);
        ctx!.strokeStyle = `rgba(10, 80, 104, ${alpha})`;
        // Use average of start/end thickness for the stroke
        ctx!.lineWidth = Math.max(0.5, (startThick + endThick) / 2);
        ctx!.lineCap = "round";
        ctx!.stroke();

        // For thick trunk segments, draw a second slightly offset stroke for organic feel
        if (seg.thickness > 6) {
          ctx!.beginPath();
          ctx!.moveTo(startX + 1, startY);
          ctx!.quadraticCurveTo(midX + 1.5, midY - 1, endX + 0.5, endY);
          ctx!.strokeStyle = `rgba(10, 80, 104, ${alpha * 0.4})`;
          ctx!.lineWidth = seg.thickness * 0.4;
          ctx!.stroke();
        }

        for (const child of seg.children) {
          drawBranch(child, windX);
        }
      }

      drawBranch(s.tree, 0);

      // Dots and grow branches
      for (const dot of s.dots) {
        if (dot.hovered || dot.locked) {
          dot.growProgress = Math.min(1, dot.growProgress + 0.04);
        } else {
          dot.growProgress = Math.max(0, dot.growProgress - 0.03);
        }

        if (dot.growProgress > 0 && dot.growBranches.length > 0) {
          const color = (dot.growBranches as any)._color || dot.color;
          drawGrowBranches(dot.growBranches, dot.growProgress, color, dot.pos);
        }

        const windX = windOffset(dot.pos.x, dot.pos.y, 3);
        const dx = dot.pos.x + windX;

        if (dot.hovered || dot.locked) {
          ctx!.beginPath();
          ctx!.arc(dx, dot.pos.y, dot.radius + 8, 0, Math.PI * 2);
          ctx!.fillStyle = dot.color + "20";
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(dx, dot.pos.y, dot.radius, 0, Math.PI * 2);
        ctx!.fillStyle = dot.color;
        ctx!.fill();

        if (dot.char) {
          ctx!.save();
          ctx!.font = "9px 'Courier New', monospace";
          ctx!.fillStyle = dot.color + "40";
          ctx!.textAlign = "left";
          ctx!.fillText(dot.char, dx + dot.radius + 4, dot.pos.y + 3);
          ctx!.restore();
        }
      }

      function drawGrowBranches(branches: BranchSeg[], progress: number, color: string, origin: Vec2) {
        const windX = windOffset(origin.x, origin.y, 3);

        function drawSeg(seg: BranchSeg, depthProgress: number) {
          if (depthProgress <= 0) return;
          const p = Math.min(1, depthProgress);

          const sx = seg.start.x + windX;
          const ex = lerp(seg.start.x, seg.end.x, p) + windX;
          const sy = seg.start.y;
          const ey = lerp(seg.start.y, seg.end.y, p);

          ctx!.beginPath();
          ctx!.moveTo(sx, sy);
          ctx!.lineTo(ex, ey);
          ctx!.strokeStyle = color + "90";
          ctx!.lineWidth = Math.max(0.5, seg.thickness * p);
          ctx!.lineCap = "round";
          ctx!.stroke();

          for (const child of seg.children) {
            drawSeg(child, depthProgress - 0.4);
          }
        }

        for (const branch of branches) {
          drawSeg(branch, progress * 2);
        }
      }

      // Bottom-left text — smaller, understated
      ctx!.save();
      const fontSize = Math.min(22, Math.max(14, w * 0.018));
      ctx!.font = `300 ${fontSize}px 'Bitter', serif`;
      ctx!.fillStyle = "rgba(26, 26, 26, 0.4)";
      ctx!.textAlign = "left";
      ctx!.fillText("Embrace happy little accidents", w * 0.04, h * 0.92);

      ctx!.font = `italic ${Math.max(9, fontSize * 0.55)}px 'Lato', sans-serif`;
      ctx!.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx!.fillText("Inspired by Bob Ross", w * 0.04, h * 0.92 + fontSize + 4);
      ctx!.restore();

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas!.removeEventListener("mousemove", onMouseMove);
      canvas!.removeEventListener("click", onClick);
    };
  }, [initTree]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-screen block"
      style={{ cursor: "crosshair" }}
    />
  );
}
