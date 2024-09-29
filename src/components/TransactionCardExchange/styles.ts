import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {t4} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  transactionCard: {
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: '$white1',
    justifyContent: 'space-between',
    marginBottom: scaledSize(12),
    paddingVertical: scaledSize(16),
    paddingHorizontal: scaledSize(20),
  },

  icon: {
    marginRight: 5,
  },

  text: {
    ...t4,
    color: '$white50',
  },
  textWhite: {
    ...t4,
    color: '$white',
    maxWidth: scaledSize(150),
    overflow: 'hidden',
  },

  greenText: {
    ...t4,
    color: '$green',
  },

  yellowText: {
    ...t4,
    color: '$yellow',
  },

  dateText: {
    ...t4,
    textAlign: 'right',
    color: '$white',
    lineHeight: scaledSize(24),
    maxWidth: scaledSize(130),
    fontWeight: '500',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaledSize(8),
  },
});

export default styles;
