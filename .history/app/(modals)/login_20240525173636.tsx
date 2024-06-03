import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailErrorMessage("Invalid email format");
      valid = false;
    } else {
      setEmailErrorMessage("");
    }

    if (!validatePassword(password)) {
      setPasswordErrorMessage("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordErrorMessage("");
    }

    if (!valid) {
      return;
    }

    try {
      setGeneralErrorMessage("");
      setIsSigningIn(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.navigate("(tabs)/profile");
    } catch (e) {
      console.log(e);
      setIsSigningIn(false);
      setGeneralErrorMessage("Email or password is incorrect");
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

      <View className="h-full w-full justify-around pt-44">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Login
          </Animated.Text>
        </View>

        <View className="flex items-center mx-4 space-y-4">
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
          >
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className=" w-full"
            >
              <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={"gray"}
                  onChangeText={(value) => setEmail(value)}
                  value={email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {emailErrorMessage ? (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {emailErrorMessage}
                </Text>
              ) : null}
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="w-full"
            >
              <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                  onChangeText={(value) => setPassword(value)}
                  value={password}
                />
              </View>
              {passwordErrorMessage ? (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {passwordErrorMessage}
                </Text>
              ) : null}
            </Animated.View>

            {generalErrorMessage ? (
              <Text style={{ color: "red", textAlign: "center" }}>
                {generalErrorMessage}
              </Text>
            ) : null}

            {isSigningIn ? (
              <View className="w-full bg-slate-500 p-3 rounded-2xl mb-3">
                <Text className="text-xl font-bold text-white text-center">
                  Currently Logging in...
                </Text>
              </View>
            ) : (
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="w-full"
              >
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
                >
                  <Text className="text-xl font-bold text-white text-center">
                    Login
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </KeyboardAvoidingView>

          <Animated.Text
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="text-sm font-medium text-[#d7d7d7]"
          >
            Or Continue With
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            className="w-full flex flex-row items-center gap-2 mr-4"
          >
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="w-1/2"
            >
              <TouchableOpacity className="w-full bg-red-400 p-3 rounded-2xl">
                <Text className="text-xl font-bold text-white text-center">
                  <FontAwesome6 name="google" size={26} />
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="w-1/2"
            >
              <TouchableOpacity className="w-full bg-sky-600 p-3 rounded-2xl">
                <Text className="text-xl font-bold text-white text-center">
                  <FontAwesome6 name="facebook-f" size={26} />
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(1000).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text>Don't have an account? </Text>
            <Link href={"(modals)/register"} asChild>
              <TouchableOpacity>
                <Text className="text-sky-400">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
