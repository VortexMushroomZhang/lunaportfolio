import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Work", path: "/work" },
  { label: "Exploration", path: "/exploration" },
  { label: "About", path: "/about" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const isHomePage = location === "/";

  useEffect(() => {
    if (!isHomePage) {
      setScrolledPastHero(true);
      return;
    }
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  const onDark = isHomePage && !scrolledPastHero;

  return (
    <nav
      data-testid="nav-main"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-14 py-3"
    >
      <Link href="/" data-testid="link-home-logo">
        <span
          className="font-sans font-black text-sm tracking-wide uppercase transition-colors duration-500"
          style={{
            color: onDark ? "rgba(255,255,255,0.92)" : "#1a1a1a",
            letterSpacing: "0.04em",
          }}
        >
          XUMENG ZHANG
        </span>
      </Link>

      <div
        className="flex items-center gap-0 rounded-full px-1 py-1 transition-all duration-500"
        style={{
          background: onDark ? "rgba(255,255,255,0.1)" : "rgba(247,244,239,0.9)",
          backdropFilter: "blur(14px)",
          border: onDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <span
                data-testid={`link-nav-${item.label.toLowerCase()}`}
                className="nav-pill px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 inline-block select-none"
                style={{
                  color: onDark
                    ? isActive ? "#ffffff" : "rgba(255,255,255,0.6)"
                    : isActive ? "#1a1a1a" : "rgba(0,0,0,0.45)",
                  background: isActive
                    ? onDark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.85)"
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
