import { apiRequest } from '../api/httpClient';
import {
  clearStoredAccessToken,
  readStoredAccessToken,
  writeStoredAccessToken,
} from './tokenStorage';

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
  accessToken?: string;
  tokens?: {
    accessToken?: string;
  };
}

async function authRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const envelope = await apiRequest<ApiEnvelope<T>>(path, init);
  return envelope.data;
}

function extractAccessToken(payload: AuthPayload) {
  return payload.accessToken ?? payload.tokens?.accessToken ?? '';
}

export async function signInWithGoogleProvider(idToken: string): Promise<AuthUser> {
  const payload = await authRequest<AuthPayload>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
    credentials: 'omit',
  });

  const accessToken = extractAccessToken(payload);

  if (accessToken) {
    writeStoredAccessToken(accessToken);
  }

  return payload.user;
}

export async function getAuthSession(): Promise<AuthUser | null> {
  try {
    const accessToken = readStoredAccessToken();

    if (!accessToken) return null;

    const payload = await authRequest<AuthPayload>('/auth/session', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'omit',
    });

    const nextAccessToken = extractAccessToken(payload);

    if (nextAccessToken) {
      writeStoredAccessToken(nextAccessToken);
    }

    return payload.user;
  } catch {
    clearStoredAccessToken();
    return null;
  }
}

export async function signOutSession(): Promise<void> {
  const accessToken = readStoredAccessToken();

  try {
    await authRequest<void>('/auth/logout', {
      method: 'POST',
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
      credentials: 'omit',
    });
  } finally {
    clearStoredAccessToken();
  }
}
