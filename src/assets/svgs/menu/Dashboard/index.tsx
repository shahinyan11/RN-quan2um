import {SvgProps} from '@components/icons/Icon/types';
import Svg, {Path} from 'react-native-svg';
import React from 'react';

const Dashboard = ({size, color}: SvgProps) => {
  return (
    <Svg width={size || 30} height={size || 30} viewBox="0 0 30 30" fill="none">
      <Path
        d="M16.4675 22.3098C16.4675 21.8021 16.0344 21.3905 15.5 21.3905C14.9656 21.3905 14.5325 21.8021 14.5325 22.3098V24.7612C14.5325 25.2689 14.9656 25.6805 15.5 25.6805C16.0344 25.6805 16.4675 25.2689 16.4675 24.7612V22.3098Z"
        fill={color || '#FAFAFA'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7719 2.00474C15.5907 1.99842 15.4093 1.99842 15.2281 2.00474C14.0317 2.04644 12.9544 2.43297 11.7732 3.0764C10.6221 3.70343 9.29691 4.61823 7.61546 5.77896L7.52406 5.84205C5.8426 7.00276 4.51736 7.91756 3.53401 8.76395C2.52494 9.63247 1.80513 10.4865 1.39369 11.5547C1.33136 11.7165 1.2753 11.8804 1.22562 12.0461C0.897658 13.1401 0.951663 14.233 1.23072 15.4992C1.50266 16.7331 2.00886 18.2133 2.65113 20.0914L2.68604 20.1935C3.32828 22.0715 3.83447 23.5517 4.37781 24.7018C4.93536 25.882 5.56779 26.7964 6.50988 27.4983C6.65259 27.6046 6.79936 27.7059 6.94989 27.802C7.89771 28.4071 8.95205 28.698 10.2234 28.8444C11.5758 29 13.2667 29 15.4353 29H15.5648C17.7333 29 19.4242 29 20.7766 28.8444C22.048 28.698 23.1023 28.4071 24.0501 27.802C24.2006 27.7059 24.3474 27.6046 24.4901 27.4983C25.4322 26.7964 26.0646 25.882 26.6222 24.7018C27.1655 23.5517 27.6717 22.0715 28.314 20.1934L28.3489 20.0913C28.9911 18.2133 29.4974 16.733 29.7693 15.4992C30.0483 14.233 30.1023 13.1401 29.7744 12.0461C29.7247 11.8804 29.6686 11.7165 29.6063 11.5547C29.1949 10.4865 28.4751 9.63247 27.466 8.76395C26.4826 7.91756 25.1574 7.00276 23.4759 5.84204L23.3845 5.77893C21.7031 4.61822 20.3779 3.70342 19.2268 3.0764C18.0456 2.43297 16.9683 2.04644 15.7719 2.00474ZM15.299 3.84208C15.433 3.83741 15.567 3.83741 15.701 3.84208C16.4692 3.86886 17.2342 4.11029 18.2643 4.67143C19.3141 5.24329 20.5556 6.09876 22.2928 7.29796C24.03 8.49715 25.27 9.35463 26.1668 10.1266C27.0468 10.884 27.5249 11.5007 27.7891 12.1866C27.8352 12.3061 27.8766 12.4273 27.9133 12.5498C28.1239 13.2522 28.1186 14.0181 27.8753 15.1224C27.6273 16.2477 27.1546 17.6339 26.491 19.5743C25.8275 21.5146 25.3523 22.9 24.8568 23.949C24.3705 24.9782 23.901 25.6008 23.2961 26.0514C23.1906 26.13 23.0821 26.2049 22.9709 26.2759C22.5896 26.5194 22.1618 26.7001 21.6278 26.832V22.3098C21.6278 19.0943 18.8843 16.4876 15.5 16.4876C12.1157 16.4876 9.3722 19.0943 9.3722 22.3098V26.832C8.83816 26.7001 8.41042 26.5194 8.02915 26.2759C7.91789 26.2049 7.80941 26.13 7.70393 26.0514C7.09904 25.6008 6.62946 24.9782 6.14322 23.9489C5.64768 22.9 5.17252 21.5146 4.50897 19.5743C3.84542 17.6339 3.37275 16.2477 3.12474 15.1224C2.88137 14.0181 2.87612 13.2522 3.08669 12.5498C3.12341 12.4273 3.16484 12.3062 3.21091 12.1866C3.47508 11.5007 3.95317 10.884 4.83318 10.1266C5.73002 9.35463 6.96998 8.49715 8.70717 7.29796C10.4444 6.09876 11.6859 5.24329 12.7357 4.67143C13.7658 4.11029 14.5309 3.86886 15.299 3.84208ZM15.5 18.3262C17.8156 18.3262 19.6927 20.1097 19.6927 22.3098V27.0926C18.6047 27.1605 17.2587 27.1614 15.5 27.1614C13.7413 27.1614 12.3953 27.1605 11.3073 27.0926V22.3098C11.3073 20.1097 13.1844 18.3262 15.5 18.3262Z"
        fill={color || '#FAFAFA'}
      />
    </Svg>
  );
};

export default Dashboard;
