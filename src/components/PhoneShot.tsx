import { type CSSProperties, useRef, useState } from 'react';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap.ts';
import { PROJECT_ICONS } from '../lib/icons.ts';
import { shotFor } from '../lib/shots.ts';
import type { Project } from '../projects/types.ts';

const PAN_SPEED = 42; // pixels per second, slow enough to read

type PhoneShotProps = { project: Project };

/**
 * A phone-shaped window onto the live project. When a screenshot was captured
 * at build time it slowly scrolls through the page while the card is on
 * screen; otherwise an illustrated placeholder in the project's colour shows.
 */
export const PhoneShot = ({ project }: PhoneShotProps) => {
  const shot = shotFor(project.slug);
  const screen = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const Icon = PROJECT_ICONS[project.icon];

  useGSAP(
    () => {
      const img = image.current;
      const frame = screen.current;
      if (!loaded || !img || !frame) return;
      const distance = img.offsetHeight - frame.clientHeight;
      if (distance < 40) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(img, {
          y: -distance,
          duration: distance / PAN_SPEED,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          repeatDelay: 1.6,
          delay: 1.2,
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' },
        });
      });
    },
    { dependencies: [loaded], scope: screen },
  );

  const tint: CSSProperties = {
    backgroundColor: `color-mix(in oklab, ${project.accent} 16%, var(--surface))`,
    color: project.accent,
  };

  return (
    <div
      aria-hidden="true"
      className={`w-24 shrink-0 self-start rounded-[1.35rem] bg-bezel p-[3px] sm:w-32 ${
        project.status === 'planned' ? 'opacity-60' : ''
      }`}
    >
      <div ref={screen} className="relative aspect-[9/19] overflow-hidden rounded-[1.15rem] bg-surface">
        {shot ? (
          <img
            ref={image}
            src={`${import.meta.env.BASE_URL}shots/${shot.file}`}
            width={shot.width}
            height={shot.height}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className="block h-auto w-full will-change-transform"
          />
        ) : (
          <div className="grid h-full place-items-center" style={tint}>
            <Icon size={30} strokeWidth={1.6} />
          </div>
        )}
        <span className="pointer-events-none absolute top-1.5 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-bezel/90" />
      </div>
    </div>
  );
};
