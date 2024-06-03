import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,
  TouchableOpacityBase,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import {useDebounce} from "@/hook";
import getAllCategories from "@/services/getAllCategories";
import Colors from "@/constants/Colors";



const HeaderWithSearch = ({ debounce }: any) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [categories, setCategories] = useState<Array<String>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const handleChangeSearchInput = (text: string) => {
    setSearchValue(text);
  };

  const selectCategory = (index: number) => {
    setActiveIndex(index)
  }

  const debounced = useDebounce(searchValue);

  useEffect(() => {
    debounce(debounced);
  }, [debounced]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getAllCategories()
      setCategories(data)
    }

    fetchApi()
  }, [])

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
        className="absolute l-0 r-0 top-16"
      >
        {
          categories.map((category, index) => (
            <TouchableOpacity onPress={() => selectCategory(index)} style={activeIndex === index ? styles.segmentButtonActive : styles.segmentButton} key={index}>
              <Text style={activeIndex === index ? styles.segmentTextActive : styles.segmentTextActive}>{category}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  segmentButton:{},
  setmentText: {},
  segmentButtonActive: {
    backgroundColor: Colors.primary.background,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    textAlign: 'center'
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
})

export default HeaderWithSearch;
