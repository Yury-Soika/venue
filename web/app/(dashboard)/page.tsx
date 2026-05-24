'use client';

import { useEffect, useState } from 'react';
import Topbar from '@/components/dashboard/Topbar';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { CalendarDays, TrendingUp, Users, Zap, ArrowUpRight } from 'lucide-react';
import RevenueChart from '@/components/dashboard/RevenueChart';
import StatusBadge from '@/components/dashboard/StatusBadge';

const MOCK_REVENUE = [
  { day: 'Mon', revenue: 4200 }, { day: 'Tue', revenue: 3800 },
  { day: 'Wed', revenue: 5100 }, { day: 'Thu', revenue: 6400 },
  { day: 'Fri', revenue: 9800 }, { day: 'Sat', revenue: 12400 },
  { day: 'Sun', revenue: 7200 },
];

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getAnalyticsSummary(),
      api.getBookings(new Date().toISOString().split('T')[0]),
    ]).then(([s, b]) => {
      setSummary(s);
      setBookings(b);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div>
      <Topbar title='Dashboard' subtitle='Loading...' />
      <div className='p-6 flex items-center justify-center h-64'>
        <div className='w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin' />
      </div>
    </div>
  );

  return (
    <div>
      <Topbar title='Dashboard' subtitle={`${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}${summary?.liveEvent ? ` — ${summary.liveEvent.name}` : ''}`} />
      <div className='p-6 space-y-6'>

        {/* KPI Cards */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          <KpiCard label="Tonight's Bookings" value={String(summary?.todayBookings ?? 0)} sub='Active reservations' icon={<CalendarDays className='w-4 h-4' />} color='accent' />
          <KpiCard label='Revenue Today' value={formatCurrency(summary?.todayRevenue ?? 0)} sub='Bottles & covers' icon={<TrendingUp className='w-4 h-4' />} color='success' />
          <KpiCard label='Floor Capacity' value={`${summary?.capacityPct ?? 0}%`} sub={`${summary?.occupiedTables ?? 0}/${summary?.totalTables ?? 0} tables`} icon={<Users className='w-4 h-4' />} color='blue' />
          <KpiCard label='Live Event' value={summary?.liveEvent?.name ?? 'None'} sub={summary?.liveEvent ? `${summary.liveEvent.ticketsSold}/${summary.liveEvent.ticketsTotal} tickets` : '—'} icon={<Zap className='w-4 h-4' />} color='warning' />
        </div>

        {/* Chart + Events */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 bg-surface border border-border rounded-2xl p-6'>
            <div className='mb-6'>
              <h2 className='text-sm font-semibold text-foreground'>Weekly Revenue</h2>
              <p className='text-xs text-foreground-muted mt-0.5'>{formatCurrency(MOCK_REVENUE.reduce((s, d) => s + d.revenue, 0))} this week</p>
            </div>
            <RevenueChart data={MOCK_REVENUE} />
          </div>

          <div className='bg-surface border border-border rounded-2xl p-6'>
            <h2 className='text-sm font-semibold text-foreground mb-4'>Top Guests</h2>
            <div className='space-y-3'>
              {(summary?.topGuests ?? []).map((g: any, i: number) => (
                <div key={g.id} className='flex items-center gap-3'>
                  <span className='text-xs font-bold text-foreground-subtle w-4'>{i + 1}</span>
                  <div className='w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0'>
                    <span className='text-xs font-bold text-accent'>{g.name[0]}</span>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-foreground truncate'>{g.name}</p>
                    <p className='text-xs text-foreground-muted'>{g.visits} visits</p>
                  </div>
                  <span className='text-xs font-semibold text-foreground'>{formatCurrency(g.totalSpend)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tonight's Bookings */}
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
                  {['Guest', 'Table', 'Party', 'Time', 'Status', 'Spend'].map(h => (
                    <th key={h} className={`px-6 py-3 text-xs font-medium text-foreground-muted ${h === 'Spend' ? 'text-right' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr><td colSpan={6} className='px-6 py-8 text-center text-sm text-foreground-muted'>No bookings for today</td></tr>
                ) : bookings.map((b: any) => (
                  <tr key={b.id} className='border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors'>
                    <td className='px-6 py-3.5'>
                      <p className='font-medium text-foreground'>{b.guestName}</p>
                      <p className='text-xs text-foreground-muted'>{b.guestEmail}</p>
                    </td>
                    <td className='px-6 py-3.5 font-mono text-xs text-foreground-muted'>{b.table}</td>
                    <td className='px-6 py-3.5 text-foreground-muted'>{b.partySize}</td>
                    <td className='px-6 py-3.5 text-foreground-muted'>{b.time}</td>
                    <td className='px-6 py-3.5'><StatusBadge status={b.status} /></td>
                    <td className='px-6 py-3.5 text-right font-medium text-foreground'>
                      {b.totalSpend > 0 ? formatCurrency(b.totalSpend) : '—'}
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

function KpiCard({ label, value, sub, icon, color }: { label: string; value: string; sub: string; icon: React.ReactNode; color: 'accent' | 'success' | 'blue' | 'warning' }) {
  const colorMap = { accent: 'bg-accent-soft text-accent', success: 'bg-success-soft text-success', blue: 'bg-blue-soft text-blue', warning: 'bg-warning-soft text-warning' };
  return (
    <div className='bg-surface border border-border rounded-2xl p-5'>
      <div className='flex items-center justify-between mb-3'>
        <p className='text-xs font-medium text-foreground-muted'>{label}</p>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${colorMap[color]}`}>{icon}</div>
      </div>
      <p className='text-2xl font-bold text-foreground mb-1'>{value}</p>
      <p className='text-xs text-foreground-muted'>{sub}</p>
    </div>
  );
}
