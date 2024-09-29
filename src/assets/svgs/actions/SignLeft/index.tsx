import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Pressable} from 'react-native';

const SignLeft = ({size, color, style = {}, onPress}: any) => (
  <Pressable style={style} onPress={onPress}>
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        id="Vector"
        d="M8.52796 7.53269C8.82216 7.24111 8.82428 6.76624 8.53269 6.47204C8.24111 6.17784 7.76624 6.17573 7.47204 6.46731L5.67731 8.2461C5.00134 8.91604 4.44886 9.46359 4.05706 9.95146C3.64963 10.4588 3.35469 10.9737 3.27591 11.5918C3.24136 11.8629 3.24136 12.1371 3.27591 12.4082C3.35469 13.0263 3.64963 13.5412 4.05706 14.0485C4.44886 14.5364 5.00134 15.084 5.67732 15.7539L7.47204 17.5327C7.76624 17.8243 8.24111 17.8222 8.53269 17.528C8.82427 17.2338 8.82216 16.7589 8.52796 16.4673L6.76499 14.72C6.0495 14.0109 5.55869 13.5228 5.22659 13.1093C5.11867 12.9749 5.03446 12.8566 4.96908 12.75H20C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25H4.96908C5.03446 11.1434 5.11867 11.0251 5.22659 10.8907C5.55869 10.4772 6.0495 9.98914 6.76499 9.28L8.52796 7.53269Z"
        fill={color || 'white'}
      />
    </Svg>
  </Pressable>
);
export default SignLeft;