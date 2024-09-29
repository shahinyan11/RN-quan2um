import {t4} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  darkText: {
    ...t4,
    fontWeight: '300',
    color: '$white50',
  },
  greenText: {
    color: '#00D89D',
  },
});

export default styles;
