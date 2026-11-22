import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduced } from '../lib';
import james from '../assets/images/james.png';
import mary from '../assets/images/mary.png';
import maria from '../assets/images/maria.png';
import angela from '../assets/images/angela.png';
import laura from '../assets/images/laura.png';
import eddie from '../assets/images/eddie.png';
import lyingFigure from '../assets/images/lying figure.png';
import creeper from '../assets/images/creeper.png';
import mandarin from '../assets/images/mandarin.png';
import nurse from '../assets/images/bubble head nurse.png';
import pyramidHead from '../assets/images/pyramnnid head.png';
import fleshLip from '../assets/images/flesh lip.png';
import mariaMonster from '../assets/images/mary monster.png';
import abstractDaddy from '../assets/images/abstract daddy.png';

const characters = [
  { name: 'James Sunderland', image: james, description: "James Sunderland is the protagonist of Silent Hill 2. As the game begins, James remarks that his wife, Mary Shepherd-Sunderland, has been dead for three years. Regardless, he has received a mysterious letter in Mary's handwriting, claiming that she is waiting for him in their \"special place\", somewhere in Silent Hill. When James arrives at the town, he becomes ensnared in a series of bizarre and nightmarish events which force him to question his sanity, morality, memory and personality." },
  { name: 'Mary Shepherd-Sunderland', image: mary, description: 'Mary Shepherd-Sunderland is the late wife of James Sunderland. The couple had vacationed in Silent Hill a few years prior to the events of Silent Hill 2. Mary was a kind, sweet young woman who spent the last moments of her life in emotional turmoil, distress and anguish after being stricken with a terminal disease.' },
  { name: 'Maria', image: maria, description: 'Maria is a major character and arguably the primary antagonist of Silent Hill 2, while she serves as the protagonist of Silent Hill 2: Born from a Wish. In Silent Hill 2 Letter from Silent Heaven, she meets James Sunderland in Rosewater Park in Silent Hill, Maine, and stays with him sporadically after that. James must protect her, as Maria does not have any weapons to defend herself with, and it is game over if she dies.' },
  { name: 'Angela Orosco', image: angela, description: 'Angela Orosco is a character in Silent Hill 2. She is a young woman searching the town for her missing mother and crosses paths with James Sunderland multiple times. Throughout the course of the game, she is revealed to have had a traumatic past that has affected her personality and mental health deeply, especially regarding her relationship with her father, Thomas, and her brother.' },
  { name: 'Laura', image: laura, description: "Laura is a young girl in Silent Hill 2 and is often seen wandering around Silent Hill, Maine. Like James Sunderland, she is also searching for Mary Shepherd-Sunderland and is unaware of her death because Laura misinterpreted Mary's \"I'm far away now. In a quiet, beautiful place\" letter not as a peaceful afterlife, but Silent Hill." },
  { name: 'Eddie Dombrowski', image: eddie, description: 'Eddie Dombrowski is a character from Silent Hill 2. He is an insecure, mentally disturbed, and severely bullied young man who is self-conscious about his weight and physical appearance after being laughed at and ridiculed his entire life.' },
];

