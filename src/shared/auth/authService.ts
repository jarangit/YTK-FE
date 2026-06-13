export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: 'google';
}

const SESSION_STORAGE_KEY = 'youtive_auth_session';

export function getStoredSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function persistSession(user: AuthUser | null) {
  if (!user) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

export async function signInWithGoogleProvider(): Promise<AuthUser> {
  // Temporary stub until the backend endpoint is available.
  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    id: 'google-demo-user',
    name: 'Avery Chen',
    email: 'avery.chen@example.com',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
    provider: 'google',
  };
}

export function clearStoredSession() {
  persistSession(null);
}
