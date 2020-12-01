import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {postList} from 'lhscan-extensions';
import ListSearch from '@components/listSearch';
import styles from './styles';
import {Navigation} from 'react-native-navigation';
import Loading from 'components/loading';
import root from 'utils/navigation/root';

interface props {
  componentId: string;
}

interface state extends postList {
  current: number;
}

const List: React.FC<props> = (props) => {
  const isMounted = useRef<boolean>(true);
  const [state, setState] = useState<state>({
    page: 0,
    list: [],
    current: 1,
  });

  root.useSearch(props.componentId, 'advance', {
    topBar: {
      visible: false,
    },
    bottomTabs: {
      visible: false,
    },
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onFetch = useCallback(() => {
    postList({}).then((results) => {
      if (isMounted.current) {
        setState({
          current: 1,
          list: results.list,
          page: results.page,
        });
      }
    });
  }, []);

  useEffect(() => {
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

  const onUpdate = useCallback(() => {
    const {current, page, list} = state;
    if (current < page) {
      postList({page: current + 1}).then((results) => {
        setState({
          current: current + 1,
          page: results.page,
          list: list.concat(results.list),
        });
      });
    }
    ToastAndroid.show('done', ToastAndroid.LONG);
  }, [state]);

  return (
    <View style={styles.container}>
      {state.list.length > 1 ? (
        <ListSearch
          onEndReach={onUpdate}
          componentId={props.componentId}
          list={state.list}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default List;
