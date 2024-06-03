import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
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

  const onChange = (nativeEvent: any) => {};

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <ScrollView
            onScroll={({ nativeEvent }) => onChange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
          >
            {slides.map((e, index) => (
              <Image
                key={index}
                resizeMethod="stretch"
                style={styles.wrap}
                source={e.url}
              />
            ))}
          </ScrollView>

          <View style={styles.wrapDot}>
            {
              slides.map((_, index) => (
                <Text key={index} style={currentIndex === index ? styles.dotActive : styles.dot}></Text>
              )) 
            }
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  wrapDot: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default Slider;
