import React, {ReactNode, useRef} from 'react';
import {PanResponder, StyleProp, View, ViewStyle} from 'react-native';

import st from './styles';

export type Props = {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
};

const ModalWrapper = ({
  children,
  containerStyle,
  indicatorStyle,
  contentStyle,
}: Props) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // onStartShouldSetPanResponderCapture: () => true,
      // onMoveShouldSetPanResponderCapture: () => true,
      // onMoveShouldSetPanResponder: () => true,
      // onPanResponderTerminate: () => false,
      // onPanResponderGrant: () => false,
      // onPanResponderMove: () => false,
    }),
  ).current;

  return (
    <View style={[st.container, containerStyle]}>
      <View style={[st.indicator, indicatorStyle]} />

      <View {...panResponder.panHandlers} style={[st.content, contentStyle]}>
        {children}
      </View>
    </View>
  );
};

export default ModalWrapper;
