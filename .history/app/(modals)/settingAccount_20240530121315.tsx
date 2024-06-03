import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import CustomImage from "@/components/Image";
import { useAuth } from "@/hook/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/config/firebase";

const SettingAccount = () => {

    const { user } = useAuth();
    const [username, setUsername] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    useEffect(() => {
        const fetch = async () => {
          if (user) {
            const userDoc = await getDoc(doc(FIREBASE_DB, "user", user.uid));
            if (userDoc.exists()) {
              const data = userDoc.data();
              setUsername(data.username);
            }
          }
        };
    
        fetch();
      }, [user]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView className="w-full">
         <View className="items-center w-full">
              <CustomImage source={require("@/assets/images/User.jpg")} style={styles.imageContainer} />
              <Text className="text-lg font-bold">Your Avatar</Text>
         </View>

         <View>
            <Text>Your Email</Text>
            <Text>{user?.email}</Text>
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
