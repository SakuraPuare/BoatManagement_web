import api from './api';
import { API_ROUTES } from '../config';
import type { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, credentials);
    return data;
  },

  async register(userData: RegisterData): Promise<void> {
    await api.post(API_ROUTES.AUTH.REGISTER, userData);
  },

  async logout(): Promise<void> {
    await api.post(API_ROUTES.AUTH.LOGOUT);
    localStorage.removeItem('token');
  },
};