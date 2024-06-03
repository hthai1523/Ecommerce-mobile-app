import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
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

interface CommentProps {
  id: number;
  name: string;
  content: string;
 }

const Comment = (productID:number) => {
  const [comment, setComment] = useState<CommentProps[]>([])
  const [input, setInput] = useState<string>('')

  useEffect(() => {
    
  }, [comment])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Product reviews</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
              {[...Array(5)].map((_, index) => (
                <FontAwesome
                  key={index}
                  name="star"
                  size={18}
                  color="rgb(234 179 8)"
                />
              ))}
            </View>
            <Text style={styles.reviewCount}>(159 reviews)</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>Add a review</Text>
          <Feather name="chevron-right" size={24} color={Colors.primary.icon} />
        </TouchableOpacity>
      </View>
      <View className="w-full my-2 flex-row items-center bg-slate-100 rounded-lg overflow-hidden">
        <TextInput
          className="flex-1 px-3 py-2 text-sky-700 border-r border-r-slate-500"
          selectionColor={Colors.primary.icon}
          placeholder="Add a review"
          placeholderTextColor={Colors.primary.icon}
          value={input}
          onChangeText={(value) => setInput(value)}
        />
        <TouchableOpacity className="p-3 ml-1 bg-sky-400">
          <Feather name="paperclip" size={20} color={Colors.primary.icon} />
        </TouchableOpacity>
      </View>
      {data.map((item, index) => (
        <CommentSection key={index} {...item} />
      ))}
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
  },
  reviewCount: {
    fontSize: 12,
    fontWeight: "300",
    marginLeft: 4,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 16,
    color: "skyblue",
  },
});
