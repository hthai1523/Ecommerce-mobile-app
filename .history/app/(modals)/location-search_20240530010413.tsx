import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LocationSearch = () => {
  const [mapRegion, setMapRegion] = useState<Region | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
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
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <TouchableOpacity className='absolute bg-sky-400 rounded-lg px-4 py-3 bottom-0'>
        <Text className='text-white text-base font-medium'>Get your address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
