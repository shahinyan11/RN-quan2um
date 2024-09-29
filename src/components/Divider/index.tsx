import React, {memo} from 'react';

import {StyleProp, View, ViewStyle} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    height: 1,
    backgroundColor: '$white10',
    marginVertical: 6,
  },
});

const Divider = ({containerStyle}: {containerStyle?: StyleProp<ViewStyle>}) => (
  <View style={[styles.containerStyle, containerStyle]} />
);

export default memo(Divider);
