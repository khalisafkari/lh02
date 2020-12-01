import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from './styles';
import privacy from '@utils/html/privacy';

const PrivacyPolicy: React.FC = () => {
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <WebView source={{html: privacy()}} />
    </View>
  );
};

export default PrivacyPolicy;
