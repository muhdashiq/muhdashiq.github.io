import type { Project } from '../types.ts';

export const project = {
  slug: 'phuket-dive-26',
  name: 'Phuket Dive Week',
  tagline: 'A day-by-day planner for a week of diving in Phuket',
  summary:
    'Live weather, checklists, operators and costs for every dive day, in an iOS-style app that keeps your notes on your phone.',
  status: 'live',
  url: 'https://muhdashiq.com/phuket-dive-26/',
  repo: 'phuket-dive-26',
  accent: '#1c7ed6',
  icon: 'calendar',
  kind: 'app',
  topics: ['ocean', 'travel'],
  stack: ['react', 'typescript', 'vite', 'pwa'],
  order: 40,
} satisfies Project;
