import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen bg-background overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden ml-60'>
        <main className='flex-1 overflow-y-auto'>
          {children}
        </main>
      </div>
    </div>
  );
}
