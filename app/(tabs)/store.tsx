import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Header from "@/components/layout/Header";
import images from "@/assets/images";
import CustomImage from "@/components/Image";
import SkeletonExpo from "moti/build/skeleton/expo";
import MenuHome from "@/components/MenuHome";
import Slider from "@/components/Slider";
import axios from "axios";
import Card from "@/components/Card";
import Separate from "@/components/Separate";

interface Product {
  id: number;
  title: string;
  price: number;
  rate: number;
  image: string;
}

const Store = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listProductArrivals, setListProductArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        const data = response.data;
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

  const renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ header: () => <Header isBack={false} /> }} />
      <View className="mt-[53]">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap items-center justify-center px-4 gap-2 mt-3 ">
            <View className="">
              <SkeletonExpo colorMode="light" width={150} height={100} />
            </View>
            <View className="">
              <SkeletonExpo colorMode="light" width={150} height={100} />
            </View>
            <View className="">
              <SkeletonExpo colorMode="light" width={150} height={100} />
            </View>
            <View className="">
              <SkeletonExpo colorMode="light" width={150} height={100} />
            </View>
          </View>

          <MenuHome />
          <Slider />

          <Separate color="#ADADAD" />

          <View className="ml-4">
            <Text className="text-lg font-extrabold">New Arrivals</Text>
            {isLoading ? (
              <ScrollView
                className="mt-4 space-x-3 "
                horizontal={true}
                showsVerticalScrollIndicator={false}
              >
                <View>
                  <SkeletonExpo colorMode="light" width={150} height={100} />
                </View>
                <View>
                  <SkeletonExpo colorMode="light" width={150} height={100} />
                </View>
                <View>
                  <SkeletonExpo colorMode="light" width={150} height={100} />
                </View>
                <View>
                  <SkeletonExpo colorMode="light" width={150} height={100} />
                </View>
              </ScrollView>
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
            
          {/* <View className="mt-6 flex-row flex-wrap items-center px-4 gap-2"> */}
          {/* <View>
              <SkeletonExpo colorMode="light" width={145} height={189} />
            </View>
            <View>
              <SkeletonExpo colorMode="light" width={145} height={189} />
            </View>
            <View>
              <SkeletonExpo colorMode="light" width={145} height={189} />
            </View>
            <View>
              <SkeletonExpo colorMode="light" width={145} height={189} />
            </View>
            <View>
              <SkeletonExpo colorMode="light" width={145} height={189} />
            </View> */}

          
          
          <View className="space-y-6 ml-4">
            <Text className="text-lg font-extrabold ">Suggestion for you</Text>

            <FlatList
              data={listProductArrivals}
              renderItem={({ item }) => (
                <Card data={item} width={145} height={189} />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{
                display: "flex",
                justifyContent: "space-evenly",
                marginBottom: 5,
              }}
              ListFooterComponent={renderFooter}
            />
          </View>
          {/* </View> */}
        </ScrollView>
      </View>
    </View>
  );
};

export default Store;
