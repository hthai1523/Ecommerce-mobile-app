import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import CartSection from "@/components/CartSection";
import Button from "@/components/Button";
import useCartStore from "@/store/cartStore";
import formatCurrency from "@/functions/formatCurrency";

const ShoppingCart = () => {
  const products = useCartStore((state) => state.products);
  const items = useCartStore((state) => state.items);

  const totalPriceCart = () => {
    return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      {/* <View className="flex-row items-center justify-between p-4 border-b border-b-[#ADADAD]">
        <Text className="text-base font-normal">Total Price</Text>
        <Text className="text-base font-bold">
          {formatCurrency(totalPriceCart())}
        </Text>
      </View> */}

      {/* <View className="w-full pt-6  space-y-4">
        <View className="flex-row justify-between items-center px-4">
          <Text className="text-lg font-normal">Purchase Items</Text>
          <Text className="text-base font-semibold">
            Total Items: {products.length}
          </Text>
        </View>
        <View className="w-full h-full px-1">
         
        </View>
      </View>
      <SafeAreaView className="w-full h-20 bg-red-400">
        <View className="flex-row items-center justify-between p-4">
          <Text className="text-base font-normal">Total Price</Text>
          <Text className="text-base font-bold">
            {formatCurrency(totalPriceCart())}
          </Text>
        </View>
      </SafeAreaView> */}
      <View className="bg-white/25">
        <FlatList
          data={products}
          renderItem={(item) => (
            <CartSection item={item.item} quantity={item.item.quantity} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShoppingCart;
