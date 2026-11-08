import type { Project } from '../types.ts';

// TODO: replace the tagline and set `status: 'live'` with a `url` once
// the site is published.
export const project = {
  slug: 'onam-celebration',
  name: 'Onam Celebration',
  tagline: 'Coming soon',
  status: 'planned',
  repo: 'onam-celebration',
  privateCode: true,
  accent: '#f59f00',
  icon: 'flower',
  kind: 'event',
  topics: ['kerala'],
  stack: [],
  order: 100,
} satisfies Project;
