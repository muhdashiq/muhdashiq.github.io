# muhdashiq.com

The catalog of everything I build, live at [muhdashiq.com](https://muhdashiq.com). Each project is a
commit on a `main` graph; tapping one opens the live project. My profile and résumé moved to
[muhdashiq.com/profile](https://muhdashiq.com/profile/) ([repo](https://github.com/muhdashiq/profile)).

Built with Vite, React 19, TypeScript, Tailwind CSS 4 and GSAP.

## Add a project

1. Copy any file in [`src/projects/entries/`](src/projects/entries/) and name it after the repo, for
   example `my-new-app.ts`.
2. Edit the fields. The types in [`src/projects/types.ts`](src/projects/types.ts) explain each one,
   and the build fails if something required is missing:
   - `status`: `'live'` needs a `url`; `'building'` and `'planned'` don't.
   - `order`: lower numbers come first. Entries use steps of 10, so you can slot one in between.
   - `accent`: the project's own colour, used for its commit dot and placeholder.
   - `icon` and `stack`: pick from the lists in `types.ts`. To add a new one, add it to the list and
     to [`src/lib/icons.ts`](src/lib/icons.ts) or [`src/lib/stack.ts`](src/lib/stack.ts).
   - `privateCode: true` hides the code link for a private repo.
3. Push to `main`. The site rebuilds, takes a fresh phone screenshot of the new project and goes
   live in a couple of minutes.

## Screenshots

There are no screenshots in the repo. On every build,
[`scripts/capture-shots.ts`](scripts/capture-shots.ts) opens each live project at phone size and
saves a picture for its card. A project that can't be reached keeps an illustrated placeholder, and
the build carries on. Locally you'll see the placeholders.

## Run it locally

You need Node 22.6 or newer.

```bash
npm install
npm run dev
```

| Command               | What it does                                            |
| --------------------- | ------------------------------------------------------- |
| `npm run dev`         | Starts the dev server                                   |
| `npm run build`       | Type-checks and builds into `dist/`                     |
| `npm run preview`     | Serves the build                                        |
| `npm run shots`       | Captures phone screenshots of the live projects         |
| `npm run check-links` | Checks that every project and code link opens           |

## Deploy

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds every push. Pushes to `main`
are published to the `gh-pages` branch, which GitHub Pages serves with the `muhdashiq.com` domain
from [`public/CNAME`](public/CNAME). Pushes to other branches publish the build and its log to the
`ci-preview` branch so a change can be checked before it goes live.

A second workflow opens every project link each Monday and fails if one is broken, so GitHub emails
you.

## Old links

`muhdashiq.com/resume.pdf` still works: the file stays in `public/` because it's linked from
elsewhere. The current copy is on the profile site.
