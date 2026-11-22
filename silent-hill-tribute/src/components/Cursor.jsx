import { useEffect, useRef } from 'react';
import { mouse, fine, reduced } from '../lib';

// Lightweight cursor + capped particle trail (throttled) for performance.
export default function Cursor() {
  const cv = useRef(), lt = useRef();
  useEffect(() => {
    if (!fine()) {
      const tap = (e) => {
        const d = document.createElement('div');
        d.className = 'ripple'; d.style.left = e.clientX - 30 + 'px'; d.style.top = e.clientY - 30 + 'px';
        document.body.append(d);
        d.animate([{ transform: 'scale(.2)', opacity: .7 }, { transform: 'scale(4)', opacity: 0 }], { duration: 1400, easing: 'ease-out' }).onfinish = () => d.remove();
      };
      addEventListener('pointerdown', tap);
      return () => removeEventListener('pointerdown', tap);
    }
    const c = cv.current, x = c.getContext('2d'), P = [], still = reduced();
    let raf, lx = 0, ly = 0, last = 0;
    const size = () => { c.width = innerWidth; c.height = innerHeight; };
    size();
    const move = (e) => {
      mouse.vx = e.clientX - mouse.x; mouse.vy = e.clientY - mouse.y; mouse.x = e.clientX; mouse.y = e.clientY;
      const t = e.target.closest?.('a,button,input,[data-danger]');
      lt.current.dataset.mode = t ? (t.dataset.danger !== undefined ? 'danger' : 'link') : '';
    };
    const tick = (ts) => {
      raf = requestAnimationFrame(tick);
      last = ts;
      lx = mouse.x; ly = mouse.y;
      lt.current.style.transform = `translate3d(${lx}px,${ly}px,0)`;
      x.clearRect(0, 0, c.width, c.height);
      if (!still) {
        const speed = Math.hypot(mouse.vx, mouse.vy);
        if (speed > 2 && P.length < 40) P.push({ x: mouse.x, y: mouse.y, vx: (Math.random() - .5) * .6, vy: -Math.random() - .2, l: 1, r: 1 + Math.random() * 2.5, e: Math.random() < .25 });
        mouse.vx *= .7; mouse.vy *= .7;
        for (let i = P.length; i--;) {
          const p = P[i]; p.x += p.vx; p.y += p.vy; p.l -= .03;
          if (p.l <= 0) { P.splice(i, 1); continue; }
          x.fillStyle = p.e ? `rgba(201,138,43,${p.l * .5})` : `rgba(154,161,156,${p.l * .28})`;
          x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.3); x.fill();
        }
      }
    };
    raf = requestAnimationFrame(tick);
    addEventListener('pointermove', move); addEventListener('resize', size);
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); removeEventListener('resize', size); };
  }, []);
  return (<>
    <canvas ref={cv} className="trail" aria-hidden="true" />
    <div ref={lt} className="cursor" aria-hidden="true"><i /></div>
  </>);
}
