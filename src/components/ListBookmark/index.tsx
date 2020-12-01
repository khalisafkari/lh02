import React, {useCallback} from 'react';
import {allItem} from 'utils/database';
import {FlatList, View} from 'react-native';
import ItemBH from 'components/ItemBH';

interface props {
  list: allItem[];
  componentId: string;
}

const ListBookmark: React.FC<props> = (props) => {
  const onRenderItem = useCallback(
    ({item}) => {
      return <ItemBH componentId={props.componentId} item={item} />;
    },
    [props.componentId],
  );

  return (
    <View>
      <FlatList numColumns={3} data={props.list} renderItem={onRenderItem} />
    </View>
  );
};

export default ListBookmark;
