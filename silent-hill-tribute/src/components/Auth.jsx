import { useState } from 'react';
import { motion } from 'framer-motion';
import Fog from './Fog';
import { sha, users } from '../lib';

// Login and Register pages (one component, `mode` switches). DEMO ONLY: localStorage, no server.
export default function Auth({ mode, setUser }) {
  const reg = mode === 'register';
  const [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  const fail = (m) => { setErr(m); setBusy(false); };
  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget), n = f.get('n').trim(), pw = f.get('p');
    if (reg && pw !== f.get('c')) return setErr('The two passwords do not match.');
    setBusy(true);
    const h = await sha(pw), db = users();
    if (reg) {
      if (db[n]) return fail('That name is already written.');
      localStorage.setItem('sh_users', JSON.stringify({ ...db, [n]: h }));
    } else if (db[n] !== h) return fail('The registry does not know you.');
    localStorage.setItem('sh_session', n); setUser(n); location.hash = '#/dashboard';
  };
  const inp = 'mt-1 w-full border border-fog/40 bg-ink px-3 py-2 text-bone';
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 pt-20">
      <Fog n={2} />
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
        className="relative w-full max-w-sm border border-fog/40 bg-ink/90 p-6" aria-label={reg ? 'Register' : 'Sign in'}>
        <h1 className="font-display text-5xl tracking-widest">{reg ? 'SIGN THE REGISTRY' : 'SIGN IN'}</h1>
        <label className="mt-5 block text-sm">Name<input name="n" required minLength={2} autoFocus autoComplete="username" className={inp} /></label>
        <label className="mt-3 block text-sm">Password<input name="p" type="password" required minLength={6} autoComplete={reg ? 'new-password' : 'current-password'} className={inp} /></label>
        {reg && <label className="mt-3 block text-sm">Confirm password<input name="c" type="password" required minLength={6} autoComplete="new-password" className={inp} /></label>}
        {err && <p role="alert" className="mt-3 text-sm text-amber">{err}</p>}
        <button disabled={busy} className="mt-5 w-full border border-amber py-2 text-amber hover:bg-amber hover:text-ink disabled:opacity-50">{reg ? 'Write my name' : 'Enter'}</button>
        <a href={reg ? '#/login' : '#/register'} className="mt-4 block text-center text-sm text-fog hover:text-amber">{reg ? 'Already written? Sign in' : 'New here? Register'}</a>
        <p className="mt-4 text-xs text-fog">Demo only: stored in this browser, no server. Needs localhost or https.</p>
      </motion.form>
    </main>
  );
}
