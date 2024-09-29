import React, {memo} from 'react';
import {ActivityIndicator} from 'react-native';

const Loader = ({size = 'small'}: {size?: number | 'small' | 'large'}) => (
  <ActivityIndicator size={size} color="#09AAFF" />
);

export default memo(Loader);
