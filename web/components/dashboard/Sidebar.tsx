'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  Sparkles,
  Users,
  Map,
  UserCheck,
  BarChart3,
  Settings,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Bookings', href: '/bookings', icon: CalendarDays },
  { label: 'Events', href: '/events', icon: Sparkles },
  { label: 'Guests', href: '/guests', icon: Users },
  { label: 'Floor Plan', href: '/floor-plan', icon: Map },
  { label: 'Staff', href: '/staff', icon: UserCheck },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
];

const bottomItems = [
  { label: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <aside className='fixed left-0 top-0 h-screen w-60 bg-surface border-r border-border flex flex-col z-40'>
      {/* Logo */}
      <div className='px-6 py-5 border-b border-border'>
        <Link href='/' className='flex items-center gap-2.5'>
          <div className='w-8 h-8 rounded-lg bg-accent flex items-center justify-center'>
            <Zap className='w-4 h-4 text-white' />
          </div>
          <span className='font-bold text-lg text-foreground tracking-tight'>Venue</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className='flex-1 px-3 py-4 space-y-0.5 overflow-y-auto'>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-accent-soft text-accent'
                  : 'text-foreground-muted hover:text-foreground hover:bg-surface-2'
              )}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-accent' : '')} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className='px-3 py-4 border-t border-border space-y-0.5'>
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-accent-soft text-accent'
                  : 'text-foreground-muted hover:text-foreground hover:bg-surface-2'
              )}
            >
              <Icon className='w-4 h-4 flex-shrink-0' />
              {item.label}
            </Link>
          );
        })}

        {/* User avatar */}
        <div className='flex items-center gap-3 px-3 py-2.5 mt-2'>
          <div className='w-7 h-7 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0'>
            <span className='text-xs font-bold text-accent'>CV</span>
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-foreground truncate'>Carlos Rivera</p>
            <p className='text-xs text-foreground-muted truncate'>Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
