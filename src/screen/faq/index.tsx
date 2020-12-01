import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from './styles';
import faqjs from '@utils/html/faqjs';

const Faq: React.FC = () => {
  return (
    <View style={styles.container}>
      <WebView source={{html: faqjs()}} />
    </View>
  );
};

export default Faq;
