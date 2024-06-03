import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import CustomImage from "../Image";
import formatCurrency from "@/functions/formatCurrency";
import images from "@/assets/images";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

import { Product, ProductWithSizeColor } from "@/store/interfaces";
import useCartStore from "@/store/cartStore";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { router } from "expo-router";

const WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = 112;
const TRANSLATE_X_THRESHOLD = -WIDTH * 0.3;

const CartSection = ({
  item,
  quantity,
}: {
  item: ProductWithSizeColor;
  quantity: number;
}) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const reduceProduct = useCartStore((state) => state.reduceProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (e) => {
        translateX.value = e.translationX;
      },
      onEnd: () => {
        const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
        if (shouldBeDismissed) {
          translateX.value = withTiming(-WIDTH);
          itemHeight.value = withTiming(0);
          marginVertical.value = withTiming(0);
          opacity.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished) {
              runOnJS(removeProduct)(item);
            }
          });
        } else {
          translateX.value = withTiming(0);
        }
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const priceReal = item.price * (item.discount / 100)

  return (
    <Animated.View
      style={[styles.shadow, styles.container, rTaskContainerStyle]}
    >
      <Animated.View style={[styles.iconConatiner, rIconContainerStyle]}>
        <Feather name={"trash-2"} size={ITEM_HEIGHT * 0.3} color={"white"} />
      </Animated.View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.item, rStyle]}>
          <TouchableOpacity onPress={() => router.navigate(`/listing/${item.productID}`)} >
            <CustomImage
              style={{
                width: 60,
                height: 60,
                borderRadius: 5,
                objectFit: "contain",
                marginRight: 16,
              }}
              source={item.images[0]}
            />
            <View className="flex-1 ">
              <Text numberOfLines={1} className="font-normal text-sm">
                {item.title}
              </Text>
              <View className="flex-row items-center gap-2">
                <Text className="font-bold  text-base text-sky-400">
                  {formatCurrency(priceReal * quantity)}
                </Text>
                <Text className="font-light text-sm text-black/40 line-through">
                  {formatCurrency(item.price)}
                </Text>
              </View>
              <Text className="font-normal text-sm capitalize">
                Options: {item.selectedColor}, {item.selectedSize}
              </Text>
             
            </View>
  
            <TouchableOpacity
              className="p-2 absolute top-0 right-0"
              onPress={() => removeProduct(item)}
            >
              <Feather name="x" size={20} color="black" />
            </TouchableOpacity>
  
            <View
              style={styles.shadow}
              className="flex-row items-center gap-x-1 bg-white absolute right-2 bottom-2 rounded-full "
            >
              <TouchableOpacity
                className="p-1"
                onPress={() => reduceProduct(item)}
              >
                <Feather name="minus" size={20} color="black" />
              </TouchableOpacity>
              <Text className="font-bold text-base p-1 ">{quantity}</Text>
              <TouchableOpacity className="p-1" onPress={() => addProduct(item)}>
                <Feather name="plus" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 10,
  },
  container: {
    width: "100%",
    position: "relative",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 8,
  },
  item: {
    width: "100%",
    height: ITEM_HEIGHT,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 4
  },
  iconConatiner: {
    width: ITEM_HEIGHT,
    height: ITEM_HEIGHT,
    position: "absolute",
    right: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartSection;
