import { View, Text } from "react-native";
import React from "react";
import { Product } from "@/store/interfaces";
import Colors from "@/constants/Colors";
import CustomImage from "../Image";
import formatCurrency from "@/functions/formatCurrency";
import { FontAwesome6 } from "@expo/vector-icons";

const CheckoutSection = ({
  item,
  quantity,
}: {
  item: Product;
  quantity: number;
}) => {
  return (
    <View className="flex flex-col bg-white mt-4">
      <View className="flex flex-row items-center gap-3 p-4">
        <View
          className="p-1"
          style={{ backgroundColor: Colors.primary.background }}
        >
          <Text className="text-xs font-medium text-white">Shop Mall</Text>
        </View>
        <Text className="text-base font-bold">Thai Hoang - Official Store</Text>
      </View>

      <View className="mt-5 flex flex-row items-center px-4 pb-4">
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
            <Text className="text-base font-light text-black/40">
              {formatCurrency((item.price * quantity) / 3)}
            </Text>
            <Text className="text-base font-light text-black/40">
              x {quantity}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex flex-row items-center py-2 px-4 border-t border-t-black/40" style={{width: '100%'}} >
        <Text>
          Jointly checked{" "}
          <FontAwesome6 name="circle-question" size={18} color="black" />
        </Text>
      </View>
    </View>
  );
};

export default CheckoutSection;
