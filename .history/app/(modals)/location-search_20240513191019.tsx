import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const INITIAL_LOCATION = 

const LocationSearch = () => {
  return (
    <View style={{flex: 1}}>
        <MapView style={StyleSheet.absoluteFill}/>
    </View>
  )
}

export default LocationSearch

const styles = StyleSheet.create({})