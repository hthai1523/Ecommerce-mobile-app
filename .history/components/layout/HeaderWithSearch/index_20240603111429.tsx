import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import getAllCategories from "@/services/getAllCategories";
import Colors from "@/constants/Colors";
import { useDebounce } from "@/hook";

interface SearchFunc {
  debounce: (value: string) => void;
  choseCategory: (value: string) => void;
}

const HeaderWithSearch = ({ debounce, choseCategory }: SearchFunc) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [categories, setCategories] = useState<Array<string>>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleChangeSearchInput = (text: string) => {
    setSearchValue(text);
  };

  const selectCategory = useCallback(
    (index: number) => {
      setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
      if (activeIndex === index) {
        choseCategory("");
      } else {
        choseCategory(categories[index]);
      }
    },
    [activeIndex, categories, choseCategory]
  );

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={Colors.primary.icon} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={Colors.primary.icon} />
          <TextInput
            placeholder="Search Anything"
            placeholderTextColor={Colors.primary.icon}
            autoFocus
            style={styles.searchInput}
            value={searchValue}
            onChangeText={handleChangeSearchInput}
          />
        </View>

        <View style={styles.rightButtons}>
          <TouchableOpacity style={styles.button}>
            <Feather name="share-2" size={24} color={Colors.primary.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Feather name="shopping-cart" size={24} color={Colors.primary.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        style={styles.scrollView}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            onPress={() => selectCategory(index)}
            style={index === activeIndex ? styles.segmentButtonActive : styles.segmentButton}
            key={index}
          >
            <Text style={index === activeIndex ? styles.segmentTextActive : styles.segmentText}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 53,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 4
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 12,
  },
  scrollView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 68,
  },
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
