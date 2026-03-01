import RaindropCanvas from "@/components/raindrop-canvas";
import Navigation from "@/components/navigation";

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="page-home">
      <section
        className="relative w-full h-screen overflow-hidden"
        data-testid="section-hero"
      >
        <RaindropCanvas />

        <Navigation />

        <div className="absolute inset-0 z-10 flex flex-col items-start justify-end pointer-events-none px-8 pb-16 md:px-16 md:pb-20 lg:px-24 lg:pb-24">
          <div className="max-w-3xl pointer-events-auto">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.5)" }}
              data-testid="text-hero-eyebrow"
            >
              Product Designer & Builder
            </p>
            <h1
              className="font-serif font-light text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
              style={{ color: "rgba(255,255,255,0.95)" }}
              data-testid="text-hero-title"
            >
              Building products that{" "}
              <span style={{ color: "#0D9488" }}>feel right</span>
              <br />
              and{" "}
              <span style={{ color: "#8B5E3C" }}>tell stories</span>
            </h1>
            <p
              className="font-sans text-base md:text-lg leading-relaxed max-w-xl mb-8"
              style={{ color: "rgba(255,255,255,0.6)" }}
              data-testid="text-hero-description"
            >
              I design and build digital products with a warm, data-driven
              approach. Every detail is intentional, every interaction meaningful.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#work"
                data-testid="button-view-work"
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200"
                style={{
                  background: "#0D9488",
                  color: "#ffffff",
                }}
              >
                View My Work
              </a>
              <a
                href="#about"
                data-testid="button-learn-more"
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Learn More
              </a>
            </div>
          </div>

          <div
            className="absolute bottom-8 right-8 md:right-16 lg:right-24 pointer-events-auto"
            data-testid="text-hero-hint"
          >
            <p
              className="font-mono text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Move your cursor to collect rain
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
