import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import Button from "@/components/Button";
import { Feather } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "@/config/firebase";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "@/config/auth";
import { useAuth } from "@/contexts/authContext";
// import Animated from 'react-native-reanimated';

const Page = () => {
  const userLoggedIn = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = FIREBASE_AUTH;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
    }
  };

  const handleGoogleSignIn = (e: any) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  // useEffect(() => {
  //   if (userLoggedIn) {
  //     router.back();
  //   }
  // }, [userLoggedIn]);

  

  return (
    <View>
      <View className="w-full px-3">
        <Stack.Screen
          options={{
            headerLeft: () => (
              <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
                <Feather name="arrow-left" size={24} color="black" />
              </Pressable>
            ),
            headerTitle: () => (
              <Text className="text-lg font-semibold text-[#767676]">
                Login
              </Text>
            ),
            headerRight: () => (
              <Pressable
                onPress={() => router.navigate("")}
                style={{ padding: 8 }}
              >
                <Text className="text-base font-semibold  text-[#767676]">
                  Sign Up
                </Text>
              </Pressable>
            ),
          }}
        />

        <View className="pt-4 space-y-3 ">
          <Text>Email</Text>
          <TextInput
            className="border-b border-b-black"
            placeholder="Type your email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
        </View>
        <View className="pt-4 space-y-3 ">
          <Text>Password</Text>
          <TextInput
            className="border-b border-b-black"
            placeholder="Type your password"
            secureTextEntry
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
        </View>
        <View className="w-full flex-col items-center justify-between pt-4">
          <TouchableOpacity className="w-full">
            <Text className="text-right text-xs font-light">
              Forgot Password
            </Text>
          </TouchableOpacity>
          {isSigningIn ? (
            <ActivityIndicator size="large" color="#000ff" />
          ) : (
            <>
              <Button text="Continue" icon="" primary onPress={handleSubmit} width={305} height={35} />
              <Text className="mt-3 text-center">
                Login with social account
              </Text>
              <Button text="Login with Facebook" icon="facebook" primary width={305} height={35} />
              <Button text="Login with Google" icon="google" primary width={305} height={35} />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Page;
