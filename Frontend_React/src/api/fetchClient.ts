const TOKEN_STORAGE_KEY = 'authToken';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

// Wraps fetch to attach an Authorization header when a token is stored.
export async function fetchWithAuth(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers = new Headers(init.headers);
  const fullUrl = `${BASE_URL}${input}`;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(fullUrl, { ...init, headers });

  if (response.status === 401) {
    clearToken();
  }

  return response;
}
