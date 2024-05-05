import { View, ViewProps } from "react-native";
import React from "react";


interface SeparateProps extends ViewProps {
    color: string;
  }
  

const Separate = ({color}:SeparateProps) => {
  return <View className={`w-full h-[2px] ${color.includes('#') ? (`bg-[${color}]`) : (`bg-${color}`)} my-6 `} style={{zIndex: 1000}}/>;
};

export default Separate;
