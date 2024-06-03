import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs, router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.icon,
        tabBarStyle: {
          paddingBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feedPage"
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ size, color }) => (
            <Feather name="image" size={size} color={color} />
          ),
          headerTitle: "",
          headerLeft: () => (
            <Text className="text-[#ADADAD] text-lg font-medium px-4">
              New Feeds
            </Text>
          ),
          headerRight: () => (
            <View className="flex-row items-center mr-2">
              <TouchableOpacity
                className="px-2 "
                onPress={() => router.push("/(modals)/search")}
              >
                <Feather name="search" size={20} color={Colors.primary.icon} />
              </TouchableOpacity>
              <TouchableOpacity className="px-2 ">
                <Feather name="mail" size={20} color={Colors.primary.icon} />
              </TouchableOpacity>
              <TouchableOpacity className="px-2 ">
                <Feather name="bell" size={20} color={Colors.primary.icon} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 55,
                height: 55,
                borderRadius: 999,
                backgroundColor: Colors.primary.background,
                marginBottom: 23,
              }}
            >
              <Ionicons
                name={focused ? "bag-handle" : "bag-handle-outline"}
                color={"white"}
                size={30}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="shoppingCart"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="shopping-cart" size={size} color={color} />
          ),
          headerTitle: "",
          tabBarLabel: "Wish list",
          headerLeft: () => (
            <Text className="text-[#ADADAD] text-lg font-medium p-3">
              Wish List
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>

    // <Tabs
    //     screenOptions={{
    //         tabBarShowLabel: false,
    //         tabBarStyle: {
    //             position: "absolute",
    //             bottom: 20,
    //             left: 16,
    //             right: 16,
    //             height: 72,
    //             elevation: 0,
    //             backgroundColor: "white",
    //             borderRadius: 16,
    //             alignItems: "center",
    //             justifyContent: "center",
    //         }
    //     }}
    // >
    //     <Tabs.Screen
    //         name="index"
    //         options={{
    //             tabBarIcon: ({focused}) => (
    //                 <View style={{ alignItems: "center", paddingTop: 10 }}>
    //                     <Ionicons name={focused ? "home" : "home-outline"} color={focused ? Colors.primary.background : "gray"} size={24}/>
    //                     <Text
    //                     style={{
    //                         color: focused ? Colors.primary.background : "gray",
    //                         fontSize: 12,
    //                         marginTop: 4
    //                     }}
    //                     >Home</Text>
    //                 </View>
    //             )
    //         }}
    //     />
    //     <Tabs.Screen
    //         name="feedPage"
    //         options={{
    //             tabBarIcon: ({focused}) => (
    //                 <View style={{ alignItems: "center", paddingTop: 10 }}>
    //                     <Ionicons name={focused ? "image" : "image-outline"} color={focused ? Colors.primary.background : "gray"} size={24}/>
    //                     <Text
    //                     style={{
    //                         color: focused ? Colors.primary.background : "gray",
    //                         fontSize: 12,
    //                         marginTop: 4
    //                     }}
    //                     >Feed</Text>
    //                 </View>
    //             )
    //         }}
    //     />
    //     <Tabs.Screen
    //         name="store"
    //         options={{
    //             tabBarIcon: ({focused}) => (
    //                 <View style={{ alignItems: "center", paddingTop: 10, width: 60, height: 60, borderRadius: 999, backgroundColor: Colors.primary.background, marginBottom: 35 }}>
    //                     <Ionicons name={focused ? "bag-handle" : "bag-handle-outline"} color={"white"} size={24}/>
    //                     <Text
    //                     style={{
    //                         color: "white",
    //                         fontSize: 12,
    //                         marginTop: 4
    //                     }}
    //                     >Store</Text>
    //                 </View>
    //             )
    //         }}
    //     />
    //     <Tabs.Screen
    //         name="shoppingCart"
    //         options={{
    //             tabBarIcon: ({focused}) => (
    //                 <View style={{ alignItems: "center", paddingTop: 10 }}>
    //                     <Ionicons name={focused ? "cart" : "cart-outline"} color={focused ? Colors.primary.background : "gray"} size={24}/>
    //                     <Text

    //                     style={{
    //                         color: focused ? Colors.primary.background : "gray",
    //                         fontSize: 10,
    //                         marginTop: 4
    //                     }}
    //                     >Shopping List</Text>
    //                 </View>
    //             )
    //         }}
    //     />
    //     <Tabs.Screen
    //         name="profile"
    //         options={{
    //             tabBarIcon: ({focused}) => (
    //                 <View style={{ alignItems: "center", paddingTop: 10 }}>
    //                     <Ionicons name={focused ? "person" : "person-outline"} color={focused ? Colors.primary.background : "gray"} size={24}/>
    //                     <Text
    //                     style={{
    //                         color: focused ? Colors.primary.background : "gray",
    //                         fontSize: 12,
    //                         marginTop: 4
    //                     }}
    //                     >Profile</Text>
    //                 </View>
    //             )
    //         }}
    //     />
    // </Tabs>
  );
};

export default Layout;
