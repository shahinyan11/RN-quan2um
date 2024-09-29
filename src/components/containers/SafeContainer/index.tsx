import React from 'react';
import {SafeAreaView, StyleProp, View, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Loader from '@components/other/Loader';

interface ISafeContainerProps {
  children: any;
  loading?: boolean;
  sfContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const styles = EStyleSheet.create({
  sfContainerStyle: {
    flex: 1,
    backgroundColor: '$blackBackground',
  },
  containerStyle: {
    flex: 1,
  },
  loaderContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SafeContainer = ({
  children,
  loading = false,
  sfContainerStyle,
  containerStyle,
}: ISafeContainerProps) => {
  if (loading) {
    return (
      <SafeAreaView style={styles.sfContainerStyle}>
        <View style={styles.loaderContainerStyle}>
          <Loader />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.sfContainerStyle, sfContainerStyle]}>
      <View style={[styles.containerStyle, containerStyle]}>{children}</View>
    </SafeAreaView>
  );
};

export default React.memo(SafeContainer);
