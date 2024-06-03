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
              <View style={styles.footerAddress}></View>
            </Link>

            {/* list Item */}

            <FlatList
              data={products}
              renderItem={(item) => (
                <CheckoutSection item={item.item} quantity={item.item.quantity} />
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
          <SafeAreaView>

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
  footerAddress:{
    width: "100%",
    height: 3,
    background: "linear-gradient(45deg, #3590df, #6fa6d6 33px, transparent 0, transparent 41px, #f18d9b 0, #f18d9b 74px, transparent 0, transparent 82px)",
    backgroundPosition: "-30px",
    backgroundSize: "116px 3px",
  }
});

export default Page;
