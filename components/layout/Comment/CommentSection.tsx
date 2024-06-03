import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Review } from "@/store/interfaces";

interface CommentProps {
  username: string;
  content: string;
}

const CommentSection: React.FC<Review> = ({ comment, reviewerName }) => {
  return (
    <View style={styles.container} className="bg-slate-200 rounded-md">
      <FontAwesome6 name="user-circle" size={24} color="black" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{reviewerName}</Text>
        <Text style={styles.comment}>{comment}</Text>
      </View>
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'flex-start',
    padding: 8,
    width: "100%",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  comment: {
    flexWrap: "wrap",
  },
});
