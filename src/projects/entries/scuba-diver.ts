import type { Project } from '../types.ts';

export const project = {
  slug: 'scuba-diver',
  name: 'ScubaDive',
  tagline: 'Learn scuba theory, check your readiness and plan dives',
  summary:
    'Open Water to 17 specialties, image quizzes, marine weather and nearby dive centres you can message on WhatsApp.',
  status: 'live',
  url: 'https://muhdashiq.com/scuba-diver/',
  repo: 'scuba-diver',
  accent: '#0ca678',
  icon: 'fish',
  kind: 'app',
  topics: ['ocean'],
  stack: ['react', 'typescript', 'vite', 'tailwind', 'motion'],
  // Skip the welcome dialog so the screenshot shows the home screen.
  screenshotStorage: { 'scubadive-state': JSON.stringify({ state: { onboarded: true }, version: 2 }) },
  order: 50,
} satisfies Project;
