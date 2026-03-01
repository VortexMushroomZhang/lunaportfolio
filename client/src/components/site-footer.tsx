export default function SiteFooter() {
  return (
    <footer
      data-testid="section-footer"
      className="relative overflow-hidden"
      style={{ background: "#F7F4EF" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />
        <div className="absolute top-0 bottom-0 left-1/4 w-px" style={{ background: "rgba(0,0,0,0.03)" }} />
        <div className="absolute top-0 bottom-0 left-1/2 w-px" style={{ background: "rgba(0,0,0,0.03)" }} />
        <div className="absolute top-0 bottom-0 left-3/4 w-px" style={{ background: "rgba(0,0,0,0.03)" }} />
      </div>

      <div className="relative z-10 px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="pt-16 pb-8">
          <div className="flex items-end justify-between gap-8 flex-wrap mb-12">
            <div className="flex-1 min-w-[200px]">
              <p className="font-sans text-xs mb-1" style={{ color: "rgba(0,0,0,0.35)" }}>
                Currently based in
              </p>
              <p className="font-sans text-sm font-medium" style={{ color: "#1a1a1a" }}>
                Amsterdam, NL & Paris, FR
              </p>
            </div>
            <div className="flex-1 min-w-[200px]">
              <p className="font-sans text-xs mb-1" style={{ color: "rgba(0,0,0,0.35)" }}>
                Currently working in
              </p>
              <p className="font-sans text-sm font-medium" style={{ color: "#1a1a1a" }}>
                Finance sector
              </p>
            </div>
            <div className="flex-1 min-w-[200px] text-right">
              <p className="font-sans text-xs mb-1" style={{ color: "rgba(0,0,0,0.35)" }}>
                Contact me at
              </p>
              <div className="flex items-center justify-end gap-5">
                <a
                  href="https://www.linkedin.com/in/xumeng-zhang/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-link-linkedin"
                  className="font-sans text-sm font-medium inline-flex items-center gap-1.5 group"
                  style={{ color: "#1a1a1a" }}
                >
                  <span className="no-underline group-hover:underline group-hover:underline-offset-2 transition-all decoration-current">
                    LinkedIn
                  </span>
                  <span
                    className="inline-flex items-center justify-center text-[14px] leading-none font-bold transition-transform duration-200 -rotate-45 group-hover:rotate-0"
                    style={{ width: "1em", height: "1em" }}
                  >
                    &#8594;
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/luna_in_kitchen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-link-instagram"
                  className="font-sans text-sm font-medium inline-flex items-center gap-1.5 group"
                  style={{ color: "#8B6F5E" }}
                >
                  <span className="no-underline group-hover:underline group-hover:underline-offset-2 transition-all decoration-current">
                    CookingInstagram
                  </span>
                  <span
                    className="inline-flex items-center justify-center text-[14px] leading-none font-bold transition-transform duration-200 -rotate-45 group-hover:rotate-0"
                    style={{ width: "1em", height: "1em" }}
                  >
                    &#8594;
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="font-sans text-xs mb-4" style={{ color: "rgba(0,0,0,0.3)" }}>
              &copy;2026 Xumeng (Luna) Zhang
            </p>
          </div>
        </div>

        <div className="pb-8 overflow-hidden">
          <h2
            className="font-black text-[8vw] md:text-[9vw] lg:text-[10vw] leading-none tracking-tight text-center uppercase select-none"
            style={{ color: "rgba(180,195,210,0.18)", fontFamily: "'Lato', sans-serif" }}
            data-testid="footer-big-name"
          >
            LUNAZHANG
          </h2>
        </div>
      </div>
    </footer>
  );
}
