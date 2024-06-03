import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useCartStore from "@/store/cartStore";
import { Product } from "@/store/interfaces";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

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
           <Link href={'/(modals)/location-search'} asChild style={{marginVertical: 12}}>
              <TouchableOpacity
                style={{ width: "100%" }}
                className="p-4 bg-white flex-row items-center justify-between"
              >
                <View className="flex flex-row items-center gap-3 flex-1">
                  <FontAwesome6 name="location-dot" size={24} color={"red"} />
                  <Text className="text-base font-normal">
                    Select address
                  </Text>
                </View>
                <TouchableOpacity>
                  <Feather name="chevron-right" size={24} color={"#ADADAD"} />
                </TouchableOpacity>
              </TouchableOpacity>
           </Link>
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
  },
});

export default Page;
