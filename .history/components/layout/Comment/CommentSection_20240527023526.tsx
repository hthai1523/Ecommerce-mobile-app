import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomImage from '@/components/Image'
import { AntDesign } from '@expo/vector-icons'

const CommentSection = () => {
  return (
    <View className='flex-row items-start gap-2 bg-red-400 w-full'>
        <CustomImage source={require('@/assets/images/User.jpg')} style={{width: 40, height: 40,borderRadius: 9999, objectFit: 'cover'}} />
        <View className='flex-row justify-between bg-red-700'>
            <Text>hello</Text>
            <Pressable>
            <AntDesign name="like2" size={24} color="black" />
            </Pressable>
        </View>
    </View>
  )
}

export default CommentSection

const styles = StyleSheet.create({})