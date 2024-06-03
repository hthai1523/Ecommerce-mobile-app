import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const INITIAL_LOCATION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

const LocationSearch = () => {
  return (
    <View style={{flex: 1}}>
        <MapView style={StyleSheet.absoluteFill}/>
    </View>
  )
}

export default LocationSearch

const styles = StyleSheet.create({})