import React, {useCallback} from 'react';
import {Animated, Text, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {Navigation} from 'react-native-navigation';

interface props {
  scrollY: Animated.Value;
  componentId: string;
  isTitle: string;
  isSubtitle: string | '';
}

const HeaderRender: React.FC<props> = (props) => {
  const translateY = props.scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -56],
  });

  const onBack = useCallback(() => {
    const timeout = setTimeout(() => {
      Navigation.pop(props.componentId);
    }, 100);
    return () => clearTimeout(timeout);
  }, [props.componentId]);

  const isTitle = useCallback(() => {
    if (props.isSubtitle != null) {
      // @ts-ignore
      return 'Chapter  ' + props.isSubtitle.match(/\d+/g).toString();
    }
  }, [props.isSubtitle]);

  const title = useCallback(() => {
    return props.isTitle
      .replace(/-/g, ' ')
      .replace(/(raw|chapter)/gi, '')
      .replace(/\d+(.)*(.html)/g, '');
  }, [props.isTitle]);

  return (
    <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
      <Pressable style={styles.header} onPress={onBack}>
        <Icon name={'arrowleft'} size={20} color={'white'} />
      </Pressable>
      <View style={styles.child}>
        <Text numberOfLines={1} style={styles.title}>
          {title()}
        </Text>
        <Text style={styles.subtitle}>{isTitle()}</Text>
      </View>
    </Animated.View>
  );
};

export default HeaderRender;
