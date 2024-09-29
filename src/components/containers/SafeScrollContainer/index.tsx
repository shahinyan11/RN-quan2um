import React, {memo, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
} from 'react-native';
import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';

import SafeContainer from '../SafeContainer';
import Loader from '@components/other/Loader';

const styles = EStyleSheet.create({
  containerScrollStyle: {
    flexGrow: 1,
  },
  sfContainerStyle: {
    flex: 1,
    backgroundColor: '$darkBackground',
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

interface ISafeScrollContainerProps extends ScrollViewProps {
  children: any;
  containerStyle?: StyleProp<ViewStyle>;
  safeContainerStyle?: StyleProp<ViewStyle>;
  safeContentContainerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  scrollRef?: useRef<HTMLElement | null>;
}

const SafeScrollContainer = ({
  children,
  containerStyle,
  safeContainerStyle,
  safeContentContainerStyle,
  loading,
  scrollRef,
  ...props
}: ISafeScrollContainerProps) => {
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
    <SafeContainer
      sfContainerStyle={safeContainerStyle}
      containerStyle={safeContentContainerStyle}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.containerScrollStyle, containerStyle]}
        {...props}>
        {children}
      </ScrollView>
    </SafeContainer>
  );
};

export default memo(SafeScrollContainer);
