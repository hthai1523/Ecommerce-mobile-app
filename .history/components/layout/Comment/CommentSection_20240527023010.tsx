import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomImage from '@/components/Image'

const CommentSection = () => {
  return (
    <View>
        <CustomImage source={require('@/assets/images/User.jpg')} style={{width: 20, height: 20, objectFit: 'contain'}} />
        <View>

        </View>
    </View>
  )
}

export default CommentSection

const styles = StyleSheet.create({})