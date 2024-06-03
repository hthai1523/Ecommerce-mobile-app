import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CustomImage from "@/components/Image";

const SettingAccount = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView className="w-full">
         <View className="items-center w-full">
              <CustomImage source={require("@/assets/images/User.jpg")} style={styles.imageContainer} />
              <Text className="text-lg font-bold">Your Avatar</Text>
         </View>
         <View>
            
            <TextInput />
         </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingAccount;

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 999,
    borderWidth: 8,
    borderColor: '#FFF',

  },
});
