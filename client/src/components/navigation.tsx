import { Link, useLocation } from "wouter";

const navItems = [
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 lg:px-16 py-5"
    >
      <Link href="/" data-testid="link-home-logo">
        <span
          className="font-sans font-black text-base tracking-wide uppercase"
          style={{
            color: isHeroPage ? "rgba(255,255,255,0.92)" : "hsl(var(--foreground))",
            letterSpacing: "0.04em",
          }}
        >
          XUMENG ZHANG
        </span>
      </Link>

      <div
        className="flex items-center gap-0 rounded-full px-1 py-1"
        style={{
          background: isHeroPage ? "rgba(255,255,255,0.1)" : "hsl(var(--muted))",
          backdropFilter: isHeroPage ? "blur(12px)" : undefined,
          border: isHeroPage ? "1px solid rgba(255,255,255,0.08)" : "1px solid hsl(var(--border))",
        }}
      >
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <span
                data-testid={`link-nav-${item.label.toLowerCase()}`}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 inline-block"
                style={{
                  color: isHeroPage
                    ? isActive ? "#ffffff" : "rgba(255,255,255,0.6)"
                    : isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  background: isActive
                    ? isHeroPage ? "rgba(255,255,255,0.12)" : "hsl(var(--background))"
                    : "transparent",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
