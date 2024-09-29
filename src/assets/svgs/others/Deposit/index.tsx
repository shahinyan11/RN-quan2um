import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Deposit = ({size}: any) => (
  <Svg width={size || 20} height={size || 19} viewBox="0 0 20 19" fill="none">
    <Path
      d="M16.6667 17.5002H14.1667C13.7075 17.5002 13.3334 17.126 13.3334 16.6669V12.5002H11.25C11.0817 12.5002 10.9292 12.3985 10.865 12.2427C10.8 12.0869 10.8359 11.9077 10.955 11.7885L15.1217 7.62188C15.2842 7.45937 15.5484 7.45937 15.7109 7.62188L19.8775 11.7885C19.9967 11.9077 20.0325 12.0869 19.9675 12.2427C19.9042 12.3985 19.7517 12.5002 19.5834 12.5002H17.5V16.6669C17.5 17.126 17.1259 17.5002 16.6667 17.5002ZM12.2559 11.6669H13.75C13.98 11.6669 14.1667 11.8535 14.1667 12.0835V16.6669H16.6667V12.0835C16.6667 11.8535 16.8534 11.6669 17.0834 11.6669H18.5775L15.4167 8.50604L12.2559 11.6669Z"
      fill="#0097D8"
    />
    <Path
      d="M11.25 15H2.08333C0.935 15 0 14.065 0 12.9167V2.08333C0 0.935 0.935 0 2.08333 0H17.9167C19.065 0 20 0.935 20 2.08333V9.58333C20 9.81333 19.8133 10 19.5833 10C19.3533 10 19.1667 9.81333 19.1667 9.58333V2.08333C19.1667 1.39417 18.6058 0.833333 17.9167 0.833333H2.08333C1.39417 0.833333 0.833333 1.39417 0.833333 2.08333V12.9167C0.833333 13.6058 1.39417 14.1667 2.08333 14.1667H11.25C11.48 14.1667 11.6667 14.3533 11.6667 14.5833C11.6667 14.8133 11.48 15 11.25 15Z"
      fill="#0097D8"
    />
    <Path
      d="M6.25 10.8327H0.416667C0.186667 10.8327 0 10.646 0 10.416V4.58268C0 4.35268 0.186667 4.16602 0.416667 4.16602H6.25C7.39833 4.16602 8.33333 5.10102 8.33333 6.24935V8.74935C8.33333 9.89768 7.39833 10.8327 6.25 10.8327ZM0.833333 9.99935H6.25C6.93917 9.99935 7.5 9.43852 7.5 8.74935V6.24935C7.5 5.56018 6.93917 4.99935 6.25 4.99935H0.833333V9.99935Z"
      fill="#0097D8"
    />
    <Path
      d="M4.16667 9.16732C3.2475 9.16732 2.5 8.41982 2.5 7.50065C2.5 6.58148 3.2475 5.83398 4.16667 5.83398C5.08583 5.83398 5.83333 6.58148 5.83333 7.50065C5.83333 8.41982 5.08583 9.16732 4.16667 9.16732ZM4.16667 6.66732C3.7075 6.66732 3.33333 7.04148 3.33333 7.50065C3.33333 7.95982 3.7075 8.33398 4.16667 8.33398C4.62583 8.33398 5 7.95982 5 7.50065C5 7.04148 4.62583 6.66732 4.16667 6.66732Z"
      fill="#0097D8"
    />
  </Svg>
);

export default Deposit;
