import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Reward = ({size}: any) => (
  <Svg width={size || 15} height={size || 19} viewBox="0 0 15 19" fill="none">
    <Path
      d="M7.23633 0C3.24622 0 0 3.24622 0 7.23633C0 9.7929 1.33267 12.0441 3.33984 13.3317V18.4434C3.33984 18.6486 3.45284 18.8373 3.63382 18.9341C3.81484 19.031 4.03446 19.0204 4.20523 18.9065L7.23633 16.8858L10.2674 18.9065C10.4381 19.0203 10.6577 19.0311 10.8388 18.9341C11.0198 18.8373 11.1328 18.6486 11.1328 18.4434V13.3317C13.14 12.0441 14.4727 9.7929 14.4727 7.23633C14.4727 3.24622 11.2264 0 7.23633 0ZM10.0195 17.4033L7.54508 15.7536C7.35812 15.629 7.1145 15.629 6.92754 15.7536L4.45312 17.4033V13.9157C5.31035 14.2742 6.25055 14.4727 7.23633 14.4727C8.2221 14.4727 9.1623 14.2742 10.0195 13.9157V17.4033ZM7.23633 13.3594C3.86008 13.3594 1.11328 10.6126 1.11328 7.23633C1.11328 3.86008 3.86008 1.11328 7.23633 1.11328C10.6126 1.11328 13.3594 3.86008 13.3594 7.23633C13.3594 10.6126 10.6126 13.3594 7.23633 13.3594Z"
      fill="#FCC224"
    />
    <Path
      d="M11.663 5.93412C11.5979 5.73087 11.4224 5.58273 11.211 5.55275L8.8062 5.21157L7.73315 3.08872C7.63844 2.90136 7.44633 2.7832 7.23636 2.7832C7.0264 2.7832 6.83432 2.90136 6.73958 3.08872L5.66652 5.21157L3.26169 5.55275C3.05039 5.58273 2.87482 5.73087 2.80973 5.93412C2.74464 6.13737 2.80153 6.35995 2.95613 6.50709L4.68825 8.15556L4.27997 10.4798C4.24342 10.6879 4.32784 10.8988 4.49795 11.0242C4.66802 11.1496 4.89443 11.1678 5.08242 11.0714L7.23636 9.96576L9.3903 11.0714C9.57867 11.1681 9.80504 11.1494 9.97477 11.0242C10.1448 10.8989 10.2293 10.688 10.1928 10.4799L9.78448 8.1556L11.5166 6.50713C11.6712 6.35995 11.7281 6.13741 11.663 5.93412ZM8.80086 7.55484C8.66585 7.68331 8.6041 7.87082 8.63635 8.05437L8.90254 9.56965L7.49056 8.84487C7.33095 8.76297 7.14173 8.76297 6.98216 8.84487L5.57019 9.56965L5.83637 8.05437C5.86862 7.87082 5.80687 7.68331 5.67187 7.55484L4.55666 6.49347L6.11046 6.27304C6.29063 6.24747 6.44697 6.13544 6.52906 5.97305L7.23636 4.57373L7.94367 5.97301C8.02575 6.13544 8.18206 6.24747 8.36226 6.27301L9.91607 6.49344L8.80086 7.55484Z"
      fill="#FCC224"
    />
  </Svg>
);

export default Reward;
