import React from 'react';
import {View} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

type Props = {
  children: any;
  borderRadius?: number;
};

const GradientBorder = ({children, borderRadius = 0}: Props) => {
  return (
    <View style={{flex: 1, overflow: 'hidden', borderRadius: borderRadius}}>
      <Svg style={{position: 'absolute'}} height="100%" width="100%">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="100%">
            <Stop offset="0" stopColor="#1AD68B" />
            <Stop offset="1" stopColor="#017DD3" />
          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          strokeWidth="1"
          stroke="url(#grad)"
          rx={borderRadius}
        />
      </Svg>
      <View style={{margin: 1}}>{children}</View>
    </View>
  );
};

export default GradientBorder;
