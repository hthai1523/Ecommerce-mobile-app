import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import useCartStore from "@/store/cartStore";
import { Product } from "@/store/interfaces";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import CartSection from "@/components/CartSection";
import CheckoutSection from "@/components/CheckOutSection";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import formatCurrency from "@/functions/formatCurrency";

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

  const totalPrice = () => {
    return products.reduce(
      (acc, item) => acc + (item.price / 3) * item.quantity,
      0
    );
  };

  return (
    <>
      {order && <Text>Cool order</Text>}
      {!order && (
        <>
          <ScrollView style={styles.container}>
            {/* shipping */}
            <View
              style={{
                width: "100%",
                height: 50,
                backgroundColor: "#fdf6e2",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                gap: 12,
              }}
            >
              <MaterialIcons
                name="local-shipping"
                size={24}
                color={Colors.primary.icon}
              />
              <Text className="text-base font-normal">
                Free shipping code applied
              </Text>
            </View>

            {/* select address */}
            <Link
              href={"/(modals)/location-search"}
              asChild
              style={{ marginTop: 12 }}
            >
              <TouchableOpacity
                style={{ width: "100%" }}
                className="p-4 bg-white flex-row items-center justify-between"
              >
                <View className="flex flex-row items-center gap-3 flex-1">
                  <FontAwesome6 name="location-dot" size={24} color={"red"} />
                  <Text className="text-base font-normal">Select address</Text>
                </View>
                <TouchableOpacity>
                  <Feather name="chevron-right" size={24} color={"#ADADAD"} />
                </TouchableOpacity>
              </TouchableOpacity>
              {/* <View style={{ width: "100%", height: 3 }}>
                  <LinearGradient
                    colors={[
                      "#3590df",
                      "#6fa6d6",
                      "transparent",
                      "transparent",
                      "#f18d9b",
                      "#f18d9b",
                      "transparent",
                      "transparent",
                    ]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View> */}
            </Link>

            {/* list Item */}

            <FlatList
              data={products}
              renderItem={(item) => (
                <CheckoutSection
                  item={item.item}
                  quantity={item.item.quantity}
                />
              )}
              scrollEnabled={false}
              contentContainerStyle={{ paddingHorizontal: 2 }}
              ListEmptyComponent={
                <Text className="text-base font-normal text-center">
                  Your cart is empty
                </Text>
              }
            />
          </ScrollView>
          <SafeAreaView style={styles.checkOutContainer}>
            <View>
              <Text>Total payment</Text>
              <Text>{formatCurrency(totalPrice())}</Text>
            </View>
            <TouchableOpacity className="bg-sky-400 flex-row items-center">
              <Text className="text-white text-sm font-semibold ">
                Checkout
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: " rgb(255 255 255 / 0.3)",
  },
  gradient: {
    width: "100%",
    height: "100%",
    transform: [{ rotate: "45deg" }],
  },
  checkOutContainer: {
    width: '100%',
    height: 50,
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
  }
});

export default Page;
