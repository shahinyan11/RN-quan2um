import EStyleSheet from 'react-native-extended-stylesheet';
import {t3, t4} from '@constants/globalStyles';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  content: {
    padding: scaledFontSize(20),
    paddingTop: scaledSize(42),
    borderRadius: scaledSize(8),
    marginHorizontal: scaledSize(20),
    backgroundColor: '$white',
  },

  title: {
    ...t3,
    fontWeight: '500',
    marginBottom: scaledSize(12),
  },

  text: {
    ...t4,
    fontWeight: '400',
    lineHeight: 1.4 * scaledFontSize(16),
    marginBottom: scaledSize(16),
  },
  icon: {
    position: 'absolute',
    top: scaledSize(16),
    right: scaledSize(12),
  },

  button: {
    ...simpleGreen.container,
    marginBottom: 20,
  },

  buttonText: simpleGreen.text,

  greenText: {
    ...t4,
    fontWeight: '500',
    color: 'rgba(159, 213, 33, 1)',
    textAlign: 'center',
  },
});

export default styles;
