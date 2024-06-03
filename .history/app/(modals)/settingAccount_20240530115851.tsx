import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";


const SettingAccount = () => {
  

  return (
    <SafeAreaView>
      
    </SafeAreaView>
  );
};

export default SettingAccount;

const styles = StyleSheet.create({
  containerTask: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    marginVertical: 12,
    width: "100%",
    borderBottomColor: Colors.primary.background,
    borderBottomWidth: 2,
  },
});
