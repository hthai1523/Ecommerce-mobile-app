import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';

const INITIAL_REGION = {
    latitude: 20.981862,
    longitude: 105.832370,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0121,
}

const LocationSearch = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 20.981862,
    longitude: 105.832370,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

 
  return (
    <View style={{flex: 1}}>
        <MapView style={StyleSheet.absoluteFill} region={mapRegion}>
          <Marker coordinate={mapRegion} title='home' />
        </MapView>
    </View>
  )
}

export default LocationSearch

const styles = StyleSheet.create({})