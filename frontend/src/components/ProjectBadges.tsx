import type { ProjectBadge } from '@/types';

/** Engineering signal chips — the things a technical recruiter scans for. */
export function EngineeringBadges({ badges }: { badges?: ProjectBadge[] }) {
  if (!badges || badges.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {badges.map((b) => (
        <li
          key={b}
          className="rounded-md border border-accent/25 bg-accent/5 px-2 py-0.5 font-mono text-[11px] font-medium text-accent"
        >
          {b}
        </li>
      ))}
    </ul>
  );
}
