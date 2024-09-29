import {scaledSize} from '@utils/scaledSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import {t4, t6} from '@constants/globalStyles';

const styles = EStyleSheet.create({
  transactionCard: {
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: '$white1',
    justifyContent: 'space-between',
    marginBottom: scaledSize(10),
    paddingHorizontal: scaledSize(20),
    paddingVertical: scaledSize(10),
  },

  textUnderline: {
    ...t6,
    fontWeight: '400',
    color: '$white',
    textDecorationLine: 'underline',
  },

  keyText: {
    ...t4,
    color: '$white50',
  },

  valueText: {
    ...t4,
    letterSpacing: -0.32,
    color: '$white',
  },

  greenText: {
    color: '#00D89D',
  },

  yellowText: {
    color: '#FCC224',
  },

  redText: {
    color: 'rgba(239, 68, 74, 0.7)',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaledSize(10),
  },
});

export default styles;
