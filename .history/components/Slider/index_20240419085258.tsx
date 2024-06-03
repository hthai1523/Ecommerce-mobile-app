import { View, Text, ImageBackground, Image, Pressable, SafeAreaView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import image from '@/assets/images';
import { Entypo } from '@expo/vector-icons';

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

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<any>();
  
    useEffect(() => {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 4000);
  
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }, [currentIndex]);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const goToSlide = (index: number) => {
      setCurrentIndex(index);
    };
  
    return (
      <>
        <View className="min-w-[315] w-full h-[150] overflow-hidden px-7">
            <Image
              source={slides[currentIndex].url}
              className="w-full h-full rounded-2xl bg-center object-contain duration-500"
            />
          <View className="absolute bottom-1 right-0 left-0">
            <View className="flex-row justify-center items-center gap-2">
              {slides.map((slide, index) => (
                <Pressable key={index} onPress={() => goToSlide(index)}>
                  <Entypo
                    name="dot-single"
                    size={index === currentIndex ? 30 : 20}
                    color={`${index === currentIndex ? "#000" : "#a8a8a8"}`}
                    className=""
                  />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </>
    );
  };
  
  export default Slider;
