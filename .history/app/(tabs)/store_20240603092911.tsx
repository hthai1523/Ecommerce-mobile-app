import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  FlatList,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import Colors from "@/constants/Colors";
import { Product } from "@/store/interfaces";
import getAllProduct from "@/services/getAllProduct";
import { FontAwesome } from "@expo/vector-icons";
import { api } from "@/constants/baseURL";
import ShoppingList from "@/components/layout/ShoppingList";
import { TouchableOpacity } from "react-native-gesture-handler";

const Store = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listProductArrivals, setListProductArrivals] = useState<Product[]>([]);
  const [page, setPage] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [isScrollTop, setIsScrollTop] = useState(false);
  const scrollRef = useRef(null);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(
          "/products?sortBy=discountPercentage&order=desc"
        );
        setListProductArrivals(response.data.products.slice(0, 8));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch more data on page change
  useEffect(() => {
    const fetchMoreData = async () => {
      try {
        setIsLoadingMore(true);
        const response = await api.get(
          `https://dummyjson.com/products?limit=${page}`
        );
        setProduct((prevProducts) => [
          ...prevProducts,
          ...response.data.products,
        ]);
        setIsLoadingMore(false);
      } catch (error) {
        console.error(error);
        setIsLoadingMore(false);
      }
    };

    fetchMoreData();
  }, [page]);

  const renderFooter = () => {
    return isLoadingMore ? (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator
          animating
          size="large"
          color={Colors.primary.background}
        />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setPage((prevPage) => prevPage + 10);
    }
  };

  const calculatePriceReal = (data: Product) => {
    return data.price * (data.discountPercentage / 100);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY > 400) {
      setIsScrollTop(true);
    } else {
      setIsScrollTop(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ header: () => <Header isBack={false} /> }} />
      <View className="mt-[53]">
        <ScrollView
          ref={scrollRef}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
        >
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

          {isScrollTop && (
            <TouchableOpacity
              className=" bg-black rounded-full items-center justify-center absolute bottom-5 right-5"
              style={{
                width: 50,
                height: 50,
              }}
            >
              <Text>top</Text>
            </TouchableOpacity>
          )}

          <Separate color="#EEE" />

          <ShoppingList
            data={listProductArrivals}
            isLoading={isLoading}
            title="Sale Now"
            isNavigation={false}
          />

          <Separate color="#EEE" />

          <View className="space-y-6 mx-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-extrabold ">
                Suggestion for you
              </Text>
              <FontAwesome name="sort-numeric-asc" size={24} color="black" />
            </View>

            <FlatList
              data={product}
              renderItem={({ item }) => (
                <Card data={item} width={145} height={189} />
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{
                marginBottom: 5,
                padding: 5,
              }}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Store;

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: Colors.primary.background,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  sendButton: {
    padding: 10,
  },
});
