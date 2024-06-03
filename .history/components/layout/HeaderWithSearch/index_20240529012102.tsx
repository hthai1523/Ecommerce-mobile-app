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
import React, { useCallback, useEffect, useState } from "react";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useDebounce } from "@/hook";
import getAllCategories from "@/services/getAllCategories";
import Colors from "@/constants/Colors";
import {Category} from '@/store/interfaces';
interface SearchFunc {
  debounce: (value : string) => void
  choseCategory: (value : string) => void
}

const HeaderWithSearch = ({ debounce, choseCategory }: SearchFunc) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [categories, setCategories] = useState<Category>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  let categoryProvider = ''

  useCallback(() => {
    if(activeIndex === -1) {
      categoryProvider =''
    } else {
      categoryProvider = categories[activeIndex].toString()
    } 
  }, [activeIndex])

  const handleChangeSearchInput = (text: string) => {
    setSearchValue(text);
  };

  const selectCategory = (index: number) => {
    setActiveIndex(p => {
      if (p === index) {
        return -1;
      }
      return index;
    })
  };

  const debounced = useDebounce(searchValue);

  useEffect(() => {
    debounce(debounced);
  }, [debounced]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };

    fetchApi();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white" >
      <View className=" h-[53px] flex-row items-center justify-between">
        {/* header left */}
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Feather name="chevron-left" size={24} color={Colors.primary.icon} />
        </TouchableOpacity>

        {/* header search */}
        <View className="bg-slate-100 w-[240px] h-[30] flex-row items-center px-[8] py-[2] rounded-md">
          <TouchableOpacity>
            <Feather name="search" size={20} color={Colors.primary.icon} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search Anything"
            placeholderTextColor={Colors.primary.icon}
            autoFocus
            className="px-3 py-[2] flex-1"
            value={searchValue}
            onChangeText={handleChangeSearchInput}
          />
        </View>

        {/* header right */}
        <View className="flex-row items-center">
          <TouchableOpacity className="p-2">
            <Feather name="share-2" size={24} color={Colors.primary.icon} />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Feather name="shopping-cart" size={24} color={Colors.primary.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="absolute left-0 right-0 top-[68px]"
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            onPress={() => selectCategory(index)}
            style={
              activeIndex === index
                ? styles.segmentButtonActive
                : styles.segmentButton
            }
            key={index}
          >
            <Text
              style={
                activeIndex === index
                  ? styles.segmentTextActive
                  : styles.segmentText
              }
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    textAlign: "center",
  },
  segmentText: {
    color: Colors.primary.background,
    fontWeight: "bold",
    fontSize: 16,
  },
  segmentButtonActive: {
    backgroundColor: Colors.primary.background,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    textAlign: "center",
  },
  segmentTextActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HeaderWithSearch;
