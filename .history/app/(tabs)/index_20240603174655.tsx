import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/layout/Header";
import Slider from "@/components/Slider";
import Separate from "@/components/Separate";
import getAllProduct from "@/services/getAllProduct";
import { Product } from "@/store/interfaces";
import getProductArrivals from "@/services/getProductArrivals";
import ShoppingList from "@/components/layout/ShoppingList";

const Page: React.FC = () => {
  const [listProductRecommended, setListProductRecommended] = useState<Product[]>([]);
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          header: () => <Header isBack={false} />,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="pt-14">
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
