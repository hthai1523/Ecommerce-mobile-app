import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import CartSection from "@/components/CartSection";
import Button from "@/components/Button";
import useCartStore from "@/store/cartStore";

const ShoppingCart = () => {
  const products = useCartStore((state) => state.products);
  const items = useCartStore((state) => state.items);

  return (
    <View className="bg-white h-full">
      <View className="flex-row items-center justify-between p-4 border-b border-b-[#ADADAD]">
        <Text className="text-base font-normal">Total Price</Text>
        <Text className="text-base font-bold">$9999</Text>
      </View>

      <View className="w-full pt-6 px-4 space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-normal">Purchase Items</Text>
          <Text className="text-lg font-normal text-sky-400">{items}</Text>
        </View>
        {/* cart section */}
        <View className="w-full h-80">
          <FlatList
            data={products}
            renderItem={(item) => (
              <CartSection item={item.item} quantity={item.item.quantity} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View className="items-end ">
          <Button
            text="Checkout"
            icon="check-circle"
            primary
            width={150}
            height={40}
            onPress={() => {
              router.push("/(modals)/checkout");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ShoppingCart;
