import type { Project } from '../projects/types.ts';
import { STACK } from './stack.ts';

const haystack = (project: Project): string =>
  [
    project.name,
    project.slug,
    project.tagline,
    project.summary ?? '',
    project.kind,
    ...project.topics,
    ...project.stack.map((id) => STACK[id].label),
  ]
    .join(' ')
    .toLowerCase();

/** Every word in the query has to appear somewhere in the project. */
export const searchProjects = (projects: readonly Project[], query: string): readonly Project[] => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return projects;
  return projects.filter((project) => {
    const text = haystack(project);
    return words.every((word) => text.includes(word));
  });
};
