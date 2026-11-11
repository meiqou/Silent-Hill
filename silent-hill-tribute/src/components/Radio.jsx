import { useEffect, useRef, useState } from 'react';
import { prog, save } from '../lib';

const TARGET = 62;

export default function Radio() {
  const cv = useRef(), audio = useRef(), [f, setF] = useState(20), [snd, setSnd] = useState(false);
  const clarity = Math.max(0, 1 - Math.abs(f - TARGET) / 25);
  const cl = useRef(clarity); cl.current = clarity;

  useEffect(() => {
    if (clarity > .95 && !prog.tuned) save({ tuned: true });
    if (audio.current) audio.current.g.gain.value = snd ? (1 - clarity) * .08 : 0;
  }, [clarity, snd]);

  // Pixel-manipulated static: brightness range shrinks as the signal locks.
  useEffect(() => {
    const x = cv.current.getContext('2d'), d = x.createImageData(200, 100); let raf;
    const loop = () => {
      const a = 255 * (.15 + .85 * (1 - cl.current));
      for (let i = 0; i < d.data.length; i += 4) { d.data[i] = d.data[i + 1] = d.data[i + 2] = Math.random() * a; d.data[i + 3] = 255; }
      x.putImageData(d, 0, 0); raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); audio.current?.ac.close(); };
  }, []);

  // Optional sound: off by default, created only after a user click.
  const toggle = () => {
    if (!audio.current) {
      const ac = new AudioContext(), b = ac.createBuffer(1, ac.sampleRate, ac.sampleRate), o = b.getChannelData(0);
      for (let i = 0; i < o.length; i++) o[i] = Math.random() * 2 - 1;
      const s = ac.createBufferSource(), g = ac.createGain();
      s.buffer = b; s.loop = true; g.gain.value = 0; s.connect(g).connect(ac.destination); s.start();
      audio.current = { g, ac };
    }
    setSnd((v) => !v);
  };
  const drag = (e) => { const b = e.currentTarget.getBoundingClientRect(); setF(Math.round(((e.clientX - b.left) / b.width) * 100)); };

  return (
    <section id="radio" className="mx-auto max-w-xl px-6 py-32 text-center" aria-label="The Radio">
      <h2 className="mb-8 font-display text-6xl tracking-widest">THE RADIO</h2>
      <div onPointerMove={drag} className="border border-fog/40 p-2">
        <canvas ref={cv} width="200" height="100" className="h-40 w-full" style={{ imageRendering: 'pixelated' }} aria-hidden="true" />
      </div>
      <label className="mt-6 block text-sm text-fog">Tune ({f})
        <input type="range" min="0" max="100" value={f} onChange={(e) => setF(+e.target.value)} className="mt-2 w-full accent-amber" aria-label="Radio frequency" />
      </label>
      <p className="mt-8 font-display text-4xl tracking-wide transition-[opacity,filter]" style={{ opacity: .08 + .92 * clarity, filter: `blur(${(1 - clarity) * 6}px)` }}>
        Do not go to the lake. She is not waiting there.
      </p>
      <button onClick={toggle} aria-pressed={snd} className="mt-8 border border-fog/50 px-4 py-2 text-sm hover:text-amber">Sound: {snd ? 'on' : 'off'}</button>
    </section>
  );
}
