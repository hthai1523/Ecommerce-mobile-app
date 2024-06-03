import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CommentSection from "./CommentSection";
import axios from "axios";
import { useAuth } from "@/hook/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/config/firebase";
import { router } from "expo-router";
import Animated, {
  BounceInDown,
  BounceInLeft,
  FadeInDown,
  FadeInRight,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";
import { FullProduct, Product, ProductDetail } from "@/store/interfaces";

interface CommentProps {
  id: number;
  name: string;
  content: string;
}

const Comment = ({ product }: { product: Product }) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [input, setInput] = useState<string>("");
  const { user } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [toggleInput, setToggleInput] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const userDoc = await getDoc(doc(FIREBASE_DB, "user", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.username);
        }
      }
    };

    fetch();
  }, [user]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
       
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [comments]);

  const postComment = async () => {
    if (!input.trim()) return;

    if (user) {
      try {
        const response = await axios.post(
          `http://192.168.2.10:8070/api/v1/Comments/insert`,
          {
            idProduct: product.productID,
            name: username,
            createByDate: new Date(),
            content: input,
          }
        );

        setComments((prevComments) => [response.data.data, ...prevComments]);
        setInput("");
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    } else {
      Alert.alert(
        "Login Required",
        "You need to log in to add a review. Would you like to log in?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Login",
            onPress: () => router.push("/(modals)/login"),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Product reviews</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
              {[...Array(Math.floor(product.rating))].map((_, index) => (
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
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => setToggleInput((prev) => !prev)}
        >
          <Text style={styles.seeAllText}>Add a review</Text>
          <Feather name="chevron-right" size={24} color={Colors.primary.icon} />
        </TouchableOpacity>
      </View>
      {toggleInput && (
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          exiting={FadeOutUp.duration(1000).springify()}
          style={styles.inputContainer}
        >
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
        </Animated.View>
      )}
      {comments.length > 0 &&
        comments.map((comment) => (
          <View key={comment.id} className="my-2">
            <CommentSection  {...comment} />
          </View>
        ))}
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
    borderRadius: 16,
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
