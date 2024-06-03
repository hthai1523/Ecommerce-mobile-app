import { View, Text } from "react-native";
import React from "react";
import { Product } from "@/store/interfaces";
import Colors from "@/constants/Colors";
import CustomImage from "../Image";
import formatCurrency from "@/functions/formatCurrency";

const CheckoutSection = ({
  item,
  quantity,
}: {
  item: Product;
  quantity: number;
}) => {
  return (
    <View className="flex flex-col p-4 bg-white">
      <View className="flex flex-row items-center gap-3">
        <View
          className="p-1"
          style={{ backgroundColor: Colors.primary.background }}
        >
          <Text className="text-xs font-medium text-white">Shop Mall</Text>
        </View>
        <Text className="text-base font-bold">Thai Hoang - Official Store</Text>
      </View>

      <View className="mt-9 flex flex-row items-center">
        <CustomImage
          style={{
            width: 60,
            height: 60,
            borderRadius: 5,
            objectFit: "contain",
            marginRight: 16,
          }}
          source={item.image}
        />
        <View className="flex-1">
          <Text numberOfLines={1} className="font-normal text-sm">
            {item.title}
          </Text>
          <View
            className="border-2"
            style={{ borderColor: Colors.primary.background, width: 80 }}
          >
            <Text className="text-sky-400 text-center text-xs font-medium">
              Free return
            </Text>
          </View>
          <Text className="text-[#ADADAD] text-sm font-normal">
            Options: Blue, L
          </Text>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-base font-light text-[#ADADAD]">{formatCurrency(item.price * quantity / 3)}</Text>
            <Text className="text-base font-light text-[#ADADAD]">x {quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CheckoutSection;
