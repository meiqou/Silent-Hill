import { useState } from 'react';
import { motion } from 'framer-motion';
import { prog, save } from '../lib';

const NAMES = ['The Alley', 'The Flashlight', 'The Letter', 'The Pyramid', 'The Radio', 'The Videotape'];

// "Your Descent": progress saved while exploring the landing page, plus a private journal.
export default function Dashboard({ user, setUser }) {
  const nk = 'sh_note_' + user;
  const [note, setNote] = useState(() => localStorage.getItem(nk) || '');
  const [sure, setSure] = useState(false), [, tick] = useState(0);
  const edit = (v) => { setNote(v); localStorage.setItem(nk, v); };
  const reset = () => { save({ depth: 0, tuned: false, echoes: [] }); setSure(false); tick((n) => n + 1); };
  const out = () => { localStorage.removeItem('sh_session'); setUser(null); location.hash = '#/'; };
  const card = 'border border-fog/30 bg-ink/80 p-5';
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 pb-20 pt-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
        <h1 className="font-display text-6xl tracking-widest">YOUR DESCENT</h1>
        <p className="mt-1 text-fog">Signed in as {user}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className={card} aria-label="Depth">
            <h2 className="text-sm text-fog">Depth into the fog</h2>
            <p className="font-display text-5xl text-amber">{prog.depth}%</p>
            <div className="mt-2 h-2 bg-fog/20" role="progressbar" aria-valuenow={prog.depth} aria-valuemin={0} aria-valuemax={100} aria-label="Scroll depth">
              <div className="h-full bg-rust" style={{ width: prog.depth + '%' }} />
            </div>
          </section>
          <section className={card} aria-label="Signal">
            <h2 className="text-sm text-fog">Radio signal</h2>
            <p className="font-display text-5xl text-amber">{prog.tuned ? 'FOUND' : 'LOST'}</p>
            <p className="mt-2 text-sm text-fog">{prog.tuned ? 'You heard the message.' : 'Only static so far.'}</p>
          </section>
          <section className={card + ' md:col-span-2'} aria-label="Echoes met">
            <h2 className="text-sm text-fog">Echoes met ({prog.echoes.length} / 6)</h2>
            <ul className="mt-3 grid list-none grid-cols-2 gap-2 p-0 text-sm sm:grid-cols-3">
              {NAMES.map((n) => <li key={n} className={prog.echoes.includes(n) ? 'text-bone' : 'text-fog/50'}>{prog.echoes.includes(n) ? '◆' : '◇'} {n}</li>)}
            </ul>
          </section>
          <section className={card + ' md:col-span-2'} aria-label="Journal">
            <label className="text-sm text-fog" htmlFor="note">Journal (saved in this browser)</label>
            <textarea id="note" value={note} onChange={(e) => edit(e.target.value)} rows={5} placeholder="Write what you saw..."
              className="mt-2 w-full border border-fog/40 bg-ink px-3 py-2 text-bone" />
          </section>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <a href="#/" className="border border-fog/50 px-4 py-2 hover:text-amber">Back to the fog</a>
          {sure ? (<>
            <button onClick={reset} data-danger className="border border-amber px-4 py-2 text-amber hover:bg-amber hover:text-ink">Confirm reset</button>
            <button onClick={() => setSure(false)} className="border border-fog/50 px-4 py-2 hover:text-amber">Cancel</button>
          </>) : <button onClick={() => setSure(true)} data-danger className="border border-fog/50 px-4 py-2 hover:text-amber">Reset progress</button>}
          <button onClick={out} className="border border-fog/50 px-4 py-2 hover:text-amber">Sign out</button>
        </div>
      </motion.div>
    </main>
  );
}