const monsters = [
  { name: 'Lying Figure', image: lyingFigure, description: 'Lying Figures are humanoid monsters appearing in Silent Hill 2. It is the first creature that James Sunderland encounters in his journey through Silent Hill, Maine. They are a physical manifestation of the memory of his sick wife on her deathbed and his internal suffering, taking the appearance of a hospital patient writhing in agony.' },
  { name: 'Creeper', image: creeper, description: "The Creeper is an insectoid monster appearing in Silent Hill and Silent Hill 2. A manifestation of Alessa Gillespie's dislike of insects, they were encountered by Harry Mason when the town of Silent Hill was transfigured by her psychic powers. They are hostile to humans, moving with great speed and reacting strongly to light." },
  { name: 'Mandarin', image: mandarin, description: "Mandarins are creatures appearing in Silent Hill 2. They are manifestations of James Sunderland's subconscious thoughts, representing anguish and memories of his wife during her illness." },
  { name: 'Bubble Head Nurse', image: nurse, description: "Bubble Head Nurses are monsters appearing in Silent Hill 2, the spin-offs Silent Hill: The Escape and Silent Hill: Book of Memories, and in Bloober Team's Silent Hill 2. A manifestation of James Sunderland's subconscious, they were first encountered when James Sunderland entered Brookhaven Hospital after coming to Silent Hill, Maine, in search of his deceased wife. They can be seen both in the hospital and the streets of South Vale." },
  { name: 'Pyramid Head', image: pyramidHead, description: "Pyramid Head is a humanoid monster in the Silent Hill franchise first appearing in Silent Hill 2. His red helmet and butcher's attire echo the executioners of the town's past, who worshipped the angel of rebirth Valtiel. He is a manifestation of James Sunderland's guilt and desire for punishment, existing to keep him human and help him remember his past actions. The monster wields the Great Knife and the Great Spear, instruments of James' inner torment." },
  { name: 'Flesh Lip', image: fleshLip, description: "Flesh Lip is a monster appearing in Silent Hill 2. It is a manifestation of James Sunderland's subconscious thoughts, representing the memory of his wife in her sick bed. Creature designer Masahiro Ito created the design and animations, taking inspiration from Isamu Noguchi's statue \"Death (Lynched Figure)\" and the photograph \"Man with No Legs\" by Joel-Peter Witkin." },
  { name: 'Mary Monster', image: mariaMonster, description: "Mary is the final boss of Silent Hill 2 and is encountered after climbing a metal stairwell at the end of the Fog World Lakeview Hotel. James Sunderland encounters either a manifestation of Mary Shepherd-Sunderland or Maria in the form of Mary in the game's final scenes, depending on the player's actions throughout the game." },
  { name: 'Abstract Daddy', image: abstractDaddy, description: "Abstract Daddy is a monster appearing in Silent Hill 2. It is first encountered as a boss fight in the Labyrinth, later resurfacing as a less durable enemy type in the hallways of the Lakeview Hotel in the Otherworld. Seen from the point of view of James Sunderland, it serves as both an abstract manifestation of Angela Orosco's trauma and the memories of James's terminally ill wife." },
];

function Page({ entry, index, title, entries, className = '' }) {
  return (
    <article data-index={index} className={`dossier-card ${className}`}>
      <section className="dossier-photo-panel" aria-label={`${entry.name} portrait`}>
        <div className="dossier-photo">
          <img src={entry.image} alt={`Archival portrait of ${entry.name}`} loading="eager" />
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
    </article>
  );
}

