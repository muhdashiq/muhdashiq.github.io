import { readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { Project } from '../src/projects/types.ts';

const entriesDir = fileURLToPath(new URL('../src/projects/entries/', import.meta.url));

/** Reads every project entry the same way the site does, for use in Node scripts. */
export const loadProjects = async (): Promise<readonly Project[]> => {
  const files = (await readdir(entriesDir)).filter((file) => file.endsWith('.ts')).sort();
  const modules: { project: Project }[] = await Promise.all(
    files.map((file) => import(pathToFileURL(entriesDir + file).href)),
  );
  return modules.map((module) => module.project).sort((a, b) => a.order - b.order);
};
