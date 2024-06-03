import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const LocationSearch = () => {
  const [mapRegion, setMapRegion] = useState<Region | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <TouchableOpacity style={styles.button} >
        <Text className="text-white text-base font-medium">
          Get your address
        </Text>
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
  button: {
    position: "absolute",
   
    backgroundColor: "rgb(255 255 255 / 0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  }
});
