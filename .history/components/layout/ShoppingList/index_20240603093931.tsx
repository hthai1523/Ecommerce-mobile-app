import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Product } from "@/store/interfaces";
import Card from "@/components/Card";
import Colors from "@/constants/Colors";

interface ShoppingListProps {
  data: Product[];
  title: string;
  isNavigation: boolean;
  isLoading: boolean;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  data,
  title,
  isNavigation,
  isLoading,
}) => {
  const renderContent = useMemo(() => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color={Colors.primary.background}
          style={styles.loadingIndicator}
        />
      );
    }

    return (
      <ScrollView
        style={styles.scrollView}
        horizontal
        showsVerticalScrollIndicator={false}
      >
        {data.map((item) => (
          <Pressable key={item.id}>
            <Card data={item} width={145} height={190} />
          </Pressable>
        ))}
      </ScrollView>
    );
  }, [data, isLoading]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {isNavigation && (
          <TouchableOpacity onPress={() => router.navigate("/(tabs)/store")}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {renderContent}
    </View>
  );
};

export default React.memo(ShoppingList);

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  seeAll: {
    fontSize: 12,
    color: "gray",
  },
  loadingIndicator: {
    marginTop: 8,
  },
  scrollView: {
    paddingTop: 8,
    flexDirection: "row",
    spaceX: 8,
  },
});
