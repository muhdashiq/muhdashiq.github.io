import { Moon, Search, Sun } from 'lucide-react';
import { siGithub } from 'simple-icons';
import { SEARCH_SHORTCUT } from '../lib/platform.ts';
import { useTheme } from '../lib/useTheme.ts';
import { BrandIcon } from './BrandIcon.tsx';

const iconButton =
  'grid size-10 place-items-center rounded-full text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink active:scale-95';

const ThemeToggle = () => {
  const [theme, setTheme] = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button type="button" onClick={() => setTheme(next)} aria-label={`Switch to ${next} theme`} className={iconButton}>
      <span className="relative size-[18px]">
        <Sun
          size={18}
          aria-hidden="true"
          className="absolute inset-0 transition-[opacity,scale] duration-300 dark:scale-50 dark:opacity-0"
        />
        <Moon
          size={18}
          aria-hidden="true"
          className="absolute inset-0 scale-50 opacity-0 transition-[opacity,scale] duration-300 dark:scale-100 dark:opacity-100"
        />
      </span>
    </button>
  );
};

type HeaderProps = { onSearch: () => void };

export const Header = ({ onSearch }: HeaderProps) => (
  <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/85 backdrop-blur-md">
    <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:px-6">
      <a
        href="#top"
        aria-label="Muhammed Ashiq, back to top"
        className="grid size-9 place-items-center rounded-full bg-ink text-[13px] font-semibold tracking-tight text-paper"
      >
        MA
      </a>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={onSearch}
          aria-label="Search projects"
          className="flex h-10 items-center gap-2 rounded-full px-3 text-sm text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink active:scale-95 sm:border sm:border-line"
        >
          <Search size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden font-sans text-xs text-ink-3 sm:inline">{SEARCH_SHORTCUT}</kbd>
        </button>
        <a href="https://github.com/muhdashiq" aria-label="GitHub profile" className={iconButton}>
          <BrandIcon icon={siGithub} className="size-[18px]" />
        </a>
        <ThemeToggle />
      </div>
    </div>
  </header>
);
