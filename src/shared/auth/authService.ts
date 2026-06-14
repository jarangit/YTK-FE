import { API_BASE_URL } from '../api/config';

export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  provider: 'google';
}

interface ApiEnvelope<T> {
  data: T;
  timestamp: string;
}

interface AuthPayload {
  user: AuthUser;
}

function authUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

async function authRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(authUrl(path), {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Authentication request failed: ${response.status}`);
  }

  if (response.status === 204) return undefined as T;

  const envelope = await response.json() as ApiEnvelope<T>;
  return envelope.data;
}

export async function signInWithGoogleProvider(idToken: string): Promise<AuthUser> {
  const payload = await authRequest<AuthPayload>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  });

  return payload.user;
}

export async function getAuthSession(): Promise<AuthUser | null> {
  try {
    const payload = await authRequest<AuthPayload>('/auth/session');
    return payload.user;
  } catch {
    return null;
  }
}

export async function signOutSession(): Promise<void> {
  await authRequest<void>('/auth/logout', { method: 'POST' });
}
