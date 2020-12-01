import React, {useCallback} from 'react';
import {SectionList, View} from 'react-native';
import SlideHome from '@components/slide';
import homeFetch from 'lhscan-extensions';
import {useAsync} from '@utils/hook';
import Loading from '@components/loading';
import styles from './styles';
import ListComponent from 'components/list';

interface props {
  componentId: string;
}

const Home: React.FC<props> = (props) => {
  const value = useAsync(homeFetch());

  const sections = [
    {
      data: [<SlideHome slide={value} componentId={props.componentId} />],
    },
    {
      data: [<ListComponent list={value} componentId={props.componentId} />],
    },
  ];

  const keyExtractor = useCallback((_, index) => {
    return String(index);
  }, []);

  return (
    <View style={styles.container}>
      {value ? (
        <SectionList
          keyExtractor={keyExtractor}
          sections={sections}
          renderItem={({item}) => <View>{item}</View>}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Home;
