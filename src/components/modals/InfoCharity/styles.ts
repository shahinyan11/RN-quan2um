import EStyleSheet from 'react-native-extended-stylesheet';
import {t3, t4} from '@constants/globalStyles';
import {scaledFontSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  content: {
    padding: 20,
    paddingTop: 42,
    backgroundColor: '$white',
    borderRadius: 8,
    marginHorizontal: 20,
  },

  title: {
    ...t3,
    color: '$blackText',
    fontWeight: '500',
    marginBottom: 12,
  },

  text: {
    ...t4,
    color: '$blackText',
    fontWeight: '400',
    lineHeight: 1.4 * scaledFontSize(16),
  },

  icon: {
    position: 'absolute',
    top: 16,
    right: 12,
  },
});

export default styles;
