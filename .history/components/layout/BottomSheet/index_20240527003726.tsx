import { View, Text, Image } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
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
        <BottomSheetScrollView style={{borderBottomWidth: 1, borderBottomColor: '#EEE'}}>
          <View>
            <Text>halkfak</Text>
          </View>
        </BottomSheetScrollView>
        <TouchableOpacity></TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BottomSheet;