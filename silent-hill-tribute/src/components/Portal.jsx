import { motion } from 'framer-motion';

const highlights = [
  {
    label: 'VIDEO',
    date: '20.10.2026',
    title: 'SILENT HILL',
    subtitle: 'Silent Hill 2 Remake Trailer',
    href: 'https://www.youtube.com/watch?v=7f5qac5f3mE',
    preview: 'https://img.youtube.com/vi/7f5qac5f3mE/hqdefault.jpg',
  },
  {
    label: 'VIDEO',
    date: '29.09.2026',
    title: 'SILENT HILL',
    subtitle: 'Silent Hill f Trailer',
    href: 'https://www.youtube.com/watch?v=0-eMuy6UJ6U',
    preview: 'https://img.youtube.com/vi/0-eMuy6UJ6U/hqdefault.jpg',
  },
  {
    label: 'VIDEO',
    date: '26.08.2026',
    title: 'SILENT HILL',
    subtitle: 'Townfall Trailer',
    href: 'https://www.youtube.com/watch?v=CvN3dP92wxU&pp=ygUUc2lsZW50IGhpbGwgdHJhaWxlcnM%3D',
    preview: 'https://img.youtube.com/vi/CvN3dP92wxU/hqdefault.jpg',
  },
  {
    label: 'VIDEO',
    date: '20.08.2026',
    title: 'SILENT HILL',
    subtitle: 'Short Message Trailer',
    href: 'https://www.youtube.com/watch?v=RmEamyHS3c4',
    preview: 'https://img.youtube.com/vi/RmEamyHS3c4/hqdefault.jpg',
  },
];

export default function Portal() {
  return (
    <section id="portal" className="portal-shell relative isolate overflow-hidden px-6 pb-6 pt-4 text-center sm:pb-7 sm:pt-5" aria-label="Highlights and news portal">
      <div className="portal-backdrop absolute inset-0 -z-10 opacity-90" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[90rem]">
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] tracking-[0.08em] text-bone/90">Highlights</h2>

        <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item, index) => (
            <motion.article
              key={`${item.title}-${item.date}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="portal-card group relative overflow-hidden border border-fog/50 bg-[#1b201f] text-left shadow-[0_28px_65px_rgba(0,0,0,0.45)]"
              style={{ minHeight: 'clamp(12rem, 26svh, 17rem)' }}
            >
              <a href={item.href} target="_blank" rel="noreferrer" className="absolute inset-0 block" aria-label={`Open ${item.subtitle} video`}>
                <img src={item.preview} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />

                <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
                  <div className="flex items-center justify-between text-[0.58rem] font-medium uppercase tracking-[0.22em] text-fog/90">
                    <span>{item.label}</span>
                    <span>{item.date}</span>
                  </div>

                  <div className="relative mt-auto flex flex-col items-center justify-end text-center">
                    <span className="portal-play mb-4" aria-hidden="true">
                      <span>▶</span>
                    </span>

                    <div className="font-display text-[clamp(1.8rem,2.8vw,3rem)] leading-none tracking-[0.08em] text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                      {item.title}
                    </div>
                    <div className="mt-2 text-[0.62rem] uppercase tracking-[0.28em] text-fog/75">{item.subtitle}</div>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
