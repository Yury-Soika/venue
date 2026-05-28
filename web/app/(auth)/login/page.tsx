'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Zap, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      router.push('/');
    } else {
      setError('Please enter your email and password.');
    }
  };

  const fillDemo = () => { setEmail('demo@venue.ee'); setPassword('demo1234'); };

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
      {/* Background blobs */}
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue/10 rounded-full blur-3xl pointer-events-none' />

      <div className='relative w-full max-w-sm'>
        {/* Logo */}
        <div className='flex items-center justify-center gap-2.5 mb-8'>
          <div className='w-9 h-9 rounded-xl bg-accent flex items-center justify-center'>
            <Zap className='w-5 h-5 text-white' />
          </div>
          <span className='text-2xl font-bold text-foreground tracking-tight'>Venue</span>
        </div>

        <div className='bg-surface border border-border rounded-2xl p-8'>
          <h1 className='text-xl font-semibold text-foreground mb-1'>Welcome back</h1>
          <p className='text-sm text-foreground-muted mb-6'>Sign in to your venue dashboard</p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>Email</label>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='manager@venue.ee'
                required
                className='w-full px-3 py-2.5 bg-surface-2 border border-border rounded-lg text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors'
              />
            </div>

            <div>
              <label className='text-xs font-medium text-foreground-muted mb-1.5 block'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='••••••••'
                  required
                  className='w-full px-3 py-2.5 pr-10 bg-surface-2 border border-border rounded-lg text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/50 transition-colors'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(v => !v)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-foreground-subtle hover:text-foreground-muted transition-colors'
                >
                  {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                </button>
              </div>
            </div>

            {error && <p className='text-xs text-danger'>{error}</p>}

            <button
              type='submit'
              disabled={loading}
              className='w-full py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm'
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Demo access */}
          <div className='mt-5 pt-5 border-t border-border'>
            <button
              onClick={fillDemo}
              className='w-full py-2.5 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-sm text-accent font-medium transition-colors'
            >
              ✦ Try Demo
            </button>
            <p className='text-xs text-foreground-subtle text-center mt-2.5'>
              Read-only — explore without changing anything
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
