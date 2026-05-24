'use client';

import { useState, useMemo, useEffect } from 'react';
import Topbar from '@/components/dashboard/Topbar';
import StatusBadge from '@/components/dashboard/StatusBadge';
import Modal from '@/components/ui/Modal';
import { api } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Search } from 'lucide-react';

const TIER_OPTIONS = ['vip', 'regular', 'blacklist'];

export default function GuestsPage() {
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', tier: 'regular', notes: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getGuests().then(setGuests).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => guests.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (filterTier === 'all' || g.tier === filterTier);
  }), [guests, search, filterTier]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const g = await api.createGuest(form);
      setGuests(prev => [g, ...prev]);
      setForm({ name: '', email: '', phone: '', tier: 'regular', notes: '' });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Topbar title='Guests' subtitle='Guest database and CRM' />
      <div className='p-6'>
        <div className='flex flex-col sm:flex-row gap-3 mb-4'>
          <div className='relative flex-1 max-w-xs'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground-subtle' />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Search guests...'
              className='w-full pl-8 pr-4 py-2 text-sm bg-surface border border-border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors' />
          </div>
          <div className='flex gap-2'>
            {['all', ...TIER_OPTIONS].map(t => (
              <button key={t} onClick={() => setFilterTier(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${filterTier === t ? 'bg-accent text-white' : 'bg-surface border border-border text-foreground-muted hover:text-foreground'}`}>
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => setModalOpen(true)}
            className='ml-auto px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap'>
            + Add Guest
          </button>
        </div>

        <div className='bg-surface border border-border rounded-2xl overflow-hidden'>
          <div className='px-6 py-3 border-b border-border'>
            <p className='text-xs text-foreground-muted'>{filtered.length} guests</p>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-border'>
                  {['Guest', 'Tier', 'Visits', 'Last Visit', 'Tags', 'Total Spend'].map(h => (
                    <th key={h} className={`px-6 py-3 text-xs font-medium text-foreground-muted ${h === 'Total Spend' ? 'text-right' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className='px-6 py-12 text-center'><div className='w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto' /></td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={6} className='px-6 py-12 text-center text-sm text-foreground-muted'>No guests found</td></tr>
                ) : filtered.map(g => (
                  <tr key={g.id} className='border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors cursor-pointer'>
                    <td className='px-6 py-4'><p className='font-medium text-foreground'>{g.name}</p><p className='text-xs text-foreground-muted'>{g.email}</p></td>
                    <td className='px-6 py-4'><StatusBadge status={g.tier} /></td>
                    <td className='px-6 py-4 text-foreground-muted'>{g.visits}</td>
                    <td className='px-6 py-4 text-foreground-muted'>{g.lastVisit ? formatDate(g.lastVisit) : '—'}</td>
                    <td className='px-6 py-4'>
                      <div className='flex flex-wrap gap-1'>
                        {(g.tags ?? []).filter(Boolean).map((tag: string) => (
                          <span key={tag} className='px-2 py-0.5 bg-surface-2 text-foreground-muted text-xs rounded-full'>{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-right font-semibold text-foreground'>{formatCurrency(g.totalSpend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title='Add Guest'>
        <form onSubmit={handleCreate} className='space-y-4'>
          {[['Full Name', 'name', 'text', 'Full name'], ['Email', 'email', 'email', 'guest@example.com'], ['Phone', 'phone', 'text', '+1 555 000 0000']].map(([label, key, type, ph]) => (
            <div key={key}>
              <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>{label}</label>
              <input type={type} required={key !== 'phone'} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph}
                className='w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors' />
            </div>
          ))}
          <div>
            <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>Tier</label>
            <select value={form.tier} onChange={e => setForm(f => ({ ...f, tier: e.target.value }))}
              className='w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-accent/50'>
              {TIER_OPTIONS.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>Notes</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder='Preferences, VIP notes...' rows={2}
              className='w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 resize-none' />
          </div>
          <div className='flex gap-3 pt-2'>
            <button type='button' onClick={() => setModalOpen(false)} className='flex-1 py-2.5 bg-surface-2 border border-border rounded-lg text-sm text-foreground-muted hover:text-foreground transition-colors'>Cancel</button>
            <button type='submit' disabled={saving} className='flex-1 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-medium rounded-lg text-sm transition-colors'>
              {saving ? 'Adding...' : 'Add Guest'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
