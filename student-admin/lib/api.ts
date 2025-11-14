const API_URL = 'http://localhost:3000';

// Helper to get token from storage (client-side only)
const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

// Helper to set token in storage (client-side only)
const setStoredToken = (token: string | null): void => {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage =
      typeof data === 'object' && data !== null && 'message' in data
        ? (data as { message?: string }).message
        : undefined;
    throw new Error(errorMessage ?? 'Login failed');
  }

  // Store token for Authorization header (cookie is httpOnly, so we store a copy)
  if (data.access_token) {
    setStoredToken(data.access_token);
  }

  return data;
};

export const authenticatedFetch = async (endpoint: any, options: any = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Add Authorization header if token is available
  const token = getStoredToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include', // Always include credentials for cookie
    headers,
  });

  if (response.status === 401) {
    console.error('Unauthorized, redirecting to login..');
    setStoredToken(null); // Clear token on unauthorized
  }
  return response;
};

// Server-side authenticated fetch for Next.js server components
export const serverAuthenticatedFetch = async (
  endpoint: string,
  cookieHeader: string | null,
  options: any = {}
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Extract JWT token from cookie string
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    if (cookies.jwt) {
      headers['Authorization'] = `Bearer ${cookies.jwt}`;
    }
    // Also send cookies for fallback
    headers['Cookie'] = cookieHeader;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/auth/logout`);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMessage =
      typeof data === 'object' && data !== null && 'message' in data
        ? (data as { message?: string }).message
        : undefined;
    throw new Error(errorMessage ?? 'Log Out failed');
  }
  setStoredToken('');
};