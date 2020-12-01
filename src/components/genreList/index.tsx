import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import genre from '@utils/genre';
import styles from './styles';

interface props {
  componentId: string;
  onSelect: (item: genre | null) => void;
}

const GenreList: React.FC<props> = (props) => {
  const [select, setSelect] = useState<genre | null>(null);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onChoise = useCallback(
    (item: genre) => {
      if (select) {
        if (select.id === item.id) {
          setSelect(null);
          props.onSelect(null);
        }
      } else {
        setSelect(item);
        props.onSelect(item);
      }
    },
    [props, select],
  );

  const itemGenre = useCallback(
    (item: genre, index: number) => {
      return (
        <Pressable
          onPress={() => {
            onChoise(item);
          }}
          style={[
            styles.btn,
            select
              ? select.id === item.id
                ? styles.show
                : styles.hide
              : styles.hide,
          ]}
          key={index}>
          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      );
    },
    [onChoise, select],
  );

  return <View style={styles.container}>{genre.map(itemGenre)}</View>;
};

export default GenreList;
