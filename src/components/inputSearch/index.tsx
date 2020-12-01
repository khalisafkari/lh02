import React, {useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  Pressable as P,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {Navigation} from 'react-native-navigation';

const Pressable = Animated.createAnimatedComponent(P);

interface props {
  componentId: string;
  textInput: TextInputProps;
}

const InputSearch: React.FC<props> = (props) => {
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const hide = useCallback(() => {
    Navigation.pop(props.componentId);
  }, [props.componentId]);

  return (
    <View style={styles.container}>
      <Pressable onPress={hide} style={styles.btnClose}>
        <Icon name={'closecircleo'} size={25} color={'#333'} />
      </Pressable>
      <TextInput
        {...props.textInput}
        style={styles.inputContainer}
        placeholder={'search...'}
      />
    </View>
  );
};

export default InputSearch;
