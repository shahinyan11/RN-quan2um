import React from 'react';
import {View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import st from './styles';

type Props = {
  index: number;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
};

const Pagination = ({animValue, index, length}: Props) => {
  const width = 25;
  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  return (
    <View style={[st.item, {width}]}>
      <Animated.View style={[st.activeView, animStyle]} />
    </View>
  );
};

export default Pagination;
