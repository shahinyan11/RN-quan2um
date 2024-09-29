import EStyleSheet from 'react-native-extended-stylesheet';
import {t3, UbReg_14, UbReg_16} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  container: {
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: scaledSize(16),
    backgroundColor: '$blackText',
    marginBottom: 32,
  },

  title: {
    ...t3,
    color: '$white',
    fontWeight: '700',
  },

  description: {
    ...UbReg_14,
    color: '$white',
    marginTop: 12,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  helpType: {
    ...UbReg_16,
    color: '$white',
  },

  checkbox: {
    width: 24,
    height: 24,
  },

  button: simpleGreen.container,

  buttonText: simpleGreen.text,
});

export default styles;
