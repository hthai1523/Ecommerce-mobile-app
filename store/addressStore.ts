import create from "zustand";
import { LocationGeocodedAddress } from "expo-location";

interface AddressState {
  address: LocationGeocodedAddress | null;
  setAddress: (address: LocationGeocodedAddress) => void;
}

const useAddressStore = create<AddressState>((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
}));

export default useAddressStore;
