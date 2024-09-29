import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const Balance = ({size}: any) => (
  <Svg width={size || 30} height={size || 30} viewBox="0 0 30 30" fill="none">
    <G id="Frame">
      <G id="Group">
        <Path
          id="Vector"
          d="M25.5219 3.50732H1.47182C0.660234 3.50732 0 4.16756 0 4.97914V21.0126C0 21.8241 0.660234 22.4844 1.47182 22.4844H9.95848L9.57486 25.5533H8.98746C8.86288 25.5533 8.74339 25.6028 8.6553 25.6909C8.5672 25.779 8.51771 25.8984 8.51771 26.023C8.51771 26.1476 8.5672 26.2671 8.6553 26.3552C8.74339 26.4433 8.86288 26.4928 8.98746 26.4928H11.4927C11.6173 26.4928 11.7368 26.4433 11.8249 26.3552C11.913 26.2671 11.9624 26.1476 11.9624 26.023C11.9624 25.8984 11.913 25.779 11.8249 25.6909C11.7368 25.6028 11.6173 25.5533 11.4927 25.5533H10.5217L10.9053 22.4844H11.4927C11.6173 22.4844 11.7368 22.4349 11.8249 22.3468C11.913 22.2587 11.9624 22.1392 11.9624 22.0146C11.9624 21.89 11.913 21.7706 11.8249 21.6825C11.7368 21.5944 11.6173 21.5449 11.4927 21.5449H1.47182C1.17826 21.5449 0.939434 21.3061 0.939434 21.0125V19.478H11.4927C11.6173 19.478 11.7368 19.4286 11.8249 19.3405C11.913 19.2524 11.9624 19.1329 11.9624 19.0083C11.9624 18.8837 11.913 18.7642 11.8249 18.6761C11.7368 18.588 11.6173 18.5386 11.4927 18.5386H0.939434V4.97914C0.939434 4.68559 1.17826 4.44676 1.47182 4.44676H25.5219C25.8155 4.44676 26.0543 4.68559 26.0543 4.97914V15C26.0543 15.1246 26.1038 15.2441 26.1919 15.3322C26.28 15.4203 26.3995 15.4698 26.524 15.4698C26.6486 15.4698 26.7681 15.4203 26.8562 15.3322C26.9443 15.2441 26.9938 15.1246 26.9938 15V4.97914C26.9937 4.16756 26.3335 3.50732 25.5219 3.50732Z"
          fill="white"
        />
        <Path
          id="Vector_2"
          d="M21.5138 12.5261H14.4992C13.6876 12.5261 13.0273 13.1864 13.0273 13.9979V25.0209C13.0273 25.8325 13.6876 26.4927 14.4992 26.4927H21.5138C22.3254 26.4927 22.9856 25.8325 22.9856 25.0209V13.9979C22.9856 13.1864 22.3254 12.5261 21.5138 12.5261ZM22.0462 25.0209C22.0462 25.3144 21.8073 25.5533 21.5138 25.5533H14.4992C14.2056 25.5533 13.9668 25.3144 13.9668 25.0209V24.4885H22.0461V25.0209H22.0462ZM22.0462 23.5491H13.9668V15.4698H22.0461V23.5491H22.0462ZM22.0462 14.5303H13.9668V13.9979C13.9668 13.7043 14.2056 13.4655 14.4992 13.4655H21.5138C21.8073 13.4655 22.0462 13.7043 22.0462 13.9979V14.5303ZM28.5284 16.5345H25.5221C24.7105 16.5345 24.0503 17.1947 24.0503 18.0063V25.0209C24.0503 25.8325 24.7105 26.4927 25.5221 26.4927H28.5284C29.34 26.4927 30.0002 25.8325 30.0002 25.0209V18.0063C30.0002 17.1947 29.34 16.5345 28.5284 16.5345ZM29.0608 25.0209C29.0608 25.3144 28.8219 25.5533 28.5284 25.5533H25.5221C25.2286 25.5533 24.9897 25.3144 24.9897 25.0209V24.4885H29.0607V25.0209H29.0608ZM29.0608 23.5491H24.9898V19.4781H29.0608V23.5491ZM29.0608 18.5387H24.9898V18.0063C24.9898 17.7127 25.2286 17.4739 25.5222 17.4739H28.5284C28.822 17.4739 29.0608 17.7127 29.0608 18.0063L29.0608 18.5387Z"
          fill="white"
        />
      </G>
    </G>
  </Svg>
);
export default Balance;