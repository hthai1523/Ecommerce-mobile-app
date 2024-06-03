import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

interface CommentProps {
  id: number;
  name: string;
  content: string;
}

const CommentSection: React.FC<CommentProps> = ({ name, content }) => {
  return (
    <View style={styles.container} className="bg-slate-200 rounded-md">
<FontAwesome5 name="user-circle" size={24} color="black" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.comment}>{content}</Text>
      </View>
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
