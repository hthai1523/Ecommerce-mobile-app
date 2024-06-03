import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Stack } from 'expo-router';
import Header from '@/components/layout/Header';
import SkeletonExpo from 'moti/build/skeleton/expo';
import MenuHome from '@/components/MenuHome';
import Slider from '@/components/Slider';
import Separate from '@/components/Separate';
import Colors from '@/constants/Colors';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { api } from '@/constants/baseURL';
import ShoppingList from '@/components/layout/ShoppingList';
import Card from '@/components/Card';
import { Product } from '@/store/interfaces';

const Store: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listProductArrivals, setListProductArrivals] = useState<Product[]>([]);
  const [page, setPage] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [isScrollTop, setIsScrollTop] = useState(false);

  const scrollViewRef = useRef<FlatList>(null);

  const fetchInitialData = useCallback(async () => {
    try {
      const response = await api.get('/products?sortBy=discountPercentage&order=desc');
      setListProductArrivals(response.data.products.slice(0, 8));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const fetchMoreData = useCallback(async () => {
    setIsLoadingMore(true);
    try {
      const response = await api.get(`/products?limit=${page}`);
      setProduct((prevProducts) => [...prevProducts, ...response.data.products]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMoreData();
  }, [fetchMoreData]);

  const renderFooter = useMemo(() => (
    isLoadingMore && (
      <View className="py-5 border-t border-gray-300">
        <ActivityIndicator animating size="large" color={Colors.primary.background} />
      </View>
    )
  ), [isLoadingMore]);

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore) {
      setPage((prevPage) => prevPage + 10);
    }
  }, [isLoadingMore]);

  const handleScroll = useCallback((event) => {
    setIsScrollTop(event.nativeEvent.contentOffset.y > 100);
  }, []);

  const handleScrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ header: () => <Header isBack={false} /> }} />
      <View className="mt-[53]">
        <FlatList
          ref={scrollViewRef}
          data={product}
          renderItem={({ item }) => <Card data={item} width={145} height={189} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle="mb-2 px-2"
          ListHeaderComponent={() => (
            <>
              <View className="flex-row flex-wrap items-center justify-center px-4 gap-2 mt-3">
                {[...Array(4)].map((_, index) => (
                  <View key={index}>
                    <SkeletonExpo colorMode="light" width={150} height={100} />
                  </View>
                ))}
              </View>
              <MenuHome />
              <Slider />
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
                  <Text className="text-lg font-extrabold">Suggestion for you</Text>
                  <FontAwesome name="sort-numeric-asc" size={24} color="black" />
                </View>
              </View>
            </>
          )}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        {isScrollTop && (
          <TouchableOpacity className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-primary justify-center items-center" onPress={handleScrollToTop}>
            <Feather name='chevron-up' color='white' size={24} style={{ fontWeight: '700' }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default React.memo(Store);

const styles = StyleSheet.create({
  columnWrapper: {
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});
