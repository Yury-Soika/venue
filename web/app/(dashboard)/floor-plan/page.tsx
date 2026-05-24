import Topbar from '@/components/dashboard/Topbar';
import { tables } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  available: 'bg-success-soft border-success/30 text-success',
  occupied: 'bg-danger-soft border-danger/30 text-danger',
  reserved: 'bg-accent-soft border-accent/30 text-accent',
  maintenance: 'bg-warning-soft border-warning/30 text-warning',
};

const sections = ['vip', 'main', 'bar', 'terrace'] as const;

export default function FloorPlanPage() {
  return (
    <div>
      <Topbar title='Floor Plan' subtitle='Live table status and layout' />
      <div className='p-6 space-y-6'>
        {/* Legend */}
        <div className='flex flex-wrap gap-4'>
          {[
            { status: 'available', label: 'Available' },
            { status: 'occupied', label: 'Occupied' },
            { status: 'reserved', label: 'Reserved' },
            { status: 'maintenance', label: 'Maintenance' },
          ].map(({ status, label }) => (
            <div key={status} className='flex items-center gap-2'>
              <div className={cn('w-3 h-3 rounded border', statusColors[status])} />
              <span className='text-xs text-foreground-muted'>{label}</span>
            </div>
          ))}
        </div>

        {/* Sections */}
        {sections.map(section => {
          const sectionTables = tables.filter(t => t.section === section);
          return (
            <div key={section} className='bg-surface border border-border rounded-2xl p-6'>
              <h3 className='text-sm font-semibold text-foreground mb-4 capitalize'>{section} Section</h3>
              <div className='flex flex-wrap gap-3'>
                {sectionTables.map(table => (
                  <div
                    key={table.id}
                    className={cn(
                      'flex flex-col items-center justify-center w-20 h-20 rounded-xl border-2 cursor-pointer transition-all hover:scale-105',
                      statusColors[table.status]
                    )}
                  >
                    <span className='text-xs font-bold'>{table.number}</span>
                    <span className='text-xs opacity-70'>{table.capacity}p</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
