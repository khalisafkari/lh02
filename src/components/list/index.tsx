import React, {useCallback} from 'react';
import {View} from 'react-native';
import getHome from 'lhscan-extensions';
import styles from './styles';
import {useList} from '@utils/hook';
import ListItem from 'components/listItem';

interface props {
  componentId: string;
  list: getHome[];
}

const ListComponent: React.FC<props> = (props) => {
  const state = useList(props.list);

  const onItem = useCallback(
    (item, index) => {
      return (
        <ListItem
          key={index}
          componentId={props.componentId}
          index={index}
          item={item}
        />
      );
    },
    [props.componentId],
  );

  return (
    <View style={styles.container}>{state ? state.map(onItem) : null}</View>
  );
};

export default ListComponent;
