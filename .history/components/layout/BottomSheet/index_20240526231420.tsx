import { View, Text } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", '70%'], []);

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
    <BottomSheetModal backdropComponent={renderBackdrop} ref={ref} snapPoints={snapPoints} index={1}>
      <BottomSheetView style={{flex: 1}}>
        
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BottomSheet;
