import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import useCartStore from "@/store/cartStore";

import useWishListStore from '@/store/wishListStore';
import Card from "@/components/Card";

const ShoppingCart = () => {
  const products = useCartStore((state) => state.products);
  const items = useCartStore((state) => state.items);
  const wishlist = useWishListStore((state) => state.wishlist); // Retrieve wishlist from the store


  return (
      <SafeAreaView className="bg-white h-full" style={{flex: 1}}>
        <Link href={'/(modals)/newList'} asChild>
          <TouchableOpacity className="bg-sky-400" style={{height: 50, width: '100%'}}>
            <Text className="m-auto text-sm font-normal text-white">+ New List</Text>
          </TouchableOpacity>
        </Link>
        <ScrollView showsVerticalScrollIndicator={false} className='pt-3'>
          {/* Render the wishlist */}
          {Object.entries(wishlist).map(([title, productList], index) => (
              <>
                  <View key={index} className='ml-3'>
                      <Text className='text-lg font-extrabold'>{title}</Text>
                      <FlatList
                          data={productList}
                          keyExtractor={(item, index) => index.toString()}
                          className="py-3"
                          horizontal={true}
                          renderItem={({ item }) => (
                              <Card data={item} width={145} height={190} />
                          )}
                          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                      />
                  </View>
                  <View className='w-full h-[2px] bg-[#EEE] my-4' />
              </>
          ))}
        </ScrollView>
      </SafeAreaView>
  );
};

export default ShoppingCart;
