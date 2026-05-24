'use client';

import { useState, useEffect } from 'react';
import Topbar from '@/components/dashboard/Topbar';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import RevenueChart from '@/components/dashboard/RevenueChart';

const MOCK_REVENUE = [
  { day: 'Mon', revenue: 4200 }, { day: 'Tue', revenue: 3800 },
  { day: 'Wed', revenue: 5100 }, { day: 'Thu', revenue: 6400 },
  { day: 'Fri', revenue: 9800 }, { day: 'Sat', revenue: 12400 },
  { day: 'Sun', revenue: 7200 },
];

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnalyticsSummary().then(setSummary).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div>
      <Topbar title='Analytics' subtitle='Revenue and performance insights' />
      <div className='flex justify-center py-20'><div className='w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin' /></div>
    </div>
  );

  const weekTotal = MOCK_REVENUE.reduce((s, d) => s + d.revenue, 0);

  return (
    <div>
      <Topbar title='Analytics' subtitle='Revenue and performance insights' />
      <div className='p-6 space-y-6'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {[
            { label: 'Today Bookings', value: String(summary?.todayBookings ?? 0) },
            { label: 'Today Revenue', value: formatCurrency(summary?.todayRevenue ?? 0) },
            { label: 'Total Guests', value: String(summary?.totalGuests ?? 0) },
            { label: 'Total Events', value: String(summary?.totalEvents ?? 0) },
          ].map(({ label, value }) => (
            <div key={label} className='bg-surface border border-border rounded-2xl p-5'>
              <p className='text-xs text-foreground-muted mb-2'>{label}</p>
              <p className='text-2xl font-bold text-foreground'>{value}</p>
            </div>
          ))}
        </div>

        <div className='bg-surface border border-border rounded-2xl p-6'>
          <h2 className='text-sm font-semibold text-foreground mb-1'>Weekly Revenue</h2>
          <p className='text-xs text-foreground-muted mb-6'>{formatCurrency(weekTotal)} this week</p>
          <RevenueChart data={MOCK_REVENUE} />
        </div>

        <div className='bg-surface border border-border rounded-2xl p-6'>
          <h2 className='text-sm font-semibold text-foreground mb-4'>Top Spenders</h2>
          <div className='space-y-3'>
            {(summary?.topGuests ?? []).map((g: any, i: number) => (
              <div key={g.id} className='flex items-center gap-3'>
                <span className='text-xs font-bold text-foreground-subtle w-4'>{i + 1}</span>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-foreground'>{g.name}</p>
                  <p className='text-xs text-foreground-muted'>{g.visits} visits</p>
                </div>
                <span className='text-sm font-semibold text-foreground'>{formatCurrency(g.totalSpend)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
