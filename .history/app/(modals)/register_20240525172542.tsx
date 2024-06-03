import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_DB, auth } from "@/config/firebase";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailErrorMessage("Email is not valid");
    } else {
      setEmailErrorMessage("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordErrorMessage("Password requires at least 6 characters");
    } else {
      setPasswordErrorMessage("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailErrorMessage("Email is not valid");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordErrorMessage("Password requires at least 6 characters");
      return;
    }
    try {
      setIsSigningIn(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(FIREBASE_DB, "user", user.uid), {
        username: username,
        email: email,
      });

      setIsSigningIn(false);
      router.navigate("(tabs)/profile");
    } catch (error: any) {
      setGeneralErrorMessage(error.message);
      setIsSigningIn(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
      }}
    >
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require("@/assets/images/background.png")}
      />

      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          style={{ height: 224, width: 90 }}
          source={require("@/assets/images/light.png")}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          style={{ height: 160, width: 65 }}
          source={require("@/assets/images/light.png")}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View className="h-full w-full justify-around pt-40">
            <View className="flex items-center">
              <Animated.Text
                entering={FadeInUp.duration(1000).springify()}
                className="text-white font-bold tracking-wider text-5xl"
              >
                Sign Up
              </Animated.Text>
            </View>

            <View className="flex items-center mx-4 space-y-4">
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="bg-black/5 p-5 rounded-2xl w-full"
              >
                <TextInput
                  placeholder="Username"
                  placeholderTextColor={"gray"}
                  value={username}
                  onChangeText={(value) => setUsername(value)}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className="flex-col w-full"
              >
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={"gray"}
                    onChangeText={handleEmailChange}
                    value={email}
                  />
                </View>
                {emailErrorMessage ? (
                  <Text style={{ color: "red", marginTop: 4, marginLeft: 4 }}>
                    {emailErrorMessage}
                  </Text>
                ) : null}
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="w-full"
              >
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={"gray"}
                    secureTextEntry
                    onChangeText={handlePasswordChange}
                    value={password}
                  />
                </View>
                {passwordErrorMessage ? (
                  <Text style={{ color: "red", marginTop: 4, marginLeft: 4 }}>
                    {passwordErrorMessage}
                  </Text>
                ) : null}
              </Animated.View>
              {generalErrorMessage ? (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  {generalErrorMessage}
                </Text>
              ) : null}
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="w-full"
              >
                {isSigningIn ? (
                  <View className="w-full bg-slate-500 p-3 rounded-2xl mb-3">
                    <Text className="text-xl font-bold text-white text-center">
                      Signing Up...
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
                  >
                    <Text className="text-xl font-bold text-white text-center">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                className="flex-row justify-center"
              >
                <Text>Already have an accout? </Text>
                <Link href={"(modals)/login"} asChild>
                  <TouchableOpacity>
                    <Text className="text-sky-400">Login</Text>
                  </TouchableOpacity>
                </Link>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
