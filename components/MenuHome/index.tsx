import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
const menuData = [
    { id: 1, icon: 'check-square' },
    { id: 2, icon: 'home' },
    { id: 3, icon: 'grid' },
    { id: 4, icon: 'inbox' },
    { id: 5, icon: 'check-square' }
];

const MenuHome = () => {
  return (
    <View className='mt-[13] p-[20] flex-row items-center justify-between space-x-auto '>
        {menuData.map(item => (
            <TouchableOpacity key={item.id}>
                <Feather name={item.icon} size={24} color={"#000"} />
            </TouchableOpacity>
        ))}
    </View>
  )
}

export default MenuHome