import type { Project } from './types.ts';

// Every file in ./entries is picked up automatically. To add a project,
// copy an entry, rename it and edit the fields.
const entries = import.meta.glob<Project>('./entries/*.ts', { eager: true, import: 'project' });

export const projects: readonly Project[] = [...Object.values(entries)].sort((a, b) => a.order - b.order);
