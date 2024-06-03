import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomImage from "@/components/Image";
import { AntDesign } from "@expo/vector-icons";

const CommentSection = () => {
  return (
    <View className="flex-row bg-red-400 w-full">
      <CustomImage
        source={require("@/assets/images/User.jpg")}
        style={{
          width: 40,
          height: 40,
          borderRadius: 9999,
          objectFit: "cover",
        }}
      />
      <View className="w-full bg-red-700">
        <Text>hello</Text>
        <Text>
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

const styles = StyleSheet.create({});
