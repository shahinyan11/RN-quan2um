import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const Completed = ({size, color}: any) => (
  <Svg width={size || 28} height={size || 28} viewBox="0 0 28 28" fill="none">
    <G clipPath="url(#clip0_959_311)">
      <Path
        d="M21.2222 9.66667L16.3556 15.1024C14.4272 17.2563 13.463 18.3333 12.1944 18.3333C10.9259 18.3333 9.9617 17.2563 8.03325 15.1024L6.77778 13.7001M14 27C8.58372 27 5.87558 27 3.97711 25.6207C3.36398 25.1752 2.82479 24.636 2.37932 24.0229C1 22.1244 1 19.4163 1 14C1 8.58372 1 5.87558 2.37932 3.97711C2.82479 3.36398 3.36398 2.82479 3.97711 2.37932C5.87558 1 8.58372 1 14 1C19.4163 1 22.1244 1 24.0229 2.37932C24.636 2.82479 25.1752 3.36398 25.6207 3.97711C27 5.87558 27 8.58372 27 14C27 19.4163 27 22.1244 25.6207 24.0229C25.1752 24.636 24.636 25.1752 24.0229 25.6207C22.1244 27 19.4163 27 14 27Z"
        stroke={color || '#00D89D'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_959_311">
        <Rect width="28" height="28" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Completed;
