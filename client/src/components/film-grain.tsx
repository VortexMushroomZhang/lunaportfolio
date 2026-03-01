import { useEffect, useRef } from "react";

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let intervalId: ReturnType<typeof setInterval>;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / 4);
      canvas.height = Math.ceil(window.innerHeight / 4);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const buf = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < buf.length; i++) {
        const v = (Math.random() * 255) | 0;
        buf[i] = (8 << 24) | (v << 16) | (v << 8) | v;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    draw();

    if (!prefersReduced) {
      intervalId = setInterval(draw, 300);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(intervalId);
      } else if (!prefersReduced) {
        intervalId = setInterval(draw, 300);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 9999, opacity: 0.7, mixBlendMode: "multiply" }}
      data-testid="film-grain-overlay"
    />
  );
}
