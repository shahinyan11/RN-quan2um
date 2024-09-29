import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ChevronDown = ({size, color}: any) => (
  <Svg width={size || 30} height={size || 30} viewBox="0 0 30 30" fill="none">
    <Path
      d="M15 19.6413L22.5126 12.1288L20.7463 10.36L15 16.11L9.25505 10.36L7.48755 12.1275L15 19.6413Z"
      fill={color || 'white'}
    />
  </Svg>
);

export default ChevronDown;
