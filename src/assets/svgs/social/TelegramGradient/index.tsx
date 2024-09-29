import {IconProps} from '@components/icons/Icon/types';
import Svg, {Circle, Defs, LinearGradient, Path, Stop} from 'react-native-svg';
import React from 'react';

const TelegramGradient = ({size, color}: IconProps) => (
  <Svg width={size || 60} height={size || 60} viewBox="0 0 60 60" fill="none">
    <Circle cx="30" cy="30" r="30" fill="#2C2A42" />
    <Path
      d="M47.9167 14.6667L41.6733 46.5433C41.6733 46.5433 41.405 48 39.5983 48C38.6383 48 38.1433 47.5433 38.1433 47.5433L24.62 36.3217L18.0033 32.9867L9.51167 30.7283C9.51167 30.7283 8 30.2917 8 29.0417C8 28 9.555 27.5033 9.555 27.5033L45.0817 13.39C45.0817 13.39 46.1667 12.9983 46.9583 13C47.445 13 48 13.2083 48 13.8333C48 14.25 47.9167 14.6667 47.9167 14.6667Z"
      fill="url(#paint0_linear_1196_238)"
    />
    <Path
      d="M29.6667 40.5081L23.9567 46.1315C23.9567 46.1315 23.7084 46.3231 23.3767 46.3315C23.2617 46.3348 23.1384 46.3165 23.0117 46.2598L24.6184 36.3181L29.6667 40.5081Z"
      fill="url(#paint1_linear_1196_238)"
    />
    <Path
      d="M41.1617 19.9931C40.88 19.6264 40.36 19.5598 39.9933 19.8381L18 32.9998C18 32.9998 21.51 42.8198 22.045 44.5198C22.5817 46.2214 23.0117 46.2614 23.0117 46.2614L24.6183 36.3198L41.005 21.1598C41.3717 20.8814 41.44 20.3598 41.1617 19.9931Z"
      fill="url(#paint2_linear_1196_238)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1196_238"
        x1="48"
        y1="11"
        x2="14"
        y2="48"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#018CE9" />
        <Stop offset="1" stopColor="#01E88E" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1196_238"
        x1="26.3392"
        y1="36.3181"
        x2="26.3392"
        y2="46.3318"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#018CE9" />
        <Stop offset="1" stopColor="#01E88E" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_1196_238"
        x1="41"
        y1="19.9999"
        x2="18"
        y2="45.9999"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#01E98D" />
        <Stop offset="1" stopColor="#018CE9" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default TelegramGradient;
