import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, View } from "react-native";
import HeaderWithSearch from "@/components/layout/HeaderWithSearch";
import Card from "@/components/Card";
import { Stack } from "expo-router";

interface Product {
  id: number;
  title: string;
  price: number;
  rate: number;
  image: string;
}

const Page: React.FC = () => {
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounced, setDebounced] = useState("");
  const [category, setCategory] = useState<String>()
  const debounceSearch = (valueSearch: string) => {
    setDebounced(valueSearch);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        if(!debounced) {
          return
        }

        setIsLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        const data: Product[] = response.data;
        const filteredResults = data.filter((item) =>
          item.title.toLowerCase().includes(debounced.toLowerCase())
        );
        setSearchResult(filteredResults);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApi();
  }, [debounced]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Stack.Screen
        options={{
          header: () => <HeaderWithSearch debounce={debounceSearch} />,
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
            keyExtractor={(item) => item.id.toString()}
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
