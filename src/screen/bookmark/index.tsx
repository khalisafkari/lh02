import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {sqlite, allItem} from 'utils/database';
import ListBookmark from 'components/ListBookmark';
import styles from './styles';
import {Navigation} from 'react-native-navigation';
import Banner from 'components/banner';

interface props {
  componentId: string;
}

const Bookmark: React.FC<props> = (props) => {
  const [state, setState] = useState<allItem[]>([]);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onFetch = useCallback(() => {
    sqlite.getAll('bookmark').then((resuls) => {
      setState(resuls);
    });
  }, []);

  const onCallBack = useCallback(() => {
    const listener = {
      componentDidAppear: function () {
        onFetch();
      },
    };
    const subscriber = Navigation.events().registerComponentListener(
      listener,
      props.componentId,
    );
    return () => {
      subscriber.remove();
    };
  }, [onFetch, props.componentId]);
  useEffect(onCallBack, []);

  return (
    <View style={styles.container}>
      {state.length > 0 ? (
        <ListBookmark componentId={props.componentId} list={state} />
      ) : (
        <Banner text={'Bookmark'} />
      )}
    </View>
  );
};

export default Bookmark;
