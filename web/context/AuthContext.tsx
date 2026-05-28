'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createMongoAbility, MongoAbility } from '@casl/ability';

export type Action = 'manage' | 'read' | 'create' | 'update' | 'delete';
export type Subject = 'Booking' | 'Event' | 'Guest' | 'Staff' | 'Table' | 'Analytics' | 'all';
export type AppAbility = MongoAbility<[Action, Subject]>;

type User = { id: string; email: string; name: string; role: 'manager' | 'demo' };

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  ability: AppAbility;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const MOCK_CREDENTIALS: Record<string, { user: User; ability: AppAbility }> = {
  'demo@venue.ee': {
    user: { id: 'demo-1', email: 'demo@venue.ee', name: 'Demo User', role: 'demo' },
    ability: createMongoAbility<[Action, Subject]>([{ action: 'read', subject: 'all' }]),
  },
  'manager@venue.ee': {
    user: { id: 'mgr-1', email: 'manager@venue.ee', name: 'Carlos Rivera', role: 'manager' },
    ability: createMongoAbility<[Action, Subject]>([{ action: 'manage', subject: 'all' }]),
  },
};

const SESSION_KEY = 'venue_mock_user';
const emptyAbility = createMongoAbility<[Action, Subject]>([]);

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ability, setAbility] = useState<AppAbility>(emptyAbility);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const saved = JSON.parse(stored) as User;
        const mock = MOCK_CREDENTIALS[saved.email];
        if (mock) { setUser(mock.user); setAbility(mock.ability); }
      }
    } catch {}
    setChecked(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 600)); // feel like a real login
    const mock = MOCK_CREDENTIALS[email.toLowerCase()];
    if (!mock || password !== 'demo1234') return false;
    localStorage.setItem(SESSION_KEY, JSON.stringify(mock.user));
    setUser(mock.user);
    setAbility(mock.ability);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setAbility(emptyAbility);
    router.push('/login');
  };

  if (!checked) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, ability, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
