'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  day: string;
  revenue: number;
  covers: number;
}

export default function RevenueChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width='100%' height={200}>
      <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id='revenueGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#7c3aed' stopOpacity={0.3} />
            <stop offset='95%' stopColor='#7c3aed' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey='day'
          tick={{ fontSize: 11, fill: '#8b8b9e' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#8b8b9e' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111118',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#f0f0f8',
          }}
          formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
          cursor={{ stroke: 'rgba(255,255,255,0.06)' }}
        />
        <Area
          type='monotone'
          dataKey='revenue'
          stroke='#7c3aed'
          strokeWidth={2}
          fill='url(#revenueGradient)'
          dot={false}
          activeDot={{ r: 4, fill: '#7c3aed', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
