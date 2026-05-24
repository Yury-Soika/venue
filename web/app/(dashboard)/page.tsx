import Topbar from '@/components/dashboard/Topbar';
import { bookings, events, revenueData, stats, tables } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { CalendarDays, TrendingUp, Users, Zap, ArrowUpRight } from 'lucide-react';
import RevenueChart from '@/components/dashboard/RevenueChart';
import StatusBadge from '@/components/dashboard/StatusBadge';

export default function DashboardPage() {
  const todayBookings = bookings.filter(b => b.date === '2026-05-24' && b.status !== 'cancelled');
  const activeEvent = events.find(e => e.status === 'live');
  const occupiedTables = tables.filter(t => t.status === 'occupied' || t.status === 'reserved').length;

  return (
    <div>
      <Topbar title='Dashboard' subtitle='Saturday, May 24 — Neon Nights' />

      <div className='p-6 space-y-6'>
        {/* KPI Cards */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          <KpiCard
            label="Tonight's Bookings"
            value={String(todayBookings.length)}
            sub='2 pending confirmation'
            icon={<CalendarDays className='w-4 h-4' />}
            color='accent'
          />
          <KpiCard
            label='Revenue Today'
            value={formatCurrency(stats.todayRevenue)}
            sub='Bottles & covers'
            icon={<TrendingUp className='w-4 h-4' />}
            color='success'
          />
          <KpiCard
            label='Floor Capacity'
            value={`${stats.tonightCapacity}%`}
            sub={`${occupiedTables}/${tables.length} tables`}
            icon={<Users className='w-4 h-4' />}
            color='blue'
          />
          <KpiCard
            label='Live Event'
            value={activeEvent?.name ?? 'None'}
            sub={activeEvent ? `${activeEvent.ticketsSold}/${activeEvent.ticketsTotal} tickets` : '—'}
            icon={<Zap className='w-4 h-4' />}
            color='warning'
          />
        </div>

        {/* Chart + Upcoming Events */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 bg-surface border border-border rounded-2xl p-6'>
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h2 className='text-sm font-semibold text-foreground'>Weekly Revenue</h2>
                <p className='text-xs text-foreground-muted mt-0.5'>{formatCurrency(stats.weekRevenue)} this week</p>
              </div>
            </div>
            <RevenueChart data={revenueData} />
          </div>

          <div className='bg-surface border border-border rounded-2xl p-6'>
            <h2 className='text-sm font-semibold text-foreground mb-4'>Upcoming Events</h2>
            <div className='space-y-3'>
              {events.slice(0, 4).map(event => (
                <div key={event.id} className='flex items-start gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <Zap className='w-3.5 h-3.5 text-accent' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-foreground truncate'>{event.name}</p>
                    <p className='text-xs text-foreground-muted'>{event.date} · {event.dj}</p>
                  </div>
                  <StatusBadge status={event.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className='bg-surface border border-border rounded-2xl'>
          <div className='flex items-center justify-between px-6 py-4 border-b border-border'>
            <h2 className='text-sm font-semibold text-foreground'>Tonight&apos;s Bookings</h2>
            <a href='/bookings' className='text-xs text-accent hover:underline flex items-center gap-1'>
              View all <ArrowUpRight className='w-3 h-3' />
            </a>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-border'>
                  <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Guest</th>
                  <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Table</th>
                  <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Party</th>
                  <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Time</th>
                  <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Status</th>
                  <th className='text-right px-6 py-3 text-xs font-medium text-foreground-muted'>Spend</th>
                </tr>
              </thead>
              <tbody>
                {todayBookings.map((booking) => (
                  <tr key={booking.id} className='border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors'>
                    <td className='px-6 py-3.5'>
                      <p className='font-medium text-foreground'>{booking.guestName}</p>
                      <p className='text-xs text-foreground-muted'>{booking.guestEmail}</p>
                    </td>
                    <td className='px-6 py-3.5 text-foreground-muted font-mono text-xs'>{booking.table}</td>
                    <td className='px-6 py-3.5 text-foreground-muted'>{booking.partySize} guests</td>
                    <td className='px-6 py-3.5 text-foreground-muted'>{booking.time}</td>
                    <td className='px-6 py-3.5'><StatusBadge status={booking.status} /></td>
                    <td className='px-6 py-3.5 text-right text-foreground font-medium'>
                      {booking.totalSpend ? formatCurrency(booking.totalSpend) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, sub, icon, color }: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  color: 'accent' | 'success' | 'blue' | 'warning';
}) {
  const colorMap = {
    accent: 'bg-accent-soft text-accent',
    success: 'bg-success-soft text-success',
    blue: 'bg-blue-soft text-blue',
    warning: 'bg-warning-soft text-warning',
  };

  return (
    <div className='bg-surface border border-border rounded-2xl p-5'>
      <div className='flex items-center justify-between mb-3'>
        <p className='text-xs font-medium text-foreground-muted'>{label}</p>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      <p className='text-2xl font-bold text-foreground mb-1'>{value}</p>
      <p className='text-xs text-foreground-muted'>{sub}</p>
    </div>
  );
}
