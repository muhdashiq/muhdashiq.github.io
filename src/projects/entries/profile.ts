import type { Project } from '../types.ts';

export const project = {
  slug: 'profile',
  name: 'Profile',
  tagline: 'Who I am, where I’ve worked and how I lead teams',
  summary:
    'Sixteen years of distributed systems and engineering leadership across Docusign, Amazon and Oracle, with my résumé to download.',
  status: 'live',
  url: 'https://muhdashiq.com/profile/',
  repo: 'profile',
  accent: '#4263eb',
  icon: 'user',
  kind: 'website',
  topics: [],
  stack: ['react', 'typescript', 'vite', 'tailwind', 'motion'],
  order: 10,
} satisfies Project;
