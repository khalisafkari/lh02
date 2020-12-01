import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={25} color={'#fff'} />
    </View>
  );
};

export default Loading;
