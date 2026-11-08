import type { Project } from './types.ts';

export const GITHUB_USER = 'muhdashiq';

export const codeUrl = (project: Project): string | undefined =>
  project.repo && !project.privateCode ? `https://github.com/${GITHUB_USER}/${project.repo}` : undefined;

/** Where a card goes when tapped: the live project, or its code when there's no site yet. */
export const openUrl = (project: Project): string | undefined => project.url ?? codeUrl(project);
