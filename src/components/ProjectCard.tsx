import { ArrowUpRight, Lock } from 'lucide-react';
import type { CSSProperties } from 'react';
import { siGithub } from 'simple-icons';
import { codeUrl, openUrl } from '../projects/links.ts';
import type { Project } from '../projects/types.ts';
import { BrandIcon } from './BrandIcon.tsx';
import { PhoneShot } from './PhoneShot.tsx';
import { StackList } from './StackList.tsx';
import { STATUS_LABEL, StatusNode } from './StatusNode.tsx';

type ProjectCardProps = { project: Project };

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const href = openUrl(project);
  const code = codeUrl(project);
  const planned = project.status === 'planned';
  const accent: CSSProperties & Record<'--accent', string> = { '--accent': project.accent };

  return (
    <article
      data-card
      style={accent}
      className={`group relative flex gap-4 rounded-2xl border p-4 transition-[border-color,scale] duration-200 sm:gap-6 sm:p-5 ${
        planned
          ? 'border-dashed border-line'
          : 'border-line bg-surface hover:border-[color-mix(in_oklab,var(--accent)_55%,var(--line))] has-[a:active]:scale-[0.99]'
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start gap-2">
          <h3 className="text-lg leading-tight font-semibold tracking-[-0.015em] sm:text-xl">
            {href ? (
              // The stretched link makes the whole card open the project.
              <a
                href={href}
                className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-(--accent)"
              >
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>
          {href && (
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="mt-0.5 ml-auto shrink-0 text-ink-3 transition-[translate,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent)"
            />
          )}
        </div>
        <p className="mt-0.5 truncate font-mono text-xs text-ink-3">{project.slug}</p>

        <p className="mt-2.5 text-[15px] leading-snug text-pretty text-ink-2">{project.tagline}</p>
        {project.summary && (
          <p className="mt-2 hidden max-w-[60ch] text-sm leading-relaxed text-pretty text-ink-3 sm:block">
            {project.summary}
          </p>
        )}

        <StackList stack={project.stack} />

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-sm text-ink-2">
          <span className="flex items-center gap-1.5">
            <StatusNode status={project.status} color={project.accent} className="size-2.5" />
            {STATUS_LABEL[project.status]}
          </span>
          {code ? (
            // Sits above the stretched link so it stays separately tappable.
            <a
              href={code}
              className="relative z-10 -my-2 flex items-center gap-1.5 rounded-full py-2 text-ink-2 underline-offset-4 hover:text-ink hover:underline"
            >
              <BrandIcon icon={siGithub} className="size-3.5" />
              Code
            </a>
          ) : (
            project.privateCode && (
              <span className="flex items-center gap-1.5 text-ink-3">
                <Lock size={13} aria-hidden="true" />
                Private code
              </span>
            )
          )}
        </div>
      </div>

      <PhoneShot project={project} />
    </article>
  );
};
