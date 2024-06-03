import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import CartSection from "@/components/CartSection";
import Button from "@/components/Button";
import useCartStore from "@/store/cartStore";
import formatCurrency from "@/functions/formatCurrency";

const ShoppingCart = () => {
  const products = useCartStore((state) => state.products);
  const items = useCartStore((state) => state.items);

  const totalPriceCart = () => {
    return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  return (
    <View className="bg-white h-full">
      
    </View>
  );
};

export default ShoppingCart;
