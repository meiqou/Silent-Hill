import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Pixel-manipulated static (ImageData), a flickering line, then a slow fade out.
export default function Preloader({ done }) {
  const ref = useRef();
  useEffect(() => {
    const x = ref.current.getContext('2d'), d = x.createImageData(160, 90);
    let raf;
    const f = () => {
      for (let i = 0; i < d.data.length; i += 4) { d.data[i] = d.data[i + 1] = d.data[i + 2] = Math.random() * 120; d.data[i + 3] = 255; }
      x.putImageData(d, 0, 0); raf = requestAnimationFrame(f);
    };
    f();
    const t = setTimeout(done, 3200);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [done]);
  return (
    <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-ink" exit={{ opacity: 0 }} transition={{ duration: 2 }} role="status" aria-label="Loading">
      <canvas ref={ref} width="160" height="90" className="absolute inset-0 h-full w-full opacity-40" style={{ imageRendering: 'pixelated' }} aria-hidden="true" />
      <motion.p className="relative tracking-[.4em] text-bone" animate={{ opacity: [0, 1, .2, 1, .4, 1, 0] }} transition={{ duration: 3 }}>
        ...WAKING IN THE FOG
      </motion.p>
    </motion.div>
  );
}
