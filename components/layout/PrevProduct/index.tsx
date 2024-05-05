import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import Card from "@/components/Card";

const PrevProduct = ({ listProductArrivals, text }: {listProductArrivals: any, text: string}) => {
  return (
    <View className="mt-6 ml-5">
      <Text className="text-lg font-extrabold">New Arrivals</Text>

      <ScrollView
        className="mt-4 space-x-3 "
        horizontal={true}
        showsVerticalScrollIndicator={false}
      >
        {listProductArrivals.map((item) => {
          return (
            <Pressable key={item.id}>
              <Card data={item} width={100} height={189} />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PrevProduct;
