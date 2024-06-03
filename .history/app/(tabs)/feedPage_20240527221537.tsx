import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const FeedPage = () => {
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Text className="font-medium text-lg text-[#767676] ml-4">
              Feed
            </Text>
          ),
          headerTitle: "",
          headerRight: () => (
            <View className="flex-row items-center mr-2">
              <TouchableOpacity
                className="p-2 "
                onPress={() => router.push("/(modals)/search")}
              >
                <Feather name="search" size={20} color={Colors.primary.icon} />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 ">
                <Feather name="mail" size={20} color={Colors.primary.icon} />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 ">
                <Feather name="bell" size={20} color={Colors.primary.icon} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </View>
  );
};

export default FeedPage;
