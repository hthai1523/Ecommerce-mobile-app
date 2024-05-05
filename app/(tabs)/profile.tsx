import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { Link, Stack, router } from "expo-router";
import Button from "@/components/Button";
import { Feather } from "@expo/vector-icons";
import CustomImage from "@/components/Image";
import images from "@/assets/images";
import { useAuth } from "@/contexts/authContext";
import { doSignOut } from "@/config/auth";

const Profile = () => {
  const userLoggedIn = useAuth();

  const logOut = async (e: any) => {
    e.preventDefault();
    await doSignOut();
    Alert.alert("signed out");

    console.log("====================================");
    console.log(userLoggedIn);
    console.log("====================================");
  };

  return (
    <View className="bg-white w-full h-full px-3">
      {/* header  */}
      <Stack.Screen
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Text className="text-[#ADADAD] text-lg font-medium p-3">
              My Account
            </Text>
          ),

          headerRight: () => (
            <View className="flex-row items-center mr-1">
              <TouchableOpacity style={{ padding: 8 }}>
                <Feather name="settings" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 8 }}>
                <Feather name="mail" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 8 }}>
                <Feather name="bell" size={20} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <SafeAreaView className="">
        <View className="flex-row items-center py-4 space-x-3 border-b-4 border-b-[#767676]">
          {userLoggedIn ? (
            <>
              <Feather name="user" size={30} color="black" />
              <Link href={"/(modals)/login"} asChild>
                <Pressable className="">
                  <Text className="text-base ">Press to login</Text>
                </Pressable>
              </Link>
            </>
          ) : (
            <>
              <CustomImage
                source={images.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              <View className="flex-1">
                <Text>Hoang Tien Thai</Text>
                <Pressable onPress={logOut}>
                  <Text>log out</Text>
                </Pressable>
                <TouchableOpacity className="flex-row items-center space-x-1">
                  <Feather name="shield" size={20} color="black" />
                  <Text>Verified Profile</Text>
                  <Feather name="chevron-right" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        <View className="py-4 space-y-4 border-b-4 border-b-[#767676]">
          <Text className="text-base font-normal">Transaction List</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="w-[33.33333%] px-4 flex-col items-center space-y-1">
              <Feather name="database" size={24} color="#767676" />
              <Text className="text-center">Awaiting Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[33.33333%] flex-col items-center space-y-1">
              <Feather name="credit-card" size={24} color="#767676" />
              <Text className="text-center">Transaction in progress</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[33.33333%] flex-col items-center space-y-1">
              <Feather name="grid" size={24} color="#767676" />
              <Text className="text-center">All Transactions</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View></View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
