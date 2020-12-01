import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, View, Alert} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import AccountItem from 'components/accountItem';
import {withContext} from 'utils/context';
import root from 'utils/navigation/root';
import {useToast} from 'react-native-toast-hybrid';
import Purchases from 'react-native-purchases';
import ProBadge from 'components/proBadge';
import styles from './styles';

interface props {
  componentId: string;
  user: FirebaseAuthTypes.User;
  premium?: boolean;
}

const AccountContent: React.FC<props> = (props) => {
  const isMounted = useRef<boolean>(true);
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const outBackup = useCallback(() => {
    if (!isBuy) {
      toast.loading('wait...');
      const reference = storage().ref(
        `/loveheaven/${props.user.email}/loveheaven.db`,
      );
      reference
        .putFile(utils.FilePath.LIBRARY_DIRECTORY + '/loveheaven.db')
        .then(() => {
          toast.hide();
          toast.done('done', 1000);
        })
        .catch(() => {
          toast.hide();
        });
      toast.hide();
    } else {
      Alert.alert('!!!', 'Required a PRO account');
    }
  }, [isBuy, props.user.email, toast]);

  const onRestore = useCallback(() => {
    if (!isBuy) {
      toast.loading('wait...');
      const reference = storage().ref(
        `/loveheaven/${props.user.email}/loveheaven.db`,
      );
      reference
        .writeToFile(utils.FilePath.LIBRARY_DIRECTORY + '/loveheaven.db')
        .then(() => {
          toast.hide();
          toast.done('restore done', 1000);
        });
      toast.hide();
    } else {
      Alert.alert('!!!', 'Required a PRO account');
    }
  }, [isBuy, props.user.email, toast]);

  const onLogout = useCallback(() => {
    return auth().signOut();
  }, []);

  const onBuy = useCallback(() => {
    const timeout = setTimeout(() => {
      root.push(
        props.componentId,
        'buy',
        {
          topBar: {
            visible: false,
          },
          bottomTabs: {
            visible: false,
          },
        },
        {
          user: props.user,
        },
      );
    }, 100);
    return () => clearTimeout(timeout);
  }, [props.componentId, props.user]);

  const onRestoreBuy = useCallback(() => {
    toast.loading('Wait....');
    Purchases.getPurchaserInfo()
      .then((results) => {
        if (typeof results.entitlements.active.Pro !== 'undefined') {
          toast.hide();
          toast.done('your subscription is restored', 1000);
          setIsBuy(false);
        } else {
          toast.hide();
          toast.info('subscription not available', 1000);
        }
      })
      .catch(() => {
        toast.hide();
      });
  }, [toast]);

  const onCheckBuy = useCallback(() => {
    Purchases.getPurchaserInfo().then((results) => {
      if (typeof results.entitlements.active.Pro !== 'undefined') {
        setIsBuy(false);
      }
    });
  }, []);

  useEffect(onCheckBuy, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <AccountItem onPress={outBackup} title={'Backup'} icon={'upload'} />
        <AccountItem
          onPress={onRestore}
          title={'Restore backup'}
          icon={'download'}
        />
        {isBuy ? (
          <AccountItem
            title={'Buy Pro'}
            icon={'shoppingcart'}
            onPress={onBuy}
          />
        ) : null}
        <AccountItem
          title={'Restore account'}
          icon={'customerservice'}
          onPress={onRestoreBuy}
        />
        <AccountItem title={'Logout'} icon={'logout'} onPress={onLogout} />
      </View>
      <View style={styles.box}>
        <ProBadge />
        <Text style={styles.displayName}>{props.user.displayName}</Text>
      </View>
    </View>
  );
};

export default withContext(AccountContent);
