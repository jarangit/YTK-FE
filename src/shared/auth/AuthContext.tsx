import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  clearStoredSession,
  getStoredSession,
  persistSession,
  signInWithGoogleProvider,
  type AuthUser,
} from './authService';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  isSigningIn: boolean;
  authError: string;
  isSignInModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    setUser(getStoredSession());
    setIsReady(true);
  }, []);

  const openSignInModal = useCallback(() => {
    setAuthError('');
    setIsSignInModalOpen(true);
  }, []);

  const closeSignInModal = useCallback(() => {
    if (isSigningIn) return;
    setAuthError('');
    setIsSignInModalOpen(false);
  }, [isSigningIn]);

  const signInWithGoogle = useCallback(async () => {
    try {
      setIsSigningIn(true);
      setAuthError('');
      const signedInUser = await signInWithGoogleProvider();
      persistSession(signedInUser);
      setUser(signedInUser);
      setIsSignInModalOpen(false);
    } catch {
      setAuthError('auth.signInError');
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const signOut = useCallback(() => {
    clearStoredSession();
    setUser(null);
    setAuthError('');
    setIsSignInModalOpen(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isReady,
      isSigningIn,
      authError,
      isSignInModalOpen,
      openSignInModal,
      closeSignInModal,
      signInWithGoogle,
      signOut,
    }),
    [
      authError,
      closeSignInModal,
      isReady,
      isSignInModalOpen,
      isSigningIn,
      openSignInModal,
      signInWithGoogle,
      signOut,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
