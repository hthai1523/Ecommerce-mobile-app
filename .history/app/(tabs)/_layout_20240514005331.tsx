import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs, router } from "expo-router";
import { Feather } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#074ee8",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feedPage"
        options={{
          headerTitle: "Feed",
          tabBarIcon: ({ size, color }) => (
            <Feather name="image" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          headerTitle: "Store",
          tabBarIcon: ({ size, color }) => (
            <Feather name="check-square" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shoppingCart"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="shopping-cart" size={size} color={color} />
          ),

          headerTitle: "Shopping Cart",
          headerLeft: () => (
            <Feather name="home" size={24} color={"black"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
