import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduced } from '../lib';
import Fog from './Fog';
import james from '../assets/gallery/james.png';
import mary from '../assets/gallery/mary.png';
import maria from '../assets/gallery/maria.png';
import angela from '../assets/gallery/angela.png';
import laura from '../assets/gallery/laura.png';
import eddie from '../assets/gallery/eddie.png';
import lyingFigure from '../assets/gallery/lying figure.png';
import creeper from '../assets/gallery/creeper.png';
import mandarin from '../assets/gallery/mandarin.png';
import nurse from '../assets/gallery/bubble head nurse.png';
import pyramidHead from '../assets/gallery/pyramnnid head.png';
import fleshLip from '../assets/gallery/flesh lip.png';
import mariaMonster from '../assets/gallery/mary monster.png';
import abstractDaddy from '../assets/gallery/abstract daddy.png';

const characters = [
  { name: 'James Sunderland', image: james, description: 'James Sunderland is the protagonist of Silent Hill 2. As the game begins, James remarks that his wife, Mary Shepherd-Sunderland, has been dead for three years. Regardless, he has received a mysterious letter in Mary’s handwriting, claiming that she is waiting for him in their "special place", somewhere in Silent Hill. When James arrives at the town, he becomes ensnared in a series of bizarre and nightmarish events which force him to question his sanity, morality, memory and personality.' },
  { name: 'Mary Shepherd-Sunderland', image: mary, description: 'Mary Shepherd-Sunderland is the late wife of James Sunderland. The couple had vacationed in Silent Hill a few years prior to the events of Silent Hill 2. Mary was a kind, sweet young woman who spent the last moments of her life in emotional turmoil, distress and anguish after being stricken with a terminal disease.' },
  { name: 'Maria', image: maria, description: 'Maria is a major character and arguably the primary antagonist of Silent Hill 2, while she serves as the protagonist of Silent Hill 2: Born from a Wish. In Silent Hill 2 Letter from Silent Heaven, she meets James Sunderland in Rosewater Park in Silent Hill, Maine, and stays with him sporadically after that. James must protect her, as Maria does not have any weapons to defend herself with, and it is game over if she dies.' },
  { name: 'Angela Orosco', image: angela, description: 'Angela Orosco is a character in Silent Hill 2. She is a young woman searching the town for her missing mother and crosses paths with James Sunderland multiple times. Throughout the course of the game, she is revealed to have had a traumatic past that has affected her personality and mental health deeply, especially regarding her relationship with her father, Thomas, and her brother.' },
  { name: 'Laura', image: laura, description: 'Laura is a young girl in Silent Hill 2 and is often seen wandering around Silent Hill, Maine. Like James Sunderland, she is also searching for Mary Shepherd-Sunderland and is unaware of her death because Laura misinterpreted Mary’s "I’m far away now. In a quiet, beautiful place in Mary’s" letter not as a peaceful afterlife, but Silent Hill.' },
  { name: 'Eddie Dombrowski', image: eddie, description: 'Eddie Dombrowski is a character from Silent Hill 2. He is an insecure, mentally disturbed, and severely bullied young man who is self-conscious about his weight and physical appearance after being laughed at and ridiculed his entire life.' },
];

