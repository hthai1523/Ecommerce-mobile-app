import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps'

const INITIAL_REGION = {
    latitude: 20.981862,
    longitude: 105.832370,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

const LocationSearch = () => {
  return (
    <View style={{flex: 1}}>
        <MapView style={StyleSheet.absoluteFill} provider={PROVIDER_DEFAULT} initialRegion={INITIAL_REGION} showsUserLocation/>
    </View>
  )
}

export default LocationSearch

const styles = StyleSheet.create({})