import React, {useCallback} from 'react';
import {Pressable, Text} from 'react-native';
import styles from './styles';
import {chapterAPI} from '@utils/database';
import root from '@utils/navigation/root';
import ads from '@utils/ads';

interface list {
  id: string;
  time: string;
  title: string;
}

interface props {
  componentId: string;
  list: list;
}

const ChapterItem: React.FC<props> = (props) => {
  const {state, onSetValue} = chapterAPI.useChapter(props.list.id);

  const onChangeTitle = useCallback(() => {
    // @ts-ignore
    return 'Chapter ' + props.list.title.match(/\d+/g).toString();
  }, [props.list.title]);

  const onPress = useCallback(() => {
    const timeout = setTimeout(() => {
      root.push(
        props.componentId,
        'reader',
        {
          topBar: {
            visible: false,
          },
          bottomTabs: {
            visible: false,
          },
        },
        {
          id: props.list.id,
          title: props.list.title,
        },
      );
      onSetValue();
      ads.loadInterstitial();
    }, 100);

    return () => clearTimeout(timeout);
  }, [onSetValue, props.componentId, props.list.id, props.list.title]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={state ? styles.titleCheck : styles.title}>
        {onChangeTitle()}
      </Text>
      <Text style={styles.subTitle}>{props.list.time}</Text>
    </Pressable>
  );
};

export default ChapterItem;
