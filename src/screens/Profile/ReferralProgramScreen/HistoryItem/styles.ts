import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils/scaledSize';
import {t4} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'rgba(46, 46, 65, 1)',
    marginBottom: scaledSize(15),
    padding: scaledSize(24),
    width: '100%',
    borderRadius: 8,
  },
  row: {
    marginBottom: 16,
  },
  grayText: {
    ...t4,
    color: 'rgba(143, 148, 160, 1)',
    marginBottom: 10,
  },
  whiteText: {
    ...t4,
    color: '$white',
  },
});

export default styles;
