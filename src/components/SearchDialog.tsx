import { ArrowUpRight, Search } from 'lucide-react';
import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { PROJECT_ICONS } from '../lib/icons.ts';
import { searchProjects } from '../lib/search.ts';
import { openUrl } from '../projects/links.ts';
import type { Project } from '../projects/types.ts';

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
  projects: readonly Project[];
};

const optionId = (slug: string) => `search-option-${slug}`;

export const SearchDialog = ({ open, onClose, projects }: SearchDialogProps) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const results = useMemo(() => searchProjects(projects, query), [projects, query]);
  const activeProject = results[active];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  const go = (project: Project) => {
    const href = openUrl(project);
    if (href) window.location.assign(href);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter' && activeProject) {
      event.preventDefault();
      go(activeProject);
    }
  };

  return (
    <dialog
      ref={dialog}
      aria-label="Search projects"
      onClose={() => {
        setQuery('');
        setActive(0);
        onClose();
      }}
      // A click on the dialog itself (not its content) is a click on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className="mx-auto mt-[12vh] w-[min(calc(100vw_-_2rem),34rem)] overflow-hidden rounded-2xl border border-line bg-surface p-0 text-ink transition-[opacity,translate,display,overlay] transition-discrete duration-200 backdrop:bg-ink/30 backdrop:backdrop-blur-[2px] starting:open:-translate-y-2 starting:open:opacity-0 dark:backdrop:bg-black/50"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search size={18} aria-hidden="true" className="shrink-0 text-ink-3" />
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="search-results"
          aria-activedescendant={activeProject ? optionId(activeProject.slug) : undefined}
          aria-label="Search by name, stack or topic"
          placeholder="Try “ocean” or “React Native”"
          className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-3"
        />
        <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 font-sans text-xs text-ink-3 sm:block">Esc</kbd>
      </div>

      {results.length > 0 ? (
        <ul id="search-results" role="listbox" aria-label="Projects" className="max-h-[min(60vh,26rem)] overflow-y-auto p-2">
          {results.map((project, index) => {
            const Icon = PROJECT_ICONS[project.icon];
            const href = openUrl(project);
            return (
              <li
                key={project.slug}
                id={optionId(project.slug)}
                role="option"
                aria-selected={index === active}
                aria-disabled={!href}
                onMouseMove={() => setActive(index)}
                onClick={() => go(project)}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 aria-disabled:cursor-default aria-selected:bg-ink/[0.06]"
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-lg"
                  style={{ backgroundColor: `color-mix(in oklab, ${project.accent} 16%, transparent)`, color: project.accent }}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{project.name}</span>
                  <span className="block truncate text-sm text-ink-3">{project.tagline}</span>
                </span>
                {href && <ArrowUpRight size={16} aria-hidden="true" className="shrink-0 text-ink-3" />}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="px-4 py-8 text-center text-sm text-ink-2">
          Nothing matches “{query}”. Try a stack like React, or a topic like ocean.
        </p>
      )}
    </dialog>
  );
};
