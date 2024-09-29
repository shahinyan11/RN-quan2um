import SafeContainer from '@components/containers/SafeContainer';
import React, {memo} from 'react';

import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    flexGrow: 1,
  },
  scrollContainerStyle: {
    flexGrow: 1,
    //paddingBottom: 20,
  },
  fullScreen: {
    flex: 1,
  },
});

interface IKeyboardListenerProps {
  children: any;
  keyboardOffset?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const KeyboardListener = ({
  children,
  keyboardOffset = 100,
  containerStyle,
}: IKeyboardListenerProps) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? keyboardOffset : 0}
    style={styles.fullScreen}>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.scrollContainerStyle, containerStyle]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  </KeyboardAvoidingView>
);

export default memo(KeyboardListener);
