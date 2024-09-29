import React from 'react';

import Svg, {Path} from 'react-native-svg';
import {IconProps} from '@components/icons/Icon/types';

const Fb = ({size, color}: IconProps) => (
  <Svg width={size || 17} height={size || 16} viewBox="0 0 17 16" fill="none">
    <Path
      d="M.5 8.048c0 3.96 2.863 7.331 6.75 7.952v-5.626H5.22V8.048h2.032v-1.77a2.85 2.85 0 01.777-2.283 2.813 2.813 0 012.241-.857c.6.01 1.2.064 1.792.161v1.98h-1.011a1.152 1.152 0 00-.951.314 1.168 1.168 0 00-.352.944v1.511h2.217l-.354 2.327H9.748V16c4.204-.668 7.152-4.531 6.708-8.79-.444-4.258-4.123-7.422-8.373-7.199C3.833.234.5 3.766.5 8.048z"
      fill={color || 'white'}
    />
  </Svg>
);

export default Fb;
