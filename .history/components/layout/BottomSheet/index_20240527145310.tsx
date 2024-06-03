import { View, Text, Image, ScrollView, StyleSheet, Alert, Pressable } from "react-native";
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
import useCartStore from "@/store/cartStore";

export type Ref = BottomSheetModal;

interface BottomSheetProps extends Product {
  closeBottomSheet: () => void
}

const BottomSheet = forwardRef<Ref, BottomSheetProps>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "70%"], []);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addProduct = useCartStore((state) => state.addProduct);
  const sizes = ["M", "L", "XL"];
  const handleSizePress = (size: string) => {
    setSelectedSize((prev) => (prev === size ? null : size));
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
    if (!selectedSize) {
      Alert.alert("Please select a size");
      return;
    }

    const productWithSize = {
      ...props,
      size: selectedSize,
    };

    addProduct(productWithSize);
    ref
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
            <View className="flex-row flex-wrap w-full space-x-3 mt-4">
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
        <TouchableOpacity onPress={handleAddToBag} className="p-4 border-t border-t-[#EEE]">
          <View  className="w-full bg-sky-400 p-3 rounded-2xl">
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
