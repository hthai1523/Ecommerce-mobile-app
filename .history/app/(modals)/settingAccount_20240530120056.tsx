import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CustomImage from "@/components/Image";


const SettingAccount = () => {
  

  return (
    <SafeAreaView className="">
      <CustomImage source={require('@/assets/images/User.jpg')} />
    </SafeAreaView>
  );
};

export default SettingAccount;

const styles = StyleSheet.create({
  
});
