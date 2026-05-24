import Topbar from '@/components/dashboard/Topbar';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { bookings } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function BookingsPage() {
  return (
    <div>
      <Topbar title='Bookings' subtitle='All reservations and table assignments' />
      <div className='p-6'>
        <div className='bg-surface border border-border rounded-2xl overflow-hidden'>
          <div className='px-6 py-4 border-b border-border flex items-center justify-between'>
            <p className='text-sm font-semibold text-foreground'>{bookings.length} bookings</p>
            <button className='px-4 py-1.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors'>
              + New Booking
            </button>
          </div>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-border'>
                <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Guest</th>
                <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Table</th>
                <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Party Size</th>
                <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Date</th>
                <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Time</th>
                <th className='text-left px-6 py-3 text-xs font-medium text-foreground-muted'>Status</th>
                <th className='text-right px-6 py-3 text-xs font-medium text-foreground-muted'>Spend</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className='border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors cursor-pointer'>
                  <td className='px-6 py-4'>
                    <p className='font-medium text-foreground'>{b.guestName}</p>
                    <p className='text-xs text-foreground-muted'>{b.guestEmail}</p>
                  </td>
                  <td className='px-6 py-4 font-mono text-xs text-foreground-muted'>{b.table}</td>
                  <td className='px-6 py-4 text-foreground-muted'>{b.partySize}</td>
                  <td className='px-6 py-4 text-foreground-muted'>{b.date}</td>
                  <td className='px-6 py-4 text-foreground-muted'>{b.time}</td>
                  <td className='px-6 py-4'><StatusBadge status={b.status} /></td>
                  <td className='px-6 py-4 text-right text-foreground font-medium'>
                    {b.totalSpend ? formatCurrency(b.totalSpend) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
