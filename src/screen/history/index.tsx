import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {allItem, sqlite} from 'utils/database';
import ListBookmark from 'components/ListBookmark';

interface props {
  componentId: string;
}

const Histroy: React.FC<props> = (props) => {
  const [state, setState] = useState<allItem[]>([]);

  const onCallBack = useCallback(() => {
    sqlite.getAll('history').then((results) => {
      setState(results);
    });
  }, []);

  useEffect(onCallBack, []);

  return (
    <View style={styles.container}>
      <ListBookmark list={state} componentId={props.componentId} />
    </View>
  );
};

export default Histroy;
