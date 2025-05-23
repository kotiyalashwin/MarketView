import { create } from "zustand";

type TickerStore = {
  lastPrice: string;
  setLastPrice: (price: string) => void;
};

export const useTickerStore = create<TickerStore>((set) => ({
  lastPrice: "",
  setLastPrice: (price: string) => set({ lastPrice: price }),
}));
