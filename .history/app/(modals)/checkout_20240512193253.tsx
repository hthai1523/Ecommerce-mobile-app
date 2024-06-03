import { View, Text } from 'react-native'
import React from 'react'
import useCartStore from '@/store/cartStore'

const Page = () => {
  const products = useCartStore((state) => state.products)
  const clearCart = useCartStore((state) => state.clearCart)
  const reduceProduct = useCartStore((state) => state.reduceProduct)

  return (
    <View>
      <Text>check out</Text>
    </View>
  )
}

export default Page