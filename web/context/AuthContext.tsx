'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('venue_session');
    if (session === 'authenticated') setIsAuthenticated(true);
    setChecked(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo: any non-empty email/password works, or use preset credentials
    if (!email || !password) return false;
    await new Promise(r => setTimeout(r, 800)); // simulate network
    localStorage.setItem('venue_session', 'authenticated');
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('venue_session');
    setIsAuthenticated(false);
    router.push('/login');
  };

  if (!checked) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
