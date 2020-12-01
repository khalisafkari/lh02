import React from 'react';
import {View} from 'react-native';
import MenuItem from '@components/menuItem';
import styles from './styles';

interface props {
  componentId: string;
}

const Settings: React.FC<props> = (props) => {
  return (
    <View style={styles.container}>
      {/*<MenuItem*/}
      {/*  id={'account'}*/}
      {/*  componentId={props.componentId}*/}
      {/*  title={'ACCOUNT'}*/}
      {/*  icon={'setting'}*/}
      {/*/>*/}
      <MenuItem
        icon={'book'}
        componentId={props.componentId}
        title={'HISTORY'}
        id={'history'}
      />
      <MenuItem
        id={'faq'}
        icon={'infocirlceo'}
        componentId={props.componentId}
        title={'FAQ'}
      />
      <MenuItem
        id={'privacy'}
        icon={'infocirlceo'}
        componentId={props.componentId}
        title={'PRIVACY POLICY'}
      />
    </View>
  );
};

export default Settings;
