import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import axios from "axios";
import Header from "@/components/layout/Header";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomImage from "@/components/Image";
import images from "@/assets/images";
import Separate from "@/components/Separate";
import { Skeleton } from "moti/skeleton";
import Button from "@/components/Button";

interface Product {
  id: number;
  title: string;
  price: number;
  rate: number;
  image: string;
  description: string;
}
const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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

  return (
    <View className="flex-1 bg-white">
      {/* header */}
      <Stack.Screen options={{ header: () => <Header isBack /> }} />
      {/* content */}
      <ScrollView className="mt-[53] pt-4 px-4 ">
        {/* Image, title and description product */}
        {!isLoading ? (
          <>
            <View className="flex-col items-center">
              <View className=" ">
                <CustomImage
                  source={product?.image}
                  style = {{ height: 210, width: 342, objectFit: "contain" }}                />
              </View>
              <View className="mt-4">
                <View className="flex-row items-center justify-between">
                  <Text className="font-bold text-xl">${product?.price}</Text>

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
            <View className="flex-col items-center">
              <View className=" ">
                <Skeleton colorMode="light" width={342} height={210} />
              </View>
              <View className="mt-4">
                <View className="flex-row items-center justify-between">
                  <Skeleton colorMode="light" width={100} height={50} />

                  <Pressable onPress={handleChecked} className="p-2">
                    {isChecked ? (
                      <AntDesign name="heart" size={20} color={"#e31b23"} />
                    ) : (
                      <AntDesign name="hearto" size={20} color={"#e31b23"} />
                    )}
                  </Pressable>
                </View>
                <Skeleton colorMode="light" width={342} height={50} />
                <Skeleton colorMode="light" width={342} height={150} />
              </View>
            </View>
          </>
        )}

        <View className="w-full h-1 bg-[#ADADAD] my-4" />

        {/* Shop */}
        <View className="flex-row justify-between">
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
            <Button text="Follow" primary={false} width={70} height={20} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(Page);
