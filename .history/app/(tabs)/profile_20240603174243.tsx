import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack, router } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import CustomImage from "@/components/Image";
import images from "@/assets/images";
import Colors from "@/constants/Colors";
import { useAuth } from "@/hook/useAuth";
import { signOut } from "firebase/auth";
import { FIREBASE_DB, auth } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>("");

  const logOut = async () => {
    await signOut(auth);
    Alert.alert("signed out");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(FIREBASE_DB, "user", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.username);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <View className="bg-white w-full h-full px-3">
      <SafeAreaView>
        <View className="flex-row items-center py-4 space-x-3 border-b-4 border-b-[#767676]">
          {user ? (
            <>
              <CustomImage
                source={images.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              <View className="flex-1 gap-1">
                <Text className="text-base font-medium">{username}</Text>
                <TouchableOpacity
                  onPress={logOut}
                  className="flex-row items-center space-x-1"
                >
                  <MaterialIcons name="logout" size={20} color="red" />
                  <Text>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/(modals)/settingAccount")}
                  className="flex-row items-center space-x-1"
                >
                  <Feather
                    name="shield"
                    size={20}
                    color={Colors.primary.icon}
                  />
                  <Text>Verified Profile</Text>
                  <Feather name="chevron-right" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Feather name="user" size={30} color="black" />
              <Link href={"(modals)/login"} asChild>
                <TouchableOpacity>
                  <Text className="text-base">Press to login</Text>
                </TouchableOpacity>
              </Link>
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
      </SafeAreaView>
    </View>
  );
};

export default Profile;
