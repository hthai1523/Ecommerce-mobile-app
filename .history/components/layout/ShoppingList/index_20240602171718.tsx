import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Product } from "@/store/interfaces";
import getAllProduct from "@/services/getAllProduct";
import Card from "../../Card";
const ShoppingList = ({
  data,
  title,
  isNavigation,
}: {
  data: Product[];
  title: string;
  isNavigation: boolean;
}) => {
 
  return (
    <View className="ml-5">
      <View className="flex-row justify-between items-center ">
        <Text className="text-lg font-extrabold">{title}</Text>
        {isNavigation && <TouchableOpacity onPress={() => router.navigate("/(tabs)/store")}>
          <Text className="text-xs text-gray-500">See All</Text>
        </TouchableOpacity>}
      </View>
     
        <ScrollView
          className="py-3 space-x-3"
          horizontal={true}
          showsVerticalScrollIndicator={false}
        >
          {data.map((item) => {
            return (
              <Pressable key={item.id}>
                <Card data={item} width={145} height={190} />
              </Pressable>
            );
          })}
        </ScrollView>
    </View>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({});
