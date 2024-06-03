import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'

const LocationSearch = () => {
  return (
    <View>
        <MapView stye={StyleSheet.absoluteFill} />
    </View>
  )
}

export default LocationSearch

const styles = StyleSheet.create({})