const monsters = [
  { name: 'Lying Figure', image: lyingFigure, description: 'Lying Figures are humanoid monsters appearing in Silent Hill 2. It is the first creature that James Sunderland encounters in his journey through Silent Hill, Maine. They are a physical manifestation of the memory of his sick wife on her deathbed and his internal suffering, taking the appearance of a hospital patient writhing in agony.' },
  { name: 'Creeper', image: creeper, description: 'The Creeper is an insectoid monster appearing in Silent Hill and Silent Hill 2. A manifestation of Alessa Gillespie’s dislike of insects, they were encountered by Harry Mason when the town of Silent Hill was transfigured by her psychic powers. They are hostile to humans, moving with great speed and reacting strongly to light.' },
  { name: 'Mandarin', image: mandarin, description: 'Mandarins are creatures appearing in Silent Hill 2. They are manifestations of James Sunderland’s subconscious thoughts, representing anguish and memories of his wife during her illness.' },
  { name: 'Bubble Head Nurse', image: nurse, description: 'Bubble Head Nurses are monsters appearing in Silent Hill 2, the spin-offs Silent Hill: The Escape and Silent Hill: Book of Memories, and in Bloober Team’s Silent Hill 2. A manifestation of James Sunderland’s subconscious, they were first encountered when James Sunderland entered Brookhaven Hospital after coming to Silent Hill, Maine, in search of his deceased wife. They can be seen both in the hospital and the streets of South Vale.' },
  { name: 'Pyramid Head', image: pyramidHead, description: 'Pyramid Head, is a humanoid monster in the Silent Hill franchise first appearing in Silent Hill 2. His red helmet and butcher’s attire echo the executioners of the town’s past, who worshipped the angel of rebirth Valtiel. He is a manifestation of James Sunderland’s guilt and desire for punishment, existing to keep him human and help him remember his past actions. The monster wields the Great Knife and the Great Spear, instruments of James’ inner torment.' },
  { name: 'Flesh Lip', image: fleshLip, description: 'Flesh Lip is a monster appearing in Silent Hill 2. It is a manifestation of James Sunderland’s subconscious thoughts, representing the memory of his wife in her sick bed. Creature designer Masahiro Ito created the design and animations, taking inspiration from Isamu Noguchi’s statue "Death (Lynched Figure)" and the photograph "Man with No Legs" by Joel-Peter Witkin.' },
  { name: 'Mary Monster', image: mariaMonster, description: 'Mary is the final boss of Silent Hill 2 and is encountered after climbing a metal stairwell at the end of the Fog World Lakeview Hotel. James Sunderland encounters either a manifestation of Mary Shepherd-Sunderland or Maria in the form of Mary in the game’s final scenes, depending on the player’s actions throughout the game' },
  { name: 'Abstract Daddy', image: abstractDaddy, description: 'Abstract Daddy is a monster appearing in Silent Hill 2. It is first encountered as a boss fight in the Labyrinth, later resurfacing as a less durable enemy type in the hallways of the Lakeview Hotel in the Otherworld. Seen from the point of view of James Sunderland, it serves as both an abstract manifestation of Angela Orosco’s trauma and the memories of James’s terminally ill wife.' },
];

