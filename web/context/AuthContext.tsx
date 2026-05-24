'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface AuthUser { id: string; email: string; name: string; role: string; }

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('venue_token');
    const stored = localStorage.getItem('venue_user');
    if (token && stored) {
      setIsAuthenticated(true);
      setUser(JSON.parse(stored));
    }
    setChecked(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await api.login(email, password);
      localStorage.setItem('venue_token', res.access_token);
      localStorage.setItem('venue_user', JSON.stringify(res.user));
      setIsAuthenticated(true);
      setUser(res.user);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('venue_token');
    localStorage.removeItem('venue_user');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  if (!checked) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
