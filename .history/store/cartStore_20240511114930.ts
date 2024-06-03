import { create } from "zustand";
import { Product } from "./interfaces";

export interface CartState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
}

const useCartStore = create<CartState>((set) => ({
    products: [],
    items: 0,
    addProduct: (product: Product) => set((state) => {
        state.items++
        const hasProduct = state.products.find((product) => product.id === product.id)
    }),
    reduceProduct: (product: Product) => set((state) => {
        
    }),
    clearCart: () => set((state) => {
        return {
            products: [],
            items: 0,
        }
    }),
}))