export default function BackgroundGrid() {
  const LINE_COLOR = "rgba(0,0,0,0.04)";

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none"
      style={{ zIndex: 0 }}
      data-testid="background-grid"
    >
      <div
        className="max-w-6xl mx-auto h-full relative"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i / 5) * 100}%`,
              background: LINE_COLOR,
            }}
          />
        ))}
      </div>
    </div>
  );
}
