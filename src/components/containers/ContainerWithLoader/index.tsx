import React from 'react';
import {StyleProp, View} from 'react-native';
import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';

import Loader from '@components/other/Loader';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  containerStyle: {},
  loaderContainerStyle: {
    paddingVertical: scaledSize(30),
  },
});

interface IContainerWithLoaderProps {
  loading: boolean;
  children: any;
  containerStyle?: StyleProp<ViewStyle>;
}

const ContainerWithLoader = ({
  children,
  loading = true,
  containerStyle,
}: IContainerWithLoaderProps) => {
  if (loading) {
    return (
      <View style={styles.loaderContainerStyle}>
        <Loader />
      </View>
    );
  }
  return (
    <View style={[styles.containerStyle, containerStyle]}>{children}</View>
  );
};

export default React.memo(ContainerWithLoader);
