import { motion } from 'framer-motion';
import Fog from './Fog';
import Sigil from './Sigil';
import ringsSvg from '../assets/svg/silent-hill-rings.svg';

export default function Hero() {
  return (
    <section id="top" className="relative grid h-screen place-items-center overflow-hidden text-center" aria-label="Introduction">
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <filter id="glitch">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="0">
            <animate attributeName="scale" values="0;0;0;14;0;0;22;0" dur="5s" repeatCount="indefinite" />
          </feDisplacementMap>
        </filter>
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" aria-hidden="true">
        <img src={ringsSvg} className="w-[min(60vw,40rem)] h-[min(60vw,40rem)]" alt="" aria-hidden="true" />
      </div>
      <Sigil /><Fog n={2} />
      <div className="relative">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3, delay: 3 }}
          className="glitch font-wide text-[clamp(4rem,16vw,12rem)] leading-none tracking-[.08em] text-bone">SILENT HILL</motion.h1>
        <p className="mt-4 tracking-[.5em] text-fog">A FAN-MADE WEBSITE</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href="register.html" className="border border-amber px-5 py-2 tracking-widest text-amber hover:bg-amber hover:text-ink">Create account</a>
          <a href="login.html" className="border border-fog/50 px-5 py-2 tracking-widest hover:text-amber">Sign in</a>
        </div>
      </div>
      <a href="#portal" className="pulse absolute bottom-8 text-sm tracking-widest text-fog" aria-label="Scroll down">SCROLL ↓</a>
    </section>
  );
}
