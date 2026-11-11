import gsap from 'gsap';
import { reduced } from '../lib';

export default function Finale() {
  return (
    <footer className="grid min-h-screen place-items-center px-6 text-center" aria-label="Finale">
      <div>
        <p className="font-display text-5xl tracking-wide md:text-7xl">The fog is patient.</p>
        <button data-danger onClick={() => gsap.to(window, { scrollTo: 0, duration: reduced() ? 0 : 3, ease: 'power2.inOut' })}
          className="mt-10 border border-amber px-6 py-3 tracking-widest text-amber hover:bg-amber hover:text-ink" aria-label="Return to the fog, scroll to top">
          RETURN TO THE FOG
        </button>
        <p className="mt-8 text-sm"><a href="#/register" className="underline hover:text-amber">Register</a> · <a href="#/login" className="underline hover:text-amber">Sign in</a></p>
        <p className="mx-auto mt-16 max-w-md text-xs text-fog">A non-commercial fan-made website. Not affiliated with, or endorsed by, Konami. All visuals here are original.</p>
      </div>
    </footer>
  );
}
