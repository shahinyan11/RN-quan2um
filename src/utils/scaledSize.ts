import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const DEF_HEIGHT = 667;
const DEF_WIDTH = 375;

const scaleWidth = width / DEF_WIDTH;
const scaleHeight = height / DEF_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize = (size: number) => {
  return Math.ceil(size * scale);
};

export const scaledFontSize = (size: number) => {
  const responsiveText = Math.ceil(size * scale);
  return responsiveText < 8 ? 8 : responsiveText;
};
