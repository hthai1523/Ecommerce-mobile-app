import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomImage from "../Image";
import formatCurrency from '@/functions/formatCurrency';
import images from "@/assets/images";
import { Feather } from "@expo/vector-icons";

import { Product } from "@/store/interfaces";
import useCartStore from "@/store/cartStore";

const CartSection = ({ item, quantity }: { item: Product, quantity: number }) => {
  const [productQuantity, setProductQuantity] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState(1);

  const addProduct = useCartStore((state) => state.addProduct);
  const reduceProduct = useCartStore((state) => state.reduceProduct);

  return (
    <View
      style={styles.shadow}
      className="w-full bg-white rounded-lg flex-row items-center p-4 my-2 relative box-border"
    >
      <CustomImage
        style={{
          width: 60,
          height: 60,
          borderRadius: 5,
          objectFit: "cover",
          marginRight: 16,
        }}
        source={item.image}
      />
      <View className="flex-1 ">
        <Text numberOfLines={1} className="font-bold text-sm">
          {item.title}
        </Text>
        <Text className="font-light text-sm">${totalPrice}</Text>
      </View>

      <TouchableOpacity className="p-2 absolute top-0 right-0">
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
        <Text className="font-bold text-base p-1">{quantity}</Text>
        <TouchableOpacity
          className="p-1"
          onPress={() => addProduct(item)}
        >
          <Feather name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
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
