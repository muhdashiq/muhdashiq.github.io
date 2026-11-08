import type { Project } from '../types.ts';

export const project = {
  slug: 'banana-leaf',
  name: 'Banana Leaf',
  tagline: 'A calorie and nutrition tracker that knows Kerala meals',
  summary:
    'Snap a meal and get calories and macros from the AI model you choose. Works offline and keeps everything on your phone.',
  status: 'live',
  url: 'https://muhdashiq.com/banana-leaf/',
  repo: 'banana-leaf',
  privateCode: true,
  accent: '#2f9e44',
  icon: 'leaf',
  kind: 'app',
  topics: ['kerala', 'health'],
  stack: ['react', 'typescript', 'vite', 'pwa', 'cloudflare'],
  order: 20,
} satisfies Project;
