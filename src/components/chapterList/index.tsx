import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import ChapterItem from '@components/chapterItem';

interface list {
  id: string;
  time: string;
  title: string;
}

interface props {
  componentId: string;
  list: list[];
}

const ChapterList: React.FC<props> = (props) => {
  const onRenderItem = useCallback(
    ({item, index}) => {
      return (
        <ChapterItem componentId={props.componentId} list={item} key={index} />
      );
    },
    [props.componentId],
  );

  const keyExtractor = useCallback((_, index) => {
    return String(index);
  }, []);

  const getItemLayout = useCallback((_, index) => {
    return {length: 35, offset: 35 * index, index};
  }, []);

  return (
    <View>
      <FlatList
        keyExtractor={keyExtractor}
        data={props.list}
        renderItem={onRenderItem}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ChapterList;
