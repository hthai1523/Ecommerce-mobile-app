import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const options = ["Change Infomation", "Change Password", "Verify Account"];

const SettingAccount = () => {
  const renderItem = (item: string) => {
    return (
      <TouchableOpacity >
        <Text>{item}</Text>
        <Feather name="chevron-right" size={20} color={Colors.primary.icon} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={options}
        keyExtractor={(_,index) => index.toString()}
        renderItem={(item) => renderItem(item.item)}
        contentContainerStyle={{padding: 12}}
      />
    </SafeAreaView>
  );
};

export default SettingAccount;

const styles = StyleSheet.create({});
