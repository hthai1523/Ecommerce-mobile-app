import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const CommentSection = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/User.jpg")}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>hello</Text>
        <Text style={styles.comment}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          deleniti. Suscipit itaque quibusdam vitae placeat quam ratione ipsam!
          Unde suscipit quam cum obcaecati, eum ad molestias placeat quasi earum
          natus.
        </Text>
      </View>
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "red",
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
    backgroundColor: "darkred",
    paddingLeft: 8, 
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  comment: {
    flexWrap: "wrap",
});
