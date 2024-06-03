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
    <View>
      <Text>CheckoutSection</Text>
    </View>
  )
}

export default CheckoutSection