import { motion } from 'framer-motion';
import Fog from './Fog';
import Sigil from './Sigil';

export default function Hero() {
  return (
    <section id="top" className="relative grid h-screen place-items-center overflow-hidden text-center" aria-label="Introduction">
      {/* SVG filter: noise-driven displacement, pulses to produce a rare glitch */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <filter id="glitch">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="0">
            <animate attributeName="scale" values="0;0;0;14;0;0;22;0" dur="5s" repeatCount="indefinite" />
          </feDisplacementMap>
        </filter>
      </svg>
      <Sigil /><Fog n={3} />
      <div className="relative">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3, delay: 3 }}
          className="glitch font-wide text-[clamp(4rem,16vw,12rem)] leading-none tracking-[.08em] text-bone">SILENT HILL</motion.h1>
        <p className="mt-4 tracking-[.5em] text-fog">A FAN-MADE WEBSITE</p>
      </div>
      <a href="#portal" className="pulse absolute bottom-8 text-sm tracking-widest text-fog" aria-label="Scroll down">SCROLL ↓</a>
    </section>
  );
}
