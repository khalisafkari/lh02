import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

interface props {
  title: string;
  icon: string;
  onPress(): void;
}

const AccountItem: React.FC<props> = (props) => {
  return (
    <Pressable onPress={props.onPress} style={styles.container}>
      <View style={styles.subContainer}>
        <Icon name={props.icon} size={20} color={'#fff'} />
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

export default AccountItem;
