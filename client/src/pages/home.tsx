import RaindropCanvas from "@/components/raindrop-canvas";
import Navigation from "@/components/navigation";
import TypewriterBanner from "@/components/typewriter-banner";

export default function Home() {
  return (
    <div data-testid="page-home">
      <section
        className="relative w-full h-screen overflow-hidden"
        data-testid="section-hero"
        style={{ cursor: "none" }}
      >
        <RaindropCanvas />

        <Navigation />

        <div className="absolute inset-0 z-10 flex items-center pointer-events-none px-8 md:px-12 lg:px-16">
          <TypewriterBanner />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none px-8 md:px-12 lg:px-16 pb-8">
          <div
            className="flex items-end justify-between gap-8 flex-wrap pointer-events-auto"
            data-testid="section-hero-footer"
          >
            <div className="flex-1 min-w-[200px]" data-testid="info-location">
              <p
                className="font-sans text-xs mb-1"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Currently based in
              </p>
              <p
                className="font-sans text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Amsterdam, NL & Paris, FR
              </p>
            </div>

            <div className="flex-1 min-w-[200px]" data-testid="info-work">
              <p
                className="font-sans text-xs mb-1"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Currently working in
              </p>
              <p
                className="font-sans text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Finance sector
              </p>
            </div>

            <div className="flex-1 min-w-[200px] text-right" data-testid="info-contact">
              <p
                className="font-sans text-xs mb-1"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Contact me at
              </p>
              <div className="flex items-center justify-end gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-linkedin"
                  className="font-sans text-sm font-medium inline-flex items-center gap-1"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  LinkedIn
                  <span style={{ fontSize: "10px" }}>&#8599;</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-instagram"
                  className="font-sans text-sm font-medium inline-flex items-center gap-1"
                  style={{ color: "rgba(180,170,210,0.75)" }}
                >
                  CookingInstagram
                  <span style={{ fontSize: "10px" }}>&#8599;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="min-h-screen bg-white dark:bg-neutral-950 px-8 md:px-12 lg:px-16 py-24"
        data-testid="section-content"
      >
        <div className="max-w-4xl">
          <h2
            className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-6"
            style={{ color: "hsl(var(--foreground))" }}
            data-testid="text-content-heading"
          >
            Selected Work
          </h2>
          <p
            className="font-sans text-lg leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))" }}
            data-testid="text-content-description"
          >
            More coming soon.
          </p>
        </div>
      </section>
    </div>
  );
}
