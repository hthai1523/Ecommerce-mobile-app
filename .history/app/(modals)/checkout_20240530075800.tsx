// Page.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import useCartStore from "@/store/cartStore";
import Colors from "@/constants/Colors";
import CheckoutSection from "@/components/CheckOutSection";
import formatCurrency from "@/functions/formatCurrency";
import useAddressStore from "@/store/addressStore";
import Toast from "react-native-toast-message";

const Page: React.FC = () => {
  const products = useCartStore((state) => state.products);
  const total = useCartStore((state) => state.total);
  const [order, setOrder] = useState(false);
  const { address } = useAddressStore();

  const totalPrice = (): number => {
    return products.reduce(
      (acc, item) => acc + item.price * (item.discount / 100) * item.quantity,
      0
    );
  };

  return (
    <>
      {order && <Text>Cool order</Text>}
      {!order && (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.shippingContainer}>
              <MaterialIcons
                name="local-shipping"
                size={24}
                color={Colors.primary.icon}
              />
              <Text style={styles.shippingText}>
                Free shipping code applied
              </Text>
            </View>

            <Link
              href="/(modals)/location-search"
              asChild
              style={{ marginTop: 12 }}
            >
              <TouchableOpacity style={styles.addressContainer}>
                <View style={styles.addressInnerContainer}>
                  <FontAwesome6 name="location-dot" size={24} color={"red"} />
                  <Text style={styles.addressText}>
                    {address
                      ? `${address.street}, ${address.city}`
                      : "Select address"}
                  </Text>
                </View>
                <Feather name="chevron-right" size={24} color={"#ADADAD"} />
              </TouchableOpacity>
            </Link>

            <FlatList
              data={products}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <CheckoutSection item={item} quantity={item.quantity} />
              )}
              scrollEnabled={false}
              contentContainerStyle={{ paddingHorizontal: 2 }}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Your cart is empty</Text>
              }
            />
          </ScrollView>
          <SafeAreaView edges="bottom" style={styles.safeAreaView}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total payment</Text>
              <Text style={styles.totalPriceText}>
                {formatCurrency(totalPrice())}
              </Text>
            </View>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>Order</Text>
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
    backgroundColor: "rgb(255 255 255 / 0.3)",
  },
  shippingContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#fdf6e2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  shippingText: {
    fontSize: 16,
  },
  addressContainer: {
    width: "100%",
    padding: 16,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    flex: 1,
  },
  addressText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  safeAreaView: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  totalContainer: {
    marginHorizontal: 12,
  },
  totalText: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.7)",
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e90ff",
    textAlign: "right",
  },
  orderButton: {
    height: "100%",
    backgroundColor: "#1e90ff",
    justifyContent: "center",
    alignItems: "center",
    width: 112,
  },
  orderButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
});

export default Page;
