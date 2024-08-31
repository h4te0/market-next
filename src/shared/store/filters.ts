import { create } from 'zustand';

export interface IPrices {
  min?: number;
  max?: number;
}

interface FiltersStore {
  prices: IPrices;
  delivery?: boolean;
  brands: string[];
  setPrices: ({}: IPrices) => void;
  setDelivery: (value?: boolean) => void;
  setBrands: (brands: string[]) => void;
}

export const useFiltersStore = create<FiltersStore>()((set) => ({
  prices: {
    min: undefined,
    max: undefined,
  },
  delivery: undefined,
  brands: [],

  setPrices: (prices) =>
    set(() => ({
      prices: prices,
    })),
  setBrands: (brands) =>
    set(() => ({
      brands: brands,
    })),
  setDelivery: (value) =>
    set(() => ({
      delivery: value,
    })),
}));
