import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Product } from "@/store/interfaces";
import CustomImage from "@/components/Image";
import formatCurrency from "@/functions/formatCurrency";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref, Product>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "70%"], []);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["M", "L", "XL"];
  const handleSizePress = (size: string) => {
    setSelectedSize(size);
  };
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      ref={ref}
      snapPoints={snapPoints}
      index={1}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View className="border-b border-b-[#EEE] p-4 flex-row space-x-2">
          <CustomImage
            source={props.image}
            style={{ width: 100, height: 100, objectFit: "contain" }}
          />
          <View className="mt-auto flex-1">
            <Text className="font-bold  text-lg text-sky-400">
              {formatCurrency(props.price)}
            </Text>
            <Text>Storage: {props.price}</Text>
          </View>
        </View>
        <ScrollView className="p-4">
          <View>
            <Text>Size</Text>
            <View className="flex-row flex-wrap w-full">
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.button,
                    selectedSize === size && styles.selectedButton,
                  ]}
                  onPress={() => handleSizePress(size)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      selectedSize === size && styles.selectedButtonText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity></TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    width: 50,
    alignItems: "center",
  },

  selectedButton: {
    backgroundColor: "#e0e0e0",
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButtonText: {
    fontWeight: "bold",
  },
});

export default BottomSheet;
