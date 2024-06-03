import { View, Text } from "react-native";
import React from "react";
import { Product } from "@/store/interfaces";
import Colors from "@/constants/Colors";
import CustomImage from "../Image";

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

      <View>
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
      </View>
    </View>
  );
};

export default CheckoutSection;
