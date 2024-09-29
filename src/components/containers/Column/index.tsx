import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});

const Column = ({
  children,
  containerStyle,
}: {
  children: any;
  containerStyle?: StyleProp<ViewStyle>;
}) => <View style={[styles.containerStyle, containerStyle]}>{children}</View>;

export default Column;
