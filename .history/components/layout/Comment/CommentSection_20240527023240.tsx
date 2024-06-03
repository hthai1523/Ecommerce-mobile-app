import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomImage from '@/components/Image'

const CommentSection = () => {
  return (
    <View className='flex-row items-start gap-2'>
        <CustomImage source={require('@/assets/images/User.jpg')} style={{width: 40, height: 40,borderRadius: 9999, objectFit: 'cover'}} />
        <View>
            <Text>hello</Text>
            <Pressable>
                
            </Pressable>
        </View>
    </View>
  )
}

export default CommentSection

const styles = StyleSheet.create({})