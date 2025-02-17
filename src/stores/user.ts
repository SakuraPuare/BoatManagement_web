import type { API } from "@/services/api/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: API.UserPersonalInfoVO | null;
  setUser: (user: API.UserPersonalInfoVO | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  permissions: string[];
  setPermissions: (permissions: string[]) => void;
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
    }),
    {
      name: "user-storage",
    }
  )
);
