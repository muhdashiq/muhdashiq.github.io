import { GitBranch } from 'lucide-react';
import { type CSSProperties, useMemo, useRef, useState } from 'react';
import { filterById, type FilterId } from '../lib/filters.ts';
import { Flip, gsap, MOTION_OK, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/gsap.ts';
import type { Project } from '../projects/types.ts';
import { Filters } from './Filters.tsx';
import { ProjectCard } from './ProjectCard.tsx';
import { StatusNode } from './StatusNode.tsx';

type FlipState = ReturnType<typeof Flip.getState>;

type ProjectGraphProps = { projects: readonly Project[] };

/**
 * The projects as a git graph: a `main` rail with one coloured commit per
 * project. On first scroll the rail draws itself and each commit lands as its
 * card arrives. Filtering reflows the cards with Flip.
 */
export const ProjectGraph = ({ projects }: ProjectGraphProps) => {
  const [filter, setFilter] = useState<FilterId>('all');
  const scope = useRef<HTMLElement>(null);
  const flipState = useRef<FlipState | null>(null);
  const revealTriggers = useRef<ScrollTrigger[]>([]);

  const visible = useMemo(() => {
    const { matches } = filterById(filter);
    return new Set(projects.filter(matches).map((project) => project.slug));
  }, [filter, projects]);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rail = gsap.fromTo(
          '[data-rail]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-graph]', start: 'top 85%', end: 'bottom 65%', scrub: 0.6 },
          },
        );

        gsap.set('[data-node]', { scale: 0 });
        gsap.set('[data-connector]', { scaleX: 0 });
        gsap.set('[data-card]', { autoAlpha: 0, x: -14 });

        const batch = ScrollTrigger.batch('[data-item]', {
          start: 'top 92%',
          once: true,
          onEnter: (items) => {
            items.forEach((item, index) => {
              const ping = item.querySelector('[data-ping]');
              const timeline = gsap
                .timeline({ delay: index * 0.09 })
                .to(item.querySelector('[data-node]'), { scale: 1, duration: 0.45, ease: 'back.out(3)' })
                .to(item.querySelector('[data-connector]'), { scaleX: 1, duration: 0.25, ease: 'power2.out' }, '-=0.2')
                .to(item.querySelector('[data-card]'), { autoAlpha: 1, x: 0, duration: 0.55, ease: 'power3.out' }, '-=0.1');
              if (ping) {
                timeline.fromTo(ping, { scale: 1, opacity: 0.5 }, { scale: 2.8, opacity: 0, duration: 1, ease: 'power2.out' }, 0.2);
              }
            });
          },
        });

        revealTriggers.current = [...batch, ...(rail.scrollTrigger ? [rail.scrollTrigger] : [])];
      });
    },
    { scope },
  );

  // After the first filter change the scroll reveal has done its job, so
  // everything is shown and only the Flip reflow animates.
  const finishReveal = contextSafe(() => {
    revealTriggers.current.forEach((trigger) => trigger.kill());
    revealTriggers.current = [];
    gsap.set('[data-rail]', { scaleY: 1 });
    gsap.set('[data-node], [data-connector], [data-card]', { clearProps: 'transform,opacity,visibility' });
  });

  const changeFilter = contextSafe((next: FilterId) => {
    if (next === filter) return;
    if (!prefersReducedMotion()) {
      finishReveal();
      flipState.current = Flip.getState('[data-item]');
    }
    setFilter(next);
  });

  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) return;
      flipState.current = null;
      Flip.from(state, {
        targets: '[data-item]',
        duration: 0.55,
        ease: 'power3.inOut',
        absolute: true,
        stagger: 0.03,
        onEnter: (items) => gsap.fromTo(items, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.4, delay: 0.15 }),
        onLeave: (items) => gsap.to(items, { opacity: 0, scale: 0.96, duration: 0.25 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    },
    { dependencies: [filter], scope },
  );

  return (
    <section ref={scope} id="projects" aria-labelledby="projects-title" className="lg:pt-20">
      <h2 id="projects-title" className="sr-only">
        Projects
      </h2>

      <div className="sticky top-14 z-20 -mx-4 bg-paper/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <Filters projects={projects} value={filter} onChange={changeFilter} />
      </div>

      <p className="mt-4 flex items-center gap-2 pl-0.5 font-mono text-xs text-ink-3">
        <GitBranch size={14} aria-hidden="true" />
        main
      </p>

      <ol data-graph className="relative mt-2">
        <span
          data-rail
          aria-hidden="true"
          className="absolute top-0 bottom-6 left-[calc(0.75rem-1px)] w-0.5 origin-top rounded-full bg-line"
        />
        {projects.map((project) => {
          const accent: CSSProperties = { backgroundColor: project.accent };
          return (
            <li
              key={project.slug}
              data-item
              data-flip-id={project.slug}
              className={`relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 pb-4 ${
                visible.has(project.slug) ? '' : 'hidden'
              }`}
            >
              <div aria-hidden="true" className="relative">
                <span className="absolute top-6 left-[0.3rem]">
                  <span data-node className="relative block">
                    {project.status === 'live' && (
                      <span data-ping className="absolute inset-0 rounded-full opacity-0" style={accent} />
                    )}
                    <StatusNode status={project.status} color={project.accent} className="relative" />
                  </span>
                </span>
                <span
                  data-connector
                  className="absolute top-[1.875rem] left-[1.15rem] h-0.5 w-[1.1rem] origin-left rounded-full"
                  style={accent}
                />
              </div>
              <ProjectCard project={project} />
            </li>
          );
        })}
      </ol>
    </section>
  );
};
