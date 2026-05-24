'use client';

import { useState, useMemo, useEffect } from 'react';
import Topbar from '@/components/dashboard/Topbar';
import StatusBadge from '@/components/dashboard/StatusBadge';
import Modal from '@/components/ui/Modal';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Search } from 'lucide-react';

const STATUS_OPTIONS = ['confirmed', 'pending', 'seated', 'completed', 'cancelled'];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ guestName: '', guestEmail: '', table: '', partySize: '', time: '', notes: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getBookings().then(setBookings).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => bookings.filter(b => {
    const matchSearch = b.guestName.toLowerCase().includes(search.toLowerCase()) ||
      (b.guestEmail ?? '').toLowerCase().includes(search.toLowerCase()) ||
      b.table.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (filterStatus === 'all' || b.status === filterStatus);
  }), [bookings, search, filterStatus]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const b = await api.createBooking({
        ...form,
        partySize: Number(form.partySize),
        date: new Date().toISOString().split('T')[0],
      });
      setBookings(prev => [b, ...prev]);
      setForm({ guestName: '', guestEmail: '', table: '', partySize: '', time: '', notes: '' });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Topbar title='Bookings' subtitle='All reservations and table assignments' />
      <div className='p-6'>
        <div className='flex flex-col sm:flex-row gap-3 mb-4'>
          <div className='relative flex-1 max-w-xs'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground-subtle' />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Search guests, tables...'
              className='w-full pl-8 pr-4 py-2 text-sm bg-surface border border-border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors' />
          </div>
          <div className='flex gap-2 flex-wrap'>
            {['all', ...STATUS_OPTIONS].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${filterStatus === s ? 'bg-accent text-white' : 'bg-surface border border-border text-foreground-muted hover:text-foreground'}`}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => setModalOpen(true)}
            className='ml-auto px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap'>
            + New Booking
          </button>
        </div>

        <div className='bg-surface border border-border rounded-2xl overflow-hidden'>
          <div className='px-6 py-3 border-b border-border'>
            <p className='text-xs text-foreground-muted'>{filtered.length} results</p>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-border'>
                  {['Guest', 'Table', 'Party', 'Date', 'Time', 'Status', 'Spend'].map(h => (
                    <th key={h} className={`px-6 py-3 text-xs font-medium text-foreground-muted ${h === 'Spend' ? 'text-right' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className='px-6 py-12 text-center'><div className='w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto' /></td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className='px-6 py-12 text-center text-sm text-foreground-muted'>No bookings found</td></tr>
                ) : filtered.map(b => (
                  <tr key={b.id} className='border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors cursor-pointer'>
                    <td className='px-6 py-4'><p className='font-medium text-foreground'>{b.guestName}</p><p className='text-xs text-foreground-muted'>{b.guestEmail}</p></td>
                    <td className='px-6 py-4 font-mono text-xs text-foreground-muted'>{b.table}</td>
                    <td className='px-6 py-4 text-foreground-muted'>{b.partySize}</td>
                    <td className='px-6 py-4 text-foreground-muted'>{b.date}</td>
                    <td className='px-6 py-4 text-foreground-muted'>{b.time}</td>
                    <td className='px-6 py-4'><StatusBadge status={b.status} /></td>
                    <td className='px-6 py-4 text-right font-medium text-foreground'>{b.totalSpend > 0 ? formatCurrency(b.totalSpend) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title='New Booking'>
        <form onSubmit={handleCreate} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2'>
              <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>Guest Name</label>
              <input required value={form.guestName} onChange={e => setForm(f => ({ ...f, guestName: e.target.value }))} placeholder='Full name'
                className='w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors' />
            </div>
            <div className='col-span-2'>
              <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>Email</label>
              <input type='email' value={form.guestEmail} onChange={e => setForm(f => ({ ...f, guestEmail: e.target.value }))} placeholder='guest@example.com'
                className='w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors' />
            </div>
            <div>
              <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>Table</label>
              <input required value={form.table} onChange={e => setForm(f => ({ ...f, table: e.target.value }))} placeholder='VIP-01'
                className='w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors' />
            </div>
            <div>
              <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>Party Size</label>
              <input required type='number' min='1' max='30' value={form.partySize} onChange={e => setForm(f => ({ ...f, partySize: e.target.value }))} placeholder='4'
                className='w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors' />
            </div>
            <div className='col-span-2'>
              <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>Time</label>
              <input required type='time' value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                className='w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors' />
            </div>
            <div className='col-span-2'>
              <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>Notes</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder='Birthday, VIP requests...' rows={2}
                className='w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors resize-none' />
            </div>
          </div>
          <div className='flex gap-3 pt-2'>
            <button type='button' onClick={() => setModalOpen(false)}
              className='flex-1 py-2.5 bg-surface-2 border border-border rounded-lg text-sm text-foreground-muted hover:text-foreground transition-colors'>Cancel</button>
            <button type='submit' disabled={saving}
              className='flex-1 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-medium rounded-lg text-sm transition-colors'>
              {saving ? 'Creating...' : 'Create Booking'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
