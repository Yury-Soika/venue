import Topbar from '@/components/dashboard/Topbar';

export default function SettingsPage() {
  return (
    <div>
      <Topbar title='Settings' subtitle='Venue profile and configuration' />
      <div className='p-6 max-w-2xl space-y-6'>
        {/* Venue Profile */}
        <div className='bg-surface border border-border rounded-2xl p-6'>
          <h2 className='text-sm font-semibold text-foreground mb-5'>Venue Profile</h2>
          <div className='space-y-4'>
            {[
              { label: 'Venue Name', placeholder: 'Neon Lounge', value: 'Neon Lounge' },
              { label: 'Address', placeholder: '123 Main St, New York, NY', value: '148 W 28th St, New York, NY 10001' },
              { label: 'Email', placeholder: 'contact@venue.com', value: 'contact@neonlounge.com' },
              { label: 'Phone', placeholder: '+1 555 000 0000', value: '+1 212 555 0100' },
            ].map(({ label, placeholder, value }) => (
              <div key={label}>
                <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>{label}</label>
                <input
                  type='text'
                  defaultValue={value}
                  placeholder={placeholder}
                  className='w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors'
                />
              </div>
            ))}
          </div>
          <button className='mt-6 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors'>
            Save Changes
          </button>
        </div>

        {/* Capacity */}
        <div className='bg-surface border border-border rounded-2xl p-6'>
          <h2 className='text-sm font-semibold text-foreground mb-5'>Capacity & Operations</h2>
          <div className='grid grid-cols-2 gap-4'>
            {[
              { label: 'Total Capacity', value: '300' },
              { label: 'Tables', value: '18' },
              { label: 'Opening Time', value: '20:00' },
              { label: 'Closing Time', value: '04:00' },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>{label}</label>
                <input
                  type='text'
                  defaultValue={value}
                  className='w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
