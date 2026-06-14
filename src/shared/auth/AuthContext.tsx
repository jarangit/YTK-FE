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
  getAuthSession,
  signOutSession,
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
  reportGoogleSignInError: () => void;
  signInWithGoogle: (idToken: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    let active = true;

    void getAuthSession().then((sessionUser) => {
      if (!active) return;
      setUser(sessionUser);
      setIsReady(true);
    });

    return () => {
      active = false;
    };
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

  const reportGoogleSignInError = useCallback(() => {
    setAuthError('auth.googlePopupError');
  }, []);

  const signInWithGoogle = useCallback(async (idToken: string) => {
    try {
      setIsSigningIn(true);
      setAuthError('');
      const signedInUser = await signInWithGoogleProvider(idToken);
      setUser(signedInUser);
      setIsSignInModalOpen(false);
    } catch {
      setAuthError('auth.signInError');
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await signOutSession();
    } finally {
      setUser(null);
      setAuthError('');
      setIsSignInModalOpen(false);
    }
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
      reportGoogleSignInError,
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
      reportGoogleSignInError,
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
