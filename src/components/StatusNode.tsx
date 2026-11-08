import type { CSSProperties } from 'react';
import type { ProjectStatus } from '../projects/types.ts';

type StatusNodeProps = {
  status: ProjectStatus;
  /** Defaults to the current text colour. */
  color?: string;
  className?: string;
};

/**
 * The graph's commit dot. Its shape carries the status, so it reads without
 * colour: filled is live, a thick ring is in progress, a dashed ring is planned.
 */
export const StatusNode = ({ status, color = 'currentColor', className = '' }: StatusNodeProps) => {
  const style: CSSProperties = status === 'live' ? { backgroundColor: color } : { borderColor: color };
  const shape =
    status === 'live' ? '' : status === 'building' ? 'border-[3px] bg-paper' : 'border-2 border-dashed bg-paper';

  return <span aria-hidden="true" className={`block size-3.5 rounded-full ${shape} ${className}`} style={style} />;
};

export const STATUS_LABEL: Readonly<Record<ProjectStatus, string>> = {
  live: 'Live',
  building: 'In progress',
  planned: 'Planned',
};
