import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Pressable,
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

      <View className="w-full mt-[1] h-[30]  flex-row items-center ">
        <Pressable
          onPress={() => setSelectedOption("product")}
          className={`w-1/2 py-1  ${
            selectedOption === "product"
              ? " bg-[#074EE8]/50"
              : "border border-[#ADADAD]"
          }`}
        >
          <Text
            className={`text-center font-medium text-base ${
              selectedOption === "product" ? "text-[#074EE8]" : "text-[#ADADAD]"
            }`}
          >
            Product
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedOption("store")}
          className={`w-1/2 py-1 ${
            selectedOption === "store"
              ? " bg-[#074EE8]/50"
              : "border border-[#ADADAD]"
          }`}
        >
          <Text
            className={`text-center font-medium text-base ${
              selectedOption === "store" ? "text-[#074EE8]" : "text-[#ADADAD]"
            }`}
          >
            Store
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HeaderWithSearch;
