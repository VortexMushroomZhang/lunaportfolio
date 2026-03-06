import asciiArtPath from "@assets/ascii-art_1772393005204.png";

export default function SiteFooter() {
  return (
    <footer
      data-testid="section-footer"
      className="relative"
    >
      <div className="w-full" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="px-6 max-w-6xl mx-auto pt-16 pb-10">
          <div className="flex items-end justify-between gap-8 flex-wrap">
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
                  className="group font-sans text-sm font-medium inline-flex items-center gap-1.5"
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
                  className="group font-sans text-sm font-medium inline-flex items-center gap-1.5"
                  style={{ color: "#A290C0" }}
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
        </div>
      </div>

      <div className="w-full overflow-hidden" data-testid="footer-ascii-art">
        <p className="text-center font-sans text-xs pb-2" style={{ color: "rgba(0,0,0,0.3)" }}>
          &copy;2026 Xumeng (Luna) Zhang
        </p>
        <img
          src={asciiArtPath}
          alt="ASCII art landscape"
          className="w-full select-none pointer-events-none ascii-art-blend"
          style={{ opacity: 0.6 }}
          draggable={false}
        />
      </div>
    </footer>
  );
}
