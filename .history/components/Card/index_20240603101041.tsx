import { View, Text, Pressable } from "react-native";
import React from "react";
import CustomImage from "../Image";
import { router } from "expo-router";
import { Product } from "@/store/interfaces";
import formatCurrency from "@/functions/formatCurrency";
import Animated, { FadeInRight } from "react-native-reanimated";

interface CardProps {
  data: Product;
  width: number;
  height: number;
}

const Card: React.FC<CardProps> = ({ data, width, height }) => {
  const handleDetailProductPress = () => router.navigate(`listing/${data.id}`);

  const priceReal = data.price * (data.discountPercentage / 100);

  return (
    <Pressable
      onPress={handleDetailProductPress}
      className="flex-col bg-white rounded-lg m-auto"
      style={{ width, height }}
    >
      <Animated.View
        entering={FadeInRight.delay(300).duration(400).springify()}
      >
        <CustomImage
          className="rounded-lg"
          style={{
            width: "100%",
            height: height * 0.7,
            borderRadius: 6,
          }}
          source={data.thumbnail}
          resizeMode="cover"
        />
        <View className="my-2 px-1 w-full text-left space-y-1">
          <Text numberOfLines={1} className="font-bold">
            {data.title}
          </Text>
          <View className="flex-row items-center w-full gap-1 overflow-hidden">
            <Text className="font-bold text-sm text-sky-400">
              {formatCurrency(priceReal)}
            </Text>
            <Text className="font-light text-xs text-black/40 line-through">
              {formatCurrency(data.price)}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};



export default Card;
