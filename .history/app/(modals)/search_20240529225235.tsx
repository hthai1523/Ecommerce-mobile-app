import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, View } from "react-native";
import HeaderWithSearch from "@/components/layout/HeaderWithSearch";
import Card from "@/components/Card";
import { Stack } from "expo-router";
import getAllProduct from "@/services/getAllProduct";
import { Product } from '@/store/interfaces';

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
        const response = await getAllProduct();
        const data: Product[] = response;

        let filteredResults = data;
        if (debounced) {
          filteredResults = data.filter((item) =>
            item.title.toLowerCase().includes(debounced.toLowerCase())
          );
        }

        if (category) {
          filteredResults = filteredResults.filter((item) =>
            item.category.toLowerCase() === category.toLowerCase()
          );
        }

        setSearchResult(filteredResults);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApi();
  }, [debounced, category]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen
        options={{
          header: () => <HeaderWithSearch debounce={debounceSearch} choseCategory={choseCategory} />,
        }}
      />
      {isLoading ? (
        <View className="bg-[#EEE] w-full h-full flex items-center justify-center">
          <ActivityIndicator size="large" color="#000ff" className="mt-4" />
        </View>
      ) : (
        <ScrollView className="mb-90 pt-1 px-7 relative top-[82] h-full">
          <FlatList
            data={searchResult}
            renderItem={({ item }) => (
              <Card data={item} width={145} height={189} />
            )}
            keyExtractor={(item) => item.productID.toString()}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Page;
