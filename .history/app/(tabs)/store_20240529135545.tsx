import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import Header from "@/components/layout/Header";
import SkeletonExpo from "moti/build/skeleton/expo";
import MenuHome from "@/components/MenuHome";
import Slider from "@/components/Slider";
import axios from "axios";
import Card from "@/components/Card";
import Separate from "@/components/Separate";
import Colors from "@/constants/Colors";
import { Product } from "@/store/interfaces";
import getAllProduct from "@/services/getAllProduct";

const Store = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listProductArrivals, setListProductArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoading(true);
        const response = await getAllProduct();
        setListProductArrivals(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApi();
  }, []);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator
          animating
          size="large"
          color={Colors.primary.background}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ header: () => <Header isBack={false} /> }} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.skeletonContainer}>
            <View>
              <SkeletonExpo colorMode="light" width={150} height={100} />
            </View>
            <View>
              <SkeletonExpo colorMode="light" width={150} height={100} />
            </View>
            <View>
              <SkeletonExpo colorMode="light" width={150} height={100} />
            </View>
            <View>
              <SkeletonExpo colorMode="light" width={150} height={100} />
            </View>
          </View>

          <MenuHome />
          <Slider />

          <Separate color="#EEE" />

          <View style={styles.newArrivalsContainer}>
            <Text style={styles.heading}>New Arrivals</Text>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={Colors.primary.background}
                style={styles.loadingIndicator}
              />
            ) : (
              <ScrollView
                style={styles.horizontalScrollView}
                horizontal={true}
                showsVerticalScrollIndicator={false}
              >
                {listProductArrivals.map((item) => (
                  <Pressable key={item.productID}>
                    <Card data={item} width={145} height={189} />
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>

          <Separate color="#EEE" />

          <View style={styles.suggestionContainer}>
            <Text style={styles.heading}>Suggestion for you</Text>

            <FlatList
              data={listProductArrivals}
              renderItem={({ item, index }) => (
                <View style={[styles.cardContainer, index % 2 !== 0 && styles.secondColumn]}>
                  <Card data={item} width={145} height={189} />
                </View>
              )}
              keyExtractor={(item) => item.productID.toString()}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.columnWrapper}
              ListFooterComponent={renderFooter}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    marginTop: 53,
  },
  skeletonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 12,
    gap: 8,
  },
  newArrivalsContainer: {
    marginLeft: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingIndicator: {
    marginTop: 8,
  },
  horizontalScrollView: {
    marginTop: 16,
    paddingVertical: 12,
  },
  suggestionContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  columnWrapper: {
    marginBottom: 10,
    padding: 5,
  },
  cardContainer: {
    flex: 1,
    margin: 5,
  },
  secondColumn: {
    marginTop: 40,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
});

export default Store;
