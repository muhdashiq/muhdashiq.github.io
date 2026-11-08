import { FILTERS, type FilterId } from '../lib/filters.ts';
import type { Project } from '../projects/types.ts';

type FiltersProps = {
  projects: readonly Project[];
  value: FilterId;
  onChange: (id: FilterId) => void;
};

export const Filters = ({ projects, value, onChange }: FiltersProps) => {
  const options = FILTERS.map((filter) => ({
    ...filter,
    count: projects.filter(filter.matches).length,
  })).filter(({ count }) => count > 0);

  return (
    <div
      role="group"
      aria-label="Filter projects"
      className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {options.map(({ id, label, count }) => (
        <button
          key={id}
          type="button"
          aria-pressed={value === id}
          onClick={() => onChange(id)}
          className="group flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-sm text-ink-2 transition-[background-color,color,border-color,scale] duration-200 hover:text-ink active:scale-95 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
        >
          {label}
          <span className="text-xs text-ink-3 tabular-nums group-aria-pressed:text-paper/70">{count}</span>
        </button>
      ))}
    </div>
  );
};
