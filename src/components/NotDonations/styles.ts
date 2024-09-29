import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {UbReg_16} from '@constants/globalStyles';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: scaledSize(6),
    backgroundColor: '$white',
    alignItems: 'center',
  },

  title: {
    ...UbReg_16,
    fontWeight: '500',
    color: '$blackText',
    lineHeight: 1.4 * scaledFontSize(16),
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },

  text: {
    ...UbReg_16,
    lineHeight: 1.4 * scaledFontSize(16),
    fontWeight: '400',
    color: '$blackTextLight',
    textAlign: 'center',
  },

  button: {
    ...simpleGreen.container,
    marginTop: 40,
  },

  buttonText: simpleGreen.text,
});

export default styles;
