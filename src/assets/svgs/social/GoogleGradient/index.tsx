import {IconProps} from '@components/icons/Icon/types';
import Svg, {Circle, Defs, LinearGradient, Path, Stop} from 'react-native-svg';
import React from 'react';

const GoogleGradient = ({size, color}: IconProps) => (
  <Svg width={size || 60} height={size || 60} viewBox="0 0 60 60" fill="none">
    <Circle cx="30" cy="30" r="30" fill="#2C2A42" />
    <Path
      d="M47.6 30.4167C47.6 29.1167 47.4833 27.8667 47.2667 26.6667H30V33.7667H39.8667C39.4333 36.0501 38.1333 37.9834 36.1833 39.2834V43.9001H42.1333C45.6 40.7001 47.6 36.0001 47.6 30.4167Z"
      fill="url(#paint0_linear_1196_224)"
    />
    <Path
      d="M30 48.3333C34.95 48.3333 39.1 46.7 42.1333 43.9L36.1833 39.2833C34.55 40.3833 32.4666 41.05 30 41.05C25.2333 41.05 21.1833 37.8333 19.7333 33.5H13.6333V38.2333C16.65 44.2167 22.8333 48.3333 30 48.3333Z"
      fill="url(#paint1_linear_1196_224)"
    />
    <Path
      d="M19.7332 33.4833C19.3665 32.3833 19.1498 31.2167 19.1498 30C19.1498 28.7833 19.3665 27.6167 19.7332 26.5167V21.7833H13.6332C12.3832 24.25 11.6665 27.0333 11.6665 30C11.6665 32.9667 12.3832 35.75 13.6332 38.2167L18.3832 34.5167L19.7332 33.4833Z"
      fill="url(#paint2_linear_1196_224)"
    />
    <Path
      d="M30 18.9666C32.7 18.9666 35.1 19.9 37.0166 21.7L42.2666 16.45C39.0833 13.4833 34.95 11.6666 30 11.6666C22.8333 11.6666 16.65 15.7833 13.6333 21.7833L19.7333 26.5166C21.1833 22.1833 25.2333 18.9666 30 18.9666Z"
      fill="url(#paint3_linear_1196_224)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1196_224"
        x1="38.8"
        y1="26.6667"
        x2="38.8"
        y2="43.9001"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#01E88E" />
        <Stop offset="1" stopColor="#018CE9" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1196_224"
        x1="27.8833"
        y1="33.5"
        x2="27.8833"
        y2="48.3333"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#01E88E" />
        <Stop offset="1" stopColor="#018CE9" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_1196_224"
        x1="15.6998"
        y1="21.7833"
        x2="15.6998"
        y2="38.2167"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#01E88E" />
        <Stop offset="1" stopColor="#018CE9" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_1196_224"
        x1="27.95"
        y1="11.6666"
        x2="27.95"
        y2="26.5166"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#01E88E" />
        <Stop offset="1" stopColor="#018CE9" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default GoogleGradient;
