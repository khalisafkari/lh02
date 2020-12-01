import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {postList} from 'lhscan-extensions';
import ListSearch from '@components/listSearch';
import Loading from 'components/loading';
import styles from './styles';

interface props {
  componentId: string;
  search: string | null;
  genre: string | null;
}

interface state extends postList {
  current: number;
}

const Search: React.FC<props> = (props) => {
  console.log(props);
  const isMounted = useRef<boolean>(true);
  const [state, setState] = useState<state>({
    page: 0,
    list: [],
    current: 1,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onFetch = useCallback(() => {
    postList({
      search: props.search ? props.search : '',
      genre: props.genre ? props.genre : '',
    }).then((results) => {
      if (isMounted.current) {
        setState({
          current: 1,
          list: results.list,
          page: results.page,
        });
      }
    });
  }, [props.genre, props.search]);

  useEffect(onFetch, []);

  const onUpdate = useCallback(() => {
    const {current, page, list} = state;
    if (current < page) {
      postList({
        search: props.search ? props.search : '',
        genre: props.genre ? props.genre : '',
        page: current + 1,
      }).then((results) => {
        setState({
          current: current + 1,
          page: results.page,
          list: list.concat(results.list),
        });
      });
    }
    ToastAndroid.show('done', ToastAndroid.LONG);
  }, [props.genre, props.search, state]);

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

export default Search;
