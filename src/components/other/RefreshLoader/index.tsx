import React from 'react';

import {RefreshControl as RControl} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface RefreshControlProps {
  refreshing: boolean;
  onRefresh?: () => void;
}

const RefreshLoader = (props: RefreshControlProps) => {
  const {refreshing, onRefresh} = props;
  const primaryColor = EStyleSheet.value('$primaryMain');

  const primaryColors = [primaryColor, primaryColor];
  return (
    <RControl
      {...props}
      refreshing={refreshing}
      colors={primaryColors}
      tintColor={primaryColor}
      onRefresh={onRefresh}
    />
  );
};

export default RefreshLoader;
