import Svg, {Rect} from 'react-native-svg';
import React from 'react';

const Copy = ({size, color, fill}: any) => (
  <Svg width={size || 16} height={size || 16} viewBox="0 0 16 16" fill="none">
    <Rect
      x={0.75}
      y={3.417}
      width={11.833}
      height={11.833}
      rx={1.25}
      stroke={color}
      strokeWidth={1.5}
    />
    <Rect
      x={3.417}
      y={0.75}
      width={11.833}
      height={11.833}
      rx={1.25}
      fill={fill}
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);

export default Copy;
