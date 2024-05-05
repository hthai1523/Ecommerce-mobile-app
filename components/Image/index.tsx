import React, { useState } from 'react';
import { Image } from 'react-native';
import images from '@/assets/images';

const CustomImage = ({ source, className = '',style={} ,fallback: customFallback = images.noImage, ...props }:any) => {
  const [imageSource, setImageSource] = useState(source);
  const [fallback, setFallback] = useState(customFallback);

  const handleError = () => {
    setFallback(customFallback);
  };

  const imageProps = {
    source: imageSource || fallback,
    className: className,
    style: style,
    onError: handleError,
    ...props,
  };

  // Kiểm tra nếu `source` là một chuỗi thì giả định nó là một link ảnh
  if (typeof source === 'string') {
    imageProps.source = { uri: source };
  }

  return <Image {...imageProps}/>;
};

export default CustomImage;