import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CommentSection from "./CommentSection";

const data = {
  
}

const Comment = () => {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-base font-medium">Product reviews</Text>
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center">
              <FontAwesome name="star" size={18} color="rgb(234 179 8)" />
              <FontAwesome name="star" size={18} color="rgb(234 179 8)" />
              <FontAwesome name="star" size={18} color="rgb(234 179 8)" />
              <FontAwesome name="star" size={18} color="rgb(234 179 8)" />
              <FontAwesome name="star" size={18} color="rgb(234 179 8)" />
            </View>
            <Text className="text-sm bg-yello font-light">(159 reviews)</Text>
          </View>
        </View>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-lg text-sky-700">See All</Text>
          <Feather name="chevron-right" size={24} color={Colors.primary.icon} />
        </TouchableOpacity>
      </View>
      <CommentSection />
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});
