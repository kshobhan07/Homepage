import { create } from "zustand";

type DSIPStore = {
  activeModule: string;
  setActiveModule: (name: string) => void;
};

export const useDSIPStore = create<DSIPStore>((set) => ({
  activeModule: "Attack Surface Management",
  setActiveModule: (name) => set({ activeModule: name }),
}));
