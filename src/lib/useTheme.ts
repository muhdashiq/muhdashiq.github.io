import { useCallback, useState } from 'react';

export type Theme = 'light' | 'dark';

const currentTheme = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

/** The inline script in index.html applies the saved or system theme before first paint. */
export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(currentTheme);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be blocked (private mode). The theme still applies for this visit.
    }
    setThemeState(next);
  }, []);

  return [theme, setTheme] as const;
};
