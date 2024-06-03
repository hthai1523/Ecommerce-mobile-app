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
      <View>
        <View>
            <Text>Shop Mall</Text>
        </View>
        <Text>{item.title}</Text>
      </View>
    </View>
  )
}

export default CheckoutSection