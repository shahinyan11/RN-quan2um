import EStyleSheet from 'react-native-extended-stylesheet';
import {t3, t4} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: '$blackBackground',
    borderRadius: 8,
    marginHorizontal: 20,
  },

  title: {
    ...t3,
    color: '$white',
    marginTop: 22,
    marginBottom: 12,
  },

  text: {
    ...t4,
    color: '$white70',
    marginBottom: 16,
  },
  icon: {
    position: 'absolute',
    top: 16,
    right: 12,
  },
});

export default styles;
