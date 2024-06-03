import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const options = ["Change Infomation", "Change Password", "Verify Account", 'Address'];

const SettingAccount = () => {
  const renderItem = (item: string) => {
    return (
      <TouchableOpacity style={styles.containerTask}>
        <Text>{item}</Text>
        <Feather name="chevron-right" size={20} color={Colors.primary.icon} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={options}
        keyExtractor={(_, index) => index.toString()}
        renderItem={(item) => renderItem(item.item)}
        style={{paddingHorizontal: 16}}
      />    
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
