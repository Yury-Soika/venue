'use client';

import { Bell, Search } from 'lucide-react';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className='h-16 border-b border-border bg-surface/60 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-30'>
      <div>
        <h1 className='text-base font-semibold text-foreground'>{title}</h1>
        {subtitle && <p className='text-xs text-foreground-muted'>{subtitle}</p>}
      </div>

      <div className='flex items-center gap-3'>
        {/* Search */}
        <div className='relative hidden sm:block'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground-subtle' />
          <input
            type='text'
            placeholder='Search...'
            className='w-52 pl-8 pr-4 py-1.5 text-sm bg-surface-2 border border-border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors'
          />
        </div>

        {/* Notifications */}
        <button className='relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-2 transition-colors'>
          <Bell className='w-4 h-4 text-foreground-muted' />
          <span className='absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full' />
        </button>

        {/* Live indicator */}
        <div className='flex items-center gap-1.5 px-2.5 py-1 bg-success-soft rounded-full'>
          <span className='w-1.5 h-1.5 bg-success rounded-full animate-pulse' />
          <span className='text-xs font-medium text-success'>Live</span>
        </div>
      </div>
    </header>
  );
}
