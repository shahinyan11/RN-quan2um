import {IconProps} from '@components/icons/Icon/types';
import Svg, {Circle, Defs, LinearGradient, Path, Stop} from 'react-native-svg';
import React from 'react';

const FacebookGradient = ({size, color}: IconProps) => (
  <Svg width={size || 60} height={size || 60} viewBox="0 0 60 60" fill="none">
    <Circle cx="30" cy="30" r="30" fill="#2C2A42" />
    <Path
      d="M33.0369 31.5037H39.8609L40.9328 24.8874H33.0369V21.2709C33.0369 18.5227 33.9782 16.0853 36.6717 16.0853H41V10.3121C40.2393 10.2139 38.6308 10 35.592 10C29.2452 10 25.5247 13.1987 25.5247 20.487V24.8886H19V31.505H25.5234V49.6904C26.8154 49.8742 28.1246 50 29.468 50C30.6823 50 31.8675 49.8943 33.0369 49.7433V31.5037Z"
      fill="url(#paint0_linear_1196_244)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1196_244"
        x1="19"
        y1="10"
        x2="41"
        y2="50"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#01E98D" />
        <Stop offset="1" stopColor="#018CE9" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default FacebookGradient;
