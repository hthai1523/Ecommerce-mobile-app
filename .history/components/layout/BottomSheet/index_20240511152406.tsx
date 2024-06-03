import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const BottomSheet = () => {
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);

  return (
    <BottomSheetModal snapPoints={snapPoints}>
      <View>
        <Text>BottomSheet</Text>
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheet;
