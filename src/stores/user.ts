import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: API.UserWithRoleVO | null;
  setUser: (user: API.UserWithRoleVO | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  permissions: string[];
  setPermissions: (permissions: string[]) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      token: null,
      setToken: (token) => set({ token }),
      permissions: [],
      setPermissions: (permissions) => set({ permissions }),
      logout: () => {
        set({ user: null, token: null, permissions: [] });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
