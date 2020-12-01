import React, {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import getHome from 'lhscan-extensions';
import Image from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import numeral from 'numeral';
import styles from './styles';
import root from '@utils/navigation/root';

interface props {
  componentId: string;
  index: number;
  item: getHome;
}

const ListItem: React.FC<props> = (props) => {
  const onPress = useCallback(() => {
    const timeout = setTimeout(() => {
      root.push(
        props.componentId,
        'posts',
        {
          topBar: {
            title: {
              text: props.item.title,
            },
            rightButtons: [
              {
                id: 'info-content',
                icon: Icon.getImageSourceSync('infocirlceo', 20),
              },
            ],
          },
          bottomTabs: {
            visible: false,
          },
        },
        props.item,
      );
    }, 100);
    return () => clearTimeout(timeout);
  }, [props.componentId, props.item]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: props.item.image,
          headers: {referer: 'https://loveheaven.net'},
        }}
        style={styles.image}
      />
      <LinearGradient colors={['transparent', 'black']} style={styles.linear} />
      <View style={styles.subContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {props.item.title}
        </Text>
        <Text style={styles.chapter} numberOfLines={1}>
          <Icon name={'menuunfold'} color={'#fff'} size={10} />
          {props.item.chapter_title}
        </Text>
        <Text style={styles.time} numberOfLines={1}>
          <Icon name={'clockcircle'} color={'#fff'} size={10} />
          {props.item.time}
        </Text>
        <Text style={styles.view} numberOfLines={1}>
          <Icon name={'eyeo'} color={'#fff'} size={10} />
          {numeral(props.item.view).format('0.0a')}
        </Text>
      </View>
    </Pressable>
  );
};

export default ListItem;
