import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Cup2 = ({size, color}: any) => (
  <Svg width={size || 22} height={size || 17} viewBox="0 0 22 17" fill="none">
    <Path
      d="M1 1H4.5C5.05228 1 5.5 1.44772 5.5 2V8C5.5 8.55228 5.94772 9 6.5 9H7.5C8.05228 9 8.5 9.44772 8.5 10V15C8.5 15.5523 8.94772 16 9.5 16H11.5C12.0523 16 12.5 15.5523 12.5 15V10C12.5 9.44772 12.9477 9 13.5 9H15C15.5523 9 16 8.55228 16 8V2C16 1.44772 16.4477 1 17 1H21"
      stroke={color || 'white'}
      strokeLinecap="round"
    />
  </Svg>
);

export default Cup2;
