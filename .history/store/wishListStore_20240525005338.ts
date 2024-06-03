import {create} from 'zustand';
import {Product} from './interfaces'

interface List {
    [listTitle: string]: Array<Product>
}

interface WishListStore {
    wishlist: List;
    addToWishlist: (title: string, products: Product[]) => void;
}

const useWishListStore = create<WishListStore>((set) => ({
    wishlist: {},
    addToWishlist: (listTitle, products) =>
        set((state) => ({
            wishlist: {
                ...state.wishlist,
                [listTitle]: products,
            },
        })),
}));

export default useWishListStore;
