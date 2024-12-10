import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserSelf } from "@/types/user";

interface UserState {
  user: UserSelf | null;
  setUser: (user: UserSelf | null) => void;
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
      // // 只持久化 user 和 token
      // partialize: (state) => ({
      //   user: state.user,
      //   token: state.token
      // }),
    },
  ),
);
