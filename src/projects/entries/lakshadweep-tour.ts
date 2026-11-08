import type { Project } from '../types.ts';

export const project = {
  slug: 'lakshadweep-tour',
  name: 'Lakshadweep Escapes',
  tagline: 'Island tour packages with diving, snorkeling and stays',
  summary:
    'Packages with permits, stays and meals included, a memory wall of trips, and sea sounds generated in the browser.',
  status: 'live',
  url: 'https://muhdashiq.com/lakshadweep-tour/',
  repo: 'lakshadweep-tour',
  accent: '#1098ad',
  icon: 'sailboat',
  kind: 'website',
  topics: ['ocean', 'travel'],
  stack: ['react', 'typescript', 'vite', 'motion'],
  order: 80,
} satisfies Project;
