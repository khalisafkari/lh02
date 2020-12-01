import React from 'react';

import {getPosts} from 'lhscan-extensions';
import {ScrollView, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import BookmarkBtn from 'components/bookmarkBtn';

interface props {
  id: string;
  detail: getPosts;
}

const DetailComponent: React.FC<props> = (props) => {
  return (
    <ScrollView>
      <View style={styles.containerImage}>
        <Image source={{uri: props.detail.image}} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'black']}
          style={styles.linear}
        />
      </View>
      <BookmarkBtn
        id={props.id}
        image={props.detail.image}
        title={props.detail.title}
      />
      <View style={styles.containerImage}>
        <Text style={styles.title_jp}>{props.detail.title_jp}</Text>
        <Text style={styles.description}>{props.detail.description}</Text>
      </View>
    </ScrollView>
  );
};

export default DetailComponent;
