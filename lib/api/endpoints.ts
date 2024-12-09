import { API_BASE_URL } from '../config';

export const endpoints = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
  },
  boats: {
    base: `${API_BASE_URL}/boats`,
    byId: (id: string) => `${API_BASE_URL}/boats/${id}`,
  },
  boatTypes: {
    base: `${API_BASE_URL}/boat-types`,
    byId: (id: string) => `${API_BASE_URL}/boat-types/${id}`,
  },
  docks: {
    base: `${API_BASE_URL}/docks`,
    byId: (id: string) => `${API_BASE_URL}/docks/${id}`,
  },
  tickets: {
    base: `${API_BASE_URL}/tickets`,
    byId: (id: string) => `${API_BASE_URL}/tickets/${id}`,
  },
  orders: {
    base: `${API_BASE_URL}/orders`,
    byId: (id: string) => `${API_BASE_URL}/orders/${id}`,
  },
  payments: {
    base: `${API_BASE_URL}/payments`,
    byId: (id: string) => `${API_BASE_URL}/payments/${id}`,
  },
  alerts: {
    base: `${API_BASE_URL}/alerts`,
    byId: (id: string) => `${API_BASE_URL}/alerts/${id}`,
  },
} as const;