function Gallery({ title, entries, className = '' }) {
  const prefersReducedMotion = useReducedMotion();
  const wrap = useRef(null);
  const stage = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || reduced()) return undefined;
    if (!wrap.current || !stage.current) return undefined;

    const ctx = gsap.context(() => {
      const root = wrap.current;
      const coverEl = root.querySelector('.book-cover');
      const pageEls = gsap.utils.toArray(root.querySelectorAll('.book-page'));

      if (!coverEl || !pageEls.length) return;

      const totalPages = pageEls.length + 1;
      const flippables = [coverEl, ...pageEls.slice(0, pageEls.length - 1)];

      gsap.set(coverEl, { zIndex: totalPages, rotateY: 0, transformOrigin: 'left center' });
      pageEls.forEach((c, i) => gsap.set(c, { zIndex: totalPages - i - 1, rotateY: 0, transformOrigin: 'left center' }));

      const segments = flippables.length;
      const totalScroll = window.innerHeight * segments;

      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: stage.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(flippables, { rotateY: -180, ease: 'none', duration: 1, stagger: 1 }, 0);
    }, wrap);

    return () => ctx.revert();
  }, [entries.length, prefersReducedMotion]);

  const bookMode = !prefersReducedMotion && !reduced();

  return (
    <section className={`lore-gallery relative isolate overflow-hidden px-4 pb-4 pt-2 sm:px-4 md:pb-6 ${className}`} aria-label={title}>
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div ref={wrap} className="dossier-scroller" aria-label={`${title} dossiers`}>
          {bookMode ? (
            <div ref={stage} className="book-stage">
              <div className="book">
                <div className="book-cover" aria-hidden="true">
                  <div className="book-cover-front">
                    <p className="book-cover-kicker">SILENT HILL ARCHIVE</p>
                    <h4 className="book-cover-title">{title}</h4>
                    <div className="book-cover-sigil">S·H</div>
                    <p className="book-cover-sub">CONFIDENTIAL DOSSIER</p>
                  </div>
                </div>
                {entries.map((entry, index) => (
                  <Page key={entry.name} entry={entry} index={index} title={title} entries={entries} className="book-page" />
                ))}
              </div>
            </div>
          ) : (
            <div className="dossier-list grid gap-8 sm:gap-10">
              {entries.map((entry, index) => (
                <Page key={entry.name} entry={entry} index={index} title={title} entries={entries} className="book-page-static" />
              ))}
            </div>
          )}
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

      // Story section: staggered reveal with amber glow pulse
      const story = document.getElementById('story');
      if (story) {
        const kicker = story.querySelector('[class*="text-amber"]');
        const title = story.querySelector('#story-title');
        const paragraphs = story.querySelectorAll('p:not([class*="text-amber"])');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: story,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 1,
          },
        });
        tl.from(kicker, { autoAlpha: 0, y: 20, duration: 0.6 }, 0)
          .from(title, { autoAlpha: 0, y: 30, scale: 0.95, duration: 0.8 }, 0.1)
          .from(paragraphs, { autoAlpha: 0, y: 24, stagger: 0.25, duration: 0.6 }, 0.3);

        // Amber kicker glow pulse loop
        gsap.to(kicker, {
          textShadow: '0 0 14px rgba(201,138,43,0.7)',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, root);
    return () => context.revert();
  }, []);

  return (
    <div ref={root}>
      <section id="story" className="relative isolate overflow-hidden border-y border-fog/15 px-6 pt-12 md:pt-16 pb-20" aria-labelledby="story-title">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#1b201f]" />
        <div className="mx-auto w-full max-w-4xl">
          <div data-lore-reveal className="flex flex-col items-center justify-center gap-6 lg:gap-10 text-center px-4">
            <div className="relative inline-block">
              <div className="absolute -inset-0.5 bg-amber/20 blur-[8px] rounded-full opacity-30 animate-pulse" aria-hidden="true" />
              <div className="relative z-10 flex items-center gap-3">
                <span className="w-px h-8 bg-amber/40" />
                <p className="text-xs tracking-[0.4em] text-amber uppercase">THE STORY</p>
                <span className="w-px h-8 bg-amber/40" />
              </div>
            </div>
            <h2 id="story-title" className="font-display text-[clamp(3rem,8vw,5rem)] leading-none tracking-[0.06em] text-bone md:text-[6rem]">
              A LETTER FROM THE FOG
            </h2>
          </div>
          <div data-lore-reveal className="mt-4 lg:mt-10 px-4 text-base leading-relaxed text-fog md:text-lg max-w-2xl mx-auto space-y-6">
            <p>
              In <em className="text-bone">Silent Hill 2</em>, James Sunderland receives a letter that appears to be from Mary, his wife—even though she has been dead for years. The letter calls him to their "special place" in Silent Hill.
            </p>
            <p>
              James returns to the fog-covered town and searches for Mary. Along the way, he encounters other visitors, familiar landmarks twisted into nightmares, and creatures that seem connected to the people who face them.
            </p>
            <p>
              The journey is a psychological horror story about grief, guilt, memory, and the difficult truths people try to bury. This overview avoids major story spoilers.
            </p>
          </div>
        </div>
        <a href="#characters-monsters" className="pulse absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] text-fog hover:text-amber">
          MEET THE LOST ↓
        </a>
      </section>

      <section id="characters-monsters" className="pt-8 md:pt-10" aria-labelledby="gallery-title">
        <div data-lore-reveal className="mx-auto mb-6 mt-12 md:mt-16 w-full max-w-[90rem] px-6 md:mb-8">
            <p className="mb-3 text-xs tracking-[0.35em] text-amber">PEOPLE & NIGHTMARES</p>
            <h2 id="gallery-title" className="font-display text-4xl tracking-[0.08em] md:text-6xl">CHARACTERS & MONSTERS</h2>
            <p className="mt-4 text-sm leading-relaxed text-fog md:text-base">The town reflects the people who enter it. Scroll to meet its visitors and the horrors waiting in the fog.</p>
        </div>
        <Gallery title="CHARACTERS" entries={characters} />
        <Gallery title="MONSTERS" entries={monsters} className="mt-6 md:mt-8" />
      </section>
    </div>
  );
}
