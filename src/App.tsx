import { useEffect, useState } from 'react';
import { Footer } from './components/Footer.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ProjectGraph } from './components/ProjectGraph.tsx';
import { SearchDialog } from './components/SearchDialog.tsx';
import { projects } from './projects/index.ts';

const isTyping = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement && target.closest('input, textarea, select, [contenteditable="true"]') !== null;

export const App = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const commandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const slash = event.key === '/' && !isTyping(event.target);
      if (!commandK && !slash) return;
      event.preventDefault();
      setSearchOpen(true);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to projects
      </a>
      <Header onSearch={() => setSearchOpen(true)} />
      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:grid lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-16">
        <Hero projects={projects} />
        <ProjectGraph projects={projects} />
      </main>
      <Footer />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} projects={projects} />
    </>
  );
};
