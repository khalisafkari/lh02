import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';

interface props {
  componentId: string;
}

const BtnChoise: React.FC<props> = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.btn}>
        <LinearGradient style={styles.linear} colors={['transparent', 'black']}>
          <Icon name={'calendar'} size={15} color={'#fff'} />
          <Text style={styles.title}>History</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={styles.btn}>
        <LinearGradient style={styles.linear} colors={['transparent', 'black']}>
          <Icon name={'book'} size={15} color={'#fff'} />
          <Text style={styles.title}>Bookmark</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default BtnChoise;
