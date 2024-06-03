import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import CartSection from "@/components/CartSection";
import Button from "@/components/Button";
import useCartStore from "@/store/cartStore";

const ShoppingCart = () => {
  const addProduct = useCartStore((state) => state.addProduct);
  const reduceProduct = useCartStore((state) => state.reduceProduct);
  const products = useCartStore((state) => state.products);

  return (
    <View className="bg-white h-full">
      <View className="flex-row items-center justify-between p-4 border-b border-b-[#ADADAD]">
        <Text className="text-base font-normal">Total Price</Text>
        <Text className="text-base font-bold">$9999</Text>
      </View>

      <ScrollView className="w-full pt-6 px-4 space-y-4">
        <Text className="text-lg font-normal">Purchase Items</Text>
        {/* cart section */}
        <FlatList data={products} renderItem={() => (
          <View>
            <CartSection />
          </View>
        )} />

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
      </ScrollView>
    </View>
  );
};

export default ShoppingCart;
