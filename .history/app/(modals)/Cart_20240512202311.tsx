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
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import CartSection from "@/components/CartSection";
import Button from "@/components/Button";
import useCartStore from "@/store/cartStore";
import formatCurrency from "@/functions/formatCurrency";
import Colors from "@/constants/Colors";

const ShoppingCart = () => {
  const products = useCartStore((state) => state.products);
  const items = useCartStore((state) => state.items);

  const totalPriceCart = () => {
    return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <SafeAreaView className="bg-white/30 h-full">
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
      <FlatList
        data={products}
        renderItem={(item) => (
          <CartSection item={item.item} quantity={item.item.quantity} />
        )}
        contentContainerStyle={{ paddingHorizontal: 2 }}
      />
      <SafeAreaView className="w-full bg-white">
        <View className="flex-row items-center justify-between px-2 py-4 border-b border-b-[#EEE]">
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="ticket-percent-outline"
              size={28}
              color={Colors.primary.icon}
            />
            <Text className="text-base font-normal ml-2">Discount</Text>
          </View>
          <TouchableOpacity className="pl-7">
            <Feather name="chevron-right" size={24} color={"#ADADAD"} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between ">
          <View className="py-4  px-2">
            <Text>Total payment <Text className="text-sky-400">{formatCurrency(totalPriceCart())}</Text></Text>
            <Text>Saving<Text>{formatCurrency(totalPriceCart() / 3)}</Text></Text>
          </View>
          <TouchableOpacity className="h-full px-3 bg-sky-400 flex-row items-center">
            <Text className="text-white text-sm font-semibold ">Checkout<Text>({products.length})</Text></Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ShoppingCart;
