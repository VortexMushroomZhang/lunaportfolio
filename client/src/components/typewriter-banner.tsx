import { useState, useEffect, useRef } from "react";

const ROLES = ["Product builder.", "Researcher.", "Designer."];
const TYPE_SPEED = 55;
const DELETE_SPEED = 30;
const PAUSE_AFTER_TYPE = 1600;
const PAUSE_AFTER_DELETE = 300;

export default function TypewriterBanner() {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, TYPE_SPEED);
      } else {
        timerRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPE);
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        timerRef.current = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % ROLES.length);
        }, PAUSE_AFTER_DELETE);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [displayed, isDeleting, roleIndex]);

  return (
    <div
      className="pointer-events-none select-none"
      data-testid="section-typewriter-banner"
    >
      <h1
        className="font-serif font-light text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight"
        style={{ color: "rgba(255,255,255,0.93)" }}
        data-testid="text-name"
      >
        Xumeng Zhang
      </h1>
      <div className="mt-2 flex items-baseline h-[1.4em] text-xl md:text-2xl lg:text-3xl">
        <span
          className="whitespace-pre"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontWeight: 600 }}
          data-testid="text-role"
        >
          {displayed || "\u200B"}
        </span>
        <span
          className="ml-0.5 inline-block w-[2px] h-[1.1em] align-baseline"
          style={{
            background: "rgba(255,255,255,0.55)",
            animation: "blink 1s step-end infinite",
          }}
          aria-hidden="true"
        />
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
