// Shared mutable state: mouse lives in a plain object so nothing re-renders per mousemove.
export const mouse = { x: -100, y: -100, vx: 0, vy: 0 };
export const fine = () => matchMedia('(pointer:fine)').matches;
export const reduced = () => matchMedia('(prefers-reduced-motion:reduce)').matches;

// DEMO storage: everything lives in this browser's localStorage. No backend, not real security.
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const savedProgress = read('sh_progress', {});
const renamedEchoes = {
  'The Lamp': 'The Flashlight',
  'The Faceless': 'The Letter',
  'The Spiral': 'The Pyramid',
  'The Crest': 'The Radio',
  'The Siren': 'The Videotape',
};
export const prog = {
  depth: 0,
  tuned: false,
  ...savedProgress,
  echoes: [...new Set((savedProgress.echoes || []).map((name) => renamedEchoes[name] || name))],
};
export const save = (p) => { Object.assign(prog, p); try { localStorage.setItem('sh_progress', JSON.stringify(prog)); } catch {} };
export const seen = (n) => { if (!prog.echoes.includes(n)) save({ echoes: [...prog.echoes, n] }); };
export const users = () => read('sh_users', {});
export const session = () => localStorage.getItem('sh_session');
export const sha = async (s) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))].map((b) => b.toString(16).padStart(2, '0')).join('');
