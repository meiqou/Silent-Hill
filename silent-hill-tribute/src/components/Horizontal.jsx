import cemetery from '../assets/chapters/The Cemetery.webp';
import apartments from '../assets/chapters/Wood Side Apartments.webp';
import hospital from '../assets/chapters/Brookhaven Hospital.jpg';
import prison from '../assets/chapters/Toluca Prison.webp';
import hotel from '../assets/chapters/Lake View Hotel.webp';

const CH = [
  ['I', 'The Cemetery', 'Foggy graves where the dead wait.', cemetery],
  ['II', 'Wood Side Apartments', 'Dark rooms echoing with footsteps.', apartments],
  ['III', 'Brookhaven Hospital', 'White corridors hiding weeping medical staff.', hospital],
  ['IV', 'Toluca Prison', 'Underground cells built for silent suffering.', prison],
  ['V', 'Lakeview Hotel', 'A burned destination beside dark water.', hotel],
];

export default function Horizontal() {
  return (
    <section className="px-6 py-16 md:py-20" aria-labelledby="chapters-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 md:mb-10">
          <p className="mb-3 text-xs tracking-[0.35em] text-amber">THE JOURNEY</p>
          <h2 id="chapters-title" className="font-display text-5xl tracking-[0.08em] md:text-7xl">CHAPTERS</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {CH.map(([n, h, p, image]) => (
            <article key={n} className="relative isolate grid min-h-[26rem] place-items-center overflow-hidden border border-fog/20 px-6 py-12 text-center md:min-h-[32rem]">
              <img src={image} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/65" />
              <div className="max-w-full">
                <p className="text-amber">CHAPTER {n}</p>
                <h3 className="mx-auto max-w-full break-words font-display text-[clamp(2.5rem,7vw,5rem)] tracking-[0.08em]">{h}</h3>
                <p className="mx-auto mt-4 max-w-md text-fog">{p}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
