import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
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
    <SafeAreaView className="bg-white h-full" style={{flex: 1}}>
      <TouchableOpacity style={{height: 50, width: '100%', backgroundColor: 'red'}}>
        <Text className="m-auto">New List</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ShoppingCart;
