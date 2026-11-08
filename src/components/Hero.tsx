import { useRef } from 'react';
import { gsap, MOTION_OK, SplitText, useGSAP } from '../lib/gsap.ts';
import type { Project, ProjectStatus } from '../projects/types.ts';
import { STATUS_LABEL, StatusNode } from './StatusNode.tsx';

const STATUSES: readonly ProjectStatus[] = ['live', 'building', 'planned'];

const pill =
  'inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-[background-color,color,scale] active:scale-95';

type HeroProps = { projects: readonly Project[] };

export const Hero = ({ projects }: HeroProps) => {
  const scope = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  // The page's one orchestrated entrance: the name rises letter by letter out
  // of a mask, then the intro, links and legend settle in behind it.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (!title.current) return;
        const split = new SplitText(title.current, { type: 'words,chars', mask: 'chars' });
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from(split.chars, { yPercent: 115, duration: 0.9, stagger: 0.022 })
          .from('[data-hero-fade]', { opacity: 0, y: 14, duration: 0.7, stagger: 0.09 }, 0.35);
        return () => split.revert();
      });
    },
    { scope },
  );

  const counts = STATUSES.map((status) => ({
    status,
    count: projects.filter((project) => project.status === status).length,
  })).filter(({ count }) => count > 0);

  return (
    <section
      id="top"
      ref={scope}
      aria-labelledby="hero-title"
      className="pt-10 pb-6 sm:pt-14 lg:sticky lg:top-14 lg:self-start lg:pt-20 lg:pb-12"
    >
      <h1
        id="hero-title"
        ref={title}
        className="text-[clamp(2.75rem,11vw,4rem)] leading-[0.92] font-bold tracking-[-0.04em] text-balance"
      >
        Muhammed Ashiq
      </h1>

      <p data-hero-fade className="mt-5 max-w-[36ch] text-lg leading-relaxed text-pretty text-ink-2">
        Engineering manager at Docusign. On my own time I build apps, websites and tools. Every project here opens
        the real thing.
      </p>

      <div data-hero-fade className="mt-6 flex flex-wrap gap-2">
        <a href="/profile/" className={`${pill} bg-ink text-paper hover:bg-ink/85`}>
          About me
        </a>
        <a href="https://www.linkedin.com/in/muhdashiq/" className={`${pill} border border-line text-ink hover:bg-ink/5`}>
          LinkedIn
        </a>
        <a href="mailto:muhdashiq@gmail.com" className={`${pill} border border-line text-ink hover:bg-ink/5`}>
          Email
        </a>
      </div>

      <ul data-hero-fade aria-label="Projects by status" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2">
        {counts.map(({ status, count }) => (
          <li key={status} className="flex items-center gap-2">
            <StatusNode status={status} className="text-ink-2" />
            <span>
              <span className="font-semibold text-ink tabular-nums">{count}</span> {STATUS_LABEL[status].toLowerCase()}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
