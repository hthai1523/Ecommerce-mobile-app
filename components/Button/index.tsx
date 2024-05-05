import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  icon?: string;
  primary?: boolean;
  prop?: any;
  width?: number;
  height?: number;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  primary = false,
  onPress,
  prop,
  style,
  width,
  height,
  ...rest
}) => {
  return (
    <TouchableOpacity
      className={`flex-row justify-center items-center gap-1 mt-3 ${
        primary ? "bg-sky-400 " : "border border-sky-400 text-sky-400"
      } rounded-md`}
      style={{ width: width, height: height }}
      onPress={onPress}
      {...rest}
    >
      {icon && <FontAwesome5 name={icon} size={20} color={`${primary ? '#fff7ff' : 'skyblue'}`} />}
      <Text className={` ${primary ? "text-white" : "text-sky-400"}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
