import { View, Text } from 'react-native'
import React from 'react'
import { Product } from '@/store/interfaces';

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
        <View>
            <Text>Shop Mall</Text>
        </View>
        <Text>Thai Hoang - Official Store</Text>
      </View>
    </View>
  )
}

export default CheckoutSection