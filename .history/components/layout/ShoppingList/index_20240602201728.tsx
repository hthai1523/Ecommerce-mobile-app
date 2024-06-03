import {
  ActivityIndicator,
  FlatList,
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
import Colors from "@/constants/Colors";
const ShoppingList = ({
  data,
  title,
  isNavigation,
  isLoading,
}: {
  data: Product[];
  title: string;
  isNavigation: boolean;
  isLoading: boolean;
}) => {

  const renderItem = (item: Product) => {
    return (
      <Pressable key={item.id}>
        <Card data={item} width={145} height={190} />
      </Pressable>
    );
  }

  return (
    <View className="ml-5">
      <View className="flex-row justify-between items-center ">
        <Text className="text-lg font-extrabold">{title}</Text>
        {isNavigation && (
          <TouchableOpacity onPress={() => router.navigate("/(tabs)/store")}>
            <Text className="text-xs text-gray-500">See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.primary.background}
          style={{ marginTop: 8 }}
        />
      ) : (
       <FlatList
        data={data} 
        renderItem={(item) => renderItem(item.item)}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        className="py-3 space-x-3"
        />
      )}
    </View>
  );
};
 

export default ShoppingList;

const styles = StyleSheet.create({});
