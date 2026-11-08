// The shape of one project entry. Every file in ./entries exports `project`
// typed as this, and the build fails if a required field is missing or wrong.

export type ProjectStatus = 'live' | 'building' | 'planned';

export type ProjectKind = 'app' | 'website' | 'tool' | 'event';

export type ProjectTopic = 'ocean' | 'travel' | 'kerala' | 'health' | 'finance';

export type StackId =
  | 'react'
  | 'react-native'
  | 'expo'
  | 'typescript'
  | 'vite'
  | 'tailwind'
  | 'gsap'
  | 'motion'
  | 'threejs'
  | 'supabase'
  | 'cloudflare'
  | 'pwa';

export type ProjectIcon =
  | 'user'
  | 'leaf'
  | 'wallet'
  | 'calendar'
  | 'fish'
  | 'store'
  | 'sparkles'
  | 'sailboat'
  | 'timer'
  | 'flower';

type ProjectBase = {
  /** The repo name. Also names the screenshot file. */
  slug: string;
  name: string;
  /** One line, about 60 characters. Shown on every card. */
  tagline: string;
  /** One or two sentences. Shown on wider screens and matched by search. */
  summary?: string;
  /** The project's own colour, used for its node, connector and placeholder. */
  accent: `#${string}`;
  icon: ProjectIcon;
  kind: ProjectKind;
  topics: readonly ProjectTopic[];
  stack: readonly StackId[];
  /** Position in the list. Lower comes first. */
  order: number;
  /** Repo name under github.com/muhdashiq, for the code link. */
  repo?: string;
  /** Set when the repo is private, so the card shows "Private code" instead of a link. */
  privateCode?: boolean;
  /**
   * Browser storage to set before the build takes this project's screenshot,
   * usually to skip a first-launch welcome screen so the card shows the app.
   */
  screenshotStorage?: Readonly<Record<string, string>>;
};

/** A live project must have a URL. A planned one has nothing to open yet. */
export type Project =
  | (ProjectBase & { status: 'live'; url: string })
  | (ProjectBase & { status: 'building'; url?: string })
  | (ProjectBase & { status: 'planned'; url?: never });
