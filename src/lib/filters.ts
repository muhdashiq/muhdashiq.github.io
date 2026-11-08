import type { Project } from '../projects/types.ts';

type Filter = { id: string; label: string; matches: (project: Project) => boolean };

export const FILTERS = [
  { id: 'all', label: 'All', matches: () => true },
  { id: 'live', label: 'Live', matches: (project: Project) => project.status === 'live' },
  { id: 'apps', label: 'Apps', matches: (project: Project) => project.kind === 'app' },
  { id: 'websites', label: 'Websites', matches: (project: Project) => project.kind === 'website' },
  { id: 'ocean', label: 'Ocean', matches: (project: Project) => project.topics.includes('ocean') },
  { id: 'coming', label: 'In progress', matches: (project: Project) => project.status !== 'live' },
] as const satisfies readonly Filter[];

export type FilterId = (typeof FILTERS)[number]['id'];

export const filterById = (id: FilterId): Filter => FILTERS.find((filter) => filter.id === id) ?? FILTERS[0];
