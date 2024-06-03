import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'

const LocationSearch = () => {
  return (
    <View style={{flex: 1}}>
        <MapView style={StyleSheet.absoluteFill} provider='google'/>
    </View>
  )
}

export default LocationSearch

const styles = StyleSheet.create({})