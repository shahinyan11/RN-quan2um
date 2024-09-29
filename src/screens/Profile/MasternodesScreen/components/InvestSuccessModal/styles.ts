import EStyleSheet from 'react-native-extended-stylesheet';
import {t3, t4} from '@constants/globalStyles';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: '$blackBackground',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 20,
    width: scaledSize(335),
  },

  image: {
    width: scaledSize(189),
    height: scaledSize(189),
  },

  title: {
    ...t3,
    color: '$white',
    marginTop: 22,
    marginBottom: 12,
    textAlign: 'center',
    fontSize: scaledFontSize(20),
  },

  text: {
    ...t4,
    color: '$white70',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: scaledFontSize(16),
  },

  icon: {
    position: 'absolute',
    top: 16,
    right: 12,
  },
});

export default styles;
