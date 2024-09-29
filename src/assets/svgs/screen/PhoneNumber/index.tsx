import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const PhoneNumber = ({size, color}: any) => (
  <Svg width={size || 30} height={size || 30} viewBox="0 0 30 30" fill="none">
    <G id="Frame 218" clipPath="url(#clip0_1733_110)">
      <Path
        id="Vector"
        d="M21.9887 19.0488C22.0483 19.5058 21.9462 19.4782 19.8109 21.5996C19.0993 22.3911 17.2798 21.8328 16.3072 21.4291C13.3692 20.2098 10.2978 17.0797 8.96631 14.5329C8.38029 13.4121 7.46493 11.0255 8.40328 10.1801C10.5267 8.05437 10.4911 8 10.8478 8C11.1054 8 11.3028 8.16911 11.4403 8.38558C13.1794 11.6884 13.176 11.5523 13.0997 11.9153C12.9641 12.5602 12.0478 12.9381 12.0478 13.3241C12.3862 15.1029 15.95 18.2062 16.7812 17.929C16.8757 17.8975 16.8032 17.9528 17.7219 17.0169C18.0471 16.7278 18.5202 16.734 18.7442 16.8687C18.7664 16.8687 18.539 16.7386 21.6182 18.5593C21.8258 18.688 21.9492 18.8511 21.9887 19.0488Z"
        stroke={color || 'white'}
        stroke-miterlimit="10"
      />
      <Path
        id="Vector_2"
        d="M29 15C29 22.732 22.732 29 15 29C7.26799 29 1 22.732 1 15C1 7.26799 7.26799 1 15 1C22.732 1 29 7.26799 29 15Z"
        stroke={color || 'white'}
        strokeMiterlimit="10"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1733_110">
        <Rect width={size || 30} height={size || 30} fill={color || 'white'} />
      </ClipPath>
    </Defs>
  </Svg>
);

export default PhoneNumber;
