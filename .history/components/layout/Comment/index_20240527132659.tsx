import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CommentSection from "./CommentSection";

const data = [
  {
    id: 1,
    name: "Marlow",
    content: "Displaced fracture of distal phalanx of left lesser toe(s)",
  },
  {
    id: 2,
    name: "Charlot",
    content:
      "Malignant neoplasm of unspecified part of unspecified adrenal gland",
  },
  {
    id: 3,
    name: "Sherri",
    content: "Presence of artificial hip joint, bilateral",
  },
  {
    id: 4,
    name: "Carny",
    content: "Injury of ulnar nerve at wrist and hand level of left arm",
  },
  {
    id: 5,
    name: "Ethelbert",
    content: "Pregnancy with inconclusive fetal viability",
  },
  {
    id: 6,
    name: "Reinwald",
    content:
      "Other osteoporosis with current pathological fracture, unspecified shoulder, sequela",
  },
  {
    id: 7,
    name: "Seka",
    content: "Contusion of heart with hemopericardium, subsequent encounter",
  },
];

const Comment = () => {
  return (
    <View className="w-full">
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
      <FlatList
        data={data}
        renderItem={(item) => <CommentSection data={item} />}
      
      />      
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});
