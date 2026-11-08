import captured from '../generated/shots.json';

export type Shot = { file: string; width: number; height: number };

// Written by scripts/capture-shots.ts during the build. Empty locally, so
// cards fall back to an illustrated placeholder.
const shots: Readonly<Record<string, Shot | undefined>> = captured;

export const shotFor = (slug: string): Shot | undefined => shots[slug];
