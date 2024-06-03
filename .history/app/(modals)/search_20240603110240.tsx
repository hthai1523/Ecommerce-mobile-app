import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, ActivityIndicator, FlatList } from "react-native";
import HeaderWithSearch from "@/components/layout/HeaderWithSearch";
import Card from "@/components/Card";
import { Stack } from "expo-router";
import getAllProduct from "@/services/getAllProduct";
import getAllProductByCategory from "@/services/getAllProductByCategory";
import searchProduct from "@/services/searchProduct";
import { Product } from "@/store/interfaces";

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
          response = await getAllProductByCategory(category);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          header: () => (
            <HeaderWithSearch debounce={debounceSearch} choseCategory={choseCategory} />
          ),
        }}
      />
      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 72 }}>
          <FlatList
            data={searchResult}
            renderItem={({ item }) => <Card data={item} width={145} height={189} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ padding: 5 }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Page;
