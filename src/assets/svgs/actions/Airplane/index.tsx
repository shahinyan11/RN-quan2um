import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {TouchableOpacity} from 'react-native';

const Airplane = ({size, color, style = {}, onPress}: any) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Svg
        width={size || 28}
        height={size || 28}
        viewBox="0 0 28 28"
        fill="none">
        <Path
          id="&#240;&#159;&#142;&#168;-Color"
          d="M3.78963 2.77224L24.8609 12.8498C25.4837 13.1477 25.7471 13.894 25.4493 14.5168C25.3261 14.7744 25.1185 14.982 24.8609 15.1052L3.78963 25.1827C3.16684 25.4806 2.4205 25.2172 2.12265 24.5944C1.99321 24.3237 1.96543 24.0156 2.04436 23.7262L4.15191 15.9982C4.20471 15.8046 4.36814 15.6614 4.56699 15.6343L14.7776 14.2474C14.8656 14.2348 14.9385 14.177 14.9722 14.098L14.9897 14.0353C15.0065 13.9181 14.9391 13.8083 14.8334 13.7671L14.7776 13.7524L4.57894 12.3655C4.38012 12.3385 4.21672 12.1952 4.16393 12.0016L2.04436 4.2288C1.86271 3.56277 2.25539 2.87559 2.92142 2.69395C3.21084 2.61502 3.519 2.6428 3.78963 2.77224Z"
          fill={color || 'rgba(255,255,255, 0.3)'}
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default Airplane;
