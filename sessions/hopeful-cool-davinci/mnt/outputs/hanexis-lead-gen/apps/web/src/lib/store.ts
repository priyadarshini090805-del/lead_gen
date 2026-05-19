import { create } from "zustand";

interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  currentUser: { id: string; email: string; fullName: string } | null;
  setUser: (u: UIState["currentUser"]) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  currentUser: { id: "demo", email: "admin@hanexis.com", fullName: "Hanexis Admin" },
  setUser: (currentUser) => set({ currentUser }),
}));
