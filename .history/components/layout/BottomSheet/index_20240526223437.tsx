import { View, Text } from "react-native";
import React, { forwardRef, useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", '70%'], []);

  return (
    <BottomSheetModal ref={ref} snapPoints={snapPoints} index={1}>
      <BottomSheetView style={{flex: 1, backgroundColor: 'red'}}>
        <View className="">
          <Text>BottomSheet</Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BottomSheet;
