import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { reduced, seen } from '../lib';

// Original line-art only.
const E = [
  ['The Alley', 'M30 90V20h40v70M30 20l20-12 20 12M58 55h4', 'A narrow, inescapable threshold trapping you inside the thick, suffocating fog.'],
  ['The Flashlight', 'M22 35h42l16 15-16 15H22zM64 35v30M80 50h14', 'It flickers when something is close.'],
  ['The Letter', 'M25 12h42l12 12v64H25zM67 12v14h12M35 42c8-8 12 8 20 0s12 8 18 0M35 55c8-8 12 8 20 0s12 8 18 0M35 68h24', "Written in handwriting that shouldn't exist anymore."],
  ['The Pyramid', 'M50 10L18 76h64L50 10zM30 55h40M36 67h28M40 43h20', 'A heavy helmet dragging across the floor.'],
  ['The Radio', 'M20 35h60v48H20zM28 35l42-22M30 50h20v20H30zM60 52h12M60 62h12M60 72h12', 'Screeching static when something inhuman is near.'],
  ['The Videotape', 'M15 20h70v60H15zM24 28h52v35H24zM34 72h32M40 63v9M60 63v9', 'Playing the undeniable truth on a television screen.'],
];

function Card({ c, i }) {
  const [flipped, setFlipped] = useState(false);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 15 }), sy = useSpring(ry, { stiffness: 120, damping: 15 });
  const move = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - b.left) / b.width - .5) * 16); rx.set(-((e.clientY - b.top) / b.height - .5) * 16);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    // li = Framer pop-in (scale/opacity); button = 3D tilt. Separate elements.
    <motion.li initial={{ scale: .8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 100, delay: (i % 3) * .12 }} style={{ perspective: 800 }}>
      <motion.button type="button" aria-pressed={flipped} aria-label={`${c[0]}: ${flipped ? 'hide' : 'reveal'} description`}
        onClick={() => setFlipped((value) => !value)} onPointerMove={move} onPointerLeave={reset}
        onPointerEnter={() => seen(c[0])} onFocus={() => seen(c[0])}
        style={{ rotateX: sx, rotateY: sy }} whileTap={{ scale: .98 }}
        className="h-full w-full border border-fog/30 bg-ink/70 p-6 text-center transition hover:border-amber hover:shadow-[0_0_28px_#c98a2b66] focus-visible:border-amber">
        <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: reduced() ? 0 : .65, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }} className="relative grid min-h-64 place-items-center">
          <div aria-hidden={flipped} className="flex flex-col items-center" style={{ backfaceVisibility: 'hidden' }}>
            <svg viewBox="0 0 100 100" className="mx-auto mb-4 h-28 text-rust" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d={c[1]} /></svg>
            <h3 className="font-display text-3xl tracking-widest">{c[0]}</h3>
            <p className="mt-4 text-xs tracking-widest text-fog">CLICK TO REVEAL</p>
          </div>
          <div aria-hidden={!flipped} className="absolute inset-0 flex flex-col items-center justify-center px-2" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
            <h3 className="font-display text-3xl tracking-widest">{c[0]}</h3>
            <p className="mt-4 text-fog">{c[2]}</p>
            <p className="mt-6 text-xs tracking-widest text-fog">CLICK TO RETURN</p>
          </div>
        </motion.div>
      </motion.button>
    </motion.li>
  );
}

export default function Echoes() {
  return (
    <section id="echoes" className="mx-auto max-w-6xl px-6 py-16 md:py-20" aria-label="Echoes">
      <h2 className="mb-8 text-center font-display text-5xl tracking-widest md:mb-10 md:text-6xl">ECHOES</h2>
      <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">{E.map((c, i) => <Card key={c[0]} c={c} i={i} />)}</ul>
    </section>
  );
}
