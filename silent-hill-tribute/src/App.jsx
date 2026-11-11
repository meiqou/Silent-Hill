import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Cursor from './components/Cursor';
import Overlay from './components/Overlay';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import Portal from './components/Portal';
import Lore from './components/Lore';
import Flashlight from './components/Flashlight';
import Echoes from './components/Echoes';
import Radio from './components/Radio';
import Horizontal from './components/Horizontal';
import Finale from './components/Finale';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { prog, save, session } from './lib';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Tiny hash router: "" = landing page, #/login, #/register, #/dashboard. (#echoes etc. stay in-page anchors.)
const PAGES = ['login', 'register', 'dashboard'];
const route = () => { const v = location.hash.replace('#/', ''); return PAGES.includes(v) ? v : ''; };

export default function App() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(session);
  const [view, setView] = useState(route);
  const done = useCallback(() => setReady(true), []);

  // Dashboard needs a session; login/register make no sense when signed in.
  const shown = view === 'dashboard' && !user ? 'login' : (view === 'login' || view === 'register') && user ? 'dashboard' : view;
  useEffect(() => { if (shown !== view) location.hash = '#/' + shown; }, [shown, view]);

  useEffect(() => {
    let prev = route();
    const h = () => { const v = route(); if (v !== prev) scrollTo(0, 0); prev = v; setView(v); };
    addEventListener('hashchange', h);
    return () => removeEventListener('hashchange', h);
  }, []);

  // Fonts change layout, so recompute every pin position once they load, and again when the landing page remounts.
  useEffect(() => { document.fonts.ready.then(() => ScrollTrigger.refresh()); }, []);
  useEffect(() => { if (ready && shown === '') requestAnimationFrame(() => ScrollTrigger.refresh()); }, [ready, shown]);

  // Save how deep the visitor has scrolled (shown on the dashboard).
  useEffect(() => {
    if (shown !== '') return;
    const f = () => {
      const d = Math.round((scrollY / Math.max(1, document.body.scrollHeight - innerHeight)) * 100);
      if (d > prog.depth) save({ depth: Math.min(100, d) });
    };
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, [shown]);

  return (
    <>
      <Cursor /><Overlay />
      <AnimatePresence>{!ready && <Preloader key="pre" done={done} />}</AnimatePresence>
      <Header user={user} page={shown !== ''} />
      {shown === '' && (
        <main className="archive-page"><Hero /><Portal /><Lore /><Flashlight /><Echoes /><Radio /><Horizontal /><Finale /></main>
      )}
      {(shown === 'login' || shown === 'register') && <Auth key={shown} mode={shown} setUser={setUser} />}
      {shown === 'dashboard' && <Dashboard user={user} setUser={setUser} />}
    </>
  );
}
