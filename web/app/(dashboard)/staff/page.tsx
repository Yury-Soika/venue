import Topbar from '@/components/dashboard/Topbar';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { staff } from '@/lib/mock-data';
import { Star } from 'lucide-react';

export default function StaffPage() {
  return (
    <div>
      <Topbar title='Staff' subtitle='Team roster and shift management' />
      <div className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <p className='text-sm text-foreground-muted'>{staff.length} staff members</p>
          <button className='px-4 py-1.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors'>
            + Add Staff
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
          {staff.map((member) => (
            <div key={member.id} className='bg-surface border border-border rounded-2xl p-5 hover:border-border-hover transition-colors cursor-pointer'>
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center'>
                    <span className='text-sm font-bold text-accent'>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className='font-semibold text-foreground'>{member.name}</p>
                    <p className='text-xs text-foreground-muted capitalize'>{member.role}</p>
                  </div>
                </div>
                <StatusBadge status={member.status} />
              </div>
              <div className='grid grid-cols-2 gap-3 text-sm'>
                <div>
                  <p className='text-xs text-foreground-muted mb-0.5'>Shifts this month</p>
                  <p className='font-semibold text-foreground'>{member.shiftsThisMonth}</p>
                </div>
                <div>
                  <p className='text-xs text-foreground-muted mb-0.5'>Rating</p>
                  <div className='flex items-center gap-1'>
                    <Star className='w-3 h-3 text-warning fill-warning' />
                    <span className='font-semibold text-foreground'>{member.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
