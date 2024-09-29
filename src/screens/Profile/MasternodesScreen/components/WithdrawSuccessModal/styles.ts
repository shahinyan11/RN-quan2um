import EStyleSheet from 'react-native-extended-stylesheet';
import {t3, t4} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: '$blackBackground',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 20,
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
  },

  text: {
    ...t4,
    color: '$white70',
    marginBottom: 16,
    textAlign: 'center',
  },

  icon: {
    position: 'absolute',
    top: 16,
    right: 12,
  },
});

export default styles;
