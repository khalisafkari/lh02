import React from 'react';
import {View} from 'react-native';
import {useAsync} from 'utils/hook';
import {getPosts} from 'lhscan-extensions';
import styles from './styles';
import Loading from 'components/loading';
import DetailComponent from '@components/detailItem';

interface props {
  id: string;
}

const Detail: React.FC<props> = (props) => {
  const value = useAsync(getPosts(`https://loveheaven.net/${props.id}`));

  return (
    <View style={styles.container}>
      {value ? <DetailComponent id={props.id} detail={value} /> : <Loading />}
    </View>
  );
};

export default Detail;
