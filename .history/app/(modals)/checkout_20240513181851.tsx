import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import useCartStore from "@/store/cartStore";
import { Product } from "@/store/interfaces";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "@/constants/Colors";

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
          <View style={styles.container}>
            <View>
              <MaterialIcons
                name="local-shipping"
                size={24}
                color={Colors.primary.icon}
              />
              <Text className="text-base font-normal">
                Free shipping code applied
              </Text>
            </View>
          </View>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: " rgb(255 255 255 / 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Page;
