import React from 'react';
import Svg, {Line} from 'react-native-svg';

const Cup1 = ({size, color}: any) => (
  <Svg width={size || 18} height={size || 14} viewBox="0 0 18 14" fill="none">
    <Line
      x1="17.5"
      y1="0.5"
      x2="14.5"
      y2="0.5"
      stroke={color || 'white'}
      strokeLinecap="round"
    />
    <Line
      x1="17.5"
      y1="3.5"
      x2="12.5"
      y2="3.5"
      stroke={color || 'white'}
      strokeLinecap="round"
    />
    <Line
      x1="17.5"
      y1="6.5"
      x2="10.5"
      y2="6.5"
      stroke={color || 'white'}
      strokeLinecap="round"
    />
    <Line
      x1="0.5"
      y1="13.5"
      x2="3.5"
      y2="13.5"
      stroke={color || 'white'}
      strokeLinecap="round"
    />
    <Line
      x1="0.5"
      y1="10.5"
      x2="5.5"
      y2="10.5"
      stroke={color || 'white'}
      strokeLinecap="round"
    />
    <Line
      x1="0.5"
      y1="7.5"
      x2="7.5"
      y2="7.5"
      stroke={color || 'white'}
      strokeLinecap="round"
    />
  </Svg>
);

export default Cup1;
