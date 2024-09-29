import React, {memo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import styles from './styles';

interface IRowProps {
  children: any;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center';

  containerStyle?: StyleProp<ViewStyle>;
}

const Row = ({
  children,
  justifyContent,
  alignItems = 'center',
  containerStyle,
}: IRowProps) => (
  <View
    style={[
      styles.containerStyle,
      {justifyContent, alignItems},
      containerStyle,
    ]}>
    {children}
  </View>
);

export default memo(Row);
