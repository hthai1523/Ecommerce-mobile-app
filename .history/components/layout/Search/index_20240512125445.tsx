import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Link, router } from "expo-router";

const Search = () => {
  return (
    <View className="min-w-[239] flex-1 flex-row bg-[#fff] py-[2px] px-3 items-center rounded-md">
      <TouchableOpacity>
        <Feather name="search" size={20} color={"#ADADAD"} />
      </TouchableOpacity>
      <Link href={"/(modals)/search"} asChild>
        <Pressable className="px-2 py-2 flex-1">
          {/* <TextInput
                        placeholder="Search Anything"
                        placeholderTextColor={'#ADADAD'}
                        
                    /> */}
          <Text className="text-[#ADADAD]">Search Anything</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Search;
