import {IconProps} from '@components/icons/Icon/types';
import Svg, {Path} from 'react-native-svg';
import React from 'react';

const Search = ({size, color}: IconProps) => {
  return (
    <Svg width={size || 21} height={size || 21} viewBox="0 0 21 21" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.36668 2C5.29817 2 2 5.29816 2 9.36665C2 13.4351 5.29817 16.7333 9.36668 16.7333C13.4352 16.7333 16.7334 13.4351 16.7334 9.36665C16.7334 5.29816 13.4352 2 9.36668 2ZM3.13334 9.36665C3.13334 5.92408 5.9241 3.13333 9.36668 3.13333C12.8093 3.13333 15.6 5.92408 15.6 9.36665C15.6 12.8092 12.8093 15.6 9.36668 15.6C5.9241 15.6 3.13334 12.8092 3.13334 9.36665Z"
        fill={color || '#FAFAFA'}
      />
      <Path
        d="M15.8119 15.0105C15.5906 14.7892 15.2318 14.7892 15.0105 15.0105C14.7892 15.2318 14.7892 15.5905 15.0105 15.8118L18.0326 18.834C18.2539 19.0553 18.6127 19.0553 18.834 18.834C19.0553 18.6127 19.0553 18.2539 18.834 18.0326L15.8119 15.0105Z"
        fill={color || '#FAFAFA'}
      />
    </Svg>
  );
};

export default Search;
