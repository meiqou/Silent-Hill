import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

const btn = 'border border-fog/50 px-3 py-1 hover:text-amber';

// Hides on scroll down, returns on scroll up. Progress bar is separate so it stays visible.
export default function Header({ user, page, setUser }) {
  const [hide, setHide] = useState(false);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    let y = 0;
    const f = () => { const h = scrollY > y && scrollY > 80; setHide((p) => (p === h ? p : h)); y = scrollY; };
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);
  const signOut = () => { localStorage.removeItem('sh_session'); setUser?.(null); location.assign('index.html'); };
  return (<>
    <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-amber" aria-hidden="true" />
    <motion.header animate={{ y: hide ? -100 : 0 }} transition={{ duration: .7 }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-ink/80 px-5 py-4 text-sm backdrop-blur">
      <a href="index.html" className="tracking-[.3em]" aria-label="Landing page">S·H</a>
      <nav aria-label="Primary" className="flex items-center gap-4">
        {page ? <a href="index.html" className="hover:text-amber">← The Fog</a> : (<>
          <a href="index.html#characters-monsters" className="hidden sm:inline hover:text-amber">Characters</a>
          <a href="index.html#chapters-title" className="hidden sm:inline hover:text-amber">Chapters</a>
        </>)}
        {user ? (<>
          <a href="dashboard.html" className={btn}>Journal</a>
          <button onClick={signOut} className="hover:text-amber">Sign out</button>
        </>) : (<>
          <a href="login.html" className="hover:text-amber">Sign in</a>
          <a href="register.html" className={btn}>Create account</a>
        </>)}
      </nav>
    </motion.header>
  </>);
}
