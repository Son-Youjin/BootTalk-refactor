import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserInfo } from "@/types/response";

interface UserStore {
  user: UserInfo | null;
  isAuthenticated: boolean;
  login: (user: UserInfo) => void;
  setUser: (user: UserInfo) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
