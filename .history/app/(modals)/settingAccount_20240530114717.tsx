import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const options = ["Change Infomation", "Change Password", "Verify Account"];

const SettingAccount = () => {
  const renderItem = (item: string) => {
    return (
      <TouchableOpacity >
        
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={options}
        renderItem={(item) => <Text>{item.item}</Text>}
      />
    </SafeAreaView>
  );
};

export default SettingAccount;

const styles = StyleSheet.create({});
