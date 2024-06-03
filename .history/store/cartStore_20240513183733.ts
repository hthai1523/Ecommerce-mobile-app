import { create } from "zustand";
import { Product } from "./interfaces";

export interface CartState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
  total: number;
}

const useCartStore = create<CartState>((set) => ({
  products: [],
  items: 0,
  total: 0,
  addProduct: (product: Product) =>
    set((state) => {
      state.items++;
      state.total += product.price;
      const hasProduct = state.products.find((p) => p.id === product.id);
      if (hasProduct) {
        return {
          products: state.products.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      }

      return { products: [...state.products, { ...product, quantity: 1 }] };
    }),
  reduceProduct: (product: Product) =>
    set((state) => {
      state.total -= product.price;
      state.items--;
      return {
        products: state.products
          .map((p) => {
            if (p.id === product.id) {
              return {
                ...p,
                quantity: p.quantity - 1,
              };
            } else {
              return p;
            }
          })
          .filter((p) => p.quantity > 0),
      };
    }),

  removeProduct: (product: Product) =>
    set((state) => {
      const updatedProducts = state.products.filter((p) => p.id !== product.id);
      const removedProduct = state.products.find((p) => p.id === product.id);
      if (removedProduct) {
        state.items -= removedProduct.quantity;
      }
      return { products: updatedProducts };
    }),

  clearCart: () =>
    set((state) => {
      return {
        products: [],
        items: 0,
      };
    }),
}));

export default useCartStore;
