import React, {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useAccount} from 'utils/hook';
import AccountContent from '@components/accountContent';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import styles from './styles';
import root from 'utils/navigation/root';

interface props {
  componentId: string;
}

const Account: React.FC<props> = (props) => {
  const {initializing, user, gLogin} = useAccount();

  const onPrivacy = useCallback(() => {
    const timeout = setTimeout(() => {
      root.push(props.componentId, 'privacy', {
        bottomTabs: {
          visible: false,
        },
        topBar: {
          title: {
            text: 'Privacy Policy',
          },
        },
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [props.componentId]);

  if (initializing) {
    return null;
  }

  return (
    <View style={styles.container}>
      {user ? (
        <AccountContent componentId={props.componentId} user={user} />
      ) : (
        <View style={styles.siginContainer}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            onPress={gLogin}
          />
          <Pressable style={styles.btn} onPress={onPrivacy}>
            <Text style={styles.privay}>Privacy Policy</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Account;
