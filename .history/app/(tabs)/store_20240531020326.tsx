import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  FlatList,
  StyleSheet,
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
import Colors from "@/constants/Colors";
import { Product } from "@/store/interfaces";
import getAllProduct from "@/services/getAllProduct";

const Store = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listProductArrivals, setListProductArrivals] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://192.168.2.10:8070/api/v1/Products1/paged?page=0&sizepage=4`);
        setListProductArrivals(response.data.data);
        setProduct(response.data.data);
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
      if (page === 0) return; // Skip initial fetch
      try {
        setIsLoadingMore(true);
        const response = await axios.get(`http://192.168.2.10:8070/api/v1/Products1/paged?page=${page}&sizepage=4`);
        setProduct(prevProducts => [...prevProducts, ...response.data.data]);
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
      setPage(prevPage => prevPage + 1);
    }
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

          <Separate color="#EEE" />

          <View className="ml-4">
            <Text className="text-lg font-extrabold">New Arrivals</Text>
            {isLoading ? (
              <ActivityIndicator
                size={"large"}
                color={Colors.primary.background}
                style={{ marginTop: 8 }}
              />
            ) : (
              <ScrollView
                className="mt-4 py-3 space-x-3 "
                horizontal={true}
                showsVerticalScrollIndicator={false}
              >
                {listProductArrivals.map((item) => {
                  return (
                    <Pressable key={item.productID}>
                      <Card data={item} width={145} height={189} />
                    </Pressable>
                  );
                })}
              </ScrollView>
            )}
          </View>

          <Separate color="#EEE" />

          <View className="space-y-6 mx-4">
            <Text className="text-lg font-extrabold ">Suggestion for you</Text>

            <FlatList
              data={product}
              renderItem={({ item }) => (
                <Card data={item} width={145} height={189} />
              )}
              keyExtractor={(item) => item.productID.toString()}
              numColumns={2}
              columnWrapperStyle={{
                marginBottom: 5,
                padding: 5,
              }}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
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
