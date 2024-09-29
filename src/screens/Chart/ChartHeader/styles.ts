import EStyleSheet from 'react-native-extended-stylesheet';
import {Ub_reg_12, Ub_reg_22, Ub_reg_26} from '@constants/globalStyles';
import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  pareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pare: {
    ...Ub_reg_22,
    color: '$white',
    fontWeight: '500',
    marginRight: scaledSize(13),
  },

  fluctuation: {
    ...Ub_reg_12,
    fontWeight: '500',
    padding: 3,
    borderRadius: 4,
    color: 'rgba(239, 68, 74, 1)',
    backgroundColor: 'rgba(239, 68, 74, 0.12)',
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shareIcon: {
    marginLeft: 10,
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  currentPriceUp: {
    ...Ub_reg_26,
    color: '#00D89D',
    fontWeight: '500',
  },
  currentPriceDown: {
    ...Ub_reg_26,
    color: '#EF444A',
    fontWeight: '500',
  },

  label: {
    ...Ub_reg_12,
    fontWeight: '500',
    color: '$white50',
    marginRight: scaledSize(20),
    marginBottom: 6,
  },

  value: {
    ...Ub_reg_12,
    fontWeight: '500',
    color: '$white',
    marginBottom: 6,
  },
});

export default styles;
