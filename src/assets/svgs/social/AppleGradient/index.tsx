import {IconProps} from '@components/icons/Icon/types';
import Svg, {Circle, Defs, LinearGradient, Path, Stop} from 'react-native-svg';
import React from 'react';

const AppleGradient = ({size, color}: IconProps) => (
  <Svg width={size || 60} height={size || 60} viewBox="0 0 60 60" fill="none">
    <Circle cx="30" cy="30" r="30" fill="#2C2A42" />
    <Path
      d="M37.2885 9.99988C37.3827 9.99988 37.4769 9.99988 37.5764 9.99988C37.8075 12.8208 36.7179 14.9286 35.3937 16.4549C34.0944 17.9708 32.3152 19.441 29.4375 19.2179C29.2456 16.4374 30.3369 14.4859 31.6593 12.9631C32.8858 11.5438 35.1342 10.2809 37.2885 9.99988Z"
      fill="url(#paint0_linear_1196_232)"
    />
    <Path
      d="M46 39.3608C46 39.3889 46 39.4135 46 39.4398C45.1913 41.8602 44.0377 43.9347 42.63 45.8598C41.3449 47.6075 39.7701 49.9594 36.9582 49.9594C34.5284 49.9594 32.9145 48.4154 30.4243 48.3733C27.7901 48.3311 26.3415 49.6643 23.9331 49.9998C23.6575 49.9998 23.382 49.9998 23.1119 49.9998C21.3433 49.7469 19.916 48.3627 18.8762 47.1156C15.8101 43.4305 13.4408 38.6705 13 32.579C13 31.9818 13 31.3863 13 30.7891C13.1866 26.4296 15.3302 22.885 18.1795 21.1671C19.6832 20.2538 21.7503 19.4756 24.0521 19.8234C25.0386 19.9745 26.0464 20.3082 26.9298 20.6384C27.767 20.9564 28.8139 21.5202 29.8057 21.4903C30.4776 21.471 31.1459 21.125 31.8231 20.8808C33.8067 20.173 35.7513 19.3615 38.3143 19.7426C41.3946 20.2028 43.5809 21.5553 44.9318 23.642C42.326 25.2808 40.266 27.7504 40.6179 31.9677C40.9307 35.7986 43.1845 38.0399 46 39.3608Z"
      fill="url(#paint1_linear_1196_232)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1196_232"
        x1="29.4155"
        y1="10.2309"
        x2="36.7956"
        y2="19.9915"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#01E88E" />
        <Stop offset="1" stopColor="#018BEA" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1196_232"
        x1="13"
        y1="20.404"
        x2="35.5128"
        y2="56.9165"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#01E88E" />
        <Stop offset="1" stopColor="#018BEA" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default AppleGradient;
