import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import HeaderWithSearch from "@/components/layout/HeaderWithSearch";
import Card from "@/components/Card";
import { Stack } from "expo-router";
import getAllProduct from "@/services/getAllProduct";

import { Product } from "@/store/interfaces";
import getAllProductByCategory from "@/services/getAllProductByCategory";
import searchProduct from "@/services/searchProduct";

const Page: React.FC = () => {
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounced, setDebounced] = useState("");
  const [category, setCategory] = useState<string>("");
  const debounceSearch = (valueSearch: string) => {
    setDebounced(valueSearch);
  };

  const choseCategory = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoading(true);
        let response: Product[];

        if (debounced) {
          response = await searchProduct(debounced);
        } else if (category) {
         const data = await getAllProductByCategory(category);
          response = data.filter()
        } else {
          response = await getAllProduct();
        }

        setSearchResult(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    

    fetchApi();
  }, [debounced, category]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          header: () => (
            <HeaderWithSearch
              debounce={debounceSearch}
              choseCategory={choseCategory}
            />
          ),
        }}
      />
      {isLoading ? (
        <View className=" w-full h-full flex items-center justify-center">
          <ActivityIndicator size="large" color="#000ff" className="mt-4" />
        </View>
      ) : (
        <ScrollView className="mb-90 pt-1 px-7 relative top-[82] h-full">
          <FlatList
            data={searchResult}
            renderItem={({ item }) => (
              <Card data={item} width={145} height={189} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            style={{ paddingBottom: 72 }}
            columnWrapperStyle={{
              padding: 5,
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Page;
