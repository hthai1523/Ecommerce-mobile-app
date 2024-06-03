import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CustomImage from "@/components/Image";
import { useAuth } from "@/hook/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/config/firebase";
import Animated, { FadeInDown } from "react-native-reanimated";

const SettingAccount = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView className="w-full ">
        <View className="items-center w-full">
          <CustomImage
            source={require("@/assets/images/User.jpg")}
            style={styles.imageContainer}
          />
          <Text className="text-base font-bold">Your Avatar</Text>
        </View>

        <View className="px-4  h-full">
          <Text className="font-medium text-base">Account Details</Text>

          <View className="my-4 border-b border-b-sky-400">
            <View className="flex-row items-center justify-between pb-2">
              <View className="flex-row  items-center gap-2 flex-1">
                <Text>😊</Text>
                <View>
                  <Text className="text-">Your Name</Text>
                  <Text className="text-[#ADADAD] capitalize">{username}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setToggleInput((prev) => !prev)}>
                <Text className="font-semibold">Click to change</Text>
              </TouchableOpacity>
            </View>
            {toggleInput && (
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                exiting={FadeInDown.duration(1000).springify()}
                style={styles.inputContainer}
              >
                <TextInput
                  style={styles.input}
                  selectionColor={Colors.primary.icon}
                  placeholder="Enter new name"
                  placeholderTextColor={Colors.primary.icon}
                  // value={input}
                  // onChangeText={(value) => setInput(value)}
                />
                <TouchableOpacity style={styles.sendButton}>
                  <Feather name="send" size={20} color={Colors.primary.icon} />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>

          <View className="my-4 border-b border-b-sky-400">
            <View className="flex-row  items-center gap-2 pb-2">
              <Text>✉️</Text>
              <View>
                <Text className="text-">Your Email</Text>
                <Text className="text-[#ADADAD] ">{user?.email}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingAccount;

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: Colors.primary.background,
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
