'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Search, LogOut, CheckCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const notifications = [
  { id: 1, text: 'New booking: James Whitmore — VIP-01 at 21:00', time: '2m ago', read: false },
  { id: 2, text: 'Neon Nights is now live — 280/300 tickets sold', time: '18m ago', read: false },
  { id: 3, text: 'Natalia Voss booking confirmed — VIP-03', time: '34m ago', read: true },
  { id: 4, text: 'Bass & Bourbon is sold out', time: '2h ago', read: true },
  { id: 5, text: 'Derek Hale booking cancelled', time: '3h ago', read: true },
];

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const { logout } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const notifRef = useRef<HTMLDivElement>(null);

  const unread = notifs.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));

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
        <div ref={notifRef} className='relative'>
          <button
            onClick={() => setNotifOpen(v => !v)}
            className='relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-2 transition-colors'
          >
            <Bell className='w-4 h-4 text-foreground-muted' />
            {unread > 0 && (
              <span className='absolute top-1 right-1 w-2 h-2 bg-accent rounded-full' />
            )}
          </button>

          {notifOpen && (
            <div className='absolute right-0 top-10 w-80 bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden'>
              <div className='flex items-center justify-between px-4 py-3 border-b border-border'>
                <span className='text-sm font-semibold text-foreground'>
                  Notifications {unread > 0 && <span className='ml-1 text-xs text-accent'>({unread})</span>}
                </span>
                {unread > 0 && (
                  <button onClick={markAllRead} className='flex items-center gap-1 text-xs text-foreground-muted hover:text-accent transition-colors'>
                    <CheckCheck className='w-3 h-3' /> Mark all read
                  </button>
                )}
              </div>
              <div className='max-h-72 overflow-y-auto'>
                {notifs.map(n => (
                  <div
                    key={n.id}
                    onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                    className={cn(
                      'px-4 py-3 border-b border-border last:border-0 cursor-pointer hover:bg-surface-2 transition-colors',
                      !n.read && 'bg-accent-soft/30'
                    )}
                  >
                    <div className='flex items-start gap-2'>
                      {!n.read && <span className='w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0' />}
                      <div className={cn(!n.read ? '' : 'pl-3.5')}>
                        <p className='text-xs text-foreground leading-relaxed'>{n.text}</p>
                        <p className='text-xs text-foreground-subtle mt-0.5'>{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live indicator */}
        <div className='flex items-center gap-1.5 px-2.5 py-1 bg-success-soft rounded-full'>
          <span className='w-1.5 h-1.5 bg-success rounded-full animate-pulse' />
          <span className='text-xs font-medium text-success'>Live</span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-2 text-foreground-muted hover:text-danger transition-colors'
          title='Sign out'
        >
          <LogOut className='w-4 h-4' />
        </button>
      </div>
    </header>
  );
}
