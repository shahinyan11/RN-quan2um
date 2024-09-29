import {t2, t5} from '@constants/globalStyles';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    justifyContent: 'space-between',
  },
  cashContainerStyle: {
    borderRadius: 8,
    padding: scaledSize(20),
    marginBottom: 8,
  },
  balanceText: {
    ...t5,
    marginBottom: 10,
    color: '$white',
  },

  balanceValue: {
    ...t2,
    color: '$white',
  },

  textSecondary: {
    color: '$white50',
    marginBottom: 10,
  },

  labelStyle: {
    marginVertical: 4,
    color: '$white25',
    textTransform: 'uppercase',
  },

  smallCashContainerStyle: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  freezeValue: {
    color: '$red',
    fontSize: scaledFontSize(14),
  },
  totalStyle: {
    fontSize: scaledFontSize(24),
  },
  iconContainerStyle: {
    width: scaledSize(24),
    height: scaledSize(24),
    borderRadius: scaledSize(12),
    overflow: 'hidden',
    marginRight: scaledSize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: scaledSize(12),
    height: scaledSize(12),
  },
});

export default styles;
