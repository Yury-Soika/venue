'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const sizeClass = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }[size];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
        onClick={onClose}
      />
      {/* Panel */}
      <div className={cn('relative w-full bg-surface border border-border rounded-2xl shadow-2xl', sizeClass)}>
        <div className='flex items-center justify-between px-6 py-4 border-b border-border'>
          <h2 className='text-base font-semibold text-foreground'>{title}</h2>
          <button
            onClick={onClose}
            className='w-7 h-7 flex items-center justify-center rounded-lg hover:bg-surface-2 text-foreground-muted hover:text-foreground transition-colors'
          >
            <X className='w-4 h-4' />
          </button>
        </div>
        <div className='px-6 py-5'>{children}</div>
      </div>
    </div>
  );
}
