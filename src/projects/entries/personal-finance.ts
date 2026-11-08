import type { Project } from '../types.ts';

export const project = {
  slug: 'personal-finance',
  name: 'Family Finance',
  tagline: 'One place for a household’s spending, accounts and cards',
  summary:
    'Track money together as a family while private items stay private. Keeps working offline and syncs when you reconnect.',
  status: 'building',
  repo: 'personal-finance',
  accent: '#7048e8',
  icon: 'wallet',
  kind: 'app',
  topics: ['finance'],
  stack: ['react-native', 'expo', 'typescript', 'supabase'],
  order: 30,
} satisfies Project;
