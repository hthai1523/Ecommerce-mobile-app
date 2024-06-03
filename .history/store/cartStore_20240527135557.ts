import { create } from "zustand";
import { ProductWithSize } from "./interfaces";

export interface CartState {
  products: Array<ProductWithSize & { quantity: number }>;
  addProduct: (product: ProductWithSize) => void;
  reduceProduct: (product: ProductWithSize) => void;
  removeProduct: (product: ProductWithSize) => void;
  clearCart: () => void;
  items: number;
  total: number;
}

const useCartStore = create<CartState>((set) => ({
  products: [],
  items: 0,
  total: 0,
  addProduct: (product: ProductWithSize) =>
    set((state) => {
      state.items++;
      state.total += product.price;
      const hasProduct = state.products.find(
        (p) => p.id === product.id && p.size === product.size
      );
      if (hasProduct) {
        return {
          products: state.products.map((p) =>
            p.id === product.id && p.size === product.size
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        };
      }

      return { products: [...state.products, { ...product, quantity: 1 }] };
    }),
  reduceProduct: (product: ProductWithSize) =>
    set((state) => {
      state.total -= product.price;
      state.items--;
      return {
        products: state.products
          .map((p) => {
            if (p.id === product.id && p.size === product.size) {
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

  removeProduct: (product: ProductWithSize) =>
    set((state) => {
      const updatedProducts = state.products.filter(
        (p) => !(p.id === product.id && p.size === product.size)
      );
      const removedProduct = state.products.find(
        (p) => p.id === product.id && p.size === product.size
      );
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
        total: 0,
      };
    }),
}));

export default useCartStore;
