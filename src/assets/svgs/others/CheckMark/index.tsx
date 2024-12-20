import React from 'react';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';

type Props = {
  color?: string;
  size?: number | string;
  style?: StyleProp<ViewStyle>;
};

const CheckMark = ({color, size, ...props}: Props) => {
  return (
    <Svg
      {...props}
      width={size || 98}
      height={size || 98}
      viewBox="0 0 98 98"
      fill="none">
      <Path
        d="M88.3876 19.7869C75.2573 28.6034 55.8868 49.5451 48.2626 65.9842C41.9899 57.0798 36.1914 49.1905 27.0697 41.7338C22.6745 38.1389 17.2529 44.792 21.6448 48.3869C31.5071 56.4487 38.7966 64.2632 45.0109 73.9581C45.4481 74.6396 46.0628 75.1886 46.7886 75.5461C47.5144 75.9035 48.3238 76.0558 49.1297 75.9865C49.9355 75.9172 50.7072 75.629 51.3616 75.1529C52.0159 74.6768 52.5281 74.0308 52.843 73.2847C59.4081 57.7337 76.0499 35.8128 88.2934 25.516C96.2748 38.9685 97.4735 56.4454 88.3973 71.9053C70.6542 102.119 27.3263 101.924 9.82039 71.5799C-7.68554 41.2361 14.1993 3.25341 49.2112 3.25341C60.2022 3.17801 70.8379 7.14922 79.097 14.4123C79.4128 14.6853 79.8215 14.8261 80.2382 14.8055C80.6549 14.7849 81.0477 14.6045 81.3352 14.3017L81.3579 14.279C81.5031 14.1206 81.6156 13.9349 81.6887 13.7327C81.7618 13.5305 81.7942 13.3158 81.7839 13.1009C81.7736 12.8861 81.7209 12.6755 81.6289 12.4812C81.5368 12.2869 81.4071 12.1129 81.2475 11.9691C72.7268 4.48317 61.4546 -0.159341 48.5615 7.18869e-05C11.1588 0.478312 -11.6876 40.7676 7.01047 73.2001C25.7638 105.733 72.6521 105.733 91.4054 73.2001C101.511 55.6484 99.5915 35.0287 88.3876 19.7869Z"
        fill="url(#paint0_linear_949_887)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_949_887"
          x1="23.3485"
          y1="8.47521"
          x2="77.2294"
          y2="91.0249"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#63A39F" />
          <Stop offset="1" stopColor="#517456" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default CheckMark;
