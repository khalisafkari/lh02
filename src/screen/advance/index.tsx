import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Pressable as P, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import InputSearch from '@components/inputSearch';
import GenreList from 'components/genreList';
import genre from 'utils/genre';
import root from 'utils/navigation/root';

interface props {
  componentId: string;
}

const Pressable = Animated.createAnimatedComponent(P);

const Advance: React.FC<props> = (props) => {
  const [search, setSearch] = useState<string>('');
  const [genreSelect, setGenreSelect] = useState<genre | null>(null);
  const identify = useRef<Animated.Value>(new Animated.Value(0)).current;
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const showBtn = useCallback((): void => {
    Animated.timing(identify, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
    }).start();
  }, [identify]);

  const hideBtn = useCallback((): void => {
    Animated.timing(identify, {
      useNativeDriver: true,
      toValue: 0,
      duration: 500,
    }).start();
  }, [identify]);

  const onSearch = useCallback(
    (text: string) => {
      if (text.length !== 0 && text.length > 2) {
        showBtn();
      } else {
        hideBtn();
      }
      setSearch(text);
    },
    [hideBtn, showBtn],
  );

  const onSelectGenre = useCallback(
    (item: genre | null) => {
      if (item !== null) {
        setGenreSelect(item);
        showBtn();
      } else {
        setGenreSelect(null);
        hideBtn();
      }
    },
    [hideBtn, showBtn],
  );

  const onSearchLauch = useCallback(() => {
    const timeout = setTimeout(() => {
      if (search.length > 0 && genreSelect !== null) {
        root.push(
          props.componentId,
          'search',
          {
            topBar: {
              title: {
                text: search,
              },
              subtitle: {
                text: genreSelect.title,
              },
            },
            bottomTabs: {
              visible: false,
            },
          },
          {
            search: search,
            genre: genreSelect.id,
          },
        );
      } else if (search.length > 0) {
        root.push(
          props.componentId,
          'search',
          {
            topBar: {
              title: {
                text: search,
              },
            },
            bottomTabs: {
              visible: false,
            },
          },
          {
            search: search,
            genre: null,
          },
        );
      } else if (genreSelect !== null) {
        root.push(
          props.componentId,
          'search',
          {
            topBar: {
              title: {
                text: genreSelect.title,
              },
            },
            bottomTabs: {
              visible: false,
            },
          },
          {
            search: null,
            genre: genreSelect.id,
          },
        );
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [genreSelect, props.componentId, search]);

  const translateY = identify.interpolate({
    inputRange: [0, 1],
    outputRange: [56, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <InputSearch
          componentId={props.componentId}
          textInput={{
            onChangeText: onSearch,
          }}
        />
        <GenreList onSelect={onSelectGenre} componentId={props.componentId} />
      </View>
      <Pressable
        onPress={onSearchLauch}
        style={[styles.btn, {transform: [{translateY}]}]}>
        <Text style={styles.btnTitle}>Search</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Advance;
