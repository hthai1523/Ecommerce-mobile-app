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
            className=""
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

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {slides.map((e, index) => (
                <Pressable
                  key={index}
                  onPress={() => goToSlide(index)}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 3,
                    backgroundColor: currentIndex === index ? "#000ff" : "#fff",
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25
  }
})

export default Slider;
