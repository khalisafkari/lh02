import React, {useCallback, useRef} from 'react';
import {Animated, View} from 'react-native';
import getHome from 'lhscan-extensions';
import styles, {SIZE_WIDTH} from './styles';
import {useTop} from 'utils/hook';
import SlideItem from '@components/slideItem';

interface props {
  componentId: string;
  slide: getHome[];
}

const SlideHome: React.FC<props> = (props) => {
  const state = useTop(props.slide);
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;

  const onRenderItem = useCallback(
    ({item, index}) => {
      return (
        <SlideItem
          componentId={props.componentId}
          index={index}
          scrollX={scrollX}
          item={item}
          key={index}
        />
      );
    },
    [props.componentId, scrollX],
  );

  const keyExtractor = useCallback((_, index) => {
    return String(index);
  }, []);

  return (
    <View>
      {state ? (
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={state}
          renderItem={onRenderItem}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          snapToInterval={SIZE_WIDTH + 10.6}
          contentContainerStyle={styles.containerFlat}
          keyExtractor={keyExtractor}
        />
      ) : null}
    </View>
  );
};

export default SlideHome;
