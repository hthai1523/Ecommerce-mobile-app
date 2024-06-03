import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_DB, auth } from "@/config/firebase";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSigningIn) {
      try {
        setIsSigningIn(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        const user = userCredential.user
        
        await setDoc(doc(FIREBASE_DB, 'users', user.uid), {
            username: username,
            email: email
        })
        
        
        router.navigate("(tabs)/profile");
      } catch (error) {}
    }
  };

  const handleGoogleSignIn = async (e: any) => {
    e.preventDefault();
    if (!isSigningIn) {
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
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor={"gray"}
              onChangeText={(value) => setEmail(value)}
              value={email}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry
              onChangeText={(value) => setPassword(value)}
              value={password}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity
              onPress={handleSubmit}
              className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">
                Sign Up
              </Text>
            </TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default Register;
