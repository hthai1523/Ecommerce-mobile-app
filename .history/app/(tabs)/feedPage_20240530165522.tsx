import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Image } from "react-native";
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
  },
  {
    id: 2,
    images: 'https://i.pinimg.com/originals/b1/b7/e1/b1b7e1b93ecd47461339c43df0f77b34.jpg',
    title: 'Exciting designs spotted on the runway! #FashionWeek',
    tag: ['Fashion', 'Runway']
  },
  {
    id: 3,
    images: 'https://customhiphopofficial.com/cdn/shop/articles/seo-records_2Fdev_results_2F46983a6d-dee1-4c74-8166-6be6cfeda5f1_2675423067_1bb8d20b-f1d5-4b40-9990-2c308a20c65c.png?v=1716573762',
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

  const renderItem = (item:any) => {
    
  }

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
            {data.map((item) => (
              <View key={item.id} style={{width: 164, borderRadius: 12, overflow: 'hidden'}} className="border border-black/30">
                <Image source={{uri: item.images}} style={{width: '100%', height: 190, objectFit: 'fill'}}/>
                <View className="px-2 bg-red-400">
                  <Text className="text-xs text-gray-500">{item.title}</Text>
                  
                </View>
              </View>
            ))}
          </ScrollView>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedPage;
