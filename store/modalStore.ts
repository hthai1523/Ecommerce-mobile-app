import { create } from "zustand";

export interface bottomSheet {
  isOpen: boolean;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
}

const useBottomSheet = create((set) => ({
  isOpen: false,
  openBottomSheet: () =>
    set(() => {
        return {
         isOpen: true
        };
      }),
  closeBottomSheet: () =>
    set(() => {
        return {
         isOpen: false
        };
      }),
}));

export default useBottomSheet;