import EStyleSheet from 'react-native-extended-stylesheet';
import {UbReg_16, UbReg_20} from '@constants/globalStyles';
import {simpleGreen} from '@constants/buttonStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  safeContainer: {
    paddingTop: 20,
    backgroundColor: 'white',
    paddingBottom: 42,
  },
  container: {
    paddingBottom: 8,
  },

  title: {
    ...UbReg_20,
    fontWeight: '500',
    lineHeight: scaledSize(20) * 1.4,
    marginBottom: 20,
  },

  text: {
    ...UbReg_16,
    fontWeight: '400',
    lineHeight: scaledSize(16) * 1.4,
    marginBottom: 55,
  },

  button: simpleGreen.container,

  buttonText: simpleGreen.text,
});

export default styles;
