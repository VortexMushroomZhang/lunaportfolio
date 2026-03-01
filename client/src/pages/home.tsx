import RaindropCanvas from "@/components/raindrop-canvas";
import Navigation from "@/components/navigation";
import TypewriterBanner from "@/components/typewriter-banner";

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="page-home" style={{ cursor: "none" }}>
      <section
        className="relative w-full h-screen overflow-hidden"
        data-testid="section-hero"
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
    </div>
  );
}
