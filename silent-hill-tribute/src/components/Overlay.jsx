import { useEffect, useRef } from 'react';

// Film grain: one 128px ImageData noise tile, jittered by CSS (cheap), plus a vignette.
export default function Overlay() {
  const ref = useRef();
  useEffect(() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const x = c.getContext('2d'), d = x.createImageData(128, 128);
    for (let i = 0; i < d.data.length; i += 4) { d.data[i] = d.data[i + 1] = d.data[i + 2] = Math.random() * 255; d.data[i + 3] = 40; }
    x.putImageData(d, 0, 0);
    ref.current.style.backgroundImage = `url(${c.toDataURL()})`;
  }, []);
  return (<><div ref={ref} className="grain" aria-hidden="true" /><div className="vig" aria-hidden="true" /></>);
}
