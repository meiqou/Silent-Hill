import { useEffect, useRef } from 'react';
import { mouse, fine, reduced } from '../lib';

// Flickering light + canvas ash trail (capped at 150 particles). Touch devices get a tap ripple instead.
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
    let raf, lx = 0, ly = 0;
    const size = () => { c.width = innerWidth; c.height = innerHeight; };
    size();
    const move = (e) => {
      mouse.vx = e.clientX - mouse.x; mouse.vy = e.clientY - mouse.y; mouse.x = e.clientX; mouse.y = e.clientY;
      const t = e.target.closest?.('a,button,input,[data-danger]');
      lt.current.dataset.mode = t ? (t.dataset.danger !== undefined ? 'danger' : 'link') : '';
    };
    const tick = () => {
      lx += (mouse.x - lx) * .2; ly += (mouse.y - ly) * .2;
      lt.current.style.transform = `translate3d(${lx}px,${ly}px,0)`;
      x.clearRect(0, 0, c.width, c.height);
      if (!still) {
        const n = Math.min(3, (Math.hypot(mouse.vx, mouse.vy) / 10) | 0); // amount tied to speed
        for (let i = 0; i < n && P.length < 150; i++)
          P.push({ x: mouse.x, y: mouse.y, vx: Math.random() - .5, vy: -Math.random() - .3, l: 1, r: 1 + Math.random() * 3, e: Math.random() < .3 });
        mouse.vx *= .8; mouse.vy *= .8;
        for (let i = P.length; i--;) {
          const p = P[i]; p.x += p.vx + Math.sin(p.y * .02) * .3; p.y += p.vy; p.l -= .012;
          if (p.l <= 0) { P.splice(i, 1); continue; }
          x.fillStyle = p.e ? `rgba(201,138,43,${p.l * .6})` : `rgba(154,161,156,${p.l * .35})`;
          x.beginPath(); x.arc(p.x, p.y, p.r * (2 - p.l), 0, 6.3); x.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    addEventListener('pointermove', move); addEventListener('resize', size);
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); removeEventListener('resize', size); };
  }, []);
  return (<>
    <canvas ref={cv} className="trail" aria-hidden="true" />
    <div ref={lt} className="cursor" aria-hidden="true"><i /></div>
  </>);
}
