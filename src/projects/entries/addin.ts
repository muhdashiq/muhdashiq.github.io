import type { Project } from '../types.ts';

export const project = {
  slug: 'addin',
  name: 'Addin.in',
  tagline: 'The story of the company I started in college',
  summary:
    'From 2010 to 2013 Addin brought small Kerala businesses online. The page ages as you scroll, from paper and ink to a glowing network.',
  status: 'live',
  url: 'https://muhdashiq.com/addin/',
  repo: 'addin',
  accent: '#e8590c',
  icon: 'store',
  kind: 'website',
  topics: ['kerala'],
  stack: ['react', 'typescript', 'vite', 'gsap', 'threejs'],
  order: 60,
} satisfies Project;
