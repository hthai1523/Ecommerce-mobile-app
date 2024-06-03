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

  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, 3000);

    return () => clearInterval(timeoutRef.current);
  }, [currentIndex]); 


  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onChange = (nativeEvent: any) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide !== currentIndex) {
        setCurrentIndex(slide);
      }
    }
  };

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
            {slides.map((_, index) => (
              <Text
                key={index}
                style={currentIndex === index ? styles.dotActive : styles.dot}
              >
                &#9679;
              </Text>
            ))}
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
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 3,
    color: "#000",
  },
  dot: {
    margin: 3,
    color: "#a8a8a8",
  },
});

export default Slider;
