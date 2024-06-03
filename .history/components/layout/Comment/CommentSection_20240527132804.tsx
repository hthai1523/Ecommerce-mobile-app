import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

interface Comment {
  id: number;
  name: string;
  content: string;
}

const CommentSection = <Comment>(data) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/User.jpg")}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.comment}>
          {data.content}
        </Text>
      </View>
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    width: '100%', 
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
