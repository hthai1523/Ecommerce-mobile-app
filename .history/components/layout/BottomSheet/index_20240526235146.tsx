import { View, Text } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Product } from "@/store/interfaces";
import CustomImage from "@/components/Image";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref, Product>((props, ref) => {
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
        <View>
          <CustomImage source={props.image} style={{width: 100}} />
        </View>
        <BottomSheetScrollView>
         <View>

         </View>
        </BottomSheetScrollView>
        <TouchableOpacity>
            
            </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BottomSheet;
