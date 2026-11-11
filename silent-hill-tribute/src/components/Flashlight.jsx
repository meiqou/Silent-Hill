import { useEffect, useRef } from 'react';
import { fine, reduced } from '../lib';

// Hidden text is real DOM text, visually masked by a radial gradient that follows the pointer.
export default function Flashlight() {
  const r = useRef();
  useEffect(() => {
    const el = r.current;
    const set = (x, y) => { el.style.setProperty('--fx', x + 'px'); el.style.setProperty('--fy', y + 'px'); };
    const mv = (e) => { const b = el.getBoundingClientRect(); set(e.clientX - b.left, e.clientY - b.top); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerdown', mv);
    let raf;
    if (reduced()) el.classList.add('lit');
    else if (!fine()) { // touch fallback: slow automatic sweep (tap also repositions)
      const sweep = (t) => { set(el.clientWidth * (.5 + .35 * Math.sin(t / 1500)), el.clientHeight * (.5 + .3 * Math.sin(t / 2300))); raf = requestAnimationFrame(sweep); };
      raf = requestAnimationFrame(sweep);
    }
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerdown', mv); };
  }, []);
  return (
    <section ref={r} className="relative grid min-h-screen place-items-center bg-[#1b201f] px-6" aria-label="The Cellar">
      <div className="reveal absolute inset-0 grid place-items-center px-6 text-center">
        <p className="max-w-xl font-display text-4xl tracking-wide text-bone md:text-6xl">
          Room 312. The dust is thick, but the TV is plugged in, and the videotape is waiting to play the past you tried to bury.
        </p>
      </div>
      <p className="absolute bottom-10 text-sm text-fog">It is too dark to read. Move the light.</p>
    </section>
  );
}
