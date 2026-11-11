// Outer div = GSAP parallax (data-speed). Inner div = CSS drift. Separate elements, so transforms never collide.
export default function Fog({ n = 3 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {[...Array(n)].map((_, i) => (
        <div key={i} data-speed={(i + 1) * 60} className="absolute inset-0">
          <div className="fog" style={{ animationDuration: `${50 + i * 25}s`, top: `${i * 25}%` }} />
        </div>
      ))}
    </div>
  );
}
