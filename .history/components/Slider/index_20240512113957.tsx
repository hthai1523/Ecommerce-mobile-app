import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import image from "@/assets/images";
import { Entypo } from "@expo/vector-icons";

const slides = [
  {
    url: image.slide2,
  },
  {
    url: image.slide3,
  },
  {
    url: image.slide4,
  },
  {
    url: image.slide5,
  },
];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<any>();

  // useEffect(() => {
  //   timeoutRef.current = setTimeout(() => {
  //     nextSlide();
  //   }, 4000);

  //   return () => {
  //     clearTimeout(timeoutRef.current);
  //   };
  // }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onChange = (nativeEvent : any) => {};

  return (
    <>
      <SafeAreaView className="min-w-[315] w-full h-[150] overflow-hidden mt-4 px-2">
        <View>
          <ScrollView
            onScroll={({ nativeEvent }) => onChange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            className=""
          >
              {
                slides.map((e, index) => {
                  
                })
              }
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Slider;
