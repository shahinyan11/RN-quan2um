import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Profit = ({size}: any) => (
  <Svg width={size || 18} height={size || 19} viewBox="0 0 18 19" fill="none">
    <Path d="M5.81515 12.7422H4.9375V18.9988H5.81515V12.7422Z" fill="#00D89D" />
    <Path
      d="M9.46359 11.6934H8.58594V19.0004H9.46359V11.6934Z"
      fill="#00D89D"
    />
    <Path d="M2.16544 16.6699H1.33398V18.999H2.16544V16.6699Z" fill="#00D89D" />
    <Path
      d="M13.0661 9.04297H12.1885V18.9988H13.0661V9.04297Z"
      fill="#00D89D"
    />
    <Path
      d="M16.6694 6.66797H15.8379V18.9985H16.6694V6.66797Z"
      fill="#00D89D"
    />
    <Path
      d="M17.8661 0.123306C17.7737 0.0456688 17.6582 0 17.5335 0H14.3693C14.1153 0 13.9074 0.20551 13.9074 0.456688C13.9074 0.707866 14.1153 0.913376 14.3693 0.913376L16.411 0.908809L11.4177 5.85017L9.66697 4.11019C9.5792 4.02342 9.46372 3.97319 9.339 3.96862C9.21428 3.97319 9.0988 4.02342 9.01104 4.11019L0.14213 12.8877C-0.042639 13.0613 -0.0472582 13.3536 0.128272 13.5362C0.303803 13.7189 0.599433 13.7235 0.784202 13.5499C0.788821 13.5454 0.79344 13.5408 0.79806 13.5408L9.34362 5.09207L11.0943 6.81835C11.1821 6.90056 11.2976 6.94623 11.4223 6.94623C11.5424 6.94623 11.6625 6.90056 11.7502 6.81835L17.0762 1.55274L17.0715 3.56673C17.0715 3.81791 17.2748 4.01886 17.5288 4.01886H17.5335C17.7875 4.02342 17.9908 3.82248 17.9954 3.5713C17.9954 3.5713 17.9954 3.5713 17.9954 3.56673L18 0.442987C18 0.324249 17.9492 0.210077 17.8661 0.123306Z"
      fill="#00D89D"
    />
  </Svg>
);

export default Profit;
