import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Info = ({size, color}: any) => (
  <Svg width={size || 14} height={size || 14} viewBox="0 0 14 14" fill="none">
    <Path
      d="M7 13.667A6.667 6.667 0 1113.668 7a6.674 6.674 0 01-6.666 6.667zM1.668 7.115a5.333 5.333 0 100-.115v.115zm6.667 3.219h-2V7.667h-.667V6.334h2V9h.667v1.334zM7.667 5H6.334V3.667h1.333V5z"
      fill={color || '#0C0C0C'}
      fillOpacity={0.75}
    />
  </Svg>
);

export default Info;
