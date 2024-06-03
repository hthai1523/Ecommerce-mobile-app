import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";


const data = [
  {
    id: 1,
    images: 'https://th.bing.com/th/id/OIP.yaSvvWvABh7RDjRpsayq8wAAAA?rs=1&pid=ImgDetMain',
    title: 'Exciting designs spotted on the runway! #FashionWeek',
    tag: ['Fashion', 'Runway']
  }
  {
    id: 2,
    images: 'https://i.pinimg.com/originals/b1/b7/e1/b1b7e1b93ecd47461339c43df0f77b34.jpg',
    title: 'Exciting designs spotted on the runway! #FashionWeek',
    tag: ['Fashion', 'Runway']
  }
  {
    id: 3,
    images: 'https://th.bing.com/th/id/OIP.yaSvvWvABh7RDjRpsayq8wAAAA?rs=1&pid=ImgDetMain',
    title: 'Exciting designs spotted on the runway! #FashionWeek',
    tag: ['Fashion', 'Runway']
  }
]
 


const FeedPage = () => {
  
  useEffect(() => {
    <Stack.Screen
      options={{
        headerTitle: "",
        headerLeft: () => (
          <Text className="text-[#ADADAD] text-lg font-medium p-3">
            New Feeds
          </Text>
        ),
        headerRight: () => (
          <View className="flex-row items-center mr-2">
            <TouchableOpacity
              className="p-2 "
              onPress={() => router.push("/(modals)/search")}
            >
              <Feather name="search" size={20} color={Colors.primary.icon} />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 ">
              <Feather name="mail" size={20} color={Colors.primary.icon} />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 ">
              <Feather name="bell" size={20} color={Colors.primary.icon} />
            </TouchableOpacity>
          </View>
        ),
      }}
    />;
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className=" ">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-lg font-extrabold">Latest Updates</Text>
              <Text className="text-sm font-light text-black/50">Stay informed with the latest fashion news</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.navigate("/(tabs)/store")}
              className="px-5"
            >
              <Text className="text-xs text-gray-500">View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            className=" py-3 space-x-3 "
            horizontal={true}
            showsVerticalScrollIndicator={false}
          >
            <View>
              
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedPage;