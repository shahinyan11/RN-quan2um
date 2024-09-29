import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {CheckboxIconProps, IconProps} from '@components/icons/Icon/types';

export {default as ChevronDown} from './ChevronDown';

export {default as Exchange} from './Exchange';
export {default as Trash} from './Trash';
export {default as IconStar} from './Star';
export {default as IconShare} from './Share';
export {default as IconSignLeft} from './SignLeft';
export {default as IconAirplane} from './Airplane';

export const ArrowDown = ({size, color}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 14.5L17 9.5H7L12 14.5Z" fill={color} />
  </Svg>
);

export const ArrowLongDown = ({size, color}: IconProps) => (
  <Svg
    width={size || '24'}
    height={size || '24'}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      d="M11 18.17L8.41 15.59L7 17L12 22L17 17L15.59 15.59L13 18.17L13 2L11 2L11 18.17Z"
      fill={color || 'white'}
    />
  </Svg>
);

export const ArrowUp = ({size, color}: any) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 9.50011L7.00011 14.5002L17.0001 14.5L12 9.50011Z"
      fill={color}
    />
  </Svg>
);

export const ArrowLeft = ({size, color}: IconProps) => (
  <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15.5 19L8.5 12L15.5 5"
      stroke={color || 'white'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ArrowRight = ({size, color}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8.5 19l7-7-7-7"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const Play = ({size, color}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
    <Path
      d="M12.5 22C6.97967 21.994 2.50606 17.5204 2.5 12L2.5 11.8C2.60993 6.30455 7.13459 1.92797 12.6307 2.0009C18.1268 2.07382 22.5337 6.5689 22.4978 12.0654C22.4619 17.5618 17.9966 21.9989 12.5 22ZM10.5 7.50002L10.5 16.5L16.5 12L10.5 7.50002Z"
      fill={color}
    />
  </Svg>
);

export const Stop = ({size, color}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
    <Path
      d="M12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12C22.4939 17.5203 18.0203 21.9939 12.5 22ZM13.5 8L13.5 16L15.5 16L15.5 8L13.5 8ZM9.5 8L9.5 16L11.5 16L11.5 8L9.5 8Z"
      fill={color}
    />
  </Svg>
);

export const Refresh = ({size, color}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
    <Path
      d="M12.495 4.00001C8.3362 3.99432 4.86664 7.17599 4.51299 11.3197C4.15933 15.4634 7.03955 19.187 11.1391 19.8862C15.2387 20.5853 19.1903 18.0267 20.23 14L18.149 14C17.1318 16.8771 14.117 18.5324 11.1434 17.8465C8.16989 17.1605 6.18488 14.3519 6.53079 11.3199C6.8767 8.28792 9.44332 5.99856 12.495 6.00001C14.0845 6.00234 15.6064 6.64379 16.718 7.78001L13.5 11L20.5 11L20.5 4.00001L18.149 6.35001C16.6527 4.84464 14.6175 3.99873 12.495 4.00001Z"
      fill={color}
    />
  </Svg>
);

export const Minus = ({size, color}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path d="M3.33398 8.66683V7.3335H12.6673V8.66683H3.33398Z" fill={color} />
  </Svg>
);

export const Change = ({size, color}: IconProps) => (
  <Svg width={size || 14} height={size || 14} viewBox="0 0 14 14" fill="none">
    <Path
      d="M0.325487 10.3463C0.330649 10.5195 0.403058 10.6839 0.527336 10.8047L3.19527 13.4713C3.25721 13.5334 3.33074 13.5827 3.41173 13.6163C3.49273 13.6499 3.57956 13.6672 3.66725 13.6672C3.75494 13.6672 3.84178 13.6499 3.92277 13.6163C4.00377 13.5827 4.0773 13.5334 4.13923 13.4713L6.80725 10.8047C6.87106 10.7431 6.92192 10.6693 6.95689 10.5878C6.99185 10.5063 7.01021 10.4186 7.01087 10.3299C7.01152 10.2412 6.99448 10.1533 6.96073 10.0713C6.92698 9.98927 6.87714 9.9148 6.81425 9.85226C6.75135 9.78971 6.67669 9.74034 6.59448 9.70705C6.51227 9.67375 6.42419 9.65719 6.3355 9.65833C6.24681 9.65948 6.15922 9.67831 6.0779 9.71372C5.99658 9.74913 5.92316 9.80042 5.86191 9.86457L4.33201 11.3919L4.33201 1.00128C4.33201 0.824293 4.26169 0.654557 4.13654 0.529409C4.01139 0.404262 3.84163 0.333953 3.66464 0.333953C3.48765 0.333953 3.31796 0.404262 3.19281 0.529409C3.06767 0.654557 2.99735 0.824293 2.99735 1.00128L2.99735 11.3854L1.4726 9.86457C1.37928 9.76748 1.25869 9.70093 1.12681 9.67368C0.994923 9.64642 0.857885 9.65975 0.733721 9.71189C0.609557 9.76404 0.504094 9.85257 0.431217 9.96581C0.358341 10.0791 0.321505 10.2117 0.325487 10.3463ZM6.99341 3.67316C6.99448 3.80502 7.03461 3.9336 7.10875 4.04265C7.1829 4.15169 7.28772 4.2363 7.40995 4.28578C7.53218 4.33525 7.66638 4.34737 7.7955 4.32061C7.92462 4.29384 8.04289 4.22938 8.13537 4.13539L9.66658 2.60545V12.9987C9.6704 13.173 9.74236 13.3388 9.86697 13.4607C9.99157 13.5826 10.1589 13.6509 10.3333 13.6509C10.5076 13.6509 10.675 13.5826 10.7996 13.4607C10.9242 13.3388 10.9961 13.173 10.9999 12.9987V2.60935L12.5299 4.13539C12.5897 4.20518 12.6632 4.26186 12.7459 4.30188C12.8286 4.3419 12.9188 4.36438 13.0106 4.36793C13.1024 4.37147 13.1939 4.356 13.2795 4.32248C13.365 4.28896 13.4428 4.23811 13.5078 4.17314C13.5727 4.10816 13.6236 4.03046 13.6571 3.94491C13.6906 3.85935 13.7061 3.76779 13.7025 3.67597C13.699 3.58415 13.6765 3.49405 13.6365 3.41134C13.5965 3.32862 13.5398 3.25506 13.47 3.19529L10.8033 0.528626C10.6784 0.404439 10.5094 0.334731 10.3333 0.334731C10.1571 0.334731 9.98812 0.404439 9.8632 0.528626L7.19526 3.19529C7.1314 3.25742 7.08059 3.33172 7.04593 3.41379C7.01126 3.49587 6.99342 3.58406 6.99341 3.67316Z"
      fill={color || 'white'}
    />
  </Svg>
);

export const Checkbox = ({size, color, checked}: CheckboxIconProps) => (
  <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
    <Rect
      x="0.5"
      y="0.5"
      width="23"
      height="23"
      rx="1.5"
      stroke={color || 'white'}
    />
    <Path
      d="M7 11.9091L11 16L17 7"
      stroke={checked ? color || 'white' : 'none'}
      stroke-width="2"
      stroke-linecap="round"
    />
  </Svg>
);
