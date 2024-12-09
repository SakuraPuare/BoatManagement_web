export const API_BASE_URL = 'http://localhost:8000/api';

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  BOATS: {
    LIST: `${API_BASE_URL}/boats`,
    CREATE: `${API_BASE_URL}/boats`,
    UPDATE: (id: string) => `${API_BASE_URL}/boats/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/boats/${id}`,
  },
  TICKETS: {
    LIST: `${API_BASE_URL}/tickets`,
    CREATE: `${API_BASE_URL}/tickets`,
    UPDATE: (id: string) => `${API_BASE_URL}/tickets/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/tickets/${id}`,
  },
  ORDERS: {
    LIST: `${API_BASE_URL}/orders`,
    CREATE: `${API_BASE_URL}/orders`,
    UPDATE: (id: string) => `${API_BASE_URL}/orders/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/orders/${id}`,
  },
} as const;