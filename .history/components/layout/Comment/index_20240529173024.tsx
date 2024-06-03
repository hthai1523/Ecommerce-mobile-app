import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CommentSection from "./CommentSection";
import axios from 'axios';

const Comment = ({ productID }: { productID: number }) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/api/v1/Comments/product/${productID}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const postComment = async () => {
    if (!input.trim()) return; // Don't post empty comments

    try {
      await axios.post(`http://localhost:8070/api/v1/Comments/insert`, {
        idProduct: productID,
        name: "John Doe", // Assuming the user is fixed for this example
        createByDate: new Date().toISOString(),
        content: input,
      });

      // Clear input and fetch updated comments
      setInput("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

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
            <Text style={styles.reviewCount}>({comments.length} reviews)</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.seeAllButton} onPress={postComment}>
          <Text style={styles.seeAllText}>Add a review</Text>
          <Feather name="chevron-right" size={24} color={Colors.primary.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          selectionColor={Colors.primary.icon}
          placeholder="Add a review"
          placeholderTextColor={Colors.primary.icon}
          value={input}
          onChangeText={(value) => setInput(value)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={postComment}>
          <Feather name="send" size={20} color={Colors.primary.icon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CommentSection key={item.id} {...item} />
        )}
      />
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  sendButton: {
    padding: 10,
  },
});
