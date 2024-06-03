import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CustomImage from "@/components/Image";
import { useAuth } from "@/hook/useAuth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB, auth } from "@/config/firebase";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { KeyboardAvoidingView } from "react-native";

const SettingAccount = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toggleInput, setToggleInput] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const fetch = async () => {
    if (user) {
      const userDoc = await getDoc(doc(FIREBASE_DB, "user", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUsername(data.username);
      }
    }
  };

  useEffect(() => {
    fetch();
  }, [user]);

  const handleChangeName = async () => {
    if (user) {
      try {
        const userDocRef = doc(FIREBASE_DB, "user", user.uid);
        await updateDoc(userDocRef, {
          username: nameInput,
        });
        setToggleInput(false);
        fetch();
        Alert.alert("Username updated successfully");
      } catch (error) {
        console.error("Error updating username: ", error);
      }
    }
  };

  const handleChangePassword = async () => {
    if (user) {
      try {
        await auth().currentUser.updatePassword(password);
        setPassword("");
        Alert.alert("Password updated successfully");
      } catch (error) {
        console.error("Error updating password: ", error);
        Alert.alert("Error updating password: ", error.message);
      }
    }
  };

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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="px-4">
            <Text className="font-medium text-base">Account Details</Text>

            <View className="my-4 border-b border-b-sky-400">
              <View className="flex-row items-center justify-between pb-2">
                <View className="flex-row  items-center gap-2 flex-1">
                  <Text>😊</Text>
                  <View>
                    <Text className="text-">Your Name</Text>
                    <Text className="text-[#ADADAD] capitalize">
                      {username}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setToggleInput((prev) => !prev)}
                >
                  <Text className="font-semibold">Click to change</Text>
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
                    placeholder="Enter new name"
                    placeholderTextColor={Colors.primary.icon}
                    value={nameInput}
                    onChangeText={(value) => setNameInput(value)}
                  />
                  <TouchableOpacity
                    onPress={handleChangeName}
                    style={styles.sendButton}
                  >
                    <Feather
                      name="send"
                      size={20}
                      color={Colors.primary.icon}
                    />
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

            <View className="my-4 border-b border-b-sky-400">
              <View className="flex-row  items-center gap-2 pb-2">
                <Text>🔒</Text>
                <View className="flex-1">
                  <Text className="text-">Change Password</Text>
                  <View className="flex-row w-full  ">
                    <TextInput
                      className="flex-1"
                      selectionColor={Colors.primary.icon}
                      placeholder="Enter new password"
                      placeholderTextColor={Colors.primary.icon}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={(value) => setPassword(value)}
                    />
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() => setShowPassword((prev) => !prev)}
                        style={styles.sendButton}
                      >
                        <Feather
                          name={showPassword ? "eye" : "eye-off"}
                          size={20}
                          color={Colors.primary.icon}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.sendButton}>
                        <Feather
                          name="send"
                          size={20}
                          color={Colors.primary.icon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
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
