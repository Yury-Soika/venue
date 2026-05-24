'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { SidebarProvider } from '@/context/SidebarContext';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <SidebarProvider>
      <div className='flex h-screen bg-background overflow-hidden'>
        <Sidebar />
        <div className='flex-1 flex flex-col overflow-hidden md:ml-60'>
          <main className='flex-1 overflow-y-auto'>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
