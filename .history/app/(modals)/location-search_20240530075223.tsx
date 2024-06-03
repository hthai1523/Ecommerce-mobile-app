import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAddressStore from "@/store/addressStore";
import Toast from 'react-native-toast-message';
import { router } from "expo-router";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;


const LocationSearch: React.FC = () => {
  const [mapRegion, setMapRegion] = useState<Region | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const setAddress = useAddressStore((state) => state.setAddress);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!mapRegion) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const geocode = async () => {
    if (mapRegion) {
      try {
        const address = await Location.reverseGeocodeAsync({
          latitude: mapRegion.latitude,
          longitude: mapRegion.longitude,
        });
        setAddress(address[0]);
       
        router.back();
      } catch (error) {
        console.error("Error during reverse geocoding:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <TouchableOpacity
        className=" bg-sky-400 rounded-lg px-4 py-3"
        onPress={geocode}
      >
        <Text className="text-white text-base font-medium">Get your address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
    position: "relative",
  },
 
});
