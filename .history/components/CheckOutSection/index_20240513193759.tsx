import { View, Text } from 'react-native'
import React from 'react'
import { Product } from '@/store/interfaces';
import Colors from '@/constants/Colors';

const CheckoutSection = ({
    item,
    quantity,
  }: {
    item: Product;
    quantity: number;
  }) => {
  return (
    <View className='flex flex-col p-4 bg-white'>
      <View className='flex flex-row items-center gap-3'>
        <View className='p-1' style={{backgroundColor: Colors.primary.background}}>
            <Text className='text-sm text-white'>Shop Mall</Text>
        </View>
        <Text>Thai Hoang - Official Store</Text>
      </View>
    </View>
  )
}

export default CheckoutSection