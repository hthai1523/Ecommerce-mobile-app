import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import CartSection from "@/components/CartSection";
import Button from "@/components/Button";

const ShoppingCart = () => {
  return (
    <View className="bg-white h-full">
      <Stack.Screen
        options={{
          headerTitle: "Shopping Cart",
          headerLeft: () => (
            <TouchableOpacity className="p-2" onPress={() => router.back( )}>
              <Feather name="home" size={24} color={"black"} />
            </TouchableOpacity>
          ),
        }}
      />

      <View className="flex-row items-center justify-between p-4 border-b border-b-[#ADADAD]">
        <Text className="text-base font-normal">Total Price</Text>
        <Text className="text-base font-bold">$9999</Text>
      </View>

      <ScrollView className="w-full pt-6 px-4 space-y-4">
        <Text className="text-lg font-normal">Purchase Items</Text>
        {/* cart section */}
        <View className="">
          <CartSection />
        </View>
        <View className="">
          <CartSection />
        </View>
        <View className="">
          <CartSection />
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
      </ScrollView>
    </View>
  );
};

export default ShoppingCart;
