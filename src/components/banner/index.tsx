import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

interface props {
  text: string;
}

const Banner: React.FC<props> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default Banner;
