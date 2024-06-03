import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, Stack, Tabs, router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import Header from "@/components/layout/Header";
import { AntDesign, Feather } from "@expo/vector-icons";
import CustomImage from "@/components/Image";
import images from "@/assets/images";
import Separate from "@/components/Separate";
import { Skeleton } from "moti/skeleton";
import Button from "@/components/Button";

import { default as Colors } from "@/constants/Colors";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import ListLoading from "components/layout/ListLoading";
import useCartStore from "@/store/cartStore";
import { Product } from "@/store/interfaces";
import TabBottomDetail from "@/components/TabBottomDetail";
import BottomSheet from "@/components/layout/BottomSheet";
import formatCurrency from "@/functions/formatCurrency";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Comment from "@/components/layout/Comment";

const IMG_HEIGHT = 210;

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product>({} as Product);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 0.75]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        const data = response.data;
        setProduct(data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApi();
  }, []);

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  const sheetRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {/* header */}
      <Stack.Screen options={{ header: () => <Header isBack /> }} />
      {/* content */}
      <Animated.ScrollView
        scrollEventThrottle={16}
        ref={scrollRef}
        className="mt-[53] py-4 px-4"
      >
        {/* Image, title and description product */}
        {!isLoading ? (
          <>
            <View className="flex-col items-center">
              <View className=" ">
                <Animated.Image
                  source={{ uri: product?.image }}
                  style={[styles.image, imageAnimatedStyle]}
                />
              </View>
              <View className="mt-4 bg-white">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-bold  text-xl text-sky-400">
                      {formatCurrency(product.price)}
                    </Text>
                    <Text className="font-light text-sm text-black/40 line-through">
                      {formatCurrency(product.price * 3)}
                    </Text>
                  </View>
                  <Pressable onPress={handleChecked} className="p-2">
                    {isChecked ? (
                      <AntDesign name="heart" size={20} color={"#e31b23"} />
                    ) : (
                      <AntDesign name="hearto" size={20} color={"#e31b23"} />
                    )}
                  </Pressable>
                </View>
                <Text className="font-medium text-lg">{product?.title}</Text>
                <Text className="font-normal text-sm italic">
                  {product?.description}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <>
            <ListLoading />
          </>
        )}

        <Separate color="#EEE" />
        <Comment />

        <Separate color="#EEE" />

        {/* Shop */}
        <View className="flex-row justify-between bg-white">
          <View className="">
            <View className="flex-row items-center gap-1">
              <CustomImage
                source={images.user}
                className="w-10 h-10 rounded-full"
              />
              <View className="flex-row items-center gap-2">
                <Text>Hoang Tien Thai</Text>
                <Feather name="check-circle" size={20} color="skyblue" />
              </View>
            </View>
            <View className="ml-2 mt-1">
              <View className="flex-row items-center gap-2  ">
                <Feather name="star" size={20} color="black" />
                <Text>1509</Text>
              </View>
              <View className="flex-row items-center gap-2  ">
                <Feather name="clock" size={24} color="black" />
                <Text>15'</Text>
              </View>
            </View>
          </View>
          <View>
            <Button
              onPress={openBottomSheet}
              text="Follow"
              primary={false}
              width={70}
              height={20}
            />
          </View>
        </View>
      </Animated.ScrollView>

      {/* bottom sheet */}
      <BottomSheet {...product} ref={sheetRef} />

      {/* tab bottom */}
      <TabBottomDetail item={product} openBottomSheet={openBottomSheet} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: IMG_HEIGHT,
    width: 342,
    objectFit: "contain",
  },
});

export default memo(Page);
