import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  SafeAreaView,
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
  const [isLoading, setIsLoading] = useState(false);
  const [listProductArrivals, setListProductArrivals] = useState<Product[]>([]);
  const [page, setPage] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [isScrollTop, setIsScrollTop] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
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
      const response = await api.get(`https://dummyjson.com/products?limit=${page}`);
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

  const renderFooter = useCallback(() => (
    isLoadingMore ? (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" color={Colors.primary.background} />
      </View>
    ) : null
  ), [isLoadingMore]);

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore) {
      setPage((prevPage) => prevPage + 10);
    }
  }, [isLoadingMore]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsScrollTop(event.nativeEvent.contentOffset.y > 100);
  }, []);

  const handleScrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ header: () => <Header isBack={false} /> }} />
      <View className="mt-[53]">
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
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

            <FlatList
              data={product}
              renderItem={({ item }) => <Card data={item} width={145} height={189} />}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.columnWrapper}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0}
            />
          </View>
        </ScrollView>

        {isScrollTop && (
          <TouchableOpacity style={styles.scrollToTopButton} onPress={handleScrollToTop}>
            <Feather name='chevron-up' color='white' size={24} style={{ fontWeight: '700' }} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Store);

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper: {
    marginBottom: 5,
    padding: 5,
  },
  scrollToTopText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
