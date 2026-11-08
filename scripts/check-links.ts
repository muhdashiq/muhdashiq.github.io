// Checks that every project link still opens. Runs weekly in CI; a failure
// emails the repo owner through GitHub's usual workflow notifications.
import { codeUrl } from '../src/projects/links.ts';
import { loadProjects } from './load-projects.ts';

const projects = await loadProjects();
const links = projects.flatMap((project) =>
  [project.url, codeUrl(project)].filter((url): url is string => Boolean(url)).map((url) => ({ project, url })),
);

const results = await Promise.all(
  links.map(async ({ project, url }) => {
    try {
      const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20_000) });
      return { name: project.name, url, ok: response.ok, detail: String(response.status) };
    } catch (error) {
      return { name: project.name, url, ok: false, detail: error instanceof Error ? error.message : String(error) };
    }
  }),
);

for (const { name, url, ok, detail } of results) console.log(`${ok ? 'ok    ' : 'BROKEN'} ${detail.padEnd(5)} ${name}: ${url}`);

const broken = results.filter(({ ok }) => !ok);
if (broken.length > 0) {
  console.error(`\n${broken.length} broken link(s). Fix the entry in src/projects/entries/.`);
  process.exitCode = 1;
}
