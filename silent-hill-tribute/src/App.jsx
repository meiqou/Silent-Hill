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
import Horizontal from './components/Horizontal';
import Finale from './components/Finale';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { prog, save, session } from './lib';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PAGES = ['login', 'register', 'dashboard'];
const route = () => {
  const page = (location.pathname.split('/').pop() || '').replace('.html', '');
  if (PAGES.includes(page)) return page;
  const hash = location.hash.replace('#/', '');
  return PAGES.includes(hash) ? hash : '';
};

export default function App() {
  const [view] = useState(route);
  const [ready, setReady] = useState(sessionStorage.getItem('sh_preloader_shown') === '1' || view !== '');
  const [user, setUser] = useState(session);
  const done = useCallback(() => { sessionStorage.setItem('sh_preloader_shown', '1'); setReady(true); }, []);

  const shown = view === 'dashboard' && !user ? 'login' : (view === 'login' || view === 'register') && user ? 'dashboard' : view;
  useEffect(() => {
    const target = shown === '' ? 'index.html' : shown + '.html';
    const current = location.pathname.split('/').pop() || 'index.html';
    if (current !== target) location.replace(target);
  }, [shown]);

  useEffect(() => { document.fonts.ready.then(() => ScrollTrigger.refresh()); }, []);
  useEffect(() => { if (ready && shown === '') requestAnimationFrame(() => ScrollTrigger.refresh()); }, [ready, shown]);

  useEffect(() => {
    if (shown !== '') return;
    let ticking = false;
    const f = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const d = Math.round((scrollY / Math.max(1, document.body.scrollHeight - innerHeight)) * 100);
        if (d > prog.depth) save({ depth: Math.min(100, d) });
      });
    };
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, [shown]);

  return (
    <>
      <Cursor /><Overlay />
      <AnimatePresence>{!ready && <Preloader key="pre" done={done} />}</AnimatePresence>
      <Header user={user} page={shown !== ''} setUser={setUser} />
      {shown === '' && (
        <main className="archive-page"><Hero /><Portal /><Lore /><Horizontal /><Flashlight /><Finale /></main>
      )}
      {(shown === 'login' || shown === 'register') && <Auth key={shown} mode={shown} setUser={setUser} />}
      {shown === 'dashboard' && <Dashboard user={user} setUser={setUser} />}
    </>
  );
}
