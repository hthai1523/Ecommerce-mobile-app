import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomImage from "../Image";
import formatCurrency from '@/functions/formatCurrency';
import images from "@/assets/images";
import { Feather } from "@expo/vector-icons";

import { Product } from "@/store/interfaces";
import useCartStore from "@/store/cartStore";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const CartSection = ({ item, quantity }: { item: Product, quantity: number }) => {
 
  const addProduct = useCartStore((state) => state.addProduct);
  const reduceProduct = useCartStore((state) => state.reduceProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);

  const dragX = useSharedValue(0)

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (e) => {
      dragX.value = e.translationX
    },
    onEnd: () => {
      if (dragX.value < -100) {
        removeProduct(item)
      } else if (dragX.value > 100) {
        addProduct(item)
      }
      dragX.value = 0
    },
  })

  const itemContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: dragX.value,
        },
      ],
    };
  })
  
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[styles.shadow, itemContainerStyle]}
        className="w-full bg-white rounded-lg flex-row items-center px-4 py-6 my-2 relative box-border transition-all"
      >
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
        <View className="flex-1 ">
          <Text numberOfLines={1} className="font-normal text-sm">
            {item.title}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="font-bold text-base text-sky-400">{formatCurrency(item.price * quantity)}</Text>
            <Text className="font-light text-sm text-black/40 line-through">{formatCurrency(item.price * 3)}</Text>
          </View>
        </View>
  
        <TouchableOpacity className="p-2 absolute top-0 right-0" onPress={() => removeProduct(item)}>
          <Feather name="x" size={20} color="black" />
        </TouchableOpacity>
  
        <View
          style={styles.shadow}
          className="flex-row items-center gap-x-1 bg-white absolute right-2 bottom-2 rounded-full "
        >
          <TouchableOpacity
            className="p-1"
            onPress={() => reduceProduct(item)}
          >
            <Feather name="minus" size={20} color="black" />
          </TouchableOpacity>
          <Text className="font-bold text-base p-1 ">{quantity}</Text>
          <TouchableOpacity
            className="p-1"
            onPress={() => addProduct(item)}
          >
            <Feather name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,
  },
});

export default CartSection;
