import { View, Text, TouchableOpacity, Animated, StyleSheet} from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const FeedPage = () => {

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Text className="font-medium text-lg text-[#767676] ml-4">
              Feed
            </Text>
          ),
          headerTitle: "",
          headerRight: () => (
            <View className="flex-row items-center mr-2">
              <TouchableOpacity
                className="p-2 "
                onPress={() => router.push("/(modals)/search")}
              >
                <Feather name="search" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 ">
                <Feather name="mail" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 ">
                <Feather name="bell" size={20} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </View>
  );
};

export default FeedPage;
