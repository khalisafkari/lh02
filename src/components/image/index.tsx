import React from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';

const Image: React.FC<FastImageProps> = (props) => {
  return <FastImage {...props} />;
};

export const headers = {
  Referer: 'https://loveheaven.net/',
};

export default Image;
