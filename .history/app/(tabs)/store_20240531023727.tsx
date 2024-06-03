import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Card from "@/components/Card";
import SkeletonExpo from "moti/build/skeleton/expo";
import MenuHome from "@/components/MenuHome";
import Slider from "@/components/Slider";
import Separate from "@/components/Separate";
import { Product } from "@/store/interfaces";

const Store = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listProductArrivals, setListProductArrivals] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [sortDescending, setSortDescending] = useState(false);

  // Function to calculate priceReal
  const calculatePriceReal = (data: Product) => {
    return data.price * (data.discount / 100);
  };

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://192.168.2.10:8070/api/v1/Products1/paged?page=0&sizepage=4`
        );
        setListProductArrivals(response.data.data);
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
        const response = await axios.get(
          `http://192.168.2.10:8070/api/v1/Products1/paged?page=${page}&sizepage=4`
        );
        setProduct((prevProducts) => [...prevProducts, ...response.data.data]);
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
      setPage((prevPage) => prevPage + 1);
    }
  };

  const toggleSort = () => {
    setSortDescending((prevSort) => !prevSort);
    const sortedProducts = product.sort((a, b) => {
      const priceRealA = calculatePriceReal(a);
      const priceRealB = calculatePriceReal(b);
      return sortDescending ? priceRealB - priceRealA : priceRealA - priceRealB;
    });
    setProduct(sortedProducts);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 53 }}>
        <View style={{ marginLeft: 4 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Suggestion for you
          </Text>
          <FontAwesome
            name={sortDescending ? "sort-numeric-desc" : "sort-numeric-asc"}
            size={24}
            color="black"
            onPress={toggleSort}
            style={{ marginTop: 8 }}
          />
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
          onEndReachedThreshold={2}
        />
      </View>
    </View>
  );
};

export default Store;
