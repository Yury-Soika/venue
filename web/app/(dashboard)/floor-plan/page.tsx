'use client';

import { useState, useEffect } from 'react';
import Topbar from '@/components/dashboard/Topbar';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

type TableStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

const statusColors: Record<TableStatus, string> = {
  available:   'bg-success-soft border-success/40 text-success hover:border-success/70',
  occupied:    'bg-danger-soft border-danger/40 text-danger hover:border-danger/70',
  reserved:    'bg-accent-soft border-accent/40 text-accent hover:border-accent/70',
  maintenance: 'bg-warning-soft border-warning/40 text-warning hover:border-warning/70',
};

const STATUS_CYCLE: TableStatus[] = ['available', 'reserved', 'occupied', 'maintenance'];
const sections = ['vip', 'main', 'bar', 'terrace'];

export default function FloorPlanPage() {
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTables().then(setTables).finally(() => setLoading(false));
  }, []);

  const cycleStatus = async (table: any) => {
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(table.status) + 1) % STATUS_CYCLE.length];
    setTables(prev => prev.map(t => t.id === table.id ? { ...t, status: next } : t));
    await api.updateTableStatus(table.id, next);
  };

  const counts = {
    available: tables.filter(t => t.status === 'available').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
    maintenance: tables.filter(t => t.status === 'maintenance').length,
  };

  return (
    <div>
      <Topbar title='Floor Plan' subtitle='Click any table to cycle its status' />
      <div className='p-6 space-y-6'>
        <div className='flex flex-wrap gap-4'>
          {(Object.entries(counts) as [TableStatus, number][]).map(([status, count]) => (
            <div key={status} className={cn('flex items-center gap-2 px-3 py-1.5 rounded-lg border-2', statusColors[status])}>
              <span className='text-xs font-semibold capitalize'>{status}</span>
              <span className='text-xs font-bold'>{count}</span>
            </div>
          ))}
        </div>

        {loading ? (
          <div className='flex justify-center py-20'><div className='w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin' /></div>
        ) : sections.map(section => {
          const sectionTables = tables.filter(t => t.section === section);
          return (
            <div key={section} className='bg-surface border border-border rounded-2xl p-6'>
              <h3 className='text-sm font-semibold text-foreground mb-1 capitalize'>{section} Section</h3>
              <p className='text-xs text-foreground-muted mb-4'>Click a table to change its status</p>
              <div className='flex flex-wrap gap-3'>
                {sectionTables.map(table => (
                  <button key={table.id} onClick={() => cycleStatus(table)}
                    className={cn('flex flex-col items-center justify-center w-20 h-20 rounded-xl border-2 transition-all duration-150 hover:scale-105 active:scale-95', statusColors[table.status as TableStatus])}>
                    <span className='text-xs font-bold'>{table.number}</span>
                    <span className='text-xs opacity-70'>{table.capacity}p</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
