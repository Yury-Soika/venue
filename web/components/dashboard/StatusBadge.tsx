import { cn } from '@/lib/utils';

type Status = string;

const statusConfig: Record<string, { label: string; className: string }> = {
  confirmed:  { label: 'Confirmed',  className: 'bg-success-soft text-success' },
  pending:    { label: 'Pending',    className: 'bg-warning-soft text-warning' },
  cancelled:  { label: 'Cancelled',  className: 'bg-danger-soft text-danger' },
  seated:     { label: 'Seated',     className: 'bg-blue-soft text-blue' },
  completed:  { label: 'Completed',  className: 'bg-surface-2 text-foreground-muted' },
  upcoming:   { label: 'Upcoming',   className: 'bg-accent-soft text-accent' },
  live:       { label: 'Live',       className: 'bg-success-soft text-success' },
  'sold-out': { label: 'Sold Out',   className: 'bg-warning-soft text-warning' },
  active:     { label: 'Active',     className: 'bg-success-soft text-success' },
  'off-duty': { label: 'Off Duty',   className: 'bg-surface-2 text-foreground-muted' },
  'on-leave': { label: 'On Leave',   className: 'bg-warning-soft text-warning' },
  available:  { label: 'Available',  className: 'bg-success-soft text-success' },
  occupied:   { label: 'Occupied',   className: 'bg-danger-soft text-danger' },
  reserved:   { label: 'Reserved',   className: 'bg-accent-soft text-accent' },
  maintenance:{ label: 'Maintenance',className: 'bg-warning-soft text-warning' },
  vip:        { label: 'VIP',        className: 'bg-accent-soft text-accent' },
  regular:    { label: 'Regular',    className: 'bg-surface-2 text-foreground-muted' },
  blacklist:  { label: 'Blacklist',  className: 'bg-danger-soft text-danger' },
};

export default function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status] ?? { label: status, className: 'bg-surface-2 text-foreground-muted' };
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', config.className)}>
      {config.label}
    </span>
  );
}
