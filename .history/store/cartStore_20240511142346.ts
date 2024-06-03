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
  addProduct: (product: Product) =>
    set((state) => {
      state.items++;

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
      return {
        products: state.products
          .map((p) => {
            if (p.id === product.id) {
              state.items--;
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
    removeProduct: (
      product: Product // Hàm để xóa sản phẩm
    ) =>
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