function Gallery({ title, entries, className = '' }) {
  const prefersReducedMotion = useReducedMotion();
  const scroller = useRef(null);
  const cards = useRef([]);
  const [activeEntry, setActiveEntry] = useState(0);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver((visibleEntries) => {
      const active = visibleEntries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) setActiveEntry(Number(active.target.dataset.index));
    }, { threshold: 0.6 });
    cards.current.slice(0, entries.length).forEach((card) => {
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, [entries.length]);

  const scrollToEntry = (index) => {
    const card = cards.current[index];
    if (!card) return;
    card.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <section className={`lore-gallery relative isolate overflow-hidden px-5 pb-16 pt-8 sm:px-8 md:pb-24 ${className}`} aria-label={title}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden"><Fog n={4} /></div>
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
          <div>
            <p className="mb-2 text-[0.6rem] tracking-[0.32em] text-amber">THE TOWN'S JOURNAL</p>
            <h3 className="font-display text-3xl tracking-[0.16em] text-bone md:text-5xl">{title}</h3>
          </div>
          <span className="pb-1 text-right text-[0.55rem] tracking-[0.2em] text-fog sm:text-xs">SCROLL TO EXPLORE</span>
        </div>

        <div ref={scroller} className="dossier-scroller" aria-label={`${title} dossiers`}>
          <nav className="dossier-pagination" aria-label={`${title} dossier navigation`}>
            {entries.map((entry, index) => (
              <button
                key={entry.name}
                type="button"
                onClick={() => scrollToEntry(index)}
                aria-label={`Go to ${entry.name}`}
                aria-current={activeEntry === index ? 'step' : undefined}
                className={`dossier-dot ${activeEntry === index ? 'is-active' : ''}`}
              />
            ))}
          </nav>
          <div className="dossier-list">
            {entries.map((entry, index) => (
              <motion.article
                key={entry.name}
                ref={(element) => { cards.current[index] = element; }}
                data-index={index}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="dossier-card"
              >
                <section className="dossier-photo-panel" aria-label={`${entry.name} portrait`}>
                  <div className="dossier-photo">
                    <img src={entry.image} alt={`Archival portrait of ${entry.name}`} loading="lazy" />
                    <span className="dossier-stamp" aria-hidden="true">S.H.</span>
                    <span className="dossier-caption">{entry.name} · ARCHIVE PHOTOGRAPH</span>
                  </div>
                  <div className="dossier-photo-meta">
                    <span>FILE NO. SH-{title === 'CHARACTERS' ? '02' : '03'}-{String(index + 1).padStart(3, '0')}</span>
                    <span>PLATE {String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="dossier-image-note">Photographic evidence · Condition uncertain</p>
                </section>
                <section className="dossier-notes" aria-label={`${entry.name} archive notes`}>
                  <div className="dossier-file-heading">
                    <span>{title === 'CHARACTERS' ? 'PERSON OF INTEREST' : 'ENTITY RECORD'}</span>
                    <span>{title === 'CHARACTERS' ? 'Witness file' : 'Threat unknown'}</span>
                  </div>
                  <h4 className="dossier-title">{entry.name}</h4>
                  <div aria-hidden="true" className="dossier-rule" />
                  <div className="dossier-record">
                    <span>ARCHIVE REFERENCE</span>
                    <span>SH-{title === 'CHARACTERS' ? '02' : '03'}-{String(index + 1).padStart(3, '0')}</span>
                  </div>
                  <h5 className="dossier-observation-title">Field observations</h5>
                  <p className="dossier-description">{entry.description}</p>
                  <div className="dossier-page-number">
                    <span>ARCHIVE COPY · DO NOT REMOVE</span>
                    <span>{String(index + 1).padStart(2, '0')} <i>/</i> {String(entries.length).padStart(2, '0')}</span>
                  </div>
                </section>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Lore() {
  const root = useRef(null);

  useEffect(() => {
    if (reduced()) return undefined;
    const context = gsap.context(() => {
      gsap.utils.toArray('[data-lore-reveal]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 32,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <div ref={root}>
      <section id="story" className="relative isolate overflow-hidden border-y border-fog/15 px-6 py-16 md:py-20" aria-labelledby="story-title">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#1b201f]" />
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div data-lore-reveal>
            <p className="mb-4 text-xs tracking-[0.35em] text-amber">THE STORY</p>
            <h2 id="story-title" className="font-display text-5xl leading-tight tracking-[0.08em] md:text-7xl">
              A LETTER FROM THE FOG
            </h2>
          </div>
          <div data-lore-reveal className="space-y-5 border-l border-fog/30 pl-6 text-base leading-relaxed text-fog md:pl-10 md:text-lg">
            <p>
              In <em className="text-bone">Silent Hill 2</em>, James Sunderland receives a letter that appears to be from Mary, his wife—even though she has been dead for years. The letter calls him to their “special place” in Silent Hill.
            </p>
            <p>
              James returns to the fog-covered town and searches for Mary. Along the way, he encounters other visitors, familiar landmarks twisted into nightmares, and creatures that seem connected to the people who face them.
            </p>
            <p>
              The journey is a psychological horror story about grief, guilt, memory, and the difficult truths people try to bury. This overview avoids major story spoilers.
            </p>
          </div>
        </div>
        <a href="#characters-monsters" className="pulse absolute bottom-7 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] text-fog hover:text-amber">
          MEET THE LOST ↓
        </a>
      </section>

      <section id="characters-monsters" className="pt-16 md:pt-20" aria-labelledby="gallery-title">
        <div data-lore-reveal className="mx-auto mb-8 w-full max-w-[90rem] px-6 md:mb-10">
            <p className="mb-4 text-xs tracking-[0.35em] text-amber">PEOPLE & NIGHTMARES</p>
            <h2 id="gallery-title" className="font-display text-5xl tracking-[0.08em] md:text-7xl">CHARACTERS & MONSTERS</h2>
            <p className="mt-5 text-sm leading-relaxed text-fog md:text-base">The town reflects the people who enter it. Scroll to meet its visitors and the horrors waiting in the fog.</p>
        </div>
        <Gallery title="CHARACTERS" entries={characters} />
        <Gallery title="MONSTERS" entries={monsters} className="mt-10 md:mt-14" />
      </section>
    </div>
  );
}
