import {SvgProps} from '@components/icons/Icon/types';
import Svg, {Path} from 'react-native-svg';
import React from 'react';

const EcominingTree = ({size, color}: SvgProps) => {
  return (
    <Svg width={size || 30} height={size || 30} viewBox="0 0 30 30" fill="none">
      <Path
        d="M17.2929 8.02593C13.5829 10.1594 10.72 10.7969 8.25156 13.4315C4.862 17.0494 5.2897 22.4619 9.60101 25.2824C13.9672 28.1388 19.3856 27.3204 22.5977 23.6597C29.7214 15.5411 23.4468 2 23.4468 2C23.4468 2 22.3188 4.09534 20.1019 6.0529"
        stroke={color || 'white'}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.31283 28.5376C6.84564 25.9963 8.25686 23.9551 10.3268 22.3066C12.2705 20.7586 14.5146 19.5962 16.5211 18.1269C17.7377 17.2359 18.8683 16.253 19.8115 15.0947C20.0362 14.8189 20.0881 14.4566 19.8115 14.187C19.5818 13.9629 19.0826 13.9136 18.86 14.187C15.5726 18.2237 9.97284 19.7551 6.87624 23.9515C5.94132 25.2184 5.33287 26.6811 5.01519 28.1964C4.84598 29.003 6.14282 29.3482 6.31283 28.5376Z"
        stroke={color || 'white'}
      />
    </Svg>
  );
};

export default EcominingTree;
