import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { chapterVisited } from '../lib';
import cemetery from '../assets/images/The Cemetery.webp';
import apartments from '../assets/images/Wood Side Apartments.webp';
import hospital from '../assets/images/Brookhaven Hospital.jpg';
import prison from '../assets/images/Toluca Prison.webp';
import hotel from '../assets/images/Lake View Hotel.webp';

const CH = [
  ['I', 'The Cemetery', 'A foggy graveyard set the stage as the dead waits in the dark.', cemetery],
  ['II', 'Wood Side Apartments', 'An old apartment building traps visitors inside dark rooms filled with footsteps.', apartments],
  ['III', 'Brookhaven Hospital', 'White hospital hallways hides crying medical staff in the shadows.', hospital],
  ['IV', 'Toluca Prison', 'Underground prison cells reveals a place built for quiet suffering.', prison],
  ['V', 'Lakeview Hotel', 'The burned ruins of a hotel beside dark water serves as the final stop.', hotel],
];

export default function Horizontal() {
  const root = useRef(null);
  const [flipped, setFlipped] = useState(new Set());

  useEffect(() => {
    if (!root.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(root.current.querySelectorAll('.chapter-card'), {
        y: 60,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(root.current.querySelectorAll('.chapter-image'), {
        scale: 1.15,
        filter: 'brightness(0.5)',
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, root);
    CH.forEach(([n]) => chapterVisited(n));
    return () => ctx.revert();
  }, []);

  const toggle = (n) => {
    const next = new Set(flipped);
    if (next.has(n)) next.delete(n);
    else next.add(n);
    setFlipped(next);
  };

  return (
    <section ref={root} className="relative isolate px-6 py-20 md:py-28" aria-labelledby="chapters-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 md:mb-12 text-center">
          <p className="mb-3 text-xs tracking-[0.4em] text-amber uppercase">THE JOURNEY</p>
          <h2 id="chapters-title" className="font-display text-5xl tracking-[0.06em] md:text-7xl">CHAPTERS</h2>
          <div className="mt-4 w-16 h-[1px] bg-amber/30 mx-auto" />
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {CH.map(([n, h, p, image]) => (
            <article key={n} className="chapter-card relative isolate group min-h-[28rem] rounded-sm overflow-hidden border border-fog/15 bg-ink/40"
              onClick={() => toggle(n)}>
              <div className="flip-track relative w-full h-full perspective-1000 preserve-3d transition-transform duration-500 ease-in-out"
                style={{ transform: flipped.has(n) ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                <div className="flip-face absolute inset-0 backface-hidden z-10 p-6 md:p-8 h-full flex flex-col justify-between bg-ink/40 border border-fog/15 rounded-sm">
                  <div className="absolute inset-0 -z-10">
                    <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center opacity-50" />
                    <div className="absolute inset-0 bg-[#1b201f]/50" />
                  </div>
                  <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
                    <div>
                      <p className="mb-2 text-[0.6rem] tracking-[0.35em] text-amber uppercase">CHAPTER {n}</p>
                      <h3 className="font-display text-[clamp(2rem,6vw,3rem)] tracking-[0.06em] text-bone leading-tight">{h}</h3>
                    </div>
                    <p className="mt-4 text-[0.75rem] text-fog/60 text-center">CLICK TO REVEAL</p>
                  </div>
                </div>
                <div className="flip-face absolute inset-0 backface-hidden z-10 p-6 md:p-8 h-full flex flex-col justify-center items-center text-center bg-[#1b201f] border border-fog/15 rounded-sm transform rotate-y-180">
                  <div className="absolute inset-0 -z-10">
                    <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center opacity-70" />
                    <div className="absolute inset-0 bg-[#1b201f]/30" />
                  </div>
                  <div className="relative z-10 max-w-md px-4">
                    <p className="mb-3 text-[0.6rem] tracking-[0.35em] text-amber uppercase">CHAPTER {n}</p>
                    <h3 className="font-display text-2xl md:text-3xl tracking-[0.06em] text-bone leading-tight mb-4">{h}</h3>
                    <p className="text-base text-fog/90 leading-relaxed max-w-md mx-auto">{p}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
