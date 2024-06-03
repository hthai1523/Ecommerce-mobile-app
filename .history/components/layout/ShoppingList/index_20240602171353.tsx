import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Product } from "@/store/interfaces";
import getAllProduct from "@/services/getAllProduct";
import Card from "../../Card";
const ShoppingList = ({data} : {data: Product}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listProduct, setListProduct] = useState<Array<Product>>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const data = await getAllProduct();
        setListProduct(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        console.error(error);
      }
    };

    fetch()
  }, []);

  return (
    <View className="bg-white">
      <View className="flex-row justify-between items-center px-5">
        <Text className="text-lg font-extrabold">Favorite product</Text>
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
          {listProduct.map((item) => {
            return (
              <Pressable key={item.productID}>
                <Card data={item} width={145} height={190} />
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({});
