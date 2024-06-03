import {View, Text, StatusBar, TouchableOpacity} from "react-native";
import React from "react";
import {Tabs, router} from "expo-router";
import {Feather, Ionicons} from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Layout = () => {
    return (
        // <Tabs
        //     screenOptions={{
        //         tabBarActiveTintColor: "#074ee8",
        //         tabBarShowLabel: false,
        //     }}
        // >
        //     <Tabs.Screen
        //         name="index"
        //         options={{
        //             headerTitle: "Home",
        //             tabBarIcon: ({size, color}) => (
        //                 <Feather name="home" size={size} color={color}/>
        //             ),
        //         }}
        //     />
        //     <Tabs.Screen
        //         name="feedPage"
        //         options={{
        //             headerTitle: "Feed",
        //             tabBarIcon: ({size, color}) => (
        //                 <Feather name="image" size={size} color={color}/>
        //             ),
        //         }}
        //     />
        //     <Tabs.Screen
        //         name="store"
        //         options={{
        //             headerTitle: "Store",
        //             tabBarIcon: ({size, color}) => (
        //                 <Feather name="check-square" size={size} color={color}/>
        //             ),
        //         }}
        //     />
        //     <Tabs.Screen
        //         name="shoppingCart"
        //         options={{
        //             tabBarIcon: ({size, color}) => (
        //                 <Feather name="shopping-cart" size={size} color={color}/>
        //             ),

        //             headerTitle: "Shopping List",
        //             headerLeft: () => (
        //                 <TouchableOpacity className="p-2" onPress={() => router.back()}>
        //                     <Feather name="chevron-left" size={24} color={Colors.primary.icon}/>
        //                 </TouchableOpacity>
        //             ),
        //         }}
        //     />
        //     <Tabs.Screen
        //         name="profile"
        //         options={{
        //             headerTitle: "Profile",
        //             tabBarIcon: ({size, color}) => (
        //                 <Feather name="user" size={size} color={color}/>
        //             ),
        //         }}
        //     />
        // </Tabs>

        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 20,
                    left: 16,
                    right: 16,
                    height: 72,
                    elevation: 0,
                    backgroundColor: "white",
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{ alignItems: "center", paddingTop: 10 }}>
                            <Ionicons name={focused ? "home" : "home-outline"} color={focused ? Colors.primary.icon : "gray"} size={24}/>
                            <Text
                            style={{
                                color: focused ? Colors.primary.icon : "gray",
                                fontSize: 12,
                                marginTop: 4
                            }}
                            >Home</Text>
                        </View>
                    )
                }}
            />
            <Tabs.Screen
                name="feedPage"
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{ alignItems: "center", paddingTop: 10 }}>
                            <Ionicons name={focused ? "image" : "image-outline"} color={focused ? Colors.primary.icon : "gray"} size={24}/>
                            <Text
                            style={{
                                color: focused ? Colors.primary.icon : "gray",
                                fontSize: 12,
                                marginTop: 4
                            }}
                            >Feed</Text>
                        </View>
                    )
                }}
            />
            <Tabs.Screen
                name="store"
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{ alignItems: "center", paddingTop: 10 }}>
                            <Ionicons name={focused ? "bag-handle" : "bag-handle-outline"} color={focused ? Colors.primary.icon : "gray"} size={24}/>
                            <Text
                            style={{
                                color: focused ? Colors.primary.icon : "gray",
                                fontSize: 12,
                                marginTop: 4
                            }}
                            >Store</Text>
                        </View>
                    )
                }}
            />
            <Tabs.Screen
                name="shoppingCart"
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{ alignItems: "center", paddingTop: 10 }}>
                            <Ionicons name={focused ? "cart" : "cart-outline"} color={focused ? Colors.primary.icon : "gray"} size={24}/>
                            <Text
        
                            style={{
                                color: focused ? Colors.primary.icon : "gray",
                                fontSize: 10,
                                marginTop: 4
                            }}
                            >Shopping List</Text>
                        </View>
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{ alignItems: "center", paddingTop: 10 }}>
                            <Ionicons name={focused ? "person" : "person-outline"} color={focused ? Colors.primary.icon : "gray"} size={24}/>
                            <Text
                            style={{
                                color: focused ? Colors.primary.icon : "gray",
                                fontSize: 12,
                                marginTop: 4
                            }}
                            >Profile</Text>
                        </View>
                    )
                }}
            />
        </Tabs>
    );
};

export default Layout;
