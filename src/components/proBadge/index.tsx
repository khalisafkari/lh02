import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import Purchases from 'react-native-purchases';
import styles from './styles';

const ProBadge: React.FC = () => {
  const isMounted = useRef<boolean>(true);
  const [status, setStatus] = useState<boolean>(false);
  const [expiredDate, setExpiredDate] = useState<any | null>(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onFetchBagde = useCallback(() => {
    Purchases.getPurchaserInfo().then((results) => {
      if (
        isMounted.current &&
        typeof results.entitlements.active.Pro !== 'undefined'
      ) {
        setStatus(results.entitlements.active.Pro.isActive);
        setExpiredDate(results.entitlements.active.Pro.expirationDate);
      }
    });
  }, []);

  useEffect(onFetchBagde, []);

  return (
    <View style={styles.line}>
      <View style={[styles.container, styles.red]}>
        <Text style={styles.title}>{status ? 'PRO' : 'FREE'}</Text>
      </View>
      {expiredDate ? (
        <Text style={styles.date}>{new Date(expiredDate).toDateString()}</Text>
      ) : null}
    </View>
  );
};

export default ProBadge;
