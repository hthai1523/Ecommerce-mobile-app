import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Comment = () => {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-base font-medium">Product reviews</Text>
          <View>
            <View>
            <FontAwesome name="star" size={24} color="yellow" />
            <FontAwesome name="star" size={24} color="yellow" />
            <FontAwesome name="star" size={24} color="yellow" />
            <FontAwesome name="star" size={24} color="yellow" />
            <FontAwesome name="star" size={24} color="yellow" />
            </View>
            <Text className="text-sm font-light">(159 reviews)</Text>
          </View>
        </View>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-lg text-sky-700">See All</Text>
          <Feather name="chevron-right" size={24} color={Colors.primary.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});
