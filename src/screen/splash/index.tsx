import React, {useCallback, useEffect, useRef} from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import root from '@utils/navigation/root';

interface props {
  componentId: string;
}

const Splash: React.FC<props> = () => {
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onFetchCountry = useCallback(() => {
    const timeout = setTimeout(() => {
      root.tabs();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(onFetchCountry);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
      </View>
    </View>
  );
};

export default Splash;
