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
import ShoppingList from "@/components/layout/ShoppingList";

const ShoppingCart = () => {
  const products = useCartStore((state) => state.products);
  const items = useCartStore((state) => state.items);
  const wishlist = useWishListStore((state) => state.wishlist); 


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
                  <ShoppingList title={title} data={productList} isNavigation={false} isLoading={false} />
                  <View className='w-full h-[2px] bg-[#EEE] my-4' />
              </>
          ))}
        </ScrollView>
      </SafeAreaView>
  );
};

export default ShoppingCart;
