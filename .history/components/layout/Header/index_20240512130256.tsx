import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import Colors from "@/constants/Colors";

interface HeaderProps {
  isBack: boolean;
}

const Header = ({ isBack }: HeaderProps) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white h-[53px] flex flex-row items-center justify-between border-b border-b-[#EEE]">
        {isBack && (
          <TouchableOpacity onPress={() => router.back()} className="">
            <Feather name="chevron-left" size={24} color={Colors.primary.background} />
          </TouchableOpacity>
        )}
        <View className="flex-row min-w-[239] items-center px-3 ml-3 rounded-md bg-slate-400">
          <TouchableOpacity>
            <Feather name="search" size={20} color={"#ADADAD"} />
          </TouchableOpacity>
          <Link href={"/(modals)/search"} asChild>
            <Pressable className="px-2 py-2 flex-1">
              <Text className="text-[#ADADAD]">Search Anything</Text>
            </Pressable>
          </Link>
        </View>
        <View className="flex-row items-center justify-between mr-[6px]">
          <TouchableOpacity className="p-[6px]">
            <Feather name="bell" size={20} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity className="p-[6px]">
            <Feather name="mail" size={20} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity className="p-[6px]">
            <Feather name="heart" size={20} color={"#000"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
