import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

const options = [
    'Change Infomation',
    'Change Password',
    'Verify Account',
]

const SettingAccount = () => {
  return (
    <SafeAreaView>
        <FlatList
            data={options}
            renderItem={(item) => <Text>{item}</Text>}
        />
    </SafeAreaView>
  )
}

export default SettingAccount

const styles = StyleSheet.create({})