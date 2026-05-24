import Topbar from '@/components/dashboard/Topbar';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { guests } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function GuestsPage() {
  return (
    <div>
      <Topbar title='Guests' subtitle='Guest database and CRM' />
      <div className='p-6'>
        <div className='bg-surface border border-border rounded-2xl overflow-hidden'>
          <div className='px-6 py-4 border-b border-border flex items-center justify-between'>
            <p className='text-sm font-semibold text-foreground'>{guests.length} guests</p>
            <button className='px-4 py-1.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors'>
              + Add Guest
            </button>
          </div>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-border'>
                <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Guest</th>
                <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Tier</th>
                <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Visits</th>
                <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Last Visit</th>
                <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Tags</th>
                <th className='text-right px-6 py-3 text-xs font-medium text-foreground-muted'>Total Spend</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest.id} className='border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors cursor-pointer'>
                  <td className='px-6 py-4'>
                    <p className='font-medium text-foreground'>{guest.name}</p>
                    <p className='text-xs text-foreground-muted'>{guest.email}</p>
                  </td>
                  <td className='px-6 py-4'><StatusBadge status={guest.tier} /></td>
                  <td className='px-6 py-4 text-foreground-muted'>{guest.visits}</td>
                  <td className='px-6 py-4 text-foreground-muted'>{formatDate(guest.lastVisit)}</td>
                  <td className='px-6 py-4'>
                    <div className='flex flex-wrap gap-1'>
                      {guest.tags.map(tag => (
                        <span key={tag} className='px-2 py-0.5 bg-surface-2 text-foreground-muted text-xs rounded-full'>{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className='px-6 py-4 text-right font-semibold text-foreground'>{formatCurrency(guest.totalSpend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
