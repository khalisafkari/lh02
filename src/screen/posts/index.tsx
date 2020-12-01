import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {getPosts} from 'lhscan-extensions';
import {useAsync} from '@utils/hook';
import ChapterList from '@components/chapterList';
import Loading from '@components/loading';
import styles from './styles';
import {sqlite} from 'utils/database';
import root from 'utils/navigation/root';

interface props {
  id: string;
  title: string;
  image: string;
  componentId: string;
}

const Posts: React.FC<props> = (props) => {
  const value = useAsync(getPosts(`https://loveheaven.net/${props.id}`));

  const onHistroyAdd = useCallback(() => {
    return () => {
      sqlite.push('history', {
        id: props.id,
        title: props.title,
        image: props.image,
      });
    };
  }, [props.id, props.image, props.title]);
  useEffect(onHistroyAdd, []);
  root.useDetail(props);

  return (
    <View style={styles.container}>
      {value ? (
        <ChapterList componentId={props.componentId} list={value.list} />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Posts;
