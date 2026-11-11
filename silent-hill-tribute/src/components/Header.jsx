import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

const btn = 'border border-fog/50 px-3 py-1 hover:text-amber';

// Hides on scroll down, returns on scroll up. Progress bar is separate so it stays visible.
export default function Header({ user, page }) {
  const [hide, setHide] = useState(false);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    let y = 0;
    const f = () => { setHide(scrollY > y && scrollY > 80); y = scrollY; };
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);
  return (<>
    <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-amber" aria-hidden="true" />
    <motion.header animate={{ y: hide ? -100 : 0 }} transition={{ duration: .7 }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-ink/80 px-5 py-4 text-sm backdrop-blur">
      <a href="#/" className="tracking-[.3em]" aria-label="Landing page">S·H</a>
      <nav aria-label="Primary" className="flex items-center gap-4">
        {page ? <a href="#/" className="hover:text-amber">← The Fog</a> : (<>
          <a href="#echoes" className="hidden sm:inline hover:text-amber">Echoes</a>
          <a href="#radio" className="hidden sm:inline hover:text-amber">Radio</a>
          {user ? <a href="#/dashboard" className={btn}>Dashboard</a> : (<>
            <a href="#/login" className="hover:text-amber">Sign in</a>
            <a href="#/register" className={btn}>Register</a>
          </>)}
        </>)}
      </nav>
    </motion.header>
  </>);
}
