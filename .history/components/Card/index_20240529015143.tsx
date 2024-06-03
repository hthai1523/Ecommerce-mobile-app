import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import CustomImage from "../Image";
import { router, useLocalSearchParams } from "expo-router";
import { Product } from "@/store/interfaces";
import formatCurrency from "@/functions/formatCurrency";
import Animated, { FadeInLeft, FadeInUp } from "react-native-reanimated";

interface CardProps {
  data: Product;
  width: number;
  height: number;
}

const Card: React.FC<CardProps> = ({ data, width, height }) => {
  const handleDetailProductPress = () =>
    router.navigate(`listing/${data.productID}`);

  return (
    <Animated.View
      entering={FadeInUp.springify()
        .damping(30)
        .mass(5)
        .stiffness(10)
        .restDisplacementThreshold(0.1)
        .restSpeedThreshold(5)}
      className="flex-col bg-white rounded-lg m-auto"
      style={[styles.shadow, { width: width, height: height }]}
    >
      <Pressable onPress={handleDetailProductPress}>
        <CustomImage
          className="rounded-lg object-cover"
          style={{
            width: "100%",
            height: height * 0.6,
            borderRadius: 6,
            objectFit: "cover",
          }}
          source={data.image}
        />
        <View className="my-2 px-1 w-full text-left space-y-1">
          <Text numberOfLines={1} className="font-bold">
            {data.title}
          </Text>
          <View className="flex-row items-center w-full overflow-hidden gap-1">
            <Text className="font-bold  text-sm text-sky-400">
              {formatCurrency(data.price)}
            </Text>
            <Text className="font-light text-xs text-black/40 line-through">
              {formatCurrency(data.price * 3)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 10,
  },
});

export default Card;
