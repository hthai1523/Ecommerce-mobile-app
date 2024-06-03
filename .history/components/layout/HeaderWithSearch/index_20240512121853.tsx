import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import {useDebounce} from "@/hook";

const HeaderWithSearch = ({ debounce }: any) => {
  const [selectedOption, setSelectedOption] = useState("product");
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChangeSearchInput = (text: string) => {
    setSearchValue(text);
  };

  const debounced = useDebounce(searchValue);

  useEffect(() => {
    debounce(debounced);
  }, [debounced]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className=" h-[53px] flex-row items-center justify-between">
        {/* header left */}
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        {/* header search */}
        <View className="bg-[#E0E0E0] w-[240px] h-[30] flex-row items-center px-[8] py-[2] rounded-md">
          <TouchableOpacity>
            <Feather name="search" size={20} color={"#ADADAD"} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search Anything"
            placeholderTextColor={"#ADADAD"}
            autoFocus
            className="px-3 py-[2] flex-1"
            value={searchValue}
            onChangeText={handleChangeSearchInput}
          />
        </View>

        {/* header right */}
        <View className="flex-row items-center">
          <TouchableOpacity className="p-2">
            <Feather name="share-2" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Feather name="shopping-cart" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 16}}
      >
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default HeaderWithSearch;
