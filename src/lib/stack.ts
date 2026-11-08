import {
  type SimpleIcon,
  siCloudflare,
  siExpo,
  siPwa,
  siReact,
  siSupabase,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVite,
} from 'simple-icons';
import type { StackId } from '../projects/types.ts';

type StackItem = { label: string; icon?: SimpleIcon };

export const STACK: Readonly<Record<StackId, StackItem>> = {
  react: { label: 'React', icon: siReact },
  'react-native': { label: 'React Native', icon: siReact },
  expo: { label: 'Expo', icon: siExpo },
  typescript: { label: 'TypeScript', icon: siTypescript },
  vite: { label: 'Vite', icon: siVite },
  tailwind: { label: 'Tailwind CSS', icon: siTailwindcss },
  gsap: { label: 'GSAP' },
  motion: { label: 'Motion' },
  threejs: { label: 'Three.js', icon: siThreedotjs },
  supabase: { label: 'Supabase', icon: siSupabase },
  cloudflare: { label: 'Cloudflare', icon: siCloudflare },
  pwa: { label: 'Installable app', icon: siPwa },
};
