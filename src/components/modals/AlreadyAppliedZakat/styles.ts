import EStyleSheet from 'react-native-extended-stylesheet';
import {t3, t4} from '@constants/globalStyles';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {simpleGreen} from '@constants/buttonStyles';

const styles = EStyleSheet.create({
  content: {
    padding: scaledSize(20),
    paddingTop: scaledSize(42),
    borderRadius: scaledSize(8),
    marginHorizontal: scaledSize(20),
    backgroundColor: '$white',
  },

  title: {
    ...t3,
    fontWeight: '500',
    marginBottom: scaledSize(16),
    textAlign: 'center',
  },

  icon: {
    position: 'absolute',
    top: scaledSize(16),
    right: scaledSize(12),
  },

  button: {
    ...simpleGreen.container,
  },
  buttonText: simpleGreen.text,
});

export default styles;
