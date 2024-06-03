import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
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

interface Product {
  id: number;
  title: string;
  price: number;
  rate: number;
  image: string;
}


const Page = () => {
  const [listProductArrivals, setListProductArrivals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // get Product
  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoading(true);
       
        const data = await getAllProduct()
        setListProductArrivals(data);
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
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          header: () => <Header isBack={false} />,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="mt-[53]">
<View className="mt-4">
          <Slider />
  
</View>
        <Separate color="#ADADAD" />

        <View className="ml-5">
          <Text className="text-lg font-extrabold">New Arrivals</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#000ff" />
          ) : (
            <ScrollView
              className="mt-4 space-x-3 "
              horizontal={true}
              showsVerticalScrollIndicator={false}
            >
              {listProductArrivals.map((item) => {
                return (
                  <Pressable key={item.id}>
                    <Card data={item} width={100} height={189} />
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
        </View>

         <Separate color="#ADADAD" />

        <View className="">
          <View className="flex-row justify-between items-center px-5">
            <Text className="text-lg font-extrabold">Official Store</Text>
            <TouchableOpacity onPress={() => router.navigate("/(tabs)/store")}>
              <Text className="text-xs text-gray-500">See All</Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#000ff" />
          ) : (
            <ScrollView
              className="mt-4 ml-5 space-x-3 "
              horizontal={true}
              showsVerticalScrollIndicator={false}
            >
              {listProductArrivals.map((item) => {
                return (
                  <Pressable key={item.id}>
                    <Card data={item} width={100} height={189} />
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;
