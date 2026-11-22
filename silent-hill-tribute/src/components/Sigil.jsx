import { useEffect, useRef } from 'react';
import { reduced } from '../lib';

// Original sigil drawn on canvas; throttled animation for performance.
export default function Sigil() {
  const ref = useRef();
  useEffect(() => {
    const x = ref.current.getContext('2d'); let raf, t = 0, last = 0;
    const draw = () => {
      x.clearRect(0, 0, 400, 400); x.save();
      x.translate(200, 200); x.rotate(t);
      const s = 1 + .06 * Math.sin(t * 5); x.scale(s, s);
      x.strokeStyle = 'rgba(138,47,20,.55)'; x.lineWidth = 2; x.beginPath();
      x.arc(0, 0, 150, 0, 6.3); x.moveTo(110, 0); x.arc(0, 0, 110, 0, 6.3);
      for (let i = 0; i < 4; i++) { x.moveTo(0, 0); x.lineTo(0, -150); x.rotate(Math.PI / 2); }
      x.stroke(); x.restore();
    };
    const loop = (ts) => {
      raf = requestAnimationFrame(loop);
      last = ts;
      t += reduced() ? 0 : .008;
      draw();
    };
    draw();
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} width="400" height="400" className="absolute left-1/2 top-1/2 w-[min(80vw,520px)] -translate-x-1/2 -translate-y-1/2 opacity-70" aria-hidden="true" />;
}
