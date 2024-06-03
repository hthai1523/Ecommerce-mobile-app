import { View, Text } from "react-native";
import React, { forwardRef, useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "70%"], []);

  return (
    <BottomSheetModal snapPoints={snapPoints}>
      <View className="bg-red-400">
        <Text>BottomSheet</Text>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;
