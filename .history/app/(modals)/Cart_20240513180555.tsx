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
  const total = useCartStore((state) => state.total)
  const totalPriceCart = () => {
    return products.reduce((acc, item) => acc + item.price * 2  * item.quantity, 0);
  };

  return (
    <SafeAreaView className="bg-white/30 h-full">
      <FlatList
        data={products}
        renderItem={(item) => (
          <CartSection item={item.item} quantity={item.item.quantity} />
        )}
        contentContainerStyle={{ paddingHorizontal: 2 }}
      />

      
      {/* bottom checkout */}
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
          <View className="py-3  px-2">
            <Text className="text-sm font-extralight">
              Total payment{" "}
              <Text className="text-sky-400 font-bold text-lg">
                {formatCurrency(total)}
              </Text>
            </Text>
            <Text className="text-sm font-extralight">
              Saving{" "}
              <Text className="text-sky-400 font-normal text-base">
                {formatCurrency(totalPriceCart())}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(modals)/checkout")}
            className="h-full px-5 bg-sky-400 flex-row items-center"
          >
            <Text className="text-white text-sm font-semibold ">
              Checkout<Text>({products.length})</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ShoppingCart;
