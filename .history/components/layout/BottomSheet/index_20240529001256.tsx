import { View, Text, Image, ScrollView, StyleSheet, Alert, Pressable } from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProductDetail } from "@/store/interfaces";
import CustomImage from "@/components/Image";
import formatCurrency from "@/functions/formatCurrency";
import useCartStore from "@/store/cartStore";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref, ProductDetail>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "70%"], []);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const addProduct = useCartStore((state) => state.addProduct);

  const handleSizePress = (size: string) => {
    setSelectedSize((prev) => (prev === size ? null : size));
  };

  const handleColorPress = (color: string) => {
    setSelectedColor((prev) => (prev === color ? null : color));
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

  const handleAddToBag = () => {
    if (!selectedSize || !selectedColor) {
      Alert.alert("Please select a size and color");
      return;
    }

    const productPrePare = {
      ...props,
      selectedSize,
      selectedColor,
    };

    addProduct(productPrePare);
  };

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      ref={ref}
      snapPoints={snapPoints}
      index={1}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View className="border-b border-b-[#EEE] p-4 flex-row space-x-2">
          {props.images && props.images[0] && (
            <CustomImage
              source={props.images[0]}
              style={{ width: 100, height: 100, objectFit: "contain" }}
            />
          )}
          <View className="mt-auto flex-1">
            <Text className="font-bold text-lg text-sky-400">
              {formatCurrency(props.price)}
            </Text>
            <Text>Storage: 159</Text>
          </View>
        </View>
        <ScrollView className="p-4">
          {props.sizes && (
            <View>
              <Text>Size</Text>
              <View className="flex-row flex-wrap w-full space-x-3 mt-4">
                {props.sizes.map((size) => (
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
          )}
          {props.colors && (
            <View>
              <Text>Color</Text>
              <View className="flex-row flex-wrap w-full space-x-3 mt-4">
                {props.colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorButton,
                      { backgroundColor: color },
                      selectedColor === color && styles.selectedColorButton,
                    ]}
                    onPress={() => handleColorPress(color)}
                  >
                    {selectedColor === color && (
                      <Text style={styles.selectedButtonText}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity onPress={handleAddToBag} className="p-4 border-t border-t-[#EEE]">
          <View className="w-full bg-sky-400 p-3 rounded-2xl">
            <Text className="text-xl font-bold text-white text-center">
              Add to bag
            </Text>
          </View>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
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
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  selectedColorButton: {
    borderWidth: 2,
    borderColor: "blue",
  },
});

BottomSheet.defaultProps = {
  sizes: [],
  colors: [],
  images: [],
  price: 0,
};

export default BottomSheet;
