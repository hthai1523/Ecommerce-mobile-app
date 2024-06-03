import images from '@/assets/images';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const slides = [
  {
    url: images.slide1,
  },
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
  return (
    <Swiper style={styles.wrapper} loop={false}>
      {slides.map((slide, index) => (
        <View key={index} style={styles.slide}>
          <Image source={slide.url} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Slider;
