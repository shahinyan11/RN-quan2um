import React, {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';

import styles from './styles';

interface ISwitchProps {
  active: boolean;
  onPress: () => void;
}

const Switch = ({active, onPress}: ISwitchProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[styles.containerStyle, active && styles.activeContainerStyle]}>
        <View style={styles.centerViewStyle} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(Switch);
