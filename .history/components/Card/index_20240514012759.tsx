import { View, Text, Pressable } from "react-native";
import React from "react";
import CustomImage from "../Image";
import { router, useLocalSearchParams } from "expo-router";
import {Product} from '@/store/interfaces';
interface CardProps {
  data: Product;
  width: number;
  height: number;
}

const Card: React.FC<CardProps> = ({ data, width, height }) => {
  const handleDetailProductPress = () => router.navigate(`listing/${data.id}`);

  return (
    <Pressable
      onPress={handleDetailProductPress}
      className="flex-col justify-center items-center overflow-hidden bg-white rounded-lg"
      style={{ width: width, height: height }}
    >
      <CustomImage
        className="rounded-lg object-cover"
        style={{ width: width, height: height, borderRadius: 8, objectFit: 'contain' }}
        source={data.image}
      />
      <View className="my-2 px-1 w-full text-left space-y-1">
        <Text numberOfLines={1} className="font-bold">
          {data.title}
        </Text>
        <Text className="font-medium">${data.price}</Text>
      </View>
    </Pressable>
  );
};

export default Card;
