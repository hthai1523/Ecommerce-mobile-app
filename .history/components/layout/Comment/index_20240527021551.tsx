import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const Comment = () => {
  return (
    <View>
        <View className='flex-row items-center justify-between'>
            <View >
                <Text className='text-base font-medium'>Product reviews</Text>
                <Text className='text-sm'>(159 reviews)</Text>
            </View>
            <TouchableOpacity className='flex-row items-center'>
                <Text className='text-lg text-sky-700'>See All</Text>
                <Feather name='chevron-right' size={24} color={Colors.primary.icon} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({})