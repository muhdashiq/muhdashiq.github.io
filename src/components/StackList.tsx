import { STACK } from '../lib/stack.ts';
import type { StackId } from '../projects/types.ts';
import { BrandIcon } from './BrandIcon.tsx';

type StackListProps = { stack: readonly StackId[] };

export const StackList = ({ stack }: StackListProps) => {
  if (stack.length === 0) return null;

  return (
    <ul aria-label="Built with" className="mt-3 flex flex-wrap gap-1.5">
      {stack.map((id) => {
        const { label, icon } = STACK[id];
        return (
          <li
            key={id}
            className="flex h-6 items-center gap-1.5 rounded-md bg-ink/[0.05] px-2 text-xs text-ink-2 dark:bg-ink/[0.07]"
          >
            {icon && <BrandIcon icon={icon} className="size-3" />}
            {/* On phones a logo stands alone; the name is still read out. */}
            <span className={icon ? 'sr-only sm:not-sr-only' : ''}>{label}</span>
          </li>
        );
      })}
    </ul>
  );
};
