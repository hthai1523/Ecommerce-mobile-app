import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { Product } from "@/store/interfaces";
import useCartStore from "@/store/cartStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "../layout/BottomSheet";

const TabBottomDetail = ({ item }: { item: Product}) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <View className=" w-full h-16 border-t border-t-[#EEE]">
      <BottomSheet ref={bottomSheetRef} />
      <View className=" flex-row items-center gap-4 px-[3] py-2">
        <TouchableOpacity
          className="w-10 h-10 flex items-center justify-center rounded"
          style={{ backgroundColor: Colors.primary.background }}
          onPress={openModal}
        >
          <Feather name="message-square" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/shoppingCart")}
          className="w-32 h-10 rounded flex-row items-center justify-center gap-2"
          style={{ backgroundColor: Colors.primary.background }}
        >
          <Feather name="shopping-cart" size={24} color="white" />
          <Text className="text-base font-medium text-white">Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[170] h-10 rounded flex-row items-center justify-center gap-2 bg-sky-600"
          onPress={() => item && addProduct(item)}
        >
          <Feather name="plus-square" size={24} color="white" />
          <Text className="text-base font-medium text-white">Add to bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabBottomDetail;