import EStyleSheet from 'react-native-extended-stylesheet';
import {t3, t4} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  content: {
    borderRadius: 8,
    marginHorizontal: 20,
    backgroundColor: '$white',
    paddingTop: scaledSize(42),
  },

  icon: {
    position: 'absolute',
    top: 16,
    right: 12,
  },

  title: {
    ...t3,
    marginTop: 12,
    marginBottom: 20,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: -0.32,
    lineHeight: 1.4 * scaledSize(20),
    color: '$blackText',
  },

  text: {
    ...t4,
    fontWeight: '400',
    textAlign: 'center',
    color: '$blackTextLight',
    lineHeight: 1.4 * scaledSize(16),
    marginBottom: 16,
  },

  button: simpleGreen.container,

  buttonText: simpleGreen.text,
});

export default styles;
