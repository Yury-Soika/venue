import Topbar from '@/components/dashboard/Topbar';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { events } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { Zap } from 'lucide-react';

export default function EventsPage() {
  return (
    <div>
      <Topbar title='Events' subtitle='Upcoming nights and performances' />
      <div className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <p className='text-sm text-foreground-muted'>{events.length} events scheduled</p>
          <button className='px-4 py-1.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors'>
            + Create Event
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
          {events.map((event) => {
            const pct = Math.round((event.ticketsSold / event.ticketsTotal) * 100);
            return (
              <div key={event.id} className='bg-surface border border-border rounded-2xl p-5 hover:border-border-hover transition-colors cursor-pointer'>
                <div className='flex items-start justify-between mb-3'>
                  <div className='w-9 h-9 rounded-xl bg-accent-soft flex items-center justify-center'>
                    <Zap className='w-4 h-4 text-accent' />
                  </div>
                  <StatusBadge status={event.status} />
                </div>
                <h3 className='font-semibold text-foreground mb-1'>{event.name}</h3>
                <p className='text-xs text-foreground-muted mb-3'>{event.date} · {event.time} · {event.dj}</p>
                <p className='text-xs text-foreground-muted mb-4 line-clamp-2'>{event.description}</p>

                {/* Ticket bar */}
                <div className='mb-3'>
                  <div className='flex justify-between text-xs text-foreground-muted mb-1.5'>
                    <span>{event.ticketsSold} sold</span>
                    <span>{pct}%</span>
                  </div>
                  <div className='h-1.5 bg-surface-2 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-accent rounded-full transition-all'
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className='flex items-center justify-between pt-3 border-t border-border'>
                  <span className='text-xs text-foreground-muted'>${event.coverCharge} cover</span>
                  <span className='text-sm font-semibold text-foreground'>{formatCurrency(event.revenue)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
