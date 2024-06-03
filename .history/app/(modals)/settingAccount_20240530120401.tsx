import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CustomImage from "@/components/Image";

const SettingAccount = () => {
  return (
    <SafeAreaView className="items-center">
      <CustomImage source={require("@/assets/images/User.jpg")} style={styles.imageContainer} />
      <Text className="text-lg font-bold">Your Avatar</Text>

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
