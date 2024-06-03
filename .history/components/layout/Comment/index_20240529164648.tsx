import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Product reviews</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
              {[...Array(5)].map((_, index) => (
              <FontAwesome key={index} name="star" size={18} color="rgb(234 179 8)" />
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
      <View style={{width: '100%'}}>
          <TextInput
            className="w-full bg-slate-100 px-3 py-1"
            placeholder="Add a review"
            placeholderTextColor={Colors.primary.icon}
          />
        </View>
      {
        data.map((item, index) => (
          <CommentSection key={index} {...item} />
        ))
      }
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
  },
  reviewCount: {
    fontSize: 12,
    fontWeight: '300',
    marginLeft: 4,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 16,
    color: 'skyblue',
  },
});
