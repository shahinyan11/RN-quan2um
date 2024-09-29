import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const DeleteAccount = ({size, color}: any) => (
  <Svg width={size || 30} height={size || 30} viewBox="0 0 30 30" fill="none">
    <G clip-path="url(#clip0_1733_114)">
      <Path
        d="M19.6665 21.5333H24.3332"
        stroke={color || 'white'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M29 22C29 25.866 25.866 29 22 29C18.134 29 15 25.866 15 22C15 18.134 18.134 15 22 15C25.866 15 29 18.134 29 22Z"
        stroke={color || 'white'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.9998 5.66668C14.9998 8.24402 12.9105 10.3333 10.3332 10.3333C7.75583 10.3333 5.6665 8.24402 5.6665 5.66668C5.6665 3.08934 7.75583 1.00001 10.3332 1.00001C12.9105 1.00001 14.9998 3.08934 14.9998 5.66668Z"
        stroke={color || 'white'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.1011 24.3333H3.33333C2.04469 24.3333 1 23.2887 1 22C1 18.134 4.13402 15 8 15H12.2"
        stroke={color || 'white'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1733_114">
        <Rect width={size || 30} height={size || 30} fill={color || 'white'} />
      </ClipPath>
    </Defs>
  </Svg>
);

export default DeleteAccount;
