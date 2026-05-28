'use client';

import { useAuth } from '@/context/AuthContext';
import { Action, Subject } from '@/context/AuthContext';

interface CanProps {
  I: Action;
  a: Subject;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Can({ I: action, a: subject, children, fallback = null }: CanProps) {
  const { ability } = useAuth();
  return ability.can(action, subject) ? <>{children}</> : <>{fallback}</>;
}
