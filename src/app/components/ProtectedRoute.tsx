import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../shared/auth/AuthContext';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isReady, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname, openSignIn: true }} />;
  }

  return <>{children}</>;
}
