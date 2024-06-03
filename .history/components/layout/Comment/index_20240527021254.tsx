import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const Comment = () => {
  return (
    <View>
        <View>
            <View>
                <Text>Product reviews</Text>
                <Text>(159 reviews)</Text>
            </View>
            <TouchableOpacity>
                <Text>See All</Text>
                <Feather name='chevron-right' size={24} color={Colors.primary.icon} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({})