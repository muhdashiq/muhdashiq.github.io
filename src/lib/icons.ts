import {
  CalendarRange,
  Fish,
  Flower2,
  Leaf,
  type LucideIcon,
  Sailboat,
  Sparkles,
  Store,
  Timer,
  UserRound,
  Wallet,
} from 'lucide-react';
import type { ProjectIcon } from '../projects/types.ts';

export const PROJECT_ICONS: Readonly<Record<ProjectIcon, LucideIcon>> = {
  user: UserRound,
  leaf: Leaf,
  wallet: Wallet,
  calendar: CalendarRange,
  fish: Fish,
  store: Store,
  sparkles: Sparkles,
  sailboat: Sailboat,
  timer: Timer,
  flower: Flower2,
};
