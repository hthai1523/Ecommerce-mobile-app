import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";


const data = [
  {
    id: 1,
    images: 'https://www.bing.com/images/search?view=detailV2&ccid=yaSvvWvA&id=0A2F5E72870445779248E1023793E4E1F7A3B4DA&thid=OIP.yaSvvWvABh7RDjRpsayq8wAAAA&mediaurl=https%3a%2f%2fimage.gala.de%2f22230690%2ft%2frd%2fv6%2fw960%2fr0.6667%2f-%2fmilan-fashion-week-kaia.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.c9a4afbd6bc0061ed10e3469b1acaaf3%3frik%3d2rSj9%252bHkkzcC4Q%26pid%3dImgRaw%26r%3d0&exph=711&expw=474&q=Beautiful+runway+at+Milan+Fashion+Week&simid=608027719059798633&FORM=IRPRST&ck=D45F42E4F7C975FDB681BEA4967901B8&selectedIndex=1&itb=0'
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
