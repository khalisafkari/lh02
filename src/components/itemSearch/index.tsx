import React, {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import {getByListWithImageResult} from 'lhscan-extensions';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import numeral from 'numeral';
import root from 'utils/navigation/root';

interface props {
  componentId: string;
  item: getByListWithImageResult;
}

const ItemSearch: React.FC<props> = (props) => {
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
          headers: {Referer: 'https://loveheaven.net/'},
        }}
        style={styles.image}
      />
      <LinearGradient colors={['transparent', 'black']} style={styles.linear} />
      <View style={styles.subContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {props.item.title}
        </Text>
        <Text style={styles.view} numberOfLines={1}>
          <Icon name={'eyeo'} color={'#fff'} size={10} />
          {numeral(props.item.view).format('0.0a')}
        </Text>
      </View>
    </Pressable>
  );
};

export default ItemSearch;
