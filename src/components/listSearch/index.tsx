import React, {useCallback} from 'react';
import {FlatList, View, Dimensions} from 'react-native';
import {getByListWithImageResult} from 'lhscan-extensions';
import ItemSearch from 'components/itemSearch';

interface props {
  componentId: string;
  list: getByListWithImageResult[];
  onEndReach(): void;
  FooterComponent?(): React.ReactElement | null;
}

const width = Dimensions.get('window').width * 0.3;

const ListSearch: React.FC<props> = (props) => {
  const onRenderContent = useCallback(
    ({item, index}) => {
      return (
        <ItemSearch componentId={props.componentId} item={item} key={index} />
      );
    },
    [props.componentId],
  );

  const keyExtractor = useCallback((item) => {
    return item.id;
  }, []);

  const getLayoutItem = useCallback((_, index) => {
    return {length: width * 1.5, offset: width * 1.5 * index, index};
  }, []);

  return (
    <View>
      <FlatList
        snapToInterval={width * 1.5 + 10}
        getItemLayout={getLayoutItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        data={props.list || []}
        keyExtractor={keyExtractor}
        renderItem={onRenderContent}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.01}
        ListFooterComponent={props.FooterComponent}
      />
    </View>
  );
};

export default ListSearch;
