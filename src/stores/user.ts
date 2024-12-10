import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  isLogin: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
      isLogin: () => !!get().token,
    }),
    {
      name: 'user-storage',
    }
  )
); 