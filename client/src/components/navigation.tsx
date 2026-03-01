import { Link, useLocation } from "wouter";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/work" },
  { label: "Exploration", path: "/exploration" },
  { label: "About", path: "/about" },
];

export default function Navigation() {
  const [location] = useLocation();
  const isHeroPage = location === "/";

  return (
    <nav
      data-testid="nav-main"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{
        background: isHeroPage ? "transparent" : undefined,
      }}
    >
      <Link href="/" data-testid="link-home-logo">
        <span
          className="font-serif font-bold text-lg tracking-tight"
          style={{ color: isHeroPage ? "rgba(255,255,255,0.95)" : undefined }}
        >
          vortex<span style={{ color: "#E2C4D4" }}>mushroom</span>
        </span>
      </Link>

      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <span
                data-testid={`link-nav-${item.label.toLowerCase()}`}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  color: isHeroPage
                    ? isActive
                      ? "#ffffff"
                      : "rgba(255,255,255,0.65)"
                    : isActive
                      ? "hsl(var(--foreground))"
                      : "hsl(var(--muted-foreground))",
                  background: isActive
                    ? isHeroPage
                      ? "rgba(255,255,255,0.12)"
                      : "hsl(var(--accent))"
                    : "transparent",
                  backdropFilter: isActive && isHeroPage ? "blur(8px)" : undefined,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      <a
        href="mailto:hello@vortexmushroom.com"
        data-testid="link-contact"
        className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
        style={{
          color: isHeroPage ? "#ffffff" : "hsl(var(--primary-foreground))",
          background: isHeroPage ? "rgba(255,255,255,0.12)" : "hsl(var(--primary))",
          backdropFilter: isHeroPage ? "blur(8px)" : undefined,
          border: isHeroPage ? "1px solid rgba(255,255,255,0.15)" : "none",
        }}
      >
        Let's Talk
      </a>
    </nav>
  );
}
