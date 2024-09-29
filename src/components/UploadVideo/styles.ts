import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize} from '@utils/scaledSize';
import {t3, t5} from '@constants/globalStyles';
import {simpleTransparent} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  title: {
    ...t3,
    fontWeight: '500',
    lineHeight: 1.4 * scaledFontSize(20),
    marginBottom: 12,
  },

  uploadsContainer: {
    marginTop: 49,
  },

  button: {
    ...simpleTransparent.container,
    marginTop: 2,
    marginBottom: 8,
  },
  buttonText: {
    ...simpleTransparent.text,
  },

  lightText: {
    ...t5,
    color: '$blackTextLight',
    lineHeight: 1.4 * scaledFontSize(14),
    opacity: 0.5,
  },
});

export default styles;
