import React, { useMemo, memo } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
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
          className="mt-2"
        />
      );
    }

    return (
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        className="py-3 flex-row space-x-3 "
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
    <View style={{flex: 1,marginLeft: 20, backgroundColor: '#fff'}}>
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-extrabold">{title}</Text>
        {isNavigation && (
          <TouchableOpacity onPress={() => router.navigate("/(tabs)/store")}>
            <Text className="text-xs text-gray-500">See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {renderContent}
    </View>
  );
};

export default memo(ShoppingList);
