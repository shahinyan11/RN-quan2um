import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const Checked = ({size, color, signColor}: any) => (
  <Svg width={size || 12} height={size || 12} viewBox="0 0 12 12" fill="none">
    <Circle cx="6" cy="6" r="6" fill={color || '#ACE42C'} />
    <Path d="M3 6.5L5 8.5L8.5 3" stroke={signColor || '#0C0C0C'} />
  </Svg>
);

export default Checked;
