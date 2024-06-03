import { create } from "zustand";
import { ProductWithSizeColor } from "./interfaces";

export interface CartState {
  products: Array<ProductWithSizeColor & { quantity: number }>;
  addProduct: (product: ProductWithSizeColor) => void;
  reduceProduct: (product: ProductWithSizeColor) => void;
  removeProduct: (product: ProductWithSizeColor) => void;
  clearCart: () => void;
  items: number;
  total: number;
}

const useCartStore = create<CartState>((set) => ({
  products: [],
  items: 0,
  total: 0,
  addProduct: (product: ProductWithSizeColor) =>
    set((state) => {
      state.items++;
      state.total += product.price;
      const hasProduct = state.products.find(
        (p) => p.productID === product.productID && p.sizes
      );
      if (hasProduct) {
        return {
          products: state.products.map((p) =>
            p.productID === product.productID && p.selectedSize === product.selectedSize && p.selectedColor === product.selectedColor
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        };
      }

      return { products: [...state.products, { ...product, quantity: 1 }] };
    }),
  reduceProduct: (product: ProductWithSizeColor) =>
    set((state) => {
      state.total -= product.price;
      state.items--;
      return {
        products: state.products
          .map((p) => {
            if (p.productID === product.productID && p.sizes === product.sizes) {
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

  removeProduct: (product: ProductWithSizeColor) =>
    set((state) => {
      const updatedProducts = state.products.filter(
        (p) => !(p.productID === product.productID && p.sizes === product.sizes)
      );
      const removedProduct = state.products.find(
        (p) => p.productID === product.productID && p.sizes === product.sizes
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
