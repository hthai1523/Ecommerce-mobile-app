import { create } from "zustand";
import { ProductDetail } from "./interfaces";

export interface CartState {
  products: Array<ProductDetail & { quantity: number }>;
  addProduct: (product: ProductDetail) => void;
  reduceProduct: (product: ProductDetail) => void;
  removeProduct: (product: ProductDetail) => void;
  clearCart: () => void;
  items: number;
  total: number;
}

const useCartStore = create<CartState>((set) => ({
  products: [],
  items: 0,
  total: 0,
  addProduct: (product: ProductDetail) =>
    set((state) => {
      state.items++;
      state.total += product.price;
      const existingProductIndex = state.products.findIndex(
        (p) => p.productID === product.productID &&
               p.sizes[0] === product.sizes[0] &&
               p.colors[0] === product.colors[0]
      );

      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity++;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }

      return { ...state };
    }),

  reduceProduct: (product: ProductDetail) =>
    set((state) => {
      const existingProductIndex = state.products.findIndex(
        (p) => p.productID === product.productID &&
               p.sizes[0] === product.sizes[0] &&
               p.colors[0] === product.colors[0]
      );

      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity--;
        state.total -= product.price;
        state.items--;

        if (state.products[existingProductIndex].quantity === 0) {
          state.products.splice(existingProductIndex, 1);
        }
      }

      return { ...state };
    }),

  removeProduct: (product: ProductDetail) =>
    set((state) => {
      const existingProductIndex = state.products.findIndex(
        (p) => p.productID === product.productID &&
               p.sizes[0] === product.sizes[0] &&
               p.colors[0] === product.colors[0]
      );

      if (existingProductIndex !== -1) {
        state.items -= state.products[existingProductIndex].quantity;
        state.total -= state.products[existingProductIndex].quantity * product.price;
        state.products.splice(existingProductIndex, 1);
      }

      return { ...state };
    }),

  clearCart: () =>
    set((state) => {
      return {
        products: [],
        items: 0,
        total: 0,
      };
    }),
}));

export default useCartStore;
