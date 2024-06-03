import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Link, Stack, router, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { cardDatas } from "@/data";
import Feather from "@expo/vector-icons/Feather";

import Card from "@/components/Card";
import Header from "@/components/layout/Header";
import Search from "@/components/layout/Search";
import Slider from "@/components/Slider";
import MenuHome from "@/components/MenuHome";
import axios from "axios";
import Separate from "@/components/Separate";
import getAllProduct from "@/services/getAllProduct";
import { Product } from "@/store/interfaces";
import Colors from "@/constants/Colors";
import { api } from "@/constants/baseURL";
import getProductArrivals from "@/services/getProductArrivals";
import ShoppingList from "@/components/layout/ShoppingList";

const Page = () => {
  const [listProductRecommended, setListProductRecommended] = useState<
    Product[]
  >([]);
  const [listProduct, setListProduct] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  // get Product
  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoading(true);

        const [data, data2] = await Promise.all([getProductArrivals(), getAllProduct()]);

        setListProductRecommended(data.slice(0, 8));
        setListProduct(data2.slice(0, 8));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApi();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          header: () => <Header isBack={false} />,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="mt-[53]">
        <Slider />
        <Separate color="#EEE" />

        <ShoppingList
          data={listProductRecommended}
          title="Recommended"
          isLoading={isLoading}
          isNavigation={false}
        />

        <Separate color="#EEE" />

        <ShoppingList
          data={listProduct}
          title="Official Store"
          isLoading={isLoading}
          isNavigation={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
