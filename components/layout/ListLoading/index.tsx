import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Skeleton } from "moti/skeleton";
import { AntDesign } from "@expo/vector-icons";

const ListLoading = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
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
  );
};

export default ListLoading;
