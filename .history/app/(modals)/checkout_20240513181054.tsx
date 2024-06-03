import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import useCartStore from "@/store/cartStore";
import { Product } from "@/store/interfaces";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Page = () => {
  const products = useCartStore((state) => state.products);
  const clearCart = useCartStore((state) => state.clearCart);
  const reduceProduct = useCartStore((state) => state.reduceProduct);
  const total = useCartStore((state) => state.total);
  const [order, setOrder] = useState(false);

  const renderItem = ({
    item,
    quantity,
  }: {
    item: Product;
    quantity: number;
  }) => {};

  return (
    <>
      {order && <Text>Cool order</Text>}
      {!order && (
        <>
          <View className="">
            <View>
              <FontAwesome5 name="shipping-fast" size={24} color="black" />
              <Text>Free shipping code applied</Text>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default Page;
