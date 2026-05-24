import Topbar from '@/components/dashboard/Topbar';
import { revenueData, stats, guests, events } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import RevenueChart from '@/components/dashboard/RevenueChart';

export default function AnalyticsPage() {
  const topGuests = [...guests].sort((a, b) => b.totalSpend - a.totalSpend).slice(0, 5);
  const completedEvents = events.filter(e => e.status === 'completed' || e.status === 'live');

  return (
    <div>
      <Topbar title='Analytics' subtitle='Revenue, occupancy and performance insights' />
      <div className='p-6 space-y-6'>
        {/* Summary stats */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {[
            { label: 'Week Revenue', value: formatCurrency(stats.weekRevenue) },
            { label: 'Avg per Night', value: formatCurrency(Math.round(stats.weekRevenue / 7)) },
            { label: 'Total Guests', value: guests.length.toString() },
            { label: 'Events This Month', value: events.length.toString() },
          ].map(({ label, value }) => (
            <div key={label} className='bg-surface border border-border rounded-2xl p-5'>
              <p className='text-xs text-foreground-muted mb-2'>{label}</p>
              <p className='text-2xl font-bold text-foreground'>{value}</p>
            </div>
          ))}
        </div>

        {/* Revenue chart */}
        <div className='bg-surface border border-border rounded-2xl p-6'>
          <h2 className='text-sm font-semibold text-foreground mb-6'>Revenue This Week</h2>
          <RevenueChart data={revenueData} />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Top spenders */}
          <div className='bg-surface border border-border rounded-2xl p-6'>
            <h2 className='text-sm font-semibold text-foreground mb-4'>Top Spenders</h2>
            <div className='space-y-3'>
              {topGuests.map((guest, i) => (
                <div key={guest.id} className='flex items-center gap-3'>
                  <span className='text-xs font-bold text-foreground-subtle w-4'>{i + 1}</span>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-foreground'>{guest.name}</p>
                    <p className='text-xs text-foreground-muted'>{guest.visits} visits</p>
                  </div>
                  <span className='text-sm font-semibold text-foreground'>{formatCurrency(guest.totalSpend)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Event performance */}
          <div className='bg-surface border border-border rounded-2xl p-6'>
            <h2 className='text-sm font-semibold text-foreground mb-4'>Event Performance</h2>
            <div className='space-y-4'>
              {completedEvents.map((event) => {
                const pct = Math.round((event.ticketsSold / event.ticketsTotal) * 100);
                return (
                  <div key={event.id}>
                    <div className='flex justify-between text-xs mb-1.5'>
                      <span className='font-medium text-foreground'>{event.name}</span>
                      <span className='text-foreground-muted'>{formatCurrency(event.revenue)}</span>
                    </div>
                    <div className='h-1.5 bg-surface-2 rounded-full overflow-hidden'>
                      <div className='h-full bg-accent rounded-full' style={{ width: `${pct}%` }} />
                    </div>
                    <p className='text-xs text-foreground-subtle mt-1'>{pct}% capacity</